import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`## _CloudPulse: The Hidden Fragility of Global Internet Infrastructure_`
)}

function _2(md){return(
md`**_Team :_** Chart Attack

**_Members :_**
1. Harshitha Jonnagaddala (hj2737)
2. Meenakshi Madhu (mm14029)
3. William Zheng (wmz2007)

**_Notebook Link :_** [https://observablehq.com/d/c234e5b925ac43ec]`
)}

function _3(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _4(md){return(
md`**_When the World Goes Offline: Why This Story Matters_**

Every high-profile outage whether it’s Cloudflare’s global blackout, AWS’s DNS meltdown, or a submarine cable severed in the Red Sea - reveals a paradox at the core of modern life: we’ve built a world powered by a network so vast and sophisticated, yet so startlingly fragile. These aren’t mere glitches; they are shockwaves that ripple through economies, governments, and the everyday routines of billions.

When the internet falters, it doesn’t just break apps - it disrupts commerce, paralyzes communication, and exposes how profoundly dependent we’ve become on an infrastructure most people never see. Each failure is a moment when the invisible becomes painfully visible.

We tell this story because every outage is a diagnostic event - a sudden interruption that exposes the weak points in our technology, our planning, and our preparedness. CloudPulse exists to turn these disruptive moments into understanding: transforming chaotic, scattered signals into clarity, and helping us ask better questions about how the world stays online... and what happens when it doesn’t.`
)}

function _5(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _6(md){return(
md`# **_Introduction_**

### **_ 1. Problem Statement_**

The modern internet powers communication, finance, education, and governance, yet its reliability and points of failure remain largely invisible. When networks collapse - whether regionally or nationwide - they reveal structural weaknesses in infrastructure, power systems, and political environments. Each outage is a snapshot of a nation momentarily disconnected: a measurable event with a time, a place, and a cause.

CloudPulse investigates how and why these outages occur worldwide, identifying spatial, temporal, and causal patterns in internet disruptions. Using the Cloudflare Radar Outage Center dataset, we analyze the frequency, duration, causes, and geography of internet downtime to uncover the hidden dynamics that shape global connectivity and resilience.

### **_ 2. Background_**

Cloudflare operates a globally distributed network that observes real-time connectivity across thousands of Internet Service Providers (ISPs) and Autonomous Systems (ASNs). Its Cloudflare Radar Outage Center (CROC) detects and annotates outages by monitoring anomalies in HTTP/S traffic, DNS resolution, and network reachability. Each annotated event includes metadata on location, cause, scope, and timing, offering a rare window into how digital infrastructure breaks.
Internet reliability depends on multiple interconnected layers: submarine cables, routing systems, power grids, and cloud service providers. Failure in any one layer can cascade, producing widespread collapse. Yet these events are often fragmented, underreported, and difficult to contextualize. As global dependence on digital services rises - with cloud centralization, aging infrastructure, and climate-driven disasters - the frequency and impact of outages are also increasing.

CloudPulse builds a multidimensional visualization platform on top of this dataset, transforming millions of telemetry signals into interpretable insights about when, where, and why the world goes offline.

### **_ 3. Motivation_**

Understanding the fragility of global connectivity is both technically urgent and socially significant. Internet outages disrupt hospitals, commerce, critical services, and communication, yet public awareness of their causes and patterns remains limited. In some regions, outages are politically motivated, revealing the power dynamics that govern access to information. In others, breakdowns stem from natural disasters or infrastructure decay, reflecting the intersection of climate, development, and technology.

Visualizing outage patterns creates value in multiple ways:
- It exposes geographic and network-level inequalities in resilience.
- It clarifies how human and environmental factors influence connectivity.
- It reveals long-term trends in the frequency, severity, and causes of failures.
- It helps policymakers, researchers, and operators identify vulnerabilities and design better systems.

CloudPulse turns fragmented outage logs into a coherent narrative, mapping global hotspots, identifying dominant outage types, and tracking how disruptions spread and resolve. By doing so, we move beyond isolated incidents toward a holistic understanding of the world’s digital heartbeat: when it falters, why it fails, and what these disruptions reveal about our interconnected future.
`
)}

function _7(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _8(md){return(
md`# _**Data Description**_
### ** _1. Sources_**

The dataset for this project was obtained from the **Cloudflare Radar Outage Center**, accessed through the public Radar API endpoint. We queried the outages dataset for the most recent year of available data.

**API Endpoint Used:** https://api.cloudflare.com/client/v4/radar/annotations/outages

### **_ 2. Collection Methods_**

Data was retrieved using a direct API request with the following parameters:

\`\`\`json
{"limit": 500, "dateRange": "52w", "format": "CSV"}
\`\`\`

This allowed us to collect up to **500 outage events from the most recent 52 weeks**. The endpoint does not currently allow access to data beyond this range, which constrained our temporal scope to approximately one year of outage events.

The API returns annotated outage records that Cloudflare detects by monitoring anomalies in network traffic, DNS resolution, and reachability across its global infrastructure.

### **_3. Attributes Used_**

While the API provides a broad range of metadata, our analysis focuses on the key attributes that describe **where, when, and why** outages occur:

* **Location** – Country or region where the disruption occurred.
* **ASN** – The affected autonomous system or network provider.
* **Type** – Scale of disruption (national, sub-national, or network-level).
* **Scope** – Specific state, city, or network impacted when applicable.
* **Cause** – Likely reason for the outage (e.g., government shutdown, infrastructure failure, weather event, power outage).
* **Start Time** – Timestamp of the outage onset.
* **End Time** – Timestamp of recovery or restoration.

These attributes enable us to analyze outages spatially, temporally, and causally, and to derive secondary metrics such as duration, frequency, and severity.
`
)}

function _9(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _10(md){return(
md`### **_Question 1: Where does the internet falter the most? → World map visualization showing the spatial distribution of outages by country and frequency._**`
)}

function _11(md){return(
md`#### _**Description:**_
We have a choropleth map of the world, which allows us to show the spatial distribution of outages by country.
We have a color scale to indicate how many outages a country has. The more outages, the greener the country. The lower amount of outages, the darker purple the country is. Countries that are white have no data.

#### **_Analysis and Interpretation:_**
As we can see from the graph, Iraq has the most amount of outages which means that you can expect that Iraq to have faulty internet. 
Iran, Pakistan, and Libya, also have notable faulty internet.
The middle east typically sees the most amount of outages, while most democratic countries have low outages.
However, there are many countries with no outage data associated.
There are a few speculative reasons to why this could be the case.

1. One could be that the internet reliability is so good, that there are no outages.
2. The internet infrastructure is so poor or none existent that there are no websites to have outages of.
3. Countries that have no data, does not use Cloudflare as a provider.

#### **_Insight and Implications:_**
Many countries, demographics, and regions lack data. However, with the data we do have, Middle eastern countries have a notable experience with the most internet outages. Western countries, south eastern countries, and south American countries all have low outage rates. Internet outages seem to have less to do with country wealth.`
)}

function _question1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("question1.csv"),{from:{table:"question1"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _13(Legend,d3,question1){return(
Legend(d3.scaleSequential(
  [d3.min(question1.map((d) => d.log_count)), 
   d3.max(question1.map((d) => d.log_count))],
  d3.interpolateWarm), {
  title: "Log of Outages Count"
})
)}

function _graph1(d3,question1,create_tooltip,world)
{
  const width = 700
  const height = 500
  const margins = {top: 50, bottom : 50, left : 50, right : 50}
  
  const svg = d3.create('svg')
  .attr('width', width + margins.left + margins.right)
  .attr('height', height  + margins.top + margins.bottom)
  // .style('background-color', '#ccc')
  // svg.append('g')

  const chart = svg.append('g')
  .attr('width', width)
  .attr('height', height)
  .attr('transform', `translate(${margins.left}, ${margins.top})`)

  chart.append('text')
  .attr("transform", `translate(${width/2}, ${-margins.top/2})`)
  .style("text-anchor", "middle")
  .text('Vizualization 1: Countries vs Log of Outages Count'); 
  

  const iso3 = question1.map(d => d.ISO3)
  const outage_count = question1.map(d => d.outage_count)
  const log_count = question1.map(d => d.log_count)

  const mapper_count = new Map()
  question1.forEach(d => mapper_count.set(d.ISO3, +d.outage_count)) 
  
  const mapper_log = new Map()
  question1.forEach(d => mapper_log.set(d.ISO3, +d.log_count)) 

  const mapper_country = new Map()
  question1.forEach(d => mapper_country.set(d.ISO3, d.annotations_locations_details_name)) 

  const c_scale = d3.scaleSequential(d3.interpolateWarm)
  // .domain([d3.min(outage_count), d3.max(outage_count)])
  .domain([d3.min(log_count), d3.max(log_count)])

  const projection = d3.geoNaturalEarth1()
  .scale(130)
  .translate([width / 2, height / 2])

  // Tool Tip interactivity, from Lab 7
// NEW: Create the tooltip with a width of 100 and a height of 40
  const tooltip = create_tooltip(chart, 130, 55);

  // NEW: Create 3 events to handle mouse events wiht our chart.
  // Mouse Over Handler
  const onmouseover = (event, d) => {
    const [x, y] = d3.pointer(event);     // Get mouse position
    if (mapper_country.get(d.id)) {
      tooltip.select('text#field1')        // Modify the tooltip text representing max temp
      .text(`Country: ${mapper_country.get(d.id)}`);
    }
    else {
      tooltip.select('text#field1')        // Modify the tooltip text representing max temp
      .text(`ISO3: ${d.id}`);
    }
    
    tooltip.select('text#field2')     // Modify the tooltip text representing weather
      .text(`Outages: ${mapper_count.get(d.id) || 'No Data'}`);
    tooltip.select('text#field3')     // Modify the tooltip text representing weather
      .text(`Log Outages: ${mapper_log.get(d.id) || 'No Data'}`);
    
    // Modify the Position, make visible
    tooltip
      .raise()                                        // Make this SVG element above all circles
      .attr('transform', `translate(${x},${y-40})`)   // Move it to match the mouse position
      .style('visibility','visible');                 // Make it visible
  }

  // Mouse Move Handler
  const onmousemove = (event, d) => {
    const [x, y] = d3.pointer(event);                       // Get mouse position
    tooltip.attr('transform', `translate(${x},${y-40})`);   // Modify the Position, make visible
  }

  // Mouse Leave Handler
  const onmouseleave = (event, d) => {
    tooltip.style('visibility','hidden');     // Make invisible
  }
  
  chart.append("g")
    .selectAll("path")
    .data(world.features)
    .enter()
      .append("path")
        .attr("d", d3.geoPath().projection(projection))
        .attr("fill", 
              function (d) {
                let p = mapper_log.get(d.id);
                return c_scale(p) || "#fff"
              }
        )
        .style("stroke", "#000")
        .on('mouseover', onmouseover)
        .on('mousemove', onmousemove)
        .on('mouseleave', onmouseleave);

  
  return svg.node();
}


function _create_tooltip(){return(
function create_tooltip(parent, width, height) {

  // Generates the tooltip within the provided parent
  const tooltip = parent.append("g")
    .style("pointer-events", "none")  // Makes sure default pointer events don't interfere
    .style("visibility", "hidden")    // We make it invisible for now.

  // Background rectangle
  tooltip.append("rect")
    .attr('x',0)              // define its x, y, width, and height. Its reference point is the top-left.
    .attr('y',0)
    .attr('width',width)
    .attr('height',height)
    .attr("fill", "black")    // Define the black background for it
    .attr("rx", 6)            // Round the corners to make it visually appealing
    .attr("ry", 6)
    .attr("opacity", 0.8);    // Make the background just a tad transparent.

  // Create two text elements in the tooltip, with unique IDs to distinguish them from one another
  // First, the text representing max temperature
  tooltip.append("text")
    .attr('id','field1')   // The unique identifier
    .attr("fill", "white")  // Text is white
    .attr("font-size", 12)  // font-size is 12px
    .attr("x", 5)           // Set its position relative to the tooltip
    .attr("y", 15)
    .text('Temp Text');   // For now, make the entry a blank one in text
  
  // Secondly, the text representing the weather type.
  tooltip.append("text")
    .attr('id','field2')
    .attr("fill", "white")
    .attr("font-size", 12)
    .attr("x", 5)
    .attr("y", 30)
    .text('Temp Text');

    tooltip.append("text")
    .attr('id','field3')
    .attr("fill", "white")
    .attr("font-size", 12)
    .attr("x", 5)
    .attr("y", 45)
    .text('Temp Text');

  // Return the tooltip.
  return tooltip;
}
)}

function _16(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _17(md){return(
md`### **_Question 2: What types of outages (national, regional, or network-level) dominate different regions? → Stacked bar chart comparing the scope and magnitude of disruptions._**`
)}

function _18(md){return(
md`#### **_Description:_**
We have a stacked bar chart, showing for each country, the distribution of different scales of outages, as well as the total outages. We have created 3 sub graphs, each containing countries with as least one of the outage types.

#### **_Analysis and Interpretation:_**
For Iraq, outages are frequently nationwide and regional. No outages on a network level. 
For most countries, outages are mainly of one scale type. For example, Syria is only has outages on a national scale, and Libya only has outages on a network scale.
The majority of countries have little to no outages, and they are of a single type.
One thing of note, is that western, democratic, and rich countries do not have nationwide outages, and typically only have network outages.
Regional outages are comparatively rare, even among countries with regional outages, except for Iraq.

#### _**Insight and Implications:**_
The biggest question raised when looking at this graph is, what is happening in Iraq?
An initial guess would be that the Iraq government artificially induces a nationwide internet outage to suppress and control the spread of information to events. While this still may be the case, a cursory search reveal other reasons.
According to sources online and Freedom House, the official reason given to why there are so many outages, is to prevent cheating during school examinations: https://freedomhouse.org/country/iraq/freedom-net/2024

The effectiveness is disputed, and the price for these internet shutdowns are costly. 

Other notable countries with nationwide outages are Syria and Iran.
Iran had shut down its internet in response to escalating conflict between it and Israel, which matches with our initial understanding. 
https://www.nbcnews.com/tech/internet/iran-plunged-internet-blackout-deepening-conflict-rcna213544`
)}

function _question2(__query,FileAttachment,invalidation){return(
__query(FileAttachment("question2@3.csv"),{from:{table:"question2"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _20(question2,Legend,d3,unique)
{
  const scope = question2.map(d => d.annotations_outage_outage_type)
  return Legend(d3.scaleOrdinal(
    unique(scope),
    d3.schemeSet1), {
    title: "Outage Scope Type"
  })
}


function _graph2(d3,question2,unique,country_scope,factory_q2)
{
  // annotations_locations_details_name, annotations_outage_outage_type, outage_count
  const width = 500
  const height = 1000
  const margins = {top: 30, bottom : 30, left : 130, right : 130}

  const subplot_width = 300
  const subplot_height = height / 3;
  
  // const subplot_height = 100;
  
  const svg = d3.create('svg')
  .attr('width', width + margins.left + margins.right)
  .attr('height', height  + margins.top + margins.bottom)
  // .style('background-color', '#ccc')
  // svg.append('g')

  const chart = svg.append('g')
  .attr('width', width)
  .attr('height', height)
  .attr('transform', `translate(${margins.left}, ${margins.top})`)

  chart.append('text')
  .attr("transform", `translate(${width/2 + margins.left}, ${margins.top/2})`)
  .style("text-anchor", "middle")
  .text('Vizualization 2: Countries vs Outages Scope Type'); 

  chart.append('text')
  .attr("transform", `translate(${width/2 + margins.left}, ${height + margins.top})`)
  .style("text-anchor", "middle")
  .text('Total Number of Outages'); 

  chart.append('text')
  .attr("transform", "rotate(-90)")
  .attr("y", margins.left/ -2)
  .attr("x", 0 - (height / 2))
  .style("text-anchor", "middle")
  .text('Countries'); 

  // const iso3 = question2.map(d => d.ISO3)
  const outage_count = question2.map(d => d.outage_count)
  const country_name = question2.map(d => d.annotations_locations_details_name)
  const scope = question2.map(d => d.annotations_outage_outage_type)



  const x_scale = d3.scaleLinear() //d3.min(outage_count)
    .domain([0, d3.max(outage_count) * 1.6])
    .range([0, width])
  
  // const x_ticks = chart.append('g')
  //   .attr('transform', `translate(0 ${height})`)
  //   .call(d3.axisBottom(x_scale));

  const order = d3.scaleOrdinal()
  .domain(unique(scope))
  .range([0, unique(scope).length])

  const c_scale = d3.scaleOrdinal(d3.schemeSet1)
    .domain(unique(scope));

  let running_space = margins.top
  country_scope.forEach((value, key, map) => {
    const country_width = 12
    let adjusted_height = value.length * country_width
    
    let x_pos = margins.left;
    let y_pos = running_space
    
    running_space += adjusted_height + 30
        
    factory_q2(chart, value, x_scale, c_scale, country_width, subplot_width, adjusted_height, x_pos, y_pos)  
   }
  )

  return svg.node();
}


function _factory_q2(d3,unique){return(
function factory_q2(parent, data_array, x_scale, c_scale, country_width, width, height, x_pos, y_pos) {
  const countries = data_array.map(d => d.country)

  // Create our `g` chart
  const chart = parent.append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', `translate(${x_pos}, ${y_pos})`)

  // Calculate our y-scale
  const y_scale = d3.scaleBand()
    .domain(unique(countries))
    .range([0, height]);
  
  const y_ticks = chart.append('g')
    .call(d3.axisLeft(y_scale));
  
  // Append our axes to it
  const x_ticks = chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x_scale))

  const groups = chart.selectAll('rect')
    .data(data_array)
    .enter()
    .append("g")

  groups.append('rect')
      .attr("x", function (d) {
        const place = d.country
        // const NATIONWIDE = d.NATIONWIDE
        // const NETWORK = d.NETWORK
        // const REGIONAL = d.REGIONAL
        return 0
      })
      .attr("width", d => x_scale(d.NATIONWIDE))  
      .attr("y", (d) => y_scale(d.country))
      .attr("height", y_scale.bandwidth())
      .style("fill", (d) => c_scale("NATIONWIDE"))

  groups.append('rect')
      .attr("x", function (d) {
        const place = d.country
        const NATIONWIDE = d.NATIONWIDE
        // const NETWORK = d.NETWORK
        // const REGIONAL = d.REGIONAL
        return x_scale(NATIONWIDE)
      })
      .attr("width", d => x_scale(d.NETWORK))  
      .attr("y", (d) => y_scale(d.country))
      .attr("height", y_scale.bandwidth())
      .style("fill", (d) => c_scale("NETWORK"))

  groups.append('rect')
      .attr("x", function (d) {
        const place = d.country
        const NATIONWIDE = d.NATIONWIDE
        const NETWORK = d.NETWORK
        // const REGIONAL = d.REGIONAL
        return x_scale(NATIONWIDE) + x_scale(NETWORK)
      })
      .attr("width", d => x_scale(d.REGIONAL))  
      .attr("y", (d) => y_scale(d.country))
      .attr("height", y_scale.bandwidth())
      .style("fill", (d) => c_scale("REGIONAL"))
}
)}

function _country_scope(question2)
{
  // annotations_locations_details_name annotations_outage_outage_type
  const mapper1 = new Map()
  question2.forEach(
    d => mapper1.set(d.annotations_locations_details_name, 
                     {
                       // ISO3: d.ISO3, 
                       // filter: '',
                       country: d.annotations_locations_details_name, 
                       NATIONWIDE: 0, NETWORK: 0, REGIONAL:0})
  )
  question2.forEach(
    d => mapper1.get(d.annotations_locations_details_name)[d.annotations_outage_outage_type] = d.outage_count
  )
  
  const array1 = new Array()
  mapper1.forEach(d => array1.push(d))
  
  // return array1
  // return array1.filter(d=>d.NATIONWIDE > 0)
  // Seperate Data of Outage Type
  const mapper2 = new Map()
  mapper2.set("NATIONWIDE", array1.filter(d=>d.NATIONWIDE > 0))
  // mapper2.get("NATIONWIDE").forEach( d => d.filter = "NATIONWIDE")
  
  mapper2.set("NETWORK", array1.filter(d=>d.NETWORK > 0))
  // mapper2.get("NETWORK").forEach( d => d.filter = "NETWORK")
  
  mapper2.set("REGIONAL", array1.filter(d=>d.REGIONAL > 0))
  // mapper2.get("REGIONAL").forEach( d => d.filter = "REGIONAL")
  
  return mapper2
}


function _24(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _25(md){return(
md`### **_Question 3: When do outages occur most frequently? Are there observable temporal or seasonal patterns? → Interactive timeline showing monthly/weekly density of outages worldwide._**`
)}

function _26(md){return(
md`#### **_Description:_**
The line chart plots the number of outages against the months of the year. Additionally, the seasons (generally taken for the Northern Hemisphere) are also marked in the background of the chart with the areas of each season color-coded appropriately. The tooltip provides the exact number of outages that happened in each month.

#### **_Answer to the question:_**
Outages seem to occur most frequently around May-Jun (summer) and drop during October-April (fall, winter, spring). There is a sharp spike in outages just before the start of summer.


#### **_Insight and Implications:_**
While the chart visually overlays Northern Hemisphere seasons, the underlying data is global. Hence, interpreting true “seasonal effects” must be done cautiously. Seasons differ dramatically across hemispheres (summer in Europe is winter in Australia), and many equatorial regions experience wet/dry cycles instead of four seasons. Therefore, the seasonal shading in the chart is just a visual guide, not a literal representation of global climatic seasons.<br>

That said, the temporal pattern itself is still meaningful. The timeline shows a clear surge in outages around May–June, followed by another smaller rise in September. These peaks likely reflect global behavioral and operational patterns rather than seasons. For example:

1. Infrastructure strain and maintenance cycles often increase mid-year, when many network operators schedule upgrades or repairs.
2. Political events and instability frequently cluster around mid-year or late-year periods in many countries, contributing to the spikes.
3. Extreme weather events, though seasonally opposite across hemispheres, tend to cluster globally in certain months—tropical cyclone seasons in both hemispheres overlap around the May–June and September–October windows.
4. Holiday periods in some regions (end of year) correspond to dips in outages, possibly due to reduced administrative or political activity.

Thus, although the color-coded seasons are not globally representative, the chart still reveals that outages have distinct temporal patterns, with mid-year being the most outage-dense period worldwide. The pattern suggests a combination of environmental, political, and operational factors shaping the global outage landscape, rather than any single season-driven effect.`
)}

function _raw_outages(FileAttachment){return(
FileAttachment("cloudflare_outages.csv").csv({typed:true})
)}

function _cloudflare_outages(__query,FileAttachment,invalidation){return(
__query(FileAttachment("cloudflare_outages_processed.csv"),{from:{table:"cloudflare_outages_processed"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _outages(FileAttachment){return(
FileAttachment("cloudflare_outages_processed.csv").csv({typed:true})
)}

function _processedData(outages){return(
outages.map(d => {
  const startDate = new Date(d.start_date);
  const monthNum = startDate.getMonth() + 1;
  
  // Calculate season based on month
  let season;
  if (monthNum === 12 || monthNum === 1 || monthNum === 2) {
    season = 'Winter';
  } else if (monthNum >= 3 && monthNum <= 5) {
    season = 'Spring';
  } else if (monthNum >= 6 && monthNum <= 8) {
    season = 'Summer';
  } else if (monthNum >= 9 && monthNum <= 11) {
    season = 'Fall';
  }
  
  return {
    ...d,
    start_date_parsed: startDate,
    month_num: monthNum,
    year: startDate.getFullYear(),
    season: season 
  };
})
)}

function _monthlyData(d3,processedData)
{
  const grouped = d3.rollup(
    processedData,
    v => v.length,
    d => d.month_num
  );
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const result = [];
  for (let i = 1; i <= 12; i++) {
    result.push({
      month: i,
      month_name: monthNames[i - 1],
      count: grouped.get(i) || 0
    });
  }
  
  return result;
}


function _seasonalData(d3,processedData)
{
  const grouped = d3.rollup(
    processedData.filter(d => d.season),
    v => v.length,
    d => d.season
  );
  
  const seasonOrder = ['Winter', 'Spring', 'Summer', 'Fall'];
  return Array.from(grouped, ([season, count]) => ({
    season,
    count,
    order: seasonOrder.indexOf(season)
  })).sort((a, b) => a.order - b.order);
}


function _weekdayData(d3,processedData)
{
  const grouped = d3.rollup(
    processedData,
    v => v.length,
    d => d.day_of_week
  );
  
  const weekdayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return Array.from(grouped, ([day, count]) => ({
    day_of_week: day,
    count,
    day_order: weekdayOrder.indexOf(day)
  })).sort((a, b) => a.day_order - b.day_order);
}


function _peakStats(monthlyData,seasonalData,weekdayData)
{
  const peakMonth = monthlyData.reduce((max, d) => d.count > max.count ? d : max);
  const peakSeason = seasonalData[0];  // Already sorted by count
  const peakWeekday = weekdayData.reduce((max, d) => d.count > max.count ? d : max);
  
  return {
    peakMonth: {name: peakMonth.month_name, count: peakMonth.count},
    peakSeason: {name: peakSeason.season, count: peakSeason.count},
    peakWeekday: {name: peakWeekday.day_of_week, count: peakWeekday.count}
  };
}


function _monthlyTimeline(d3,monthlyData)
{
  const width = 900;
  const height = 400;
  const margin = {top: 50, right: 30, bottom: 70, left: 70};
  
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");
  
  // Scales
  const x = d3.scaleLinear()
    .domain([1, 12])
    .range([margin.left, width - margin.right]);
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(monthlyData, d => d.count)])
    .nice()
    .range([height - margin.bottom, margin.top]);
  
  // Seasonal background colors
  const seasons = [
    {name: 'Winter', start: 0.5, end: 2.5, color: '#e0f2fe'},
    {name: 'Spring', start: 2.5, end: 5.5, color: '#d1fae5'},
    {name: 'Summer', start: 5.5, end: 8.5, color: '#fed7aa'},
    {name: 'Fall', start: 8.5, end: 11.5, color: '#fee2e2'},
    {name: 'Winter', start: 11.5, end: 12.5, color: '#e0f2fe'}
  ];

// Add seasonal backgrounds
  svg.selectAll('.season-bg')
    .data(seasons)
    .join('rect')
    .attr('class', 'season-bg')
    .attr('x', d => x(d.start))
    .attr('y', margin.top)
    .attr('width', d => x(d.end) - x(d.start))
    .attr('height', height - margin.top - margin.bottom)
    .attr('fill', d => d.color)
    .attr('opacity', 0.4);
  
  // Add season labels
  const seasonLabels = [
    {name: 'Winter', x: 1.5},
    {name: 'Spring', x: 4},
    {name: 'Summer', x: 7},
    {name: 'Fall', x: 10},
  ];
  
  svg.selectAll('.season-label')
    .data(seasonLabels)
    .join('text')
    .attr('class', 'season-label')
    .attr('x', d => x(d.x))
    .attr('y', margin.top - 5)
    .attr('text-anchor', 'middle')
    .attr('font-size', '11px')
    .attr('fill', '#6b7280')
    .attr('font-style', 'italic')
    .text(d => d.name);

  // Grid lines
  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)
      .tickSize(-height + margin.top + margin.bottom)
      .tickFormat('')
      .ticks(12))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-dasharray', '2,2'));
  
  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y)
      .tickSize(-width + margin.left + margin.right)
      .tickFormat(''))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-dasharray', '2,2'));
  
  // Line generator
  const line = d3.line()
    .x(d => x(d.month))
    .y(d => y(d.count))
    .curve(d3.curveMonotoneX);

  // Draw line
  svg.append('path')
    .datum(monthlyData)
    .attr('fill', 'none')
    .attr('stroke', '#2563eb')
    .attr('stroke-width', 3)
    .attr('d', line);
  
  // Season color mapping for markers
  const seasonColors = {
    1: '#3b82f6', 2: '#3b82f6',
    3: '#10b981', 4: '#10b981', 5: '#10b981',
    6: '#f59e0b', 7: '#f59e0b', 8: '#f59e0b',
    9: '#ef4444', 10: '#ef4444', 11: '#ef4444',
    12: '#3b82f6'
  };

  // Add markers
  const markers = svg.selectAll('.marker')
    .data(monthlyData)
    .join('circle')
    .attr('class', 'marker')
    .attr('cx', d => x(d.month))
    .attr('cy', d => y(d.count))
    .attr('r', 6)
    .attr('fill', d => seasonColors[d.month])
    .attr('stroke', '#1e3a8a')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer');
  
  // Tooltip
  const tooltip = svg.append('g')
    .attr('class', 'tooltip')
    .style('display', 'none');
  
  tooltip.append('rect')
    .attr('width', 120)
    .attr('height', 50)
    .attr('fill', 'white')
    .attr('stroke', '#2563eb')
    .attr('stroke-width', 2)
    .attr('rx', 5);

  tooltip.append('text')
    .attr('class', 'tooltip-month')
    .attr('x', 60)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .attr('font-size', '13px');
  
  tooltip.append('text')
    .attr('class', 'tooltip-count')
    .attr('x', 60)
    .attr('y', 38)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px');

  // Hover interactions
  markers
    .on('mouseover', function(event, d) {
      d3.select(this)
        .transition()
        .duration(150)
        .attr('r', 9);
      
      tooltip.style('display', null);
      tooltip.select('.tooltip-month').text(d.month_name);
      tooltip.select('.tooltip-count').text(`${d.count} outages`);
      
      const xPos = x(d.month);
      const yPos = y(d.count);
      
      let tooltipX = xPos - 60;
      let tooltipY = yPos - 70;
      
      if (tooltipX < margin.left) tooltipX = margin.left;
      if (tooltipX + 120 > width - margin.right) tooltipX = width - margin.right - 120;
      if (tooltipY < margin.top) tooltipY = yPos + 20;

        tooltip.attr('transform', `translate(${tooltipX},${tooltipY})`);
    })
    .on('mouseout', function() {
      d3.select(this)
        .transition()
        .duration(150)
        .attr('r', 6);
      
      tooltip.style('display', 'none');
    });
  
  // Axes
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)
      .tickValues(d3.range(1, 13))
      .tickFormat(d => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d-1]))
    .call(g => g.selectAll('.tick text')
      .attr('font-size', '11px'));
  
  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(6));

  // Axis labels
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height - 15)
    .attr('text-anchor', 'middle')
    .attr('font-size', '13px')
    .attr('fill', '#374151')
    .text('Month of Year');
  
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .attr('font-size', '13px')
    .attr('fill', '#374151')
    .text('Number of Outages');
  
  // Title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 25)
    .attr('text-anchor', 'middle')
    .attr('font-size', '18px')
    .attr('font-weight', 'bold')
    .attr('fill', '#1f2937')
    .text('Monthly Outage Frequency Timeline');
  
  return svg.node();
}


function _36(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _37(md){return(
md`### **_Question 4: What kinds of breakdowns cripple the web - political, natural, or infrastructural? → Donut and sunburst chart classifying outages by cause (policy, weather, infrastructure, power)._**`
)}

function _38(md){return(
md`#### **_Description:_**
The Donut chart color codes the sections based on what caused the outage. The size of each section is directly proportional to the frequency of outages that occurred due to that cause. The total number of outages is also indicated in the middle of the donut chart.<br>

The sunburst chart provides a hierarchical view of the outage cause and the outage type (regional, nationwide and network). The inner arcs represent the primary cause, and the outer arcs represent the outage types under each cause.

#### **_Answer to the question:_**
47.2% of the outages (83 out of 176) are government-directed. Power outages, the next largest section, only account for 15.9% of outages. Fire, weather, and natural disasters also only account for less than 10% of outages globally. It seems that most outages or breakdowns of the web are possibly politically motivated. <br>

In the sunburst chart, it is observed that for the most frequently occurring causes of Government-directed and Power outages, most of the outages have been "Nationwide".<br>
Whereas for technical or infrastructural causes like "Cable Cut", "Technical Problem" and "Cyberattack", most of the outages are of "Network" type. This is an expected result.<br>

#### **_Insight and Implications:_**
The charts highlight two fundamentally different types of risks to global internet stability: intentional political shutdowns and unintentional infrastructure failures.<br>
Government-directed outages dominate by frequency and are overwhelmingly "Nationwide", indicating that when governments restrict access, it tends to be at scale. This suggests that internet connectivity can be a tool of political control, especially during protests, national crises or even elections. The societal and economic consequences of these large-scale shutdowns are severe, affecting entire populations simultaneously. <br>

By contrast, outages due to cable cut, cyberattacks, and technical problems tend to be network-level disruptions. These are smaller in geographic scope but still impactful. These are typically operational failures, reflecting the fragile nature of physical infrastructure and the complexity of maintaining larger networks. <br>

Power outages, while mostly unintentional, also skew toward "Nationwide" impact. This implies how tightly internet availability is tied to energy stability in many regions.`
)}

function _causeData(outages){return(
outages.map(d => ({
  ...d,
  outage_cause: d.cause || 'Unknown',
  outage_type: d.outage_type || 'Unspecified'
}))
)}

function _causeDistribution(d3,causeData)
{
  const grouped = d3.rollup(
    causeData,
    v => v.length,
    d => d.outage_cause
  );
  
  const total = causeData.length;
  
  return Array.from(grouped, ([cause, count]) => ({
    cause_category: cause,
    outage_count: count,
    percentage: ((count / total) * 100).toFixed(1)
  })).sort((a, b) => b.outage_count - a.outage_count);
}


function _typeDistribution(d3,causeData)
{
  const grouped = d3.rollup(
    causeData,
    v => v.length,
    d => d.outage_type
  );
  
  const total = causeData.length;
  
  return Array.from(grouped, ([type, count]) => ({
    outage_type: type,
    count: count,
    percentage: ((count / total) * 100).toFixed(1)
  })).sort((a, b) => b.count - a.count);
}


function _hierarchicalData(d3,causeData)
{
  const grouped = d3.rollup(
    causeData,
    v => v.length,
    d => d.outage_cause,
    d => d.outage_type
  );
  
  const children = [];
  
  for (const [cause, types] of grouped) {
    const causeChildren = [];
    for (const [type, count] of types) {
      causeChildren.push({
        name: type,
        value: count,
        cause: cause
      });
    }
    children.push({
      name: cause,
      children: causeChildren
    });
  }
  
  return {
    name: "Outages",
    children: children
  };
}


function _causeStats(causeDistribution,typeDistribution,causeData)
{
  const topCauses = causeDistribution.slice(0, 3);
  const dominantType = typeDistribution[0];
  
  return {
    topCause: topCauses[0],
    secondCause: topCauses[1],
    thirdCause: topCauses[2],
    dominantType: dominantType,
    totalOutages: causeData.length,
    uniqueCauses: causeDistribution.length
  };
}


function _donutChart(d3,causeDistribution,causeData)
{
  const margin = {top: 90, right: 190, bottom: 80, left: 0};
  const width = 900;
  const height = 700;
  const radius = Math.min(width, height) / 2.5;
  const innerRadius = radius * 0.5;
  
  const chart_width = width - margin.left - margin.right;
  const chart_height = height - margin.top - margin.bottom;
  
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    // .attr("style", "max-width: 100%; height: auto;")
    .attr("style", "max-width: 100%; height: auto; background:#f9fafb;")
    ;

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left + chart_width/2},${margin.top + chart_height/2})`)
    ;

  // Color scale
  let donutColors = d3.schemePaired;
  const colorScale = d3.scaleOrdinal()
    .domain(causeDistribution.map(d => d.cause_category))
    .range(donutColors);
  
  // Pie generator
  const pie = d3.pie()
    .value(d => d.outage_count)
    .sort(null);
  
  // Arc generator
  const arc = d3.arc()
    .innerRadius(innerRadius + 10)
    .outerRadius(radius - 10);
  
  const arcHover = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);
  
  // Create slices
  const slices = g.selectAll('.slice')
    .data(pie(causeDistribution))
    .join('g')
    .attr('class', 'slice');
  
  // Add paths
  const paths = slices.append('path')
    .attr('d', arc)
    .attr('fill', d => colorScale(d.data.cause_category))
    .attr('stroke', 'white')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .style('opacity', 0.9);
  
  // Center text
  const centerText = g.append('g')
    .attr('class', 'center-text');
  
  centerText.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '-0.5em')
    .style('font-size', '16px')
    .style('font-weight', 'bold')
    .style('fill', '#333')
    .text('Total');
  
  centerText.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '1em')
    .style('font-size', '22px')
    .style('font-weight', 'bold')
    .style('fill', '#2563eb')
    .text(causeData.length);
  
  centerText.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '2.5em')
    .style('font-size', '14px')
    .style('fill', '#666')
    .text('Outages');
  
  // Tooltip
  const tooltip = g.append('g')
    .attr('class', 'tooltip')
    .style('display', 'none')
    .style("pointer-events", "none");
  
  tooltip.append('rect')
    .attr('width', 180)
    .attr('height', 70)
    .attr('fill', 'white')
    .attr('stroke', '#2563eb')
    .attr('stroke-width', 2)
    .attr('rx', 5);
  
  tooltip.append('text')
    .attr('class', 'tooltip-cause')
    .attr('x', 90)
    .attr('y', 25)
    .attr('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .attr('font-size', '13px');
  
  tooltip.append('text')
    .attr('class', 'tooltip-count')
    .attr('x', 90)
    .attr('y', 45)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px');
  
  tooltip.append('text')
    .attr('class', 'tooltip-percent')
    .attr('x', 90)
    .attr('y', 60)
    .attr('text-anchor', 'middle')
    .attr('font-size', '11px')
    .attr('fill', '#666');
  
  // Hover interactions
  paths
    .on('mouseover', function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('d', arcHover)
        .style('opacity', 1);
      
      tooltip.style('display', null);
      tooltip.select('.tooltip-cause').text(d.data.cause_category);
      tooltip.select('.tooltip-count').text(`${d.data.outage_count} outages`);
      tooltip.select('.tooltip-percent').text(`${d.data.percentage}% of total`);
      
      // Position tooltip
      const [x, y] = arc.centroid(d);
      tooltip.attr('transform', `translate(${x - 90},${y - 100})`);
    })
    .on('mouseout', function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('d', arc)
        .style('opacity', 0.9);
      
      tooltip.style('display', 'none');
    });

  // Legend
  const legend = svg.append("g")
    .attr('transform', `translate(${width - margin.right-20},${margin.top})`)
    .attr("class", "legend");

  legend.selectAll("legend-item")
    .data(causeDistribution)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0, ${i * 22})`)
    .each(function(d) {
      const g = d3.select(this);
  
      g.append("rect")
        .attr("width", 14)
        .attr("height", 14)
        .attr("fill", colorScale(d.cause_category))
        .attr("stroke", "#000000");
  
      g.append("text")
        .attr("x", 20)
        .attr("y", 11)
        .style("font-size", "11px")
        .style("font-weight", "600")
        .text(d.cause_category);
  
      g.append("text")
        .attr("x", 190)
        .attr("y", 11)
        .style("font-size", "11px")
        .style("fill", "#000000")
        .attr("text-anchor", "end")
        .text(`${d.percentage}%`);
    });

  
  // Title
  svg.append('text')
    .attr('x', margin.left + chart_width / 2)
    .attr('y', 30)
    .attr('text-anchor', 'middle')
    .attr('font-size', '20px')
    .attr('font-weight', 'bold')
    .attr('fill', '#1f2937')
    .text('Internet Outage Cause Classification');
  
  return svg.node();
}


function _sunburstChart(d3,hierarchicalData)
{
  const margin = { top: 90, right: 220, bottom: 70, left: 0 };
  const width = 1100;
  const height = 900;
  const radius = Math.min(width - margin.right, height) / 2.8;

  const chart_width = width - margin.left - margin.right;
  const chart_height = height - margin.top - margin.bottom;

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; background:#f9fafb;");

  // Main chart group (centered)
  const g = svg.append("g")
    .attr("transform",
      `translate(${margin.left + chart_width / 2},
                  ${margin.top + chart_height / 2})`
    );

  // --- DATA HIERARCHY ---
  const root = d3.hierarchy(hierarchicalData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

  const partition = d3.partition()
      .size([2 * Math.PI, radius]);

  partition(root);

  // COLORS
  const donutColors = d3.schemePaired;
  const colorScale = d3.scaleOrdinal()
    .domain(root.children.map(d => d.data.name))
    .range(donutColors);

  const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1 - 1);

  // --- DRAW SLICES ---
  const slices = g.selectAll('path')
    .data(root.descendants().filter(d => d.depth > 0))
    .join('path')
    .attr('d', arc)
    .attr('fill', d => {
      if (d.depth === 1) return colorScale(d.data.name);
      const parent = colorScale(d.parent.data.name);
      return d3.color(parent).brighter(0.5);
    })
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5)
    .style('cursor', 'pointer')
    .style('opacity', 0.9);

  // --- CENTER TEXT ---
  const centerText = g.append('g');

  const resetCenter = () => {
    centerText.selectAll("*").remove();
    centerText.append("text")
      .attr("text-anchor","middle")
      .attr("dy","-0.5em")
      .style("font-size","16px")
      .style("font-weight","bold")
      .text("Hover to");
    centerText.append("text")
      .attr("text-anchor","middle")
      .attr("dy","1em")
      .style("font-size","16px")
      .style("font-weight","bold")
      .text("explore");
  }
  resetCenter();

  // --- TOOLTIP ---
  const tooltip = g.append("g")
    .attr("class","tooltip")
    .style("display","none")
    .style("pointer-events", "none");

  const t_width = 190;
  const t_height = 80;
  tooltip.append("rect")
    .attr("width",t_width)
    .attr("height",t_height)
    .attr("fill","white")
    .attr("stroke","#666")
    .attr("stroke-width",2)
    .attr("rx",5);

  const t = tooltip.append("text")
    .attr("x",t_width/2)
    .attr("text-anchor","middle");

  t.append("tspan").attr("class","tooltip-name")
    .attr("x",t_width/2).attr("y",25)
    .attr("font-size","12px")
    .attr("font-weight","bold");

  t.append("tspan").attr("class","tooltip-parent")
    .attr("x",t_width/2).attr("y",45)
    .attr("font-size","11px")
    .attr("fill","#666");

  t.append("tspan").attr("class","tooltip-value")
    .attr("x",t_width/2).attr("y",62)
    .attr("font-size","11px");

  // --- INTERACTION ---
  const arcHover = d3.arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
  .padRadius(radius / 2)
  .innerRadius(d => d.y0 - 10)     // pull inward 5px
  .outerRadius(d => d.y1 + 3);    // expand outward 8px


  slices.on("mouseover", (event, d) => {
    d3.select(event.currentTarget)
      .transition().duration(200)
      .attr("d", arcHover(d))
      // .style("opacity", 1)
      // .attr('stroke', '#303030')
      // .attr('stroke-width', 1.5)
    ;

    tooltip.style("display", null);
    tooltip.select(".tooltip-name").text(d.data.name);
    tooltip.select(".tooltip-parent").text(
      d.depth === 1 ? "Primary Cause" : `Cause: ${d.parent.data.name}`
    );
    tooltip.select(".tooltip-value").text(`${d.value} outages`);

    // const angle = (d.x0 + d.x1) / 2;
    // const r = (d.y0 + d.y1) / 2;
    // const x = Math.cos(angle - Math.PI / 2) * r;
    // const y = Math.sin(angle - Math.PI / 2) * r;
    // tooltip.attr("transform", `translate(${x - 80},${y - 40})`);

    // const [mouseX, mouseY] = d3.pointer(event, g.node());
    // // Offset from cursor
    // const offsetX = 10;   // horizontal shift from mouse
    // const offsetY = 10;  // vertical shift below mouse
    // tooltip.attr("transform", `translate(${mouseX + offsetX}, ${mouseY + offsetY})`);
    
    // --- Calculate tooltip position OUTSIDE the arc ---
    const angle = (d.x0 + d.x1) / 2;
    
    // push tooltip *outside* the outer radius by 40px
    const tooltipRadius = radius + 40;
    
    // cartesian coordinates
    const x = Math.cos(angle - Math.PI / 2) * tooltipRadius;
    const y = Math.sin(angle - Math.PI / 2) * tooltipRadius;
    
    // center the tooltip box
    tooltip.attr("transform", `translate(${x - 80}, ${y - 40})`);

    centerText.selectAll("*").remove();
    centerText.append("text")
      .attr("text-anchor","middle")
      .style("font-size","24px")
      .style("font-weight","bold")
      .style("fill","#2563eb")
      .text(d.value);
    centerText.append("text")
      .attr("text-anchor","middle")
      .attr("dy","1.5em")
      .style("font-size","12px")
      .style("fill","#666")
      .text("outages");
  });

  // restore on mouse out
  slices.on("mouseout", (event, d) => {
    d3.select(event.currentTarget)
      .transition().duration(200)
      .attr("d", arc(d))
      // .style("opacity",0.9)
      // .attr('stroke', 'white')
      // .attr('stroke-width', 1.5)
      ;

    tooltip.style("display", "none");
    resetCenter();
  });

  // --- LEGEND (right side) ---
  const causeList = root.children.map(d => ({
    name: d.data.name,
    value: d.value
  }));

  const total = d3.sum(causeList, d => d.value);

  const legend = svg.append("g")
    .attr("transform",`translate(${width - margin.right - 10},${margin.top})`
    );
  
  // legend title
  legend.append("text")
  .text("OUTAGE CAUSES")
  .attr("font-size", 13)
  .attr("font-weight", "bold")
  .attr("y", -10);

  legend.selectAll("legend-item")
    .data(causeList)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0, ${i * 24})`)
    .each(function(d) {
      const row = d3.select(this);

      row.append("rect")
        .attr("width", 14)
        .attr("height", 14)
        .attr("fill", colorScale(d.name))
        .attr("stroke", "#000");

      row.append("text")
        .attr("x", 20)
        .attr("y", 11)
        .style("font-size","11px")
        .style("font-weight","600")
        .text(d.name);

      row.append("text")
        .attr("x", 190)
        .attr("y", 11)
        .style("font-size","11px")
        .attr("text-anchor","end")
        .text(`${((d.value / total) * 100).toFixed(1)}%`);
    });

  // --- TITLE ---
  svg.append("text")
    .attr("x", margin.left + chart_width / 2)
    .attr("y", 40)
    .attr("text-anchor","middle")
    .style("font-size","20px")
    .style("font-weight","bold")
    .style("fill","#1f2937")
    .text("Hierarchical View: Cause → Outage Type");

  return svg.node();
}


function _46(causeStats,htl){return(
htl.html`<div style="margin: 30px 0; padding: 20px; background: #f9fafb; border-radius: 8px;">
  <h3 style="margin-top: 0;">Key Classifications</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background: #e5e7eb;">
        <th style="padding: 10px; text-align: left; border: 1px solid #d1d5db;">Classification</th>
        <th style="padding: 10px; text-align: left; border: 1px solid #d1d5db;">Category</th>
        <th style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">Count</th>
        <th style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">Percentage</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 10px; border: 1px solid #d1d5db;">Top Cause</td>
        <td style="padding: 10px; border: 1px solid #d1d5db;">${causeStats.topCause.cause_category}</td>
        <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">${causeStats.topCause.outage_count}</td>
        <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">${causeStats.topCause.percentage}%</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #d1d5db;">Second Cause</td>
        <td style="padding: 10px; border: 1px solid #d1d5db;">${causeStats.secondCause.cause_category}</td>
        <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">${causeStats.secondCause.outage_count}</td>
        <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">${causeStats.secondCause.percentage}%</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #d1d5db;">Third Cause</td>
        <td style="padding: 10px; border: 1px solid #d1d5db;">${causeStats.thirdCause.cause_category}</td>
        <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">${causeStats.thirdCause.outage_count}</td>
        <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">${causeStats.thirdCause.percentage}%</td>
      </tr>
      <tr style="background: #f3f4f6;">
        <td style="padding: 10px; border: 1px solid #d1d5db;">Dominant Type</td>
        <td style="padding: 10px; border: 1px solid #d1d5db;">${causeStats.dominantType.outage_type}</td>
        <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">${causeStats.dominantType.count}</td>
        <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">${causeStats.dominantType.percentage}%</td>
      </tr>
    </tbody>
  </table>
</div>`
)}

function _47(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _48(md){return(
md`### **_Question 5: How long do outages typically last, and do they tell a deeper story about their cause? → Bar chart showing duration vs. cause_**.`
)}

