"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BedStatusOverview() {
  const totalBeds = 150
  const occupiedBeds = 98
  const availableBeds = totalBeds - occupiedBeds
  const occupancyPercentage = Math.round((occupiedBeds / totalBeds) * 100)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Bed Status Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Beds */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Beds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalBeds}</div>
            <p className="text-xs text-muted-foreground mt-2">Available capacity</p>
          </CardContent>
        </Card>

        {/* Occupied Beds */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Occupied Beds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{occupiedBeds}</div>
            <p className="text-xs text-muted-foreground mt-2">Currently in use</p>
          </CardContent>
        </Card>

        {/* Available Beds */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Beds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{availableBeds}</div>
            <p className="text-xs text-muted-foreground mt-2">Ready for admission</p>
          </CardContent>
        </Card>

        {/* Occupancy Rate */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{occupancyPercentage}%</div>
            <div className="mt-3 w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm">ICU Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Occupied:</span>
              <span className="font-medium text-foreground">17/20</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div className="bg-destructive h-1.5 rounded-full" style={{ width: "93%" }} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm">General Ward</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Occupied:</span>
              <span className="font-medium text-foreground">35/50</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div className="bg-accent h-1.5 rounded-full" style={{ width: "65%" }} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm">OT status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Occupied:</span>
              <span className="font-medium text-foreground">3/5</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: "45%" }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
