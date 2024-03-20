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
  LineChart,
  Line,
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
    <div className={styles.graph__wrapper} style={{ width: "100%" }}>
      <h3 style={{ marginLeft: "10px" }}>Customer Statistics</h3>
      <ResponsiveContainer width="100%" aspect={7 / 3}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{ left: 0, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis hide={true} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <Line type="monotone" dataKey="amt" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartArea;
