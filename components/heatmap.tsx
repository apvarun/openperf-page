import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ReactTooltip from "react-tooltip";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface IHeatmap {
  list: Array<[string, number]>;
  heading: string;
}

export default function Heatmap(props: IHeatmap) {
  const data = props.list
    .sort(([, value1], [, value2]) => (value1 > value2 ? -1 : 1))
    .map(([name, value]) => ({ name, value }));

  const range = (data[0].value - data[data.length - 1].value) / 7;

  const colorScale = [
    "#fff5f5",
    "#fed7d7",
    "#feb2b2",
    "#fc8181",
    "#f56565",
    "#e53e3e",
    "#c53030",
    "#9b2c2c",
    "#742a2a",
  ];

  const [content, setContent] = useState("");

  const clientProps = {
    "data-tip": content,
  };

  return (
    <div className="bg-gray-100 rounded p-4 shadow-xl">
      <h2 className="text-xl font-semibold">{props.heading}</h2>

      <ComposableMap {...clientProps}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const cur = data.find((s) => s.name === geo.properties.NAME_LONG);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={cur ? colorScale[Math.ceil(cur.value / range)] : "#DDD"}
                  onMouseEnter={() => {
                    if (cur) {
                      const { NAME } = geo.properties;
                      setContent(`${NAME} — ${cur?.value}`);
                    }
                  }}
                  onMouseLeave={() => {
                    if (content) {
                      setContent("");
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {process.browser && <ReactTooltip>{content}</ReactTooltip>}
    </div>
  );
}