function _49(md){return(
md`#### **_Description:_**
We have a bar chart, which plots the cause of outage against the Average Duration (Hours).
The causes of outages are sorted in descending order of Average Duration (Hours).
The bars have been color-coded in order of Average Duration (Hours) as well, with warmer shades indicating longer duration outage causes and cooler shades for the shorter duration causes.

#### **_Answer to the question:_**
There is a wide range in how long outages typically last, depending on what caused the outage.
For example, Weather causes the longest-lasting outages, lasting 916 hours on average. And power outages cause, on average, 18 hours of loss to the internet. Though the frequency of government-directed outages is much larger, their average duration tends to be only 6.5 hours. 

#### _**Insight and Implications:**_
The distribution of the outage duration reveals that not all outage causes have the same policy impact. <br>
Long-duration events like Weather-related outages (with an average of 916 hours) can signal extreme vulnerabilities in physical infrastructure. Especially in regions lacking resilient power grids, disaster-proof cabling, or even rapid restoration capabilities. It could also be due to poor management or a lack of adequate disaster-relief funds. These types of outages often reflect structural issues rather than isolated incidents, and may require better climate-resilient planning by the governments.<br>
On the other hand, Power-related outages, with average durations around 18 hours, suggest more transient disruptions that are typically easier to resolve by deploying backup systems.<br>
Interestingly, although Government-directed outages occur most frequently globally, their shorter average duration (6.5 hours) indicates that these events are probably controlled. They can tend to be implemented with specific objectives in mind (for example: maintaining security, curbing misinformation etc) rather than resulting from system failures. The shorter duration reduces long-term operational risk but can still create significant social and economic disruptions due to their frequent and unpredictable nature.<br>
The least frequent category, Military Action, includes only one recorded outage in the dataset, but it lasted 277 hours. This event occurred in Ukraine between late November and early December 2024, corresponding to a period of intensified conflict during the Russo-Ukrainian war (https://en.wikipedia.org/wiki/Timeline_of_the_Russo-Ukrainian_war_(1_August_%E2%80%93_31_December_2024)). This shows that while rare, conflict-related outages can produce long and severe disruptions due to damage to critical infrastructure.`
)}

