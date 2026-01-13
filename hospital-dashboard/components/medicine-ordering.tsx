"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MedicineOrdering() {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      patientId: "P001",
      patientName: "John Smith",
      medicine: "Amoxicillin",
      quantity: 30,
      dosage: "500mg",
      frequency: "3x daily",
      status: "Approved",
      requestDate: "2024-01-09",
    },
    {
      id: 2,
      patientId: "P002",
      patientName: "Mary Johnson",
      medicine: "Paracetamol",
      quantity: 20,
      dosage: "650mg",
      frequency: "2x daily",
      status: "Pending",
      requestDate: "2024-01-10",
    },
    {
      id: 3,
      patientId: "P003",
      patientName: "Robert Williams",
      medicine: "Lisinopril",
      quantity: 60,
      dosage: "10mg",
      frequency: "1x daily",
      status: "Approved",
      requestDate: "2024-01-08",
    },
  ])

  const [selectedPatient, setSelectedPatient] = useState("P001")
  const [medicineName, setMedicineName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [dosage, setDosage] = useState("")
  const [frequency, setFrequency] = useState("2x daily")

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    if (medicineName && quantity && dosage) {
      const newMedicine = {
        id: medicines.length + 1,
        patientId: selectedPatient,
        patientName: "Patient " + selectedPatient,
        medicine: medicineName,
        quantity: Number.parseInt(quantity),
        dosage,
        frequency,
        status: "Pending",
        requestDate: new Date().toISOString().split("T")[0],
      }
      setMedicines([...medicines, newMedicine])
      setMedicineName("")
      setQuantity("")
      setDosage("")
      setFrequency("2x daily")
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: "bg-yellow-100 text-yellow-800",
      Approved: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Medicine Coordination & Ordering</h2>

      {/* Order Medicine Form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Create Medicine Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Select Patient *</label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="P001">P001 - John Smith</option>
                  <option value="P002">P002 - Mary Johnson</option>
                  <option value="P003">P003 - Robert Williams</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Medicine Name *</label>
                <input
                  type="text"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Aspirin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Quantity *</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Dosage *</label>
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="500mg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Dosage Frequency *</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="1x daily">1x daily</option>
                  <option value="2x daily">2x daily</option>
                  <option value="3x daily">3x daily</option>
                  <option value="4x daily">4x daily</option>
                  <option value="As needed">As needed</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Send Request to Pharmacy
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Medicine Requests Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Medicine Request Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Patient</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Medicine</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Quantity</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Dosage</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Frequency</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Request Date</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-foreground">{med.patientName}</td>
                    <td className="py-3 px-4 text-muted-foreground">{med.medicine}</td>
                    <td className="py-3 px-4 text-muted-foreground">{med.quantity}</td>
                    <td className="py-3 px-4 text-muted-foreground">{med.dosage}</td>
                    <td className="py-3 px-4 text-muted-foreground">{med.frequency}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(med.status)}`}
                      >
                        {med.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{med.requestDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
