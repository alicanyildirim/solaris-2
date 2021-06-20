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
    let chart = am4core.create("chartdiv", am4charts.TreeMap);



    chart.data = [{
"name": "First",
  "children": [
    {
      "name": "A1",
      "children": [
        { "name": "A1-1", "value": 687 },
        { "name": "A1-2", "value": 148 }
      ]
    },
    {
      "name": "A2",
      "children": [
        { "name": "A2-1", "value": 220 },
        { "name": "A2-2", "value": 480 },
        { "name": "A2-3", "value": 150 }
      ]
    },
    {
      "name": "A3",
      "children": [
        { "name": "A3-1", "value": 200 },
        { "name": "A3-2", "value": 320 }
      ]
    },
  ]
}, {
  "name": "Second",
  "children": [
    {
      "name": "B1",
      "children": [
        { "name": "B1-1", "value": 220 },
        { "name": "B1-2", "value": 150 },
        { "name": "B1-3", "value": 199 },
        { "name": "B1-4", "value": 481 }
      ]
    },
    {
      "name": "B2",
      "children": [
        { "name": "B2-1", "value": 210 },
        { "name": "B2-3", "value": 150 }
      ]
    },
    {
      "name": "B3",
      "children": [
        { "name": "B3-1", "value": 320 },
        { "name": "B3-2", "value": 310 }
      ]
    },
  ]
    }];
    chart.maxLevels = 1;
    chart.colors.step = 2;
    chart.dataFields.value = "value";
    chart.dataFields.name = "name";
      
    chart.dataFields.children = "children";
    var level1 = chart.seriesTemplates.create("0");
var level1_bullet = level1.bullets.push(new am4charts.LabelBullet());
level1_bullet.locationY = 0.5;
level1_bullet.locationX = 0.5;
level1_bullet.label.text = "{name}";
level1_bullet.label.fill = am4core.color("#fff");

var level2 = chart.seriesTemplates.create("1");
var level2_bullet = level2.bullets.push(new am4charts.LabelBullet());
level2_bullet.locationY = 0.5;
level2_bullet.locationX = 0.5;
level2_bullet.label.text = "{name}";
level2_bullet.label.fill = am4core.color("#fff");

var level3 = chart.seriesTemplates.create("2");
var level3_bullet = level3.bullets.push(new am4charts.LabelBullet());
level3_bullet.locationY = 0.5;
level3_bullet.locationX = 0.5;
level3_bullet.label.text = "{name}";
level3_bullet.label.fill = am4core.color("#fff");

/* Navigation bar */
chart.homeText = "TOP";
chart.navigationBar = new am4charts.NavigationBar();
    return () => {
      chart.dispose();
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