function _durationData(outages){return(
outages
  .filter(d => d.duration != null && d.duration >= 0)
  .map(d => ({
    ...d,
    cause: d.cause || 'Unknown',
    duration_hours: +d.duration
  }))
)}

function _durationByCause(d3,durationData)
{
  const grouped = d3.rollup(
    durationData,
    v => ({
      outage_count: v.length,
      avg_duration: d3.mean(v, d => d.duration_hours),
      median_duration: d3.median(v, d => d.duration_hours),
      min_duration: d3.min(v, d => d.duration_hours),
      max_duration: d3.max(v, d => d.duration_hours),
      std_duration: d3.deviation(v, d => d.duration_hours)
    }),
    d => d.cause
  );
  
  return Array.from(grouped, ([cause, stats]) => ({
    cause,
    ...stats
  })).sort((a, b) => b.avg_duration - a.avg_duration);
}


function _durationCategories(durationData,d3)
{
  const categorize = (hours) => {
    if (hours < 1) return 'Short (<1h)';
    if (hours < 6) return 'Brief (1-6h)';
    if (hours < 24) return 'Medium (6-24h)';
    if (hours < 168) return 'Long (1-7 days)';
    return 'Extended (>7 days)';
  };
  
  const categorized = durationData.map(d => ({
    ...d,
    category: categorize(d.duration_hours)
  }));
  
  const grouped = d3.rollup(
    categorized,
    v => v.length,
    d => d.category
  );
  
  const total = durationData.length;
  const order = ['Short (<1h)', 'Brief (1-6h)', 'Medium (6-24h)', 'Long (1-7 days)', 'Extended (>7 days)'];
  
  return order.map(cat => ({
    duration_category: cat,
    count: grouped.get(cat) || 0,
    percentage: (((grouped.get(cat) || 0) / total) * 100).toFixed(1)
  })).filter(d => d.count > 0);
}


