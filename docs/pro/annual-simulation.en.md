# Annual HVAC Simulation (8,760 Hours)

**HVAC Simulation** is a Pro feature that fetches **a full year of real hourly weather data (8,760 hours, or 8,784 in leap years)** for any location worldwide, simulates hourly air mixing and coil processing, and aggregates annual and monthly energy consumption.

Open it from **Menu** → **HVAC Simulation** (or tap the **Simulation** tab in the top bar).

---

## Step 1: Choose a Location & Fetch Weather Data

On the **Location** screen, choose one of three methods:

1. **Use Current Location** (GPS)  
   Reads your GPS coordinates and borrows the IANA time zone of the nearest bundled city (a warning appears if the nearest city is over 100 km away).
2. **Search city**  
   Search the bundled GeoNames city database. **Search using the city's Romanized (English) name** (e.g., `Tokyo`, `London`, `Chicago`).
3. **Enter coordinates manually**  
   Toggle the switch to enter **Latitude** and **Longitude** directly (time zone defaults to UTC).

Next, choose the **Year** (from `2001` up to the current year) and tap **Fetch Weather Data**.  
Hourly temperature and relative humidity data are downloaded from NASA POWER's public dataset. Once complete, tap **View Plot** to open the simulation workspace.

![Weather data fetch](../assets/images/en/11_weather_fetch.png)

!!! info "Cache & Saved Projects"
    - **Cached Locations**: Up to 20 location-year datasets are cached locally (LRU). Tap any cached entry to reopen it, or tap the trash icon to delete it.
    - **Saved Projects**: Tap the folder icon at the top right of the Location screen to load previously saved simulation projects (including filters, setpoints, and AHU settings).

---

## Step 2: Filter & Explore the Annual Scatter Plot

Open **Filter** from **Menu** (or the floating buttons at the bottom right) to inspect the 8,760 hourly outdoor points:

- **Color By**: Switch between **By Month** (12 monthly colors) and **By Setpoint** (setpoint colors plus gray **Non-operating**).
- **Filter Criteria**:
  - **Months**: Toggle individual months (Jan–Dec).
  - **Hours**: Slide the 0–23 hour-of-day range.
  - **Value Ranges**: Add min/max constraints on any psychrometric property.
- The panel displays **`{count} / {total} hours`** matching your active filters in real time.

![Annual simulation results](../assets/images/en/12_annual_simulation.png)

---

## Step 3: Define Setpoints

Open **Setpoints** and tap **Add** to create one or more indoor target conditions:

- Configure **Name**, color, and **Target** (any two valid properties).
- **Tolerance**: Optionally set `±` tolerances on any property. The tolerance zone is drawn on the chart; hours whose mixed air already falls inside the zone are counted under **No Processing Needed Hours**. (If tolerances conflict into an empty zone, a warning icon appears.)
- **Apply Conditions**: Optionally restrict when the setpoint applies (e.g., by outdoor temperature/humidity range).
- **Priority**: Drag setpoints to reorder them. Each hour evaluates setpoints from top to bottom and applies the first match; hours matching none are counted as **Non-operating Hours**.

---

## Step 4: Enter AHU Specs & Run the Simulation

Open **AHU Spec / Results** and enter your equipment specifications:

### AHU Specification & Energy Conversion Factors
| Setting | Details / Default |
| --- | --- |
| **Airflow** | Required (`m³/h` in Metric, `CFM` in Imperial) |
| **Outdoor Air Ratio** | `0%`–`100%` slider (mixes outdoor air with return air assumed at the setpoint target) |
| **Heating Source** | **Steam** / **Gas** / **Electric** |
| **Humidifier** | **Steam** / **Evaporative** / **None** |
| **Cooling COP** | Default `3.0` |
| **Energy Conversion Factors** | Steam Enthalpy `2100 kJ/kg`, Boiler Efficiency `0.85`, Gas HHV `45 MJ/m³`, Burner Efficiency `0.90`, Electric Heater Efficiency `1.0` |

Tap **Calculate** to run the full-year calculation and automatically scroll to the results:

- **Annual Totals**: **Cooling Electricity** (`kWh` / `kBtu`) & **Cooling Hours**, **Heating** & **Heating Hours**, **Reheat**, **Humidify**, **Dehumidify**, **Non-operating Hours**, and **No Processing Needed Hours**.
- **Peak Load**: **Peak Cooling** (`kW` / `RT`) and **Peak Heating** (`kW` / `Btu/h`).
- **Monthly Breakdown**: Month-by-month energy and hour totals.
- **By Setpoint**: **Applied Hours** and energy totals per setpoint.

### Save & Export CSV
- **Save Project**: Save the complete setup (location, filters, setpoints, AHU specs) for later reload.
- **Export CSV**: Exports all hourly records across **28 columns** (date/time, 7 outdoor properties, 5 mixed air properties, setpoint name, status token, loads, moisture amounts, Apparatus Dew Point, Bypass Factor, warning, and primary energy outputs) via **Share** or **Save to Device** *(Web version supports Save to Device only)*.
