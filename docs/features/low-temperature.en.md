# Low-Temperature Chart

When working with cold-climate conditions, refrigeration, or sub-zero winter outdoor air, plotted points get squeezed against the bottom-left edge of a standard chart (-10 to 55°C).  
In this app, even free users can switch to the **Low Temperature (-60 to 20°C)** chart range.

![Low-temperature chart](../assets/images/en/08_low_temp_chart.png)

## 1. How to Switch Chart Range

1. Open **Menu** → **Chart Range** (also available inside AHU Simulation and HVAC Simulation menus).
2. Choose **Standard (-10 to 55°C)** or **Low Temperature (-60 to 20°C)** and tap **OK**.

Your selection is saved automatically for future sessions.

## 2. Standard vs. Low-Temperature Chart

| Feature | Standard (-10 to 55°C) | Low Temperature (-60 to 20°C) |
| --- | --- | --- |
| Dry-bulb axis | `-10` to `55°C` | `-60` to `20°C` |
| Humidity ratio axis | Linear (`0` to `0.03295 kg/kg(DA)`) | **Logarithmic** (`0.000005` to `0.005 kg/kg(DA)`) |
| Saturation curve below 0°C | Over liquid water | **Over ice** vapor-pressure formula |
| Enthalpy isolines | Positive range | Includes negative values (`-60, -40, -20, 0, 20 kJ/kg`) |
| Relative humidity lines | Standard steps | **1% increments** below 10% RH |

### Why a Logarithmic Humidity Axis?
At sub-zero temperatures, humidity ratio becomes extremely small (around `0.00008 kg/kg(DA)` at -40°C saturated). On a linear scale, all points collapse onto the bottom line. The logarithmic scale spreads out low-humidity values so you can read sub-zero states clearly.

## 3. Out-of-Range Points Notice

If some plotted points fall outside the currently selected range (for example, a 30°C / 60% RH point when viewing -60 to 20°C, whose humidity upper bound is `0.005 kg/kg(DA)`), those points are hidden from drawing and a notice badge appears at the top right: **"{count} point(s) outside chart range"**. Switch back to **Standard (-10 to 55°C)** to see them again.
