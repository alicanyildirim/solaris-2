import React, { useLayoutEffect} from 'react';
import './App.css';
import Xreatures from "./Solaris-2.json";
import '../node_modules/react-vis/dist/style.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
function App() {

  const showData=()=>{
    let cs: any = Xreatures;
    let Creatures: any = cs[cs.length -1][1];
    let alive = {};
    let dead = {};
    let unknown = {};
    for (let i = 0; i < Creatures.length; i++) {
      const creature: any = Creatures[i];
      if (creature.status === "alive") {
          if (creature.taxonomy[0] in alive) {
            if (creature.taxonomy[1] in alive[creature.taxonomy[0]]) {
              if (creature.taxonomy[2] in alive[creature.taxonomy[0]][creature.taxonomy[1]] ) {
                alive[creature.taxonomy[0]][creature.taxonomy[1]][creature.taxonomy[2]]++;
              } else {
                alive[creature.taxonomy[0]][creature.taxonomy[1]][creature.taxonomy[2]] = 1;
              }
            } else {
              alive[creature.taxonomy[0]][creature.taxonomy[1]] = {};
              alive[creature.taxonomy[0]][creature.taxonomy[1]][creature.taxonomy[2]] = 1;
            }
            
          } else {
            alive[creature.taxonomy[0]] = {};
            alive[creature.taxonomy[0]][creature.taxonomy[1]] = {};
            alive[creature.taxonomy[0]][creature.taxonomy[1]][creature.taxonomy[2]] = 1;
          }
      } else if (creature.status === "dead") {
          if (creature.taxonomy[0] in dead) {
            if (creature.taxonomy[1] in dead[creature.taxonomy[0]]) {
              if (creature.taxonomy[2] in dead[creature.taxonomy[0]][creature.taxonomy[1]] ) {
                dead[creature.taxonomy[0]][creature.taxonomy[1]][creature.taxonomy[2]]++;
              } else {
                dead[creature.taxonomy[0]][creature.taxonomy[1]][creature.taxonomy[2]] = 1;
              }
            } else {
              dead[creature.taxonomy[0]][creature.taxonomy[1]] = {};
              dead[creature.taxonomy[0]][creature.taxonomy[1]][creature.taxonomy[2]] = 1;
            }
            
          } else {
            dead[creature.taxonomy[0]] = {};
            dead[creature.taxonomy[0]][creature.taxonomy[1]] = {};
            dead[creature.taxonomy[0]][creature.taxonomy[1]][creature.taxonomy[2]] = 1;
          }
      } else if (creature.status === "unknown") {
          if (creature.taxonomy[0] in unknown) {
            if (creature.taxonomy[1] in unknown[creature.taxonomy[0]]) {
              if (creature.taxonomy[2] in unknown[creature.taxonomy[0]][creature.taxonomy[1]] ) {
                unknown[creature.taxonomy[0]][creature.taxonomy[1]][creature.taxonomy[2]]++;
              } else {
                unknown[creature.taxonomy[0]][creature.taxonomy[1]][creature.taxonomy[2]] = 1;
              }
            } else {
              unknown[creature.taxonomy[0]][creature.taxonomy[1]] = {};
              unknown[creature.taxonomy[0]][creature.taxonomy[1]][creature.taxonomy[2]] = 1;
            }
            
          } else {
            unknown[creature.taxonomy[0]] = {};
            unknown[creature.taxonomy[0]][creature.taxonomy[1]] = {};
            unknown[creature.taxonomy[0]][creature.taxonomy[1]][creature.taxonomy[2]] = 1;
          }
      }
    }
    console.log(alive,dead,unknown);
   
    // Log Time: new Date(Creatures[0][0]).toDateString()
    return {alive, dead, unknown}
  }

  useLayoutEffect(() => {
    let {alive, dead, unknown} = showData();
    let chart: any = am4core.create("chartdiv", am4charts.TreeMap);
    let aliveArr: any = [];
    for (let i = 0; i < Object.keys(alive).length; i++) {
        let obj: any = { "name": Object.keys(alive)[i], "children": [] }; 
        
        const layer0: any = Object.values(alive)[i];
        for (let j = 0; j < Object.keys(layer0).length; j++) {
          obj["children"].push({"name": Object.keys(layer0)[j], "children": []});
          const layer1: any = Object.values(layer0)[j];
          for (let z = 0; z < Object.keys(layer1).length; z++) {
            obj["children"][j]["children"].push({"name": Object.keys(layer1)[z], "value": Object.values(layer1)[z]});
          }
        }
        aliveArr.push(obj);
    }
    let deadArr: any = [];
    for (let i = 0; i < Object.keys(dead).length; i++) {
        let obj: any = { "name": Object.keys(dead)[i], "children": [] }; 
        
        const layer0: any = Object.values(dead)[i];
        for (let j = 0; j < Object.keys(layer0).length; j++) {
          obj["children"].push({"name": Object.keys(layer0)[j], "children": []});
          const layer1: any = Object.values(layer0)[j];
          for (let z = 0; z < Object.keys(layer1).length; z++) {
            obj["children"][j]["children"].push({"name": Object.keys(layer1)[z], "value": Object.values(layer1)[z]});
          }
        }
        deadArr.push(obj);
    }
    let unknownArr: any = [];
    for (let i = 0; i < Object.keys(unknown).length; i++) {
        let obj: any = { "name": Object.keys(unknown)[i], "children": [] }; 
        
        const layer0: any = Object.values(unknown)[i];
        for (let j = 0; j < Object.keys(layer0).length; j++) {
          obj["children"].push({"name": Object.keys(layer0)[j], "children": []});
          const layer1: any = Object.values(layer0)[j];
          for (let z = 0; z < Object.keys(layer1).length; z++) {
            obj["children"][j]["children"].push({"name": Object.keys(layer1)[z], "value": Object.values(layer1)[z]});
          }
        }
        unknownArr.push(obj);
    }
    chart.data = [
      {
      "name": "Alive",
        "children": aliveArr
      }, 
      {
        "name": "Dead",
        "children": deadArr
      },
      {
        "name": "Unknown",
        "children": unknownArr
      }

    ];
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
    chart.homeText = "Species Status";
    chart.navigationBar = new am4charts.NavigationBar();
    return () => {
      chart.dispose();
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
           <div id="chartdiv" style={{ width: "90%", height: "500px" }}></div>
      </header>
    </div>
  );
}

export default App;
