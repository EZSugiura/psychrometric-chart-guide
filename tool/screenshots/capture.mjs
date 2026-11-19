import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GUIDE_ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_WEB_DIR = 'C:\\Users\\eizos\\AndroidStudioProjects\\psychrometric_chart_flutter\\build\\web';
const OUTPUT_BASE = path.join(GUIDE_ROOT, 'docs', 'assets', 'images');

const LOCALES = [
  { dir: 'ja', locale: 'ja-JP' },
  { dir: 'en', locale: 'en-US' },
];

const TARGET_FILES = [
  '01_home.png',
  '02_point_entry.png',
  '03_multiple_points.png',
  '04_save_dialog.png',
  '05_slots_list.png',
  '06_compare.png',
  '07_settings_units.png',
  '08_low_temp_chart.png',
  '09_ahu_config.png',
  '10_ahu_chart.png',
  '11_weather_fetch.png',
  '12_annual_simulation.png',
];

function parseArgs(argv) {
  const args = { url: null, webDir: DEFAULT_WEB_DIR, profileDir: null, headed: false, waitForAuth: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--url' && argv[i + 1]) args.url = argv[++i];
    else if (a === '--web-dir' && argv[i + 1]) args.webDir = argv[++i];
    else if (a === '--profile-dir' && argv[i + 1]) args.profileDir = argv[++i];
    else if (a === '--headed') args.headed = true;
    else if (a === '--wait-for-auth') { args.waitForAuth = true; args.headed = true; }
  }
  return args;
}

async function startLocalServer(webDir, port = 8765) {
  const proc = spawn('python', ['-m', 'http.server', String(port), '--bind', '127.0.0.1', '-d', webDir], {
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });

  const url = `http://127.0.0.1:${port}/`;
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return { url, stop: () => proc.kill() };
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  proc.kill();
  throw new Error(`Failed to start local HTTP server for ${webDir}`);
}

async function enableFlutterSemantics(page) {
  for (let attempt = 0; attempt < 15; attempt++) {
    const enabled = await page.evaluate(() => {
      const placeholder = document.querySelector('flt-semantics-placeholder');
      if (placeholder) {
        placeholder.click();
        return true;
      }
      return document.querySelectorAll('flt-semantics').length > 0;
    });
    if (enabled) {
      await page.waitForTimeout(800);
      const count = await page.locator('flt-semantics').count();
      if (count > 0) return true;
    }
    await page.waitForTimeout(500);
  }
  return false;
}

async function getSemanticsTexts(page) {
  return page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('flt-semantics, [aria-label]'));
    const texts = [];
    for (const el of nodes) {
      const aria = el.getAttribute('aria-label');
      const txt = el.textContent?.trim();
      if (aria) texts.push(aria);
      else if (txt) texts.push(txt);
    }
    return [...new Set(texts)];
  });
}

function isWebProGateLanding(texts) {
  const joined = texts.join('\n');
  return (
    joined.includes('Get Pro on Android') ||
    joined.includes('Android版でProを購入') ||
    joined.includes('No active Pro entitlement was found') ||
    joined.includes('このアカウントのPro権利を確認できませんでした')
  );
}

async function clickSemanticsByText(page, patterns) {
  for (const pat of patterns) {
    const loc = page.locator(`[aria-label*="${pat}"], flt-semantics:has-text("${pat}")`).first();
    if (await loc.count()) {
      await loc.click({ timeout: 3000 });
      await page.waitForTimeout(700);
      return true;
    }
  }
  return false;
}

async function dismissStartupDialogs(page) {
  await clickSemanticsByText(page, ['OK', '閉じる', 'Close']);
}

