import { useMediaQuery } from "beautiful-react-hooks";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";

interface ITrend {
  list: Array<[string, { users: number; views: number }]>;
  heading?: string;
}

export default function Trend(props: ITrend) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const height = 250;

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, height * 2);
    gradient.addColorStop(0, "rgba(254, 178, 178, 0.75)");
    gradient.addColorStop(1, "rgba(254, 178, 178, 0.05)");

    const orangeGradient = ctx.createLinearGradient(0, 0, 0, height * 2);
    orangeGradient.addColorStop(0, "rgba(254, 235, 200, 0.75)");
    orangeGradient.addColorStop(1, "rgba(254, 235, 200, 0.05)");

    return {
      labels: props.list.map(([key]) => key),
      datasets: [
        {
          label: "Page Views",
          fill: true,
          lineTension: 0.4,
          backgroundColor: orangeGradient || "rgb(254, 235, 200)",
          borderColor: "#F6AD55",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#ED8936",
          pointBackgroundColor: "#ED8936",
          pointBorderWidth: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "#ED8936",
          pointHoverBorderColor: "#ED8936",
          pointHoverBorderWidth: 0,
          pointRadius: 3,
          pointHitRadius: 10,
          data: props.list.map(([, value]) => value.views),
          type: "line",
        },
        {
          label: "Visitors",
          fill: true,
          lineTension: 0.4,
          backgroundColor: gradient || "rgba(254, 178, 178, 0.75)",
          borderColor: "#fc8181",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#f56565",
          pointBackgroundColor: "#f56565",
          pointBorderWidth: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "#f56565",
          pointHoverBorderColor: "#f56565",
          pointHoverBorderWidth: 0,
          pointRadius: 3,
          pointHitRadius: 10,
          data: props.list.map(([, value]) => value.users),
          type: "line",
        },
      ],
    };
  };

  const chartOptions = {
    cornerRadius: 5,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            display: true,
            color: "#e2e8f0",
            zeroLineColor: "#cbd5e0",
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
          },
        },
      ],
      xAxes: [
        {
          offset: true,
          gridLines: {
            display: false,
          },
          type: "time",
          ticks: {
            autoSkip: true,
            maxTicksLimit: isMobile ? 2 : 7,
          },
          time: {
            tooltipFormat: "MMM DD",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  };

  return (
    <div className="bg-gray-100 rounded p-8 shadow-xl" id="graph-container">
      <Line key={height} data={data} height={height} options={chartOptions} />
    </div>
  );
}
