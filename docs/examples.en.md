# Practical Examples

Here are two common HVAC workflows demonstrating step-by-step app usage and exact SI calculation results (at standard atmospheric pressure, 1013.25 hPa).

---

## Example 1: Summer Cooling & Dehumidification + Load Estimate

**Conditions**:
- Outdoor Air (**Point A**): **35°C**, **60% RH**
- Target Supply / Room (**Point B**): **26°C**, **50% RH**
- Airflow Rate: **100 m³/min** (`6,000 m³/h`)

### Steps in the App
1. Tap the chart → **New**, enter **Temperature `35`** and **Relative Humidity `60`** for Point A (e.g., `OA`).
2. Tap **Add Next Point**, enter **Temperature `26`** and **Relative Humidity `50`** for Point B (e.g., `Target`).
3. Open **Menu** → **Compare**.
4. Tap the **gear icon** (**Display Settings**), check pair **`A - B`** under **Between Points**, and tap **OK**.
5. Tap the **bolt icon** (**Unit Conversion**), check **Take airflow into account**, enter **`100`** for **Airflow Rate (m³/min)**, and tap **OK**.

### Reading the Results
| Property | Point A (OA) | Point B (Target) | Difference (B − A) |
| --- | --- | --- | --- |
| Temperature | 35.0 °C | 26.0 °C | **-9.0 °C** |
| Relative Humidity | 60.0 % | 50.0 % | -10.0 % |
| Dew Point | 26.1 °C | 14.8 °C | -11.3 °C |
| Humidity Ratio | 0.0214 kg/kg(DA) | 0.0105 kg/kg(DA) | **-0.0109 kg/kg(DA)** |
| Enthalpy | 90.2 kJ/kg | 52.9 kJ/kg | **-37.3 kJ/kg** |

With **Unit Conversion** enabled (`100 m³/min`, standard air density `1.2 kg/m³`):

- **Moisture Amount (Dehumidification)**: `-0.0109 × 100 × 60 × 1.2 ≈` **-78.72 kg/h**
- **Cooling Load (Power)**: `-37.3 × 100 × 1.2 ÷ 60 ≈` **-74.57 kW** (or **-64,134 kcal/h** when switched to **Heat Quantity**)

!!! tip "Engineering Insight"
    Because Point B has a lower humidity ratio than Point A, the cooling coil surface (Apparatus Dew Point) must be below **14.8°C** (Point B's dew point) to condense out the required moisture.

---

## Example 2: Winter Heating + Humidification (Using `Extended Feature`)

**Conditions**:
- Outdoor Air (**Point A**): **5°C**, **40% RH**
- Step 1: Sensible heating to **22°C** without humidification (**Point B**)
- Step 2: Humidified target at **22°C**, **50% RH** (**Point C**)
- Airflow Rate: **50 m³/min** (`3,000 m³/h`)

### Steps in the App
1. Plot **Point A** at **Temperature `5`** and **Relative Humidity `40`** (`Winter OA`).
2. Tap **Add Next Point**, then tap **Extended Feature** at the top of the panel.
3. Choose **Humidity Ratio** as the constant property and **Point A** as the reference point. A horizontal red dashed line appears on the chart.
4. Enter **`22`** for **Temperature**, tap **OK**, and save **Point B** (`Heated`).
5. Tap **Add Next Point** → **Free Input**, and enter **Temperature `22`** and **Relative Humidity `50`** for **Point C** (`Target`).
6. Open **Menu** → **Compare**, enable pairs `A - B` and `A - C`, and set airflow `50 m³/min` via the bolt icon.

### Reading the Results
| Property | A (Winter OA) | B (Heated to 22°C) | C (22°C, 50% RH) |
| --- | --- | --- | --- |
| Temperature | 5.0 °C | 22.0 °C | 22.0 °C |
| Relative Humidity | 40.0 % | **13.2 %** | 50.0 % |
| Humidity Ratio | 0.0022 kg/kg(DA) | 0.0022 kg/kg(DA) | 0.0082 kg/kg(DA) |
| Enthalpy | 10.4 kJ/kg | 27.6 kJ/kg | 43.0 kJ/kg |

- **Heating without humidifying (A → B)**: Relative humidity plunges from 40% to **13.2%**, showing why winter heating causes severe dryness.
- **Total heating + humidifying (A → C at 50 m³/min)**:
  - **Moisture Amount needed**: `+0.0061 × 50 × 60 × 1.2 ≈` **+21.87 kg/h**
  - **Total thermal load**: `+32.6 × 50 × 1.2 ÷ 60 ≈` **+32.61 kW** (**+28,047 kcal/h**)

---

## Need Deeper Equipment or Annual Analysis?

- Model Preheater, Steam Humidifier, Washer, Cooling Coil, and Reheater stages together in [AHU Process Design](pro/ahu-design.md).
- Estimate annual energy from 8,760 hours of real local weather data in [Annual HVAC Simulation](pro/annual-simulation.md).
