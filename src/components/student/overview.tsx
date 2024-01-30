"use client"

import { format } from "date-fns"
import { Day } from "react-day-picker"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function Overview({
  data,
}: {
  data: { day: string; expense: number }[]
}) {
  const lastweek = new Date().setUTCDate(new Date().getUTCDate() - 7)
  const end = new Date()
  let loop = new Date(lastweek)
  const dataIn: { day: string; expense: number }[] = []
  while (loop <= end) {
    let fd = format(loop, "EEE")
    dataIn.push({
      day: fd,
      expense: data[data.findIndex((d) => d.day === fd)]?.expense ?? 0,
    })

    loop = new Date(loop.setDate(loop.getDate() + 1))
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dataIn}>
        <XAxis
          dataKey="day"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
        <Bar
          dataKey="expense"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
