"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function PatientFlowChart() {
  const predictionData = [
    { time: "12 AM", inflow: 2, outflow: 1 },
    { time: "4 AM", inflow: 1, outflow: 2 },
    { time: "8 AM", inflow: 5, outflow: 3 },
    { time: "12 PM", inflow: 8, outflow: 4 },
    { time: "4 PM", inflow: 6, outflow: 5 },
    { time: "8 PM", inflow: 4, outflow: 6 },
    { time: "12 AM +1", inflow: 2, outflow: 3 },
  ]

  const timeframeData = [
    { period: "Today", inflow: 28, outflow: 15 },
    { period: "Next 24h", inflow: 32, outflow: 18 },
    { period: "Next 48h", inflow: 58, outflow: 35 },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">AI-Predicted Patient Flow</h2>
      <p className="text-sm text-muted-foreground">Predictions based on historical hospital data and trends</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {timeframeData.map((item) => (
          <Card key={item.period} className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">{item.period}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Admissions (Inflow)</span>
                <span className="font-bold text-primary">{item.inflow}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Discharges (Outflow)</span>
                <span className="font-bold text-accent">{item.outflow}</span>
              </div>
              <div className="pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Net Change: </span>
                <span className={`font-semibold ${item.inflow - item.outflow > 0 ? "text-primary" : "text-accent"}`}>
                  {item.inflow - item.outflow > 0 ? "+" : ""}
                  {item.inflow - item.outflow}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>24-Hour Patient Flow Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
              <Legend />
              <Bar dataKey="inflow" fill="var(--color-primary)" name="Admissions" radius={[8, 8, 0, 0]} />
              <Bar dataKey="outflow" fill="var(--color-accent)" name="Discharges" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
