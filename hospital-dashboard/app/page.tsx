"use client"

import { useState } from "react"
import DashboardHeader, { Tab } from "@/components/dashboard-header"
import BedStatusOverview from "@/components/bed-status-overview"
import PatientFlowChart from "@/components/patient-flow-chart"
import PatientManagement from "@/components/patient-management"
import MedicineOrdering from "@/components/medicine-ordering"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "patients" | "medicine">("overview")

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="px-6 py-8 space-y-8">
        {/* Content switched by header tabs */}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <BedStatusOverview />
            <PatientFlowChart />
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && <PatientManagement />}

        {/* Medicine Tab */}
        {activeTab === "medicine" && <MedicineOrdering />}
      </div>
    </main>
  )
}