function _durationStats(durationByCause,d3,durationData)
{
  const longestCause = durationByCause[0];
  const shortestCause = durationByCause[durationByCause.length - 1];
  const mostFrequent = [...durationByCause].sort((a, b) => b.outage_count - a.outage_count)[0];
  const overallMedian = d3.median(durationData, d => d.duration_hours);
  
  return {
    longestCause,
    shortestCause,
    mostFrequent,
    overallMedian
  };
}


function _durationBarChart(d3,durationByCause)
{
  const width = 900;
  const height = 500;
  const margin = {top: 50, right: 30, bottom: 120, left: 80};
  
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");
  
  // Scales
  const x = d3.scaleBand()
    .domain(durationByCause.map(d => d.cause))
    .range([margin.left, width - margin.right])
    .padding(0.2);
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(durationByCause, d => d.avg_duration)])
    .nice()
    .range([height - margin.bottom, margin.top]);
  
  // Color scale
  const colorScale = d3.scaleSequential()
    .domain([0, durationByCause.length - 1])
    .interpolator(d3.interpolateRdYlBu);
  
  // Grid lines
  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y)
      .tickSize(-width + margin.left + margin.right)
      .tickFormat(''))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-dasharray', '2,2'));
  
  // Bars
  const bars = svg.selectAll('.bar')
    .data(durationByCause)
    .join('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.cause))
    .attr('y', d => y(d.avg_duration))
    .attr('width', x.bandwidth())
    .attr('height', d => y(0) - y(d.avg_duration))
    .attr('fill', (d, i) => colorScale(i))
    .attr('opacity', 0.85)
    .style('cursor', 'pointer');
  
  // Value labels on bars
  svg.selectAll('.bar-label')
    .data(durationByCause)
    .join('text')
    .attr('class', 'bar-label')
    .attr('x', d => x(d.cause) + x.bandwidth() / 2)
    .attr('y', d => y(d.avg_duration) - 8)
    .attr('text-anchor', 'middle')
    .attr('font-size', '11px')
    .attr('font-weight', 'bold')
    .attr('fill', '#1f2937')
    .text(d => `${d.avg_duration.toFixed(1)}h`);
  
  // Tooltip
  const tooltip = svg.append('g')
    .attr('class', 'tooltip')
    .style('display', 'none')
    .style("pointer-events", "none");
  
  tooltip.append('rect')
    .attr('width', 220)
    .attr('height', 120)
    .attr('fill', 'white')
    .attr('stroke', '#2563eb')
    .attr('stroke-width', 2)
    .attr('rx', 5);
  
  const tooltipText = tooltip.append('text')
    .attr('x', 110)
    .attr('text-anchor', 'middle');
  
  tooltipText.append('tspan')
    .attr('class', 'tooltip-cause')
    .attr('x', 110)
    .attr('y', 20)
    .attr('font-weight', 'bold')
    .attr('font-size', '13px');
  
  tooltipText.append('tspan')
    .attr('class', 'tooltip-avg')
    .attr('x', 110)
    .attr('y', 40)
    .attr('font-size', '11px');
  
  tooltipText.append('tspan')
    .attr('class', 'tooltip-median')
    .attr('x', 110)
    .attr('y', 58)
    .attr('font-size', '11px');
  
  tooltipText.append('tspan')
    .attr('class', 'tooltip-range')
    .attr('x', 110)
    .attr('y', 76)
    .attr('font-size', '11px')
    .attr('fill', '#666');
  
  tooltipText.append('tspan')
    .attr('class', 'tooltip-count')
    .attr('x', 110)
    .attr('y', 94)
    .attr('font-size', '11px')
    .attr('fill', '#666');
  
  // Hover interactions
  bars
    .on('mouseover', function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity', 1);
      
      tooltip.style('display', null);
      tooltip.select('.tooltip-cause').text(d.cause);
      tooltip.select('.tooltip-avg').text(`Avg: ${d.avg_duration.toFixed(1)} hours`);
      tooltip.select('.tooltip-median').text(`Median: ${d.median_duration.toFixed(1)} hours`);
      tooltip.select('.tooltip-range').text(`Range: ${d.min_duration.toFixed(1)} - ${d.max_duration.toFixed(1)}h`);
      tooltip.select('.tooltip-count').text(`Count: ${d.outage_count} outages`);
      
      const xPos = x(d.cause) + x.bandwidth() / 2;
      const yPos = y(d.avg_duration);
      
      let tooltipX = xPos - 110;
      let tooltipY = yPos - 140;
      
      if (tooltipX < margin.left) tooltipX = margin.left;
      if (tooltipX + 220 > width - margin.right) tooltipX = width - margin.right - 220;
      if (tooltipY < margin.top) tooltipY = yPos + 20;
      
      tooltip.attr('transform', `translate(${tooltipX},${tooltipY})`);
    })
    .on('mouseout', function() {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity', 0.85);
      
      tooltip.style('display', 'none');
    });
  
  // X axis
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'rotate(-45) translate(-10, 5)')
    .style('text-anchor', 'end')
    .attr('font-size', '10px')
    .each(function(d) {
      const text = d3.select(this);
      const words = d.split('_');
      text.text('');
      words.forEach((word, i) => {
        text.append('tspan')
          .attr('x', 0)
          .attr('dy', i === 0 ? 0 : '1.5em')
          .text(word);
      });
    });
  
  // Y axis
  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(8));
  
  // Axis labels
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height - 10)
    .attr('text-anchor', 'middle')
    .attr('font-size', '13px')
    .attr('fill', '#374151')
    .text('Outage Cause');
  
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .attr('font-size', '13px')
    .attr('fill', '#374151')
    .text('Average Duration (Hours)');
  
  // Title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 25)
    .attr('text-anchor', 'middle')
    .attr('font-size', '18px')
    .attr('font-weight', 'bold')
    .attr('fill', '#1f2937')
    .text('Average Outage Duration by Cause');
  
  return svg.node();
}