async function captureLocale(browserOrContextFactory, url, { dir, locale }, args) {
  const outDir = path.join(OUTPUT_BASE, dir);
  await fs.mkdir(outDir, { recursive: true });

  const { context, close } = await browserOrContextFactory(locale);
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('pageerror', (err) => consoleErrors.push(String(err)));

  const results = { captured: [], skipped: [] };

  try {
    console.log(`\n=== [${locale}] Opening ${url} ===`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
    await page.waitForSelector('flutter-view, flt-glass-pane, canvas', { timeout: 30000 });
    await page.waitForTimeout(3000);

    await enableFlutterSemantics(page);
    let texts = await getSemanticsTexts(page);
    console.log(`[${locale}] Initial semantics labels (${texts.length}):`, texts.slice(0, 10));

    if (args.waitForAuth && isWebProGateLanding(texts)) {
      console.log(`[${locale}] WebProGate detected. Waiting up to 120s for manual Google Sign-In...`);
      const deadline = Date.now() + 120000;
      while (Date.now() < deadline) {
        await page.waitForTimeout(2000);
        await enableFlutterSemantics(page);
        texts = await getSemanticsTexts(page);
        if (!isWebProGateLanding(texts) && texts.length > 0) break;
      }
    }

    if (isWebProGateLanding(texts)) {
      const reason = 'WebProGate (lib/presentation/web/web_pro_gate.dart) requires Google Sign-In with an active Pro entitlement in Firestore; unauthenticated Web sessions only display _WebLandingPage.';
      console.log(`[${locale}] BLOCKED: ${reason}`);
      for (const file of TARGET_FILES) {
        results.skipped.push({ file, reason });
      }
      return results;
    }

    await dismissStartupDialogs(page);

    // 01_home.png
    await page.screenshot({ path: path.join(outDir, '01_home.png') });
    results.captured.push('01_home.png');

    // Remaining screens require MainShellPage interactions; attempt each up to 3 times.
    const steps = [
      { file: '02_point_entry.png', action: async () => clickSemanticsByText(page, ['点入力', 'Point Entry', '入力', 'Add']) },
      { file: '03_multiple_points.png', action: async () => false },
      { file: '04_save_dialog.png', action: async () => clickSemanticsByText(page, ['保存', 'Save']) },
      { file: '05_slots_list.png', action: async () => clickSemanticsByText(page, ['保存一覧', 'Saved', '一覧']) },
      { file: '06_compare.png', action: async () => clickSemanticsByText(page, ['比較', 'Compare']) },
      { file: '07_settings_units.png', action: async () => clickSemanticsByText(page, ['設定', 'Settings']) },
      { file: '08_low_temp_chart.png', action: async () => clickSemanticsByText(page, ['低温', 'Low Temperature']) },
      { file: '09_ahu_config.png', action: async () => clickSemanticsByText(page, ['シミュレーション', 'Simulation']) },
      { file: '10_ahu_chart.png', action: async () => false },
      { file: '11_weather_fetch.png', action: async () => clickSemanticsByText(page, ['気象', 'Weather']) },
      { file: '12_annual_simulation.png', action: async () => clickSemanticsByText(page, ['年間', 'Annual']) },
    ];

    for (const step of steps) {
      let ok = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          if (await step.action()) {
            await page.screenshot({ path: path.join(outDir, step.file) });
            results.captured.push(step.file);
            ok = true;
            break;
          }
        } catch {
          // retry
        }
      }
      if (!ok) {
        results.skipped.push({ file: step.file, reason: 'Target UI control not reached within 3 attempts' });
      }
    }

    if (consoleErrors.length) {
      console.log(`[${locale}] Page errors:`, consoleErrors);
    }
    return results;
  } finally {
    await close();
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let server = null;
  const targetUrl = args.url ?? (server = await startLocalServer(args.webDir)).url;

  const summary = {};
  try {
    for (const loc of LOCALES) {
      const factory = async (locale) => {
        if (args.profileDir) {
          const userDataDir = path.join(path.resolve(args.profileDir), loc.dir);
          const context = await chromium.launchPersistentContext(userDataDir, {
            channel: 'msedge',
            headless: !args.headed,
            locale,
            viewport: { width: 412, height: 915 },
            deviceScaleFactor: 2,
          });
          return { context, close: () => context.close() };
        }
        const browser = await chromium.launch({
          channel: 'msedge',
          headless: !args.headed,
        });
        const context = await browser.newContext({
          locale,
          viewport: { width: 412, height: 915 },
          deviceScaleFactor: 2,
        });
        return {
          context,
          close: async () => {
            await context.close();
            await browser.close();
          },
        };
      };

      summary[loc.dir] = await captureLocale(factory, targetUrl, loc, args);
    }
    console.log('\n=== SUMMARY ===');
    console.log(JSON.stringify(summary, null, 2));
  } finally {
    if (server) server.stop();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
