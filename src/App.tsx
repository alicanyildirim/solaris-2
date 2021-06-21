import React, { useLayoutEffect} from 'react';
import './App.css';
import Creatures from "./Solaris-2.json";
import '../node_modules/react-vis/dist/style.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
function App() {
  const addData = (status) => {

  }
  const showData=()=>{
    let cs: any = Creatures;
    let creatures: any = cs[cs.length -1][1];
    let alive = {};
    let dead = {};
    let unknown = {};
    for (let i = 0; i < creatures.length; i++) {
      const tax: any = creatures[i].taxonomy;
      const creature_status: any = creatures[i].status;
      if (creature_status === "alive") {
          if (tax[0] in alive) {
            if (tax[1] in alive[tax[0]]) {
              if (tax[2] in alive[tax[0]][tax[1]] ) {
                alive[tax[0]][tax[1]][tax[2]]++;
              } else {
                alive[tax[0]][tax[1]][tax[2]] = 1;
              }
            } else {
              alive[tax[0]][tax[1]] = {};
              alive[tax[0]][tax[1]][tax[2]] = 1;
            }
            
          } else {
            alive[tax[0]] = {};
            alive[tax[0]][tax[1]] = {};
            alive[tax[0]][tax[1]][tax[2]] = 1;
          }
      } else if (creature_status === "dead") {
          if (tax[0] in dead) {
            if (tax[1] in dead[tax[0]]) {
              if (tax[2] in dead[tax[0]][tax[1]] ) {
                dead[tax[0]][tax[1]][tax[2]]++;
              } else {
                dead[tax[0]][tax[1]][tax[2]] = 1;
              }
            } else {
              dead[tax[0]][tax[1]] = {};
              dead[tax[0]][tax[1]][tax[2]] = 1;
            }
            
          } else {
            dead[tax[0]] = {};
            dead[tax[0]][tax[1]] = {};
            dead[tax[0]][tax[1]][tax[2]] = 1;
          }
      } else if (creature_status === "unknown") {
          if (tax[0] in unknown) {
            if (tax[1] in unknown[tax[0]]) {
              if (tax[2] in unknown[tax[0]][tax[1]] ) {
                unknown[tax[0]][tax[1]][tax[2]]++;
              } else {
                unknown[tax[0]][tax[1]][tax[2]] = 1;
              }
            } else {
              unknown[tax[0]][tax[1]] = {};
              unknown[tax[0]][tax[1]][tax[2]] = 1;
            }
            
          } else {
            unknown[tax[0]] = {};
            unknown[tax[0]][tax[1]] = {};
            unknown[tax[0]][tax[1]][tax[2]] = 1;
          }
      }
    }
   
    // Log Time: new Date(Creatures[0][0]).toDateString()
    return {alive, dead, unknown}
  }
  const mapData = ((status) => {
    let arr: any = [];
    for (let i = 0; i < Object.keys(status).length; i++) {
        let obj: any = { "name": Object.keys(status)[i], "children": [] };  
        const layer0: any = Object.values(status)[i];
        for (let j = 0; j < Object.keys(layer0).length; j++) {
          obj["children"].push({"name": Object.keys(layer0)[j], "children": []});
          const layer1: any = Object.values(layer0)[j];
          for (let z = 0; z < Object.keys(layer1).length; z++) {
            console.log(Object.keys(layer1)[z]);
            obj["children"][j]["children"].push({"name": Object.keys(layer1)[z], "value": Object.values(layer1)[z]});
          }
        }
        arr.push(obj);
    }
    return arr
  });
  useLayoutEffect(() => {
    let {alive, dead, unknown} = showData();
    let chart: any = am4core.create("chartdiv", am4charts.TreeMap);
    const aliveArr = mapData(alive);
    let deadArr = mapData(dead);
    let unknownArr = mapData(unknown);
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
    //chart.colors.step = 2;
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
    
    var level4 = chart.seriesTemplates.create("3");
    var level4_bullet = level4.bullets.push(new am4charts.LabelBullet());
    level4_bullet.locationY = 0.5;
    level4_bullet.locationX = 0.5;
    level4_bullet.label.text = "{name}";
    level4_bullet.label.fill = am4core.color("#fff");

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
           <div id="chartdiv" style={{ width: "80%", height: "400px" }}></div>
      </header>
    </div>
  );
}

export default App;