function _55(durationStats,htl){return(
htl.html`<div style="margin: 30px 0; padding: 20px; background: #f9fafb; border-radius: 8px;">
  <h3 style="margin-top: 0;">Key Duration Insights</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background: #e5e7eb;">
        <th style="padding: 10px; text-align: left; border: 1px solid #d1d5db;">Metric</th>
        <th style="padding: 10px; text-align: left; border: 1px solid #d1d5db;">Cause/Value</th>
        <th style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">Duration (Hours)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 10px; border: 1px solid #d1d5db;">Longest Avg Duration</td>
        <td style="padding: 10px; border: 1px solid #d1d5db;">${durationStats.longestCause.cause}</td>
        <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">${durationStats.longestCause.avg_duration.toFixed(1)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #d1d5db;">Shortest Avg Duration</td>
        <td style="padding: 10px; border: 1px solid #d1d5db;">${durationStats.shortestCause.cause}</td>
        <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">${durationStats.shortestCause.avg_duration.toFixed(1)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #d1d5db;">Most Frequent Cause</td>
        <td style="padding: 10px; border: 1px solid #d1d5db;">${durationStats.mostFrequent.cause}</td>
        <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">${durationStats.mostFrequent.avg_duration.toFixed(1)}</td>
      </tr>
      <tr style="background: #f3f4f6;">
        <td style="padding: 10px; border: 1px solid #d1d5db;">Overall Median</td>
        <td style="padding: 10px; border: 1px solid #d1d5db;">${durationStats.overallMedian.toFixed(1)} hours</td>
        <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">Count: ${durationStats.mostFrequent.outage_count}</td>
      </tr>
    </tbody>
  </table>
</div>`
)}

function _56(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _57(md){return(
md`### **_Question 6: Which networks or ASNs experience repeated failures? → Bar chart of top failed networks. (future: Network graph connecting related ASNs that fail simultaneously or frequently)._**`
)}

function _58(md){return(
md`#### **_Description:_**
The bar chart plots the different ASNs against their frequencies of failures, and also maps them to their risk levels. Highly occurring ASNs are mapped to High Risk, least occurring to Low Risk, and medians to Medium Risk. They are arranged in descending order of failure frequencies and color-coded accordingly.

#### **_Analysis and Interpretation:_**
ASN or Autonomous System Numbers (ASN) are identification numbers for different networks. Autonomous Systems (AS) are controlled by large organizations and/or governments. AS are responsible for assigning IP address within its own network, and help internet packages to find each across different networks. 

The top failing network is "ASEarthlink-DMCC-IQ", with 21 occurrences of failures, followed by "ASINT-PDN-STE-AS" and "ASASIACELL" with 15 and 14 failures each. These are marked as high-risk networks with higher chances of failure. 

Interestingly, ASEarthlink-DMCC-IQ (which is likely Earthlink) and ASASIACELL (which is likely ASIACELL) are Iraqi telecommunications companies that mainly operates in Iraq, with Earthlink "100% Iraqi owned,".

[https://earthlink.iq/en/](https://earthlink.iq/en/)

[https://www.asiacell.com/en/about](https://www.asiacell.com/en/about)

It is not clear what "ASINT-PDN-STE-AS" refers to, but assuming AS mean Autonomous System, and searching for "INT-PDN-STE" on the CloudFlare Website, we see that it mainly operates in Syria.

[https://radar.cloudflare.com/as29256](https://radar.cloudflare.com/as29256)

The "ASCAMNET-AS", "ASFASTWEB", and "ASVodafone UK" are likely CAMTEL (Cameroon Telecommunications), Fastweb (Italian operated), and Vodafone UK (in the UK) respectively.

ASSPACEX-STARLINK -> Likely Starlink, a U.S. operated company.

ASEmpresa de Telecomunicaciones de Cuba S.A -> Likely based in Cuba

ASDigicel Haiti -> Likely based in Haiti


#### **_Insight and Implications:_**
This aligns with earlier findings that Iraq and other Middle Eastern countries suffer the most amount of internet outages. Outages in the medium and low risk areas tend to be a mix of different countries and cultures, which means that outages are more likely to many factors. For example, Starlink is not a traditional telecommunications company, relying on satellites to deliver internet rather than land based systems, which may traded increase unreliability for increased accessibility. Haiti may have outages due to poor infrastructure spending, as compared to the UK. 

`
)}

function _networkData(outages){return(
outages
  .filter(d => d.asn != null && d.asn !== '' && d.asn !== 'null')
  .map(d => ({
    ...d,
    asn_number: String(d.asn),
    asn_name: d.asn_name || 'Unknown Network',
    asn_location: d.asn_location || 'Unknown'
  }))
)}

function _asnFailures(d3,networkData)
{
  const grouped = d3.rollup(
    networkData,
    v => v.length,
    d => d.asn_number,
    d => d.asn_name
  );
  
  const result = [];
  for (const [asn, names] of grouped) {
    for (const [name, count] of names) {
      result.push({
        asn_number: asn,
        asn_name: name,
        failure_count: count
      });
    }
  }
  
  return result.sort((a, b) => b.failure_count - a.failure_count);
}


function _repeatedFailures(asnFailures){return(
asnFailures.filter(d => d.failure_count >= 2)
)}

function _asnWithCategories(asnFailures){return(
asnFailures.map(d => {
  let category;
  if (d.failure_count === 1) category = 'Single Failure';
  else if (d.failure_count === 2) category = 'Low Risk';
  else if (d.failure_count <= 5) category = 'Medium Risk';
  else category = 'High Risk';
  
  return {
    ...d,
    reliability_category: category
  };
})
)}

function _reliabilityDistribution(d3,asnWithCategories)
{
  const grouped = d3.rollup(
    asnWithCategories,
    v => v.length,
    d => d.reliability_category
  );
  
  const total = asnWithCategories.length;
  const order = ['High Risk', 'Medium Risk', 'Low Risk', 'Single Failure'];
  
  return order
    .filter(cat => grouped.has(cat))
    .map(cat => ({
      reliability_level: cat,
      asn_count: grouped.get(cat),
      percentage: ((grouped.get(cat) / total) * 100).toFixed(1)
    }));
}


function _networkStats(repeatedFailures,asnFailures)
{
  const highRisk = repeatedFailures.filter(d => d.failure_count >= 3);
  const mediumRisk = repeatedFailures.filter(d => d.failure_count === 2);
  const lowRisk = asnFailures.filter(d => d.failure_count === 1);
  
  return {
    totalASNs: asnFailures.length,
    withRepeatedFailures: repeatedFailures.length,
    highRisk: highRisk.length,
    mediumRisk: mediumRisk.length,
    lowRisk: lowRisk.length,
    topNetwork: repeatedFailures[0] || asnFailures[0],
    maxFailures: asnFailures[0].failure_count
  };
}


function _getShortASN(){return(
function getShortASN(asnName) {
  return asnName.split(";")[0];  
}
)}

function _networkBarChart(asnFailures,d3,getShortASN)
{
  const width = 900;
  const height = 600;
  const margin = {top: 60, right: 30, bottom: 240, left: 180};
  
  // Top 15 networks for visualization
  const topNetworks = asnFailures.slice(0, 15);
  
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");
  
  // Scales
  const x = d3.scaleBand()
    .domain(topNetworks.map(d => `AS${getShortASN(d.asn_name)}`))
    .range([margin.left, width - margin.right])
    .padding(0.2);
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(topNetworks, d => d.failure_count)])
    .nice()
    .range([height - margin.bottom, margin.top]);
  
  // Color function based on risk level
  const getColor = (count) => {
    if (count >= 3) return '#FF4444';  // High risk - red
    if (count === 2) return '#FFA500';  // Medium risk - orange
    return '#4CAF50';  // Low risk - green
  };
  
  // Grid lines
  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y)
      .tickSize(-width + margin.left + margin.right)
      .tickFormat(''))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-dasharray', '2,2'));
  
  // Bars
  const bars = svg.selectAll('.bar')
    .data(topNetworks)
    .join('rect')
    .attr('class', 'bar')
    .attr('x', d => x(`AS${getShortASN(d.asn_name)}`))
    .attr('y', d => y(d.failure_count))
    .attr('width', x.bandwidth())
    .attr('height', d => y(0) - y(d.failure_count))
    .attr('fill', d => getColor(d.failure_count))
    .attr('opacity', 0.85)
    .style('cursor', 'pointer');
  
  // Value labels on bars
  svg.selectAll('.bar-label')
    .data(topNetworks)
    .join('text')
    .attr('class', 'bar-label')
    .attr('x', d => x(`AS${getShortASN(d.asn_name)}`) + x.bandwidth() / 2)
    .attr('y', d => y(d.failure_count) - 8)
    .attr('text-anchor', 'middle')
    .attr('font-size', '11px')
    .attr('font-weight', 'bold')
    .attr('fill', '#1f2937')
    .text(d => `${d.failure_count}`);
  
  // Tooltip
  const tooltip = svg.append('g')
    .attr('class', 'tooltip')
    .style('display', 'none')
    .style("pointer-events", "none");
  
  tooltip.append('rect')
    .attr('width', 260)
    .attr('height', 90)
    .attr('fill', 'white')
    .attr('stroke', '#2563eb')
    .attr('stroke-width', 2)
    .attr('rx', 5);
  
  const tooltipText = tooltip.append('text')
    .attr('x', 130)
    .attr('text-anchor', 'middle');
  
  tooltipText.append('tspan')
    .attr('class', 'tooltip-asn')
    .attr('x', 130)
    .attr('y', 20)
    .attr('font-weight', 'bold')
    .attr('font-size', '13px');
  
  tooltipText.append('tspan')
    .attr('class', 'tooltip-name')
    .attr('x', 130)
    .attr('y', 38)
    .attr('font-size', '11px')
    .attr('fill', '#666');
  
  tooltipText.append('tspan')
    .attr('class', 'tooltip-count')
    .attr('x', 130)
    .attr('y', 56)
    .attr('font-size', '12px');
  
  tooltipText.append('tspan')
    .attr('class', 'tooltip-risk')
    .attr('x', 130)
    .attr('y', 74)
    .attr('font-size', '11px')
    .attr('font-weight', 'bold');
  
  // Hover interactions
  bars
    .on('mouseover', function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity', 1);
      
      const riskLevel = d.failure_count >= 3 ? 'High Risk' : 
                       d.failure_count === 2 ? 'Medium Risk' : 'Low Risk';
      
      tooltip.style('display', null);
      tooltip.select('.tooltip-asn').text(`AS${getShortASN(d.asn_name)}`);
      tooltip.select('.tooltip-name').text(
        getShortASN(d.asn_name).length > 30 ? getShortASN(d.asn_name).substring(0, 27) + '...' : getShortASN(d.asn_name)
      );
      tooltip.select('.tooltip-count').text(`${d.failure_count} failure${d.failure_count > 1 ? 's' : ''}`);
      tooltip.select('.tooltip-risk')
        .text(riskLevel)
        .attr('fill', getColor(d.failure_count));
      
      const xPos = x(`AS${getShortASN(d.asn_name)}`) + x.bandwidth() / 2;
      const yPos = y(d.failure_count);
      
      let tooltipX = xPos - 125;
      let tooltipY = yPos - 110;
      
      if (tooltipX < margin.left) tooltipX = margin.left;
      if (tooltipX + 250 > width - margin.right) tooltipX = width - margin.right - 250;
      if (tooltipY < margin.top) tooltipY = yPos + 20;
      
      tooltip.attr('transform', `translate(${tooltipX},${tooltipY})`);
    })
    .on('mouseout', function() {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity', 0.85);
      
      tooltip.style('display', 'none');
    });
  
  // X axis
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .style('text-anchor', 'end')
    .attr('font-size', '10px');
  
  // Y axis
  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(8));
  
  // Axis labels
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height - 10)
    .attr('text-anchor', 'middle')
    .attr('font-size', '13px')
    .attr('fill', '#374151')
    .text('ASN (Autonomous System Number)');
  
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .attr('font-size', '13px')
    .attr('fill', '#374151')
    .text('Number of Failures');
  
  // Title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 25)
    .attr('text-anchor', 'middle')
    .attr('font-size', '18px')
    .attr('font-weight', 'bold')
    .attr('fill', '#1f2937')
    .text('Network Failure Frequency Analysis');
  
  // Legend
  const legend = svg.append('g')
    .attr('transform', `translate(${width - 200},${margin.top})`);
  
  const legendData = [
    {label: 'High Risk (3+)', color: '#FF4444'},
    {label: 'Medium Risk (2)', color: '#FFA500'},
    {label: 'Low Risk (1)', color: '#4CAF50'}
  ];
  
  legendData.forEach((item, i) => {
    const g = legend.append('g')
      .attr('transform', `translate(0,${i * 20})`);
    
    g.append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', item.color);
    
    g.append('text')
      .attr('x', 18)
      .attr('y', 10)
      .attr('font-size', '11px')
      .text(item.label);
  });
  
  return svg.node();
}


