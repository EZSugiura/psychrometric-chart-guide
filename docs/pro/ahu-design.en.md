# AHU Process Design (AHU Simulation)

**AHU Simulation** (screen title: **AHU Configuration**) is a Pro feature that simulates air passing sequentially through five air-handling stages from a single starting condition and plots every stage live on the psychrometric chart.

Open it from **Menu** → **AHU Simulation** *(this is a single-condition process design tool, independent from the 8,760-hour Annual HVAC Simulation).*

![AHU configuration](../assets/images/en/09_ahu_config.png)

## 1. Drag the Start Point Live

Tap or drag the large **Start Point** marker (default: `20°C`, `50% RH`) anywhere on the psychrometric chart.  
Every enabled stage exit and the final state recalculate immediately as you move your finger or mouse.

![AHU process chart](../assets/images/en/10_ahu_chart.png)

## 2. Equipment Chain (5 Stages & Individual ON/OFF)

Use the checkboxes on the top chips in the panel to enable or disable each unit (disabled units pass air straight through). Tap a chip to edit its parameters:

1. **Preheater** (Red marker)
   - Sensible heating at constant humidity ratio before humidification.
   - **Heating Source**: Choose **Steam**, **Gas**, or **Electric**.
   - When **Steam** is selected, **Max Heating Capacity** (default `40 kJ/kg`) caps the enthalpy rise; Gas and Electric have no capacity cap.
2. **Steam Humidifier** (Yellow marker)
   - Injects steam when preheating alone does not reach the required enthalpy for the washer target.
   - **Steam Specific Enthalpy** (default `2706 kJ/kg`, approx. 200 kPa saturated steam) sets the process slope.
3. **Washer** (Light Blue marker)
   - Adiabatic humidification along constant specific enthalpy.
   - **Target Relative Humidity** (default `90%`) sets the maximum RH the washer can reach.
4. **Cooling Coil** (Dew Point: Purple marker / Exit: Blue marker)
   - Modeled as an ideal cooling coil with no capacity limit.
   - **When dehumidification is needed (2-step path)**: (1) sensible cooling at constant humidity ratio to 100% RH (**Dew Point**), then (2) cooling and dehumidification along the saturation curve to the target humidity ratio.
   - **When dehumidification is not needed**: If the air can already reach the setpoint tolerance zone via reheating alone, unnecessary dehumidification is skipped (sensible cooling only if warmer than the zone limit).
5. **Reheater** (Orange marker)
   - Sensible reheating at constant humidity ratio after the cooling coil.
   - **Heating Source**: **Steam**, **Gas**, or **Electric**.
   - When a setpoint tolerance is active, it heats only up to the minimum temperature required to enter the tolerance zone.

## 3. Setpoint (Target & Tolerance)

Tap the **Setpoint** chip in the panel to configure the target supply/room condition:

- **Target**: Enter target **Temperature** (default `24°C`) and **Relative Humidity** (default `50%`).
- **Tolerance**: Enable **Temperature** (`±`) and/or **Relative Humidity** (`±`) checkboxes.
  - A green tolerance box is drawn on the chart.
  - When a tolerance zone is defined, the dynamic target shifts along the zone's diagonal to match the **Start Point's enthalpy** as closely as possible.

## 4. Resulting State & Compare (`Change per Stage`)

At the bottom of the panel, **Resulting State** lists the **Start Point**, each stage exit (plus Cooling Coil Dew Point when dehumidifying), and **Target** with matching color swatches.

For full thermodynamic values and equipment deltas, open **Menu** → **Compare** (**Compare AHU Chain**):

- **Point Rows**: Shows Temperature, Relative Humidity, Dew Point, Humidity Ratio, Enthalpy, Wet Bulb Temperature, and Specific Volume for every point in the chain.
- **Change per Stage**: Lists the signed difference between each pair of adjacent points (ΔT, ΔW, Δh, etc.).
- **Unit Conversion (Bolt Icon)**: Check **Take airflow into account** and enter **Airflow Rate (m³/min)** to convert stage deltas directly into **Moisture Amount** (`kg/h`) and **Power** (`kW`) or **Heat Quantity** (`kcal/h`).

!!! note "Scope of AHU Compare"
    In AHU Simulation, **Compare** shows all stages and stage-by-stage changes within the active AHU chain. Comparing two separate saved AHU configurations side-by-side is not a built-in feature.
