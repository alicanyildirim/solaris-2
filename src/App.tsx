import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import './App.css';
import Xreatures from "./Solaris-2.json";
import '../node_modules/react-vis/dist/style.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
function App() {

  const [adata, setData] = useState([]);
  const showData=()=>{
    let cs: any = Xreatures;
    let Creatures: any = cs[cs.length -1][1];
    let alive = {"0": {}, "1": {}, "2": {}};
    let dead = {"0": {}, "1": {}, "2": {}};
    let unknown = {"0": {}, "1": {}, "2": {}};
    for (let i = 0; i < Creatures.length; i++) {
      const creature: any = Creatures[i];
      if (creature.status === "alive") {
        for (let j = 0; j < 3; j++) {
          if (creature.taxonomy[j] in alive[j]) {
            alive[j][creature.taxonomy[j]]++;
          } else {
            alive[j][creature.taxonomy[j]] = 1;
          }
        }
      } else if (creature.status === "dead") {
        for (let j = 0; j < 3; j++) {
          if (creature.taxonomy[j] in dead[j]) {
            dead[j][creature.taxonomy[j]]++;
          } else {
            dead[j][creature.taxonomy[j]] = 1;
          }
        }
      } else if (creature.status === "unknown") {
        for (let j = 0; j < 3; j++) {
          if (creature.taxonomy[j] in unknown[j]) {
            unknown[j][creature.taxonomy[j]]++;
          } else {
            unknown[j][creature.taxonomy[j]] = 1;
          }
        }
      }
    }
      console.log(alive,dead,unknown);
    setData([]);

    // Log Time: new Date(Creatures[0][0]).toDateString()
  }
  const chart: any = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    x.paddingRight = 20;

    let data: any = [];
    let visits = 10;

    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: (new Date(2018, 0, i)), name: "name" + i, value: visits });
    }

    x.data = data;

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis: any = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    x.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);
  useEffect(()=>{
    showData()
  },[])
  return (
    <div className="App">
      <header className="App-header">
         {
            adata && adata.length > 0 && adata.map((creature)=><p>{creature}</p>)
         }
           <div id="chartdiv" style={{ width: "90%", height: "500px" }}></div>
      </header>
    </div>
  );
}

export default App;