function _67(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _68(md){return(
md`### **_Question 7: Which regions demonstrate the highest resilience or fragility? → Derived “fragility index” visualized as a bubble or heat map ranking each country._**
`
)}

function _69(md){return(
md`#### **_Description:_**

We have a heat map-style visualization that compares 20 regions across four metrics: Frequency, Impact, Diversity, and a calculated Fragility Index.
Each column is independently normalized and color-coded, where red represents higher values and greater fragility, and green represents lower values and greater resilience.
A slider-based weighting system allows users to adjust how much each component contributes to the Fragility Index, enabling real-time recalculation and sensitivity testing.
Definitions of the three fragility factors:
- Frequency: Measures how often outages occur in a region. High frequency indicates recurring instability and repeated service disruption.
- Impact: Measures how severe or long-lasting outages are. High impact reflects outages that cause major downtime, large-scale disruption, or long recovery times.
- Diversity: Measures how many different types of causes lead to outages. High diversity indicates multiple independent failure sources (e.g., weather, power, policy), making the network harder to predict and secure.


#### **_Answer to the question:_**
Mayotte and Iraq emerge as the most fragile regions overall, driven by different factors:
Mayotte experiences severe, long-lasting outages, while Iraq has very frequent but shorter disruptions.
Conversely, Sudan and Mozambique show the lowest fragility scores, indicating rare and short interruptions.
Some countries (e.g., Syria, Haiti, Ukraine) exhibit elevated fragility due to diverse or combined failure modes, making disruptions harder to predict and manage.


#### _**Insights and Implications:**_
Fragility varies not just by outage frequency, but by severity, duration, and diversity of causes.
High-Impact regions like Mayotte reflect physical infrastructure vulnerabilities that may require redundancy, climate resilience, and disaster response planning.
Frequency-driven fragility, as seen in Iraq, highlights the need for stability and rapid recovery systems to manage recurrent outages.
Regions with high diversity of causes (e.g., Syria, Haiti) face multiple independent sources of failure, suggesting systemic risk rather than isolated events.
The visualization enables stakeholders to compare resilience across regions, identify high-risk clusters, and evaluate how changes in weighting shift regional risk profiles for targeted intervention.`
)}

function _data_raw(FileAttachment){return(
FileAttachment("cloudflare_outages.csv").csv({typed: true}).then(raw => {
  // Continent mapping by country code
  const continentMap = {
    'TZ': 'Africa', 'IQ': 'Asia', 'JM': 'Americas', 'CM': 'Africa', 'IT': 'Europe', 'PK': 'Asia',
    'HT': 'Americas', 'GB': 'Europe', 'ID': 'Asia', 'AF': 'Asia', 'ZA': 'Africa', 'US': 'Americas',
    'GI': 'Europe', 'CU': 'Americas', 'AE': 'Asia', 'SY': 'Asia', 'IR': 'Asia', 'CO': 'Americas',
    'EG': 'Africa', 'DO': 'Americas', 'RU': 'Europe', 'AO': 'Africa', 'CN': 'Asia', 'VC': 'Americas',
    'YE': 'Asia', 'MV': 'Asia', 'SE': 'Europe', 'CZ': 'Europe', 'SD': 'Africa', 'MW': 'Africa',
    'KE': 'Africa', 'UG': 'Africa', 'ET': 'Africa', 'NG': 'Africa', 'GH': 'Africa', 'MA': 'Africa',
    'BR': 'Americas', 'MX': 'Americas', 'CA': 'Americas', 'AR': 'Americas', 'CL': 'Americas',
    'IN': 'Asia', 'JP': 'Asia', 'KR': 'Asia', 'SG': 'Asia', 'TH': 'Asia', 'VN': 'Asia',
    'DE': 'Europe', 'FR': 'Europe', 'ES': 'Europe', 'NL': 'Europe', 'BE': 'Europe',
    'AU': 'Oceania', 'NZ': 'Oceania'
  };

  return raw.map(d => {
    const countryCode = d['Annotations locations Details.code'] || d.annotations_locations_details_code || 'Unknown';
    return {
      region: d['Annotations locations Details.name'] || d.annotations_locations_details_name || d.region,
      cause: d['Annotations outage.outage Cause'] || d.annotations_outage_outage_cause || d.cause || 'Unknown',
      continent: continentMap[countryCode] || 'Other',
      start_date: new Date(d['Annotations start Date'] || d.annotations_start_date || d.start_date),
      end_date: new Date(d['Annotations end Date'] || d.annotations_end_date || d.end_date),
      duration_hours: d.duration_hours ||
        (new Date(d['Annotations end Date'] || d.annotations_end_date) -
         new Date(d['Annotations start Date'] || d.annotations_start_date)) / (1000 * 60 * 60)
    };
  }).filter(d => d.region && !isNaN(d.duration_hours) && d.duration_hours >= 0);
})
)}

function _frequency_weight(Inputs){return(
Inputs.range([1, 30], {label: "Frequency Weight", value: 10, step: 1})
)}

function _impact_weight(Inputs){return(
Inputs.range([0.1, 5], {label: "Impact Weight", value: 0.5, step: 0.1})
)}

function _diversity_weight(Inputs){return(
Inputs.range([1, 20], {label: "Diversity Weight", value: 5, step: 1})
)}

function _metric_columns(Inputs){return(
Inputs.checkbox(
  ["frequency_score", "impact_score", "diversity_score", "fragility_index"],
  {
    label: "Metrics to Display",
    value: ["frequency_score", "impact_score", "diversity_score", "fragility_index"]
  }
)
)}

async function _continent_filter(Inputs,data_raw){return(
Inputs.select(
  ["All"].concat(Array.from(new Set((await data_raw).map(d => d.continent))).sort()),
  {label: "Filter by Continent", value: "All"}
)
)}

async function _regional_metrics(data_raw,continent_filter,d3,frequency_weight,impact_weight,diversity_weight)
{
  const raw = await data_raw;
  let filtered = continent_filter === "All"
    ? raw
    : raw.filter(d => d.continent === continent_filter);

  const grouped = d3.rollup(
    filtered,
    v => ({
      total_outages: v.length,
      avg_duration: d3.mean(v, d => d.duration_hours) || 0,
      max_duration: d3.max(v, d => d.duration_hours) || 0,
      cause_types: new Set(v.map(d => d.cause)).size,
      frequency_score: v.length * frequency_weight,
      impact_score: (d3.mean(v, d => d.duration_hours) || 0) * impact_weight,
      diversity_score: new Set(v.map(d => d.cause)).size * diversity_weight,
      fragility_index: (v.length * frequency_weight) +
        ((d3.mean(v, d => d.duration_hours) || 0) * impact_weight) +
        (new Set(v.map(d => d.cause)).size * diversity_weight)
    }),
    d => d.region
  );

  return Array.from(grouped, ([region, metrics]) => ({
    region,
    ...metrics,
    edge_case: metrics.total_outages === 1 ? "⚠️ Only 1 outage" : ""
  }))
    .sort((a, b) => b.fragility_index - a.fragility_index)
    .slice(0, 20);
}


function _77(regional_metrics,htl,metric_columns,d3,frequency_weight,impact_weight,diversity_weight)
{
  // Configuration
  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 700;
  const MARGIN_TOP = 120;
  const MARGIN_LEFT = 200;
  const MARGIN_RIGHT = 280;
  const MARGIN_BOTTOM = 80;

  // Validate inputs
  if (!regional_metrics || regional_metrics.length === 0) {
    return htl.html`<div style="color: red; font-size: 16px; padding: 20px;">⚠️ No data available</div>`;
  }

  if (!metric_columns || metric_columns.length === 0) {
    return htl.html`<div style="color: red; font-size: 16px; padding: 20px;">⚠️ Please select at least one metric</div>`;
  }

  // Define all possible metrics
  const allMetrics = [
    {key: 'frequency_score', label: 'Frequency'},
    {key: 'impact_score', label: 'Impact'},
    {key: 'diversity_score', label: 'Diversity'},
    {key: 'fragility_index', label: 'Fragility Index'}
  ];

  // Filter to selected metrics only
  const metricsToShow = allMetrics.filter(m => metric_columns.includes(m.key));

  // Calculate plot dimensions
  const plotX = MARGIN_LEFT;
  const plotY = MARGIN_TOP;
  const plotWidth = SVG_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
  const plotHeight = SVG_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;

  // Create scales
  const xScale = d3.scaleBand()
    .domain(metricsToShow.map(m => m.key))
    .range([0, plotWidth])
    .padding(0.2);

  const yScale = d3.scaleBand()
    .domain(regional_metrics.map(d => d.region))
    .range([0, plotHeight])
    .padding(0.1);

  const cellWidth = xScale.bandwidth();
  const cellHeight = yScale.bandwidth();

  // Create color scales for each metric
  const colorScales = {};
  metricsToShow.forEach(metric => {
    const values = regional_metrics.map(d => d[metric.key]);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const domain = (minVal === maxVal) ? [minVal, minVal + 1] : [minVal, maxVal];
    
    colorScales[metric.key] = d3.scaleSequential()
      .domain(domain)
      .interpolator(t => d3.interpolateSpectral(1 - t));
  });

  // Create SVG
  const svg = d3.create('svg')
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT);

  // Background
  svg.append('rect')
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT)
    .attr('fill', '#f8fafc');

  // Title
  svg.append('text')
    .attr('x', SVG_WIDTH / 2)
    .attr('y', 35)
    .attr('text-anchor', 'middle')
    .attr('font-size', '24px')
    .attr('font-weight', 'bold')
    .attr('fill', '#1e293b')
    .text('Regional Internet Fragility Analysis - Multi-Metric Heat Map');

  svg.append('text')
    .attr('x', SVG_WIDTH / 2)
    .attr('y', 60)
    .attr('text-anchor', 'middle')
    .attr('font-size', '13px')
    .attr('fill', '#64748b')
    .text('Darker Red = Higher Fragility | Each column normalized independently');

  // Heatmap
  const heatmapG = svg.append('g')
    .attr('transform', `translate(${plotX}, ${plotY})`);

  // Draw all cells
  metricsToShow.forEach(metric => {
    regional_metrics.forEach(region => {
      const cellValue = region[metric.key];
      const cellColor = colorScales[metric.key](cellValue);
      const textColor = d3.rgb(cellColor).brighter(2).hex() === '#ffffff' ? '#000' : '#fff';
      
      // Background rectangle
      heatmapG.append('rect')
        .attr('x', xScale(metric.key))
        .attr('y', yScale(region.region))
        .attr('width', cellWidth)
        .attr('height', cellHeight)
        .attr('fill', cellColor)
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1);

      // Cell value text
      heatmapG.append('text')
        .attr('x', xScale(metric.key) + cellWidth / 2)
        .attr('y', yScale(region.region) + cellHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('font-size', metric.key === 'fragility_index' ? '13px' : '11px')
        .attr('font-weight', metric.key === 'fragility_index' ? 'bold' : 'normal')
        .attr('fill', textColor)
        .text(cellValue.toFixed(1));
    });
  });

  // Y-axis Region names
  svg.append('g')
    .attr('transform', `translate(${plotX - 10}, ${plotY})`)
    .call(d3.axisLeft(yScale).tickSize(0))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('text')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#334155')
      .attr('text-anchor', 'end'));

  // X-axis Metrics
  svg.append('g')
    .attr('transform', `translate(${plotX}, ${plotY - 30})`)
    .selectAll('text')
    .data(metricsToShow)
    .join('text')
    .attr('x', m => xScale(m.key) + cellWidth / 2)
    .attr('y', 0)
    .attr('text-anchor', 'middle')
    .attr('font-size', '13px')
    .attr('font-weight', 'bold')
    .attr('fill', '#2563eb')
    .text(m => m.label);

  // Legend
  const legendX = plotX + plotWidth + 30;
  const legendY = plotY + 40;
  const legendHeight = 200;

  // Gradient
  const defs = svg.append('defs');
  const gradId = 'gradient-' + Math.random().toString(36).substr(2, 9);
  const gradient = defs.append('linearGradient')
    .attr('id', gradId)
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '0%')
    .attr('y2', '100%');

  [0, 0.25, 0.5, 0.75, 1].forEach(t => {
    gradient.append('stop')
      .attr('offset', (t * 100) + '%')
      .attr('stop-color', d3.interpolateSpectral(t));
  });

  svg.append('rect')
    .attr('x', legendX)
    .attr('y', legendY)
    .attr('width', 25)
    .attr('height', legendHeight)
    .attr('fill', `url(#${gradId})`)
    .attr('stroke', '#999')
    .attr('stroke-width', 1);

  svg.append('text')
    .attr('x', legendX - 5)
    .attr('y', legendY - 10)
    .attr('text-anchor', 'end')
    .attr('font-size', '12px')
    .attr('font-weight', 'bold')
    .attr('fill', '#2563eb')
    .text('Scale');

  svg.append('text')
    .attr('x', legendX + 35)
    .attr('y', legendY + 12)
    .attr('font-size', '11px')
    .attr('fill', '#e11d48')
    .text('High');

  svg.append('text')
    .attr('x', legendX + 35)
    .attr('y', legendY + legendHeight + 5)
    .attr('font-size', '11px')
    .attr('fill', '#22c55e')
    .text('Low');

  svg.append('text')
    .attr('x', legendX)
    .attr('y', legendY + legendHeight + 30)
    .attr('font-size', '10px')
    .attr('font-weight', 'bold')
    .attr('fill', '#334155')
    .text('Formula:');

  const formulaLines = [
    `(Outages × ${frequency_weight}) +`,
    `(Avg Dur × ${impact_weight}) +`,
    `(Causes × ${diversity_weight})`
  ];

  formulaLines.forEach((line, i) => {
    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY + legendHeight + 45 + (i * 12))
      .attr('font-size', '9px')
      .attr('fill', '#64748b')
      .text(line);
  });

  return svg.node();
}


