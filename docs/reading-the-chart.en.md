# Reading the Chart

A psychrometric chart shows the relationship between air temperature and moisture (water vapor) in a single graph.  
Once any **two** independent air properties are fixed (at standard atmospheric pressure, 1013.25 hPa), the point on the chart and all other properties are uniquely determined.

## The Two Main Axes

### 1. Dry-Bulb Temperature — Horizontal Axis
- **App label**: **Temperature** (`°C` or `°F`)
- The air temperature measured by a standard thermometer.
- Moving **right** means hotter; moving **left** means colder. Constant-temperature lines are vertical.

### 2. Humidity Ratio (Absolute Humidity) — Vertical Axis
- **App label**: **Humidity Ratio** (`kg/kg(DA)` or `gr/lb(DA)`)
- The mass of water vapor contained per unit mass of dry air (`DA`).
- As long as no moisture is added or removed, this value does not change even when temperature changes.
- Moving **up** means more moisture; moving **down** means drier air. Constant-humidity-ratio lines are horizontal.

!!! note "What does `(DA)` mean?"
    `DA` stands for **Dry Air**. Because air volume expands and contracts with temperature, HVAC calculations use dry air mass (`1 kg` or `1 lb` of dry air) as a stable reference.

---

## Curved & Diagonal Lines

### 3. Relative Humidity
- **App label**: **Relative Humidity** (`%`)
- The ratio of the current water vapor to the maximum amount the air can hold at that temperature.
- Shown as upward-curving lines; the topmost left boundary is **100% (saturation curve)**.
- Heating air at constant moisture moves right and lowers RH; cooling moves left and raises RH.

### 4. Dew Point Temperature
- **App label**: **Dew Point** (`°C` or `°F`)
- The temperature at which condensation begins if the air is cooled without changing its moisture content.
- On the chart, follow a **horizontal line to the left** from your point until it hits the 100% saturation curve.
- Because dew point and humidity ratio both represent the same vapor pressure, they cannot be paired together as the sole two inputs in the app—combine either one with another property.

### 5. Specific Enthalpy
- **App label**: **Enthalpy** (`kJ/kg` or `Btu/lb`)
- Total heat energy of moist air per unit mass of dry air (sensible heat of dry air plus latent and sensible heat of water vapor; SI uses 0°C datum, while Imperial/US uses the ASHRAE 0°F dry-air datum).
- Shown as **diagonal lines sloping down from top-left to bottom-right**.
- To estimate cooling or heating load, multiply the **enthalpy difference (Δh)** by the air mass flow rate.

---

## Additional Properties Supported in the App

You can also toggle and inspect the following lines via **Menu** → **Chart Lines** and **Compare**:

### 6. Wet-Bulb Temperature
- **App label**: **Wet Bulb Temperature** (`°C` or `°F`)
- The adiabatic saturation temperature measured with a wetted wick thermometer.
- Shown as diagonal lines slightly different in slope from enthalpy lines; useful for evaporative cooling and air washers.

### 7. Specific Volume
- **App label**: **Specific Volume** (`m³/kg(DA)` or `ft³/lb(DA)`)
- Volume occupied per unit mass of dry air (reciprocal of density).
- Shown as steeper diagonal lines; used to relate volumetric airflow (`m³/h` or `CFM`) to mass flow rate.

## Quick Guide to Process Directions

| Process | Direction on Chart | Property Changes |
| --- | --- | --- |
| Sensible heating | Straight right (horizontal) | Temperature ↑, RH ↓, Humidity Ratio constant |
| Sensible cooling (no condensation) | Straight left (horizontal) | Temperature ↓, RH ↑, Humidity Ratio constant |
| Cooling & dehumidification | Left to saturation curve, then down-left along 100% RH | Temperature ↓, Humidity Ratio ↓, Enthalpy ↓ |
| Steam humidification | Nearly straight up (slight right tilt) | Humidity Ratio ↑, Temperature nearly constant |
| Evaporative / air washer | Up-left along constant enthalpy line | Humidity Ratio ↑, Temperature ↓, Enthalpy nearly constant |
