"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PatientForm from "@/components/patient-form"

export default function PatientManagement() {
  const [showForm, setShowForm] = useState(false)
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch patients from the server on mount
  useEffect(() => {
    let mounted = true
    ;(async function fetchPatients() {
      setLoading(true)
      try {
        const res = await fetch('/api/patients')
        if (!res.ok) throw new Error('Failed to load patients')
        const data = await res.json()
        if (!mounted) return
        // map server rows to UI-friendly shape expected below
        const mapped = data.map((p: any) => ({
          id: p.id,
          name: p.full_name,
          age: p.age,
          gender: p.gender,
          diagnosis: p.diagnosis,
          severity: p.severity ? capitalize(p.severity) : '',
          duration: p.expected_duration,
          admissionDate: p.admission_date,
          bedNumber: p.assigned_bed,
          doctor: p.attending_doctor,
        }))
        setPatients(mapped)
      } catch (err: any) {
        setError(err?.message || 'Unable to load')
      } finally {
        setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  function capitalize(v?: string) {
    if (!v) return ''
    return v.charAt(0).toUpperCase() + v.slice(1)
  }

  // onSubmit from PatientForm will receive the created patient JSON from the API
  const handleAddPatient = (newPatient: any) => {
    // newPatient might be either the server row object or form values
    let mapped
    if (newPatient && newPatient.full_name) {
      mapped = {
        id: newPatient.id,
        name: newPatient.full_name,
        age: newPatient.age,
        gender: newPatient.gender,
        diagnosis: newPatient.diagnosis,
        severity: capitalize(newPatient.severity),
        duration: newPatient.expected_duration,
        admissionDate: newPatient.admission_date,
        bedNumber: newPatient.assigned_bed,
        doctor: newPatient.attending_doctor,
      }
    } else {
      mapped = { ...newPatient, id: `P${String(patients.length + 1).padStart(3, "0")}` }
    }

    setPatients((prev) => [...prev, mapped])
    setShowForm(false)
  }

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      Mild: "bg-green-100 text-green-800",
      Moderate: "bg-yellow-100 text-yellow-800",
      Severe: "bg-orange-100 text-orange-800",
      Critical: "bg-red-100 text-red-800",
    }
    return colors[severity] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Patient Registration & Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          {showForm ? "Cancel" : "+ Add New Patient"}
        </button>
      </div>

      {showForm && (
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <PatientForm onSubmit={handleAddPatient} onCancel={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="p-4 text-sm text-muted-foreground">Loading patients...</div>
      )}

      {error && (
        <div className="p-4 text-sm text-red-600">Error loading patients: {error}</div>
      )}

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Current Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Patient Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Diagnosis</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Severity</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Bed Number</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Doctor</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-foreground">{patient.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{patient.diagnosis}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${getSeverityColor(patient.severity)}`}
                      >
                        {patient.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{patient.bedNumber}</td>
                    <td className="py-3 px-4 text-muted-foreground">{patient.doctor}</td>
                    <td className="py-3 px-4 text-muted-foreground">{patient.duration}</td>
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