function _78(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _79(md){return(
md`
### **_Question 8: Are outages becoming more or less frequent over time? → Rolling trend line visualizing total outage count and average duration over months/years._**`
)}

function _80(md){return(
md`#### _**Description:**_
We have a dual-axis time series chart showing monthly outage frequency (blue solid line, left Y-axis) and average outage duration (purple dashed line, right Y-axis) from November 2024 to October 2025.
A red dashed trend line overlays the frequency data to indicate the overall trend. Users can view the data with multiple smoothing options (raw, 3-month, 6-month, and 12-month rolling averages) to observe both short-term fluctuations and long-term patterns. Key statistics - including average, peak, low, duration, and volatility - are displayed below the chart for reference.

#### _**Answer to the question:**_

Outages are becoming more frequent over time. Across all smoothing levels, the frequency trend line slopes upward, with positive slopes ranging from 0.89 - 1.38 outages per month.

* Raw data shows volatility (5–34 outages/month), but the trend line confirms a sustained increase.
* 3 and 6-month averages further smooth fluctuations, showing frequency rising from ~9 outages to ~22–23 outages/month.
* 12-month smoothing eliminates seasonal noise and confirms a long-term upward trend.

Interestingly, average outage duration is decreasing sharply - from over 300 hours in November 2024 to 10–20 hours by October 2025 - indicating that outages, though more frequent, are becoming shorter and likely easier to resolve.

#### _**Insights and Implications:**_
* The inverse relationship between frequency and duration suggests improved infrastructure resilience and faster response times.
* Rising outage frequency signals a growing global dependence on digital services and highlights regions or networks that may still require monitoring and reinforcement.
* Shorter durations indicate that mitigation measures - such as automated detection, redundancy, or rapid restoration protocols - are increasingly effective.
* Policymakers and network operators should focus on both preventing frequent disruptions and maintaining rapid recovery capabilities to ensure service continuity in a digitally reliant world.
`
)}

function _monthly_trends(d3,data_raw)
{
  const grouped = d3.rollup(
    data_raw,
    v => ({
      monthly_outages: v.length,
      avg_duration: d3.mean(v, d => d.duration_hours),
      total_duration: d3.sum(v, d => d.duration_hours),
      outage_severity: d3.mean(v, d => d.duration_hours * (v.length / 12)) // severity score
    }),
    d => {
      const date = d.start_date;
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }
  );
  
  const result = Array.from(grouped, ([year_month, metrics]) => ({
    year_month,
    ...metrics
  })).sort((a, b) => a.year_month.localeCompare(b.year_month));
  
  return result;
}


function _82(monthly_trends,d3)
{
  const mainContainer = document.createElement('div');
  mainContainer.style.cssText = 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';

  //Control Panels
  const controlsPanel = document.createElement('div');
  controlsPanel.style.cssText = `
    background: linear-gradient(135deg, #f0f4f8 0%, #e8eef8 100%);
    border: 2px solid #6366f1;
    border-radius: 14px;
    padding: 14px 20px;
    margin-bottom: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.12);
  `;

  //Create toggle buttons
  function createToggleButton(label, initialState, onToggle) {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 6px;';

    const labelEl = document.createElement('label');
    labelEl.style.cssText = 'font-weight: 700; font-size: 12px; color: #1e293b; letter-spacing: 0.2px;';
    labelEl.textContent = label;

    const toggleContainer = document.createElement('div');
    toggleContainer.style.cssText = 'display: flex; align-items: center; gap: 8px;';

    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.checked = initialState;
    toggle.style.cssText = `
      width: 16px;
      height: 16px;
      cursor: pointer;
      accent-color: #6366f1;
      border-radius: 4px;
    `;

    const toggleLabel = document.createElement('span');
    toggleLabel.style.cssText = 'font-size: 11px; color: #64748b; font-weight: 500;';
    toggleLabel.textContent = initialState ? 'Enabled' : 'Disabled';

    toggle.addEventListener('change', (e) => {
      toggleLabel.textContent = e.target.checked ? 'Enabled' : 'Disabled';
      onToggle(e.target.checked);
    });

    toggleContainer.appendChild(toggle);
    toggleContainer.appendChild(toggleLabel);
    wrapper.appendChild(labelEl);
    wrapper.appendChild(toggleContainer);
    return wrapper;
  }

  // Helper to create metric selector
  function createMetricSelector(label, options, initialValue, onChange) {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 6px;';

    const labelEl = document.createElement('label');
    labelEl.style.cssText = 'font-weight: 700; font-size: 12px; color: #1e293b; letter-spacing: 0.2px;';
    labelEl.textContent = label;

    const select = document.createElement('select');
    select.style.cssText = `
      padding: 8px 10px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      background: white;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      color: #1e293b;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    `;

    select.addEventListener('mouseover', () => {
      select.style.borderColor = '#6366f1';
      select.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.15)';
    });

    select.addEventListener('mouseout', () => {
      select.style.borderColor = '#e2e8f0';
      select.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    });

    options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.label;
      if (opt.value === initialValue) option.selected = true;
      select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
      onChange(e.target.value);
    });

    wrapper.appendChild(labelEl);
    wrapper.appendChild(select);
    return wrapper;
  }

  //State for interactive controls
  let showTrendLine = true;
  let showDurationLine = true;
  let smoothingLevel = 'none';

  //Add controls
  controlsPanel.appendChild(createToggleButton('Trend Line', showTrendLine, (val) => {
    showTrendLine = val;
    renderChart();
  }));

  controlsPanel.appendChild(createToggleButton('Duration Line', showDurationLine, (val) => {
    showDurationLine = val;
    renderChart();
  }));

  controlsPanel.appendChild(createMetricSelector('Data Smoothing', 
    [
      {label: 'No Smoothing', value: 'none'},
      {label: '3-Month Average', value: '3month'},
      {label: '6-Month Average', value: '6month'},
      {label: '12-Month Average', value: '12month'}
    ],
    smoothingLevel,
    (val) => {
      smoothingLevel = val;
      renderChart();
    }
  ));

  mainContainer.appendChild(controlsPanel);

  //Render Chart
  function renderChart() {
    const oldChart = mainContainer.querySelector('.chart-section');
    if (oldChart) oldChart.remove();

    const chartSection = document.createElement('div');
    chartSection.className = 'chart-section';
    chartSection.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';

    const width = 950;
    const chartHeight = 500;
    const margin = {top: 80, right: 120, bottom: 40, left: 90};

    let data = monthly_trends;

    if (smoothingLevel !== 'none') {
      const windowSize = parseInt(smoothingLevel);
      data = data.map((d, i) => {
        const start = Math.max(0, i - Math.floor(windowSize / 2));
        const end = Math.min(data.length, i + Math.ceil(windowSize / 2));
        const window = data.slice(start, end);
        
        return {
          ...d,
          monthly_outages: d3.mean(window, x => x.monthly_outages),
          avg_duration: d3.mean(window, x => x.avg_duration),
          total_duration: d3.mean(window, x => x.total_duration)
        };
      });
    }

    // Create SVG
    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", chartHeight);

    // Background
    svg.append("rect")
      .attr("width", width)
      .attr("height", chartHeight)
      .attr("fill", "#ffffff");

    // Scales
    const xScale = d3.scalePoint()
      .domain(data.map(d => d.year_month))
      .range([margin.left, width - margin.right])
      .padding(0.5);

    const yScaleFrequency = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.monthly_outages) * 1.2])
      .range([chartHeight - margin.bottom, margin.top]);

    const yScaleDuration = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.avg_duration) * 1.2])
      .range([chartHeight - margin.bottom, margin.top]);

    // Calculate linear regression for trend
    const n = data.length;
    const indices = data.map((_, i) => i);
    const frequencies = data.map(d => d.monthly_outages);

    const sumX = d3.sum(indices);
    const sumY = d3.sum(frequencies);
    const sumXY = d3.sum(indices.map((x, i) => x * frequencies[i]));
    const sumX2 = d3.sum(indices.map(x => x * x));

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const trendData = data.map((d, i) => ({
      year_month: d.year_month,
      trend_value: Math.max(0, slope * i + intercept)
    }));

    // Determine trend direction
    const trendDirection = slope > 0.05 ? "Increasing" : slope < -0.05 ? "Decreasing" : "Stable";
    const trendColor = slope > 0.05 ? "#ef4444" : slope < -0.05 ? "#10b981" : "#f59e0b";

    // Grid lines
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScaleFrequency)
        .tickSize(-(width - margin.left - margin.right))
        .tickFormat(""))
      .call(g => g.selectAll(".tick line")
        .attr("stroke", "#f1f5f9")
        .attr("stroke-dasharray", "3,3")
        .attr("stroke-width", 1))
      .call(g => g.select(".domain").remove());

    // X-axis
    const xAxis = svg.append("g")
      .attr("transform", `translate(0,${chartHeight - margin.bottom})`)
      .call(d3.axisBottom(xScale)
        .tickValues(xScale.domain().filter((d, i) => i % Math.ceil(data.length / 10) === 0)))
      .call(g => g.selectAll("text")
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
        .style("font-size", "12px")
        .style("fill", "#64748b")
        .style("font-weight", "500"));

    xAxis.call(g => g.select(".domain")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-width", 1.5));

    // Y-axis (Frequency - Left)
    const yAxisLeft = svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScaleFrequency))
      .call(g => g.select(".domain").attr("stroke", "#3b82f6").attr("stroke-width", 2))
      .call(g => g.selectAll(".tick text")
        .attr("fill", "#3b82f6")
        .attr("font-weight", "600")
        .attr("font-size", "12px"));

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(chartHeight - margin.bottom + margin.top) / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .attr("fill", "#3b82f6")
      .attr("font-weight", "700")
      .attr("font-size", "14px")
      .attr("letter-spacing", "0.3px")
      .text("Monthly Outage Count");

    // Y-axis (Duration - Right)
    if (showDurationLine) {
      const yAxisRight = svg.append("g")
        .attr("transform", `translate(${width - margin.right},0)`)
        .call(d3.axisRight(yScaleDuration))
        .call(g => g.select(".domain").attr("stroke", "#a855f7").attr("stroke-width", 2))
        .call(g => g.selectAll(".tick text")
          .attr("fill", "#a855f7")
          .attr("font-weight", "600")
          .attr("font-size", "12px"));

      svg.append("text")
        .attr("transform", "rotate(90)")
        .attr("x", (chartHeight - margin.bottom + margin.top) / 2)
        .attr("y", -width + 25)
        .attr("text-anchor", "middle")
        .attr("fill", "#a855f7")
        .attr("font-weight", "700")
        .attr("font-size", "14px")
        .attr("letter-spacing", "0.3px")
        .text("Avg Duration (hours)");
    }

    // Area under frequency curve
    const areaFrequency = d3.area()
      .x(d => xScale(d.year_month))
      .y0(chartHeight - margin.bottom)
      .y1(d => yScaleFrequency(d.monthly_outages))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", "rgba(59, 130, 246, 0.08)")
      .attr("d", areaFrequency);

    // Frequency line
    const lineFrequency = d3.line()
      .x(d => xScale(d.year_month))
      .y(d => yScaleFrequency(d.monthly_outages))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 3.5)
      .attr("d", lineFrequency)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round");

    // Frequency points
    svg.selectAll(".freq-point")
      .data(data)
      .join("circle")
      .attr("class", "freq-point")
      .attr("cx", d => xScale(d.year_month))
      .attr("cy", d => yScaleFrequency(d.monthly_outages))
      .attr("r", 5)
      .attr("fill", "#3b82f6")
      .attr("stroke", "white")
      .attr("stroke-width", 2.5)
      .style("cursor", "pointer")
      .style("opacity", 0.9)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .attr("r", 7)
          .style("opacity", 1)
          .attr("stroke-width", 3);
        
        tooltip.style("opacity", 1)
          .html(`<div style="font-weight: 700; margin-bottom: 4px;">${d.year_month}</div>
                 <div> Outages: ${d.monthly_outages.toFixed(1)}</div>
                 <div> Avg Duration: ${d.avg_duration.toFixed(1)}h</div>
                 <div> Total: ${d.total_duration.toFixed(0)}h</div>`)
          .style("left", (event.pageX + 12) + "px")
          .style("top", (event.pageY - 32) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .attr("r", 5)
          .style("opacity", 0.9)
          .attr("stroke-width", 2.5);
        tooltip.style("opacity", 0);
      });

    // Duration line (if enabled)
    if (showDurationLine) {
      const lineDuration = d3.line()
        .x(d => xScale(d.year_month))
        .y(d => yScaleDuration(d.avg_duration))
        .curve(d3.curveMonotoneX);

      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#a855f7")
        .attr("stroke-width", 2.8)
        .attr("stroke-dasharray", "7,4")
        .attr("d", lineDuration)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");

      // Duration points
      svg.selectAll(".dur-point")
        .data(data)
        .join("circle")
        .attr("class", "dur-point")
        .attr("cx", d => xScale(d.year_month))
        .attr("cy", d => yScaleDuration(d.avg_duration))
        .attr("r", 4)
        .attr("fill", "#a855f7")
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .style("cursor", "pointer")
        .on("mouseover", function(event, d) {
          d3.select(this)
            .attr("r", 6)
            .attr("stroke-width", 2.5);
          
          tooltip.style("opacity", 1)
            .html(`<div style="font-weight: 700; margin-bottom: 4px;">${d.year_month}</div>
                   <div> Avg Duration: ${d.avg_duration.toFixed(1)}h</div>
                   <div> Total Duration: ${d.total_duration.toFixed(0)}h</div>`)
            .style("left", (event.pageX + 12) + "px")
            .style("top", (event.pageY - 32) + "px");
        })
        .on("mouseout", function() {
          d3.select(this)
            .attr("r", 4)
            .attr("stroke-width", 2);
          tooltip.style("opacity", 0);
        });
    }

    // Trend line (if enabled)
    if (showTrendLine) {
      const lineTrend = d3.line()
        .x(d => xScale(d.year_month))
        .y(d => yScaleFrequency(d.trend_value));

      svg.append("path")
        .datum(trendData)
        .attr("fill", "none")
        .attr("stroke", trendColor)
        .attr("stroke-width", 3.5)
        .attr("stroke-dasharray", "9,5")
        .attr("d", lineTrend)
        .style("opacity", 0.85)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");
    }

    // Title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 32)
      .attr("text-anchor", "middle")
      .attr("font-size", "26px")
      .attr("font-weight", "800")
      .attr("fill", "#0f172a")
      .attr("letter-spacing", "0.5px")
      .text("Internet Outage Trends: Frequency & Duration Analysis");

    // Subtitle with trend direction
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 62)
      .attr("text-anchor", "middle")
      .attr("font-size", "15px")
      .attr("fill", trendColor)
      .attr("font-weight", "700")
      .attr("letter-spacing", "0.4px")
      .text(`Trend: ${trendDirection} | Slope: ${slope.toFixed(4)} outages/month`);

    chartSection.appendChild(svg.node());

    // Statistics Box
    const statsContainer = document.createElement('div');
    statsContainer.style.cssText = `
      display: flex;
      gap: 20px;
      align-items: flex-start;
      margin-top: 20px;
      justify-content: center;
      width: 100%;
    `;

    const statsBox = document.createElement('div');
    statsBox.style.cssText = `
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      flex: 1;
    `;

    const avgMonthly = d3.mean(data, d => d.monthly_outages).toFixed(1);
    const avgDuration = d3.mean(data, d => d.avg_duration).toFixed(1);
    const maxMonth = data.reduce((max, d) => d.monthly_outages > max.monthly_outages ? d : max);
    const minMonth = data.reduce((min, d) => d.monthly_outages < min.monthly_outages ? d : min);
    const volatility = (d3.deviation(data, d => d.monthly_outages) || 0).toFixed(2);

    const statsTitle = document.createElement('h3');
    statsTitle.style.cssText = 'margin: 0 0 10px 0; font-size: 11px; font-weight: 700; color: #1e293b; letter-spacing: 0.3px;';
    statsTitle.textContent = 'STATISTICS';
    statsBox.appendChild(statsTitle);

    const stats = [
      { label: "Avg", value: `${avgMonthly}`},
      { label: "Peak", value: `${maxMonth.monthly_outages}`},
      { label: "Low", value: `${minMonth.monthly_outages}`},
      { label: "Duration", value: `${avgDuration}h`},
      { label: "Volatility", value: volatility}
    ];

    stats.forEach((stat) => {
      const statRow = document.createElement('div');
      statRow.style.cssText = 'display: flex; justify-content: space-between; padding: 5px 0; gap: 12px; border-bottom: 1px solid #f1f5f9;';
      
      const statLabel = document.createElement('span');
      statLabel.style.cssText = 'font-size: 10px; color: #64748b; font-weight: 600; flex-shrink: 0;';
      statLabel.textContent = ` ${stat.label}`;
      
      const statValue = document.createElement('span');
      statValue.style.cssText = 'font-size: 10px; color: #0f172a; font-weight: 700; text-align: right;';
      statValue.textContent = stat.value;
      
      statRow.appendChild(statLabel);
      statRow.appendChild(statValue);
      statsBox.appendChild(statRow);
    });

    // Legend
    const legendBox = document.createElement('div');
    legendBox.style.cssText = `
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    `;

    const legendTitle = document.createElement('h3');
    legendTitle.style.cssText = 'margin: 0 0 10px 0; font-size: 11px; font-weight: 700; color: #1e293b; letter-spacing: 0.3px;';
    legendTitle.textContent = 'LEGEND';
    legendBox.appendChild(legendTitle);

    const legendItems = [
      {label: "Outage Frequency", color: "#3b82f6", dash: "0"},
      showDurationLine ? {label: "Avg Duration", color: "#a855f7", dash: "7,4"} : null,
      showTrendLine ? {label: `Trend (${trendDirection})`, color: trendColor, dash: "9,5"} : null
    ].filter(Boolean);

    legendItems.forEach((item) => {
      const legendItem = document.createElement('div');
      legendItem.style.cssText = 'display: flex; align-items: flex-start; gap: 12px; padding: 8px 0;';
    
      const svgContainer = document.createElement('div');
      svgContainer.style.cssText = 'flex-shrink: 0; padding-top: 2px;';
      
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '32');
      svg.setAttribute('height', '4');
      svg.setAttribute('viewBox', '0 0 32 4');
      svg.style.cssText = 'display: block;';
      
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', '2');
      line.setAttribute('x2', '32');
      line.setAttribute('y2', '2');
      line.setAttribute('stroke', item.color);
      line.setAttribute('stroke-width', '2.5');
      line.setAttribute('stroke-linecap', 'round');
      if (item.dash && item.dash !== '0') {
        line.setAttribute('stroke-dasharray', item.dash);
      }
      
      svg.appendChild(line);
      svgContainer.appendChild(svg);
      
      // Text content wrapper
      const textWrapper = document.createElement('div');
      textWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 2px;';
      
      const labelText = document.createElement('span');
      labelText.style.cssText = 'font-size: 10px; color: #1e293b; font-weight: 700; line-height: 1.3;';
      labelText.textContent = item.label;
      
      let description = '';
      if (item.label === 'Outage Frequency') {
        description = 'Blue solid line - Monthly count';
      } else if (item.label === 'Avg Duration') {
        description = 'Purple dashed line - Duration hours';
      } else if (item.label.includes('Trend')) {
        description = `${item.color === '#ef4444' ? 'Red' : item.color === '#10b981' ? 'Green' : 'Amber'} dashed line - Trend`;
      }
      
      const descText = document.createElement('span');
      descText.style.cssText = 'font-size: 9px; color: #94a3b8; line-height: 1.3;';
      descText.textContent = description;
      
      textWrapper.appendChild(labelText);
      textWrapper.appendChild(descText);
      
      legendItem.appendChild(svgContainer);
      legendItem.appendChild(textWrapper);
      legendBox.appendChild(legendItem);
    });

    statsContainer.appendChild(statsBox);
    statsContainer.appendChild(legendBox);
    chartSection.appendChild(statsContainer);

    mainContainer.appendChild(chartSection);
  }

  // Tooltip styling
  const tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("padding", "12px 16px")
    .style("background", "rgba(15, 23, 42, 0.95)")
    .style("color", "white")
    .style("border-radius", "8px")
    .style("font-size", "13px")
    .style("pointer-events", "none")
    .style("opacity", 0)
    .style("z-index", 1000)
    .style("border", "1px solid rgba(255, 255, 255, 0.1)")
    .style("box-shadow", "0 8px 24px rgba(0,0,0,0.25)");

  // Initial render
  renderChart();

  return mainContainer;
}


