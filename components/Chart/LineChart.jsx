import React from 'react'
import styles from '../../styles/Admin/Chart/Graph.module.css'
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
  Line
} from 'recharts'
import { orderToGraph } from '@/utility/helper'



const ChartArea = ({ title, number, percent, summary }) => {
  return (
    <div className={styles.graph__wrapper} style={{ width: '100%' }}>
      <h3 className={styles.title}>{title}</h3>
      <ResponsiveContainer width='100%' aspect={7 / 3}>
        <LineChart
          width={500}
          height={300}
          data={summary}
          margin={{ left: 0, bottom: 10 }}
        >
          <XAxis dataKey='date' hide={true} />
          <YAxis hide={true} />
          {/* <CartesianGrid stroke='#eee' strokeDasharray='5 5' /> */}
          <Line
            type='monotone'
            dataKey='total'
            stroke='#8884d8'
            strokeWidth={2}
          />
          <Line
            type='monotone'
            dataKey='delivered'
            stroke='green'
            strokeWidth={2}
          />
          <Line
            type='monotone'
            dataKey='failedAndCanceled'
            stroke='red'
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartArea
