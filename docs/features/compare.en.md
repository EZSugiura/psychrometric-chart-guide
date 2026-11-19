# Compare Points & Heat-Load Conversion

Open **Menu** → **Compare** to view all plotted points (A–I) in a floating table. Drag the top handle of the dialog to reposition it while keeping the psychrometric chart visible underneath.

![Compare dialog](../assets/images/en/06_compare.png)

## 1. Columns Shown in the Table

By default, every plotted point shows:

- **name**
- **Temperature** (`°C` / `°F`)
- **Relative Humidity** (`%`)
- **Dew Point** (`°C` / `°F`)
- **Humidity Ratio** (`kg/kg(DA)` / `gr/lb(DA)`)
- **Enthalpy** (`kJ/kg` / `Btu/lb`)
- **Wet Bulb Temperature** (`°C` / `°F`)
- **Specific Volume** (`m³/kg(DA)` / `ft³/lb(DA)`)

You can also drag the handle on the left of each row to **reorder points** directly in the table.

## 2. Display Settings (Gear Icon): Differences Between Points & Columns

Tap the **gear icon** (**Display Settings**) at the top right of the Compare dialog to customize:

- **Points**: Show or hide individual points (A–I) in the table without deleting them from the chart.
- **Between Points**: Select pairs of points (e.g., `A → B`) to append signed difference rows (`B − A`) below the point list.
- **Displayed Columns**: Check/uncheck properties to show, or drag to reorder table columns.

## 3. Unit Conversion (Bolt Icon): Moisture Flow & Power / Heat Quantity

Tap the **lightning bolt icon** (**Unit Conversion**) at the top right of the Compare dialog to convert humidity ratio and enthalpy into airflow-based engineering quantities:

1. Check **Take airflow into account**.
2. Enter **Airflow Rate (m³/min)** (e.g., `100`).
3. Choose the conversions to enable:
   - **Absolute Humidity → Moisture Amount**: Converts humidity ratio (and differences between points) to `kg/h`.
   - **Enthalpy**: Converts enthalpy (and enthalpy differences) to **Power** (`kW`) or **Heat Quantity** (`kcal/h`).

!!! note "Conversion Formulas (at 20°C Standard Air Density)"
    The app uses dry-air density **1.2 kg/m³** at 20°C (`1 kW = 860 kcal/h`):

    - **Moisture Amount [kg/h]** = Airflow [m³/min] × 60 × 1.2 × Humidity Ratio (or ΔW) [kg/kg(DA)]
    - **Power [kW]** = Airflow [m³/min] × 1.2 ÷ 60 × Enthalpy (or Δh) [kJ/kg]
    - **Heat Quantity [kcal/h]** = Power [kW] × 860

See [Practical Examples](../examples.md) for worked-out cooling and humidification cases.