function _83(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _84(md){return(
md`# **_Conclusion_** 

### **_1. Summary of findings_**
- CloudPulse reveals that global internet outages are not evenly distributed but instead cluster around regions where political instability, infrastructural fragility, or environmental stress converge. 
- Middle Eastern countries - particularly Iraq, Iran, Pakistan, and Libya - experience the highest outage frequencies, with government-directed shutdowns accounting for nearly half of all recorded events. 
- These political outages tend to be national in scope yet short in duration, whereas weather, power, and technical failures occur less often but last much longer. 
- ASN-level analysis reinforces these patterns, showing repeated failures among networks operating in Iraq and Syria. 
- The Fragility Index further highlights that some countries are vulnerable due to severe long-lasting outages (e.g., Mayotte), others due to frequent disruptions (e.g., Iraq), and still others due to diverse, unpredictable causes (e.g., Syria, Haiti). 
- Overall, outage frequency is increasing globally even as average duration declines - indicating both rising stress on digital systems and improved restoration capabilities.

### **_2. Recommendations_**
Enhancing global internet resilience requires a two-pronged strategy: policy reforms and infrastructure strengthening.
- Policy and Governance: Increase transparency around government-directed shutdowns, adopt international norms to limit nationwide disruptions, and support civil-society monitoring of connectivity. Clear reporting standards can reduce political fragility and inform proactive mitigation strategies.
- Infrastructure Investments: Regions facing long-duration outages should prioritize redundant fiber routes, resilient power grids, and climate-adaptive infrastructure. Networks experiencing frequent disruptions would benefit from capacity building, automated failover systems, and multi-homing to reduce downtime.
- Targeted Risk Mitigation: Combining data-driven Fragility Index insights with regional and ASN-level patterns allows stakeholders to focus resources where outages are most severe, frequent, or diverse -maximizing the effectiveness of interventions.

### **_3. Limitations_**
This analysis is subject to several constraints:

- Temporal and Sample Scope: The Cloudflare dataset covers only one year and a maximum of 500 outage events, limiting long-term trend analysis and the detection of rare incidents.
- Detection Bias: Outages are more likely to be recorded in networks with substantial Cloudflare traffic, potentially underrepresenting smaller providers or regions with lower monitoring coverage.
- Causal Ambiguity: Outage causes are sometimes simplified, inferred, or uncertain, restricting the accuracy of causal interpretations.
- Limited Contextual Data: The absence of detailed socioeconomic indicators, conflict intensity, and infrastructure quality prevents deeper analysis of underlying drivers of outages.

Future improvements - including expanding the dataset, enhancing transparency in outage attribution, and integrating broader contextual variables - would enable more precise and actionable assessments of global internet fragility.
`
)}

function _85(md){return(
md`=============================================================================================================
=============================================================================================================`
)}

function _86(md){return(
md`# Appendix
World GeoJson file pulled from week 5 lab`
)}

function _world(FileAttachment){return(
FileAttachment("world.json").json()
)}

function _unique(){return(
function unique(array) {
  return array.filter((v, i) => array.indexOf(v) === i);
}
)}

function _cloudflare_outages_processed(__query,FileAttachment,invalidation){return(
__query(FileAttachment("cloudflare_outages_processed@1.csv"),{from:{table:"cloudflare_outages_processed"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["question2@3.csv", {url: new URL("./files/874099a702f51bbe86871219dfa3c23541bc9a3cff9519183ecf36001b4693b3be4cf26effd34e8ac8c9b6a51af8bf3994e50d344c56b70e5786bc8db43db182.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["cloudflare_outages.csv", {url: new URL("./files/2614a2dce3b871b3c8f2161d7b0041b5f20aa849b30a1a242cf170bd5c92e61e6a3e0d3b9f61c35261a94a51797ec190ad4828ab2d3df52932337f1ed1a5caea.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["cloudflare_outages_processed.csv", {url: new URL("./files/714d040560e4559f3dbde20930a46b415ed6703d48340fb165c92de38e27bf6356069f3296be9811c5cd65cc20ba39654688460d099f56c70b711079f860f537.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["world.json", {url: new URL("./files/89f81b1e8af0be836adcbbb1d37f7118947f0d21fdaaee4760b867433d09f169d6c4f1579de34e9311e6235b2433f02a327fc84f8e909ff30cbeb0dade4eb919.json", import.meta.url), mimeType: "application/json", toString}],
    ["question1.csv", {url: new URL("./files/2d42cadd9b8298f1805f07927ca635bf31afc151da4fd076b34e46579688e3d3fa21260747dcc5c8c22822f68ba479b9d30f6d502269f9a1d7a444a261507435.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["cloudflare_outages_processed@1.csv", {url: new URL("./files/714d040560e4559f3dbde20930a46b415ed6703d48340fb165c92de38e27bf6356069f3296be9811c5cd65cc20ba39654688460d099f56c70b711079f860f537.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("question1")).define("question1", ["__query","FileAttachment","invalidation"], _question1);
  main.variable(observer()).define(["Legend","d3","question1"], _13);
  main.variable(observer("graph1")).define("graph1", ["d3","question1","create_tooltip","world"], _graph1);
  main.variable(observer("create_tooltip")).define("create_tooltip", _create_tooltip);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("question2")).define("question2", ["__query","FileAttachment","invalidation"], _question2);
  main.variable(observer()).define(["question2","Legend","d3","unique"], _20);
  main.variable(observer("graph2")).define("graph2", ["d3","question2","unique","country_scope","factory_q2"], _graph2);
  main.variable(observer("factory_q2")).define("factory_q2", ["d3","unique"], _factory_q2);
  main.variable(observer("country_scope")).define("country_scope", ["question2"], _country_scope);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("raw_outages")).define("raw_outages", ["FileAttachment"], _raw_outages);
  main.variable(observer("cloudflare_outages")).define("cloudflare_outages", ["__query","FileAttachment","invalidation"], _cloudflare_outages);
  main.variable(observer("outages")).define("outages", ["FileAttachment"], _outages);
  main.variable(observer("processedData")).define("processedData", ["outages"], _processedData);
  main.variable(observer("monthlyData")).define("monthlyData", ["d3","processedData"], _monthlyData);
  main.variable(observer("seasonalData")).define("seasonalData", ["d3","processedData"], _seasonalData);
  main.variable(observer("weekdayData")).define("weekdayData", ["d3","processedData"], _weekdayData);
  main.variable(observer("peakStats")).define("peakStats", ["monthlyData","seasonalData","weekdayData"], _peakStats);
  main.variable(observer("monthlyTimeline")).define("monthlyTimeline", ["d3","monthlyData"], _monthlyTimeline);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("causeData")).define("causeData", ["outages"], _causeData);
  main.variable(observer("causeDistribution")).define("causeDistribution", ["d3","causeData"], _causeDistribution);
  main.variable(observer("typeDistribution")).define("typeDistribution", ["d3","causeData"], _typeDistribution);
  main.variable(observer("hierarchicalData")).define("hierarchicalData", ["d3","causeData"], _hierarchicalData);
  main.variable(observer("causeStats")).define("causeStats", ["causeDistribution","typeDistribution","causeData"], _causeStats);
  main.variable(observer("donutChart")).define("donutChart", ["d3","causeDistribution","causeData"], _donutChart);
  main.variable(observer("sunburstChart")).define("sunburstChart", ["d3","hierarchicalData"], _sunburstChart);
  main.variable(observer()).define(["causeStats","htl"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("durationData")).define("durationData", ["outages"], _durationData);
  main.variable(observer("durationByCause")).define("durationByCause", ["d3","durationData"], _durationByCause);
  main.variable(observer("durationCategories")).define("durationCategories", ["durationData","d3"], _durationCategories);
  main.variable(observer("durationStats")).define("durationStats", ["durationByCause","d3","durationData"], _durationStats);
  main.variable(observer("durationBarChart")).define("durationBarChart", ["d3","durationByCause"], _durationBarChart);
  main.variable(observer()).define(["durationStats","htl"], _55);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("networkData")).define("networkData", ["outages"], _networkData);
  main.variable(observer("asnFailures")).define("asnFailures", ["d3","networkData"], _asnFailures);
  main.variable(observer("repeatedFailures")).define("repeatedFailures", ["asnFailures"], _repeatedFailures);
  main.variable(observer("asnWithCategories")).define("asnWithCategories", ["asnFailures"], _asnWithCategories);
  main.variable(observer("reliabilityDistribution")).define("reliabilityDistribution", ["d3","asnWithCategories"], _reliabilityDistribution);
  main.variable(observer("networkStats")).define("networkStats", ["repeatedFailures","asnFailures"], _networkStats);
  main.variable(observer("getShortASN")).define("getShortASN", _getShortASN);
  main.variable(observer("networkBarChart")).define("networkBarChart", ["asnFailures","d3","getShortASN"], _networkBarChart);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer()).define(["md"], _68);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer("data_raw")).define("data_raw", ["FileAttachment"], _data_raw);
  main.variable(observer("viewof frequency_weight")).define("viewof frequency_weight", ["Inputs"], _frequency_weight);
  main.variable(observer("frequency_weight")).define("frequency_weight", ["Generators", "viewof frequency_weight"], (G, _) => G.input(_));
  main.variable(observer("viewof impact_weight")).define("viewof impact_weight", ["Inputs"], _impact_weight);
  main.variable(observer("impact_weight")).define("impact_weight", ["Generators", "viewof impact_weight"], (G, _) => G.input(_));
  main.variable(observer("viewof diversity_weight")).define("viewof diversity_weight", ["Inputs"], _diversity_weight);
  main.variable(observer("diversity_weight")).define("diversity_weight", ["Generators", "viewof diversity_weight"], (G, _) => G.input(_));
  main.variable(observer("viewof metric_columns")).define("viewof metric_columns", ["Inputs"], _metric_columns);
  main.variable(observer("metric_columns")).define("metric_columns", ["Generators", "viewof metric_columns"], (G, _) => G.input(_));
  main.variable(observer("viewof continent_filter")).define("viewof continent_filter", ["Inputs","data_raw"], _continent_filter);
  main.variable(observer("continent_filter")).define("continent_filter", ["Generators", "viewof continent_filter"], (G, _) => G.input(_));
  main.variable(observer("regional_metrics")).define("regional_metrics", ["data_raw","continent_filter","d3","frequency_weight","impact_weight","diversity_weight"], _regional_metrics);
  main.variable(observer()).define(["regional_metrics","htl","metric_columns","d3","frequency_weight","impact_weight","diversity_weight"], _77);
  main.variable(observer()).define(["md"], _78);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer()).define(["md"], _80);
  main.variable(observer("monthly_trends")).define("monthly_trends", ["d3","data_raw"], _monthly_trends);
  main.variable(observer()).define(["monthly_trends","d3"], _82);
  main.variable(observer()).define(["md"], _83);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer()).define(["md"], _85);
  main.variable(observer()).define(["md"], _86);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.import("Swatches", child1);
  main.variable(observer("unique")).define("unique", _unique);
  main.variable(observer("cloudflare_outages_processed")).define("cloudflare_outages_processed", ["__query","FileAttachment","invalidation"], _cloudflare_outages_processed);
  return main;
}
