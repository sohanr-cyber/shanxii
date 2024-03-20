import React from "react";
import styles from "../../styles/Admin/Graph.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 0,
    pv: 0,
    amt: 0,
  },
  {
    name: "Page A",
    uv: 400,
    pv: 240,
    amt: 240,
  },
  {
    name: "Page B",
    uv: 300,
    pv: 139,
    amt: 221,
  },
  {
    name: "Page C",
    uv: 200,
    pv: 980,
    amt: 229,
  },
  {
    name: "Page D",
    uv: 278,
    pv: 390,
    amt: 200,
  },
  {
    name: "Page E",
    uv: 189,
    pv: 480,
    amt: 218,
  },
 
];

const ChartArea = ({ title, number, percent }) => {
  return (
    <div className={styles.graph__wrapper} style={{ width: "100%" , background:"white"}}>
      <h3 style={{ marginLeft: "10px" }}>Revinew Statistics</h3>
      <ResponsiveContainer width="100%" aspect={7 / 3}>
        <AreaChart
          width={1280}
          height={720}
          data={data}
          margin={{ left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tick={false} padding={{ left: 0, right: 0 }} />
          <YAxis hide={true} />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Tooltip />

          <Area
            type="monotone"
            dataKey="pv"
            stroke="lightblue"
            fillOpacity={1}
            fill="url(#colorUv)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartArea;
