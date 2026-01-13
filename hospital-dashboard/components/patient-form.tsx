"use client"

import type React from "react"

import { useState } from "react"

interface PatientFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function PatientForm({ onSubmit, onCancel }: PatientFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    diagnosis: "",
    severity: "Moderate",
    duration: "",
    admissionDate: new Date().toISOString().split("T")[0],
    bedNumber: "",
    doctor: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    ;(async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch('/api/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            age: formData.age,
            gender: formData.gender,
            diagnosis: formData.diagnosis,
            severity: formData.severity,
            duration: formData.duration,
            admissionDate: formData.admissionDate,
            bedNumber: formData.bedNumber,
            doctor: formData.doctor,
          }),
        })

        const json = await res.json()
        if (!res.ok) {
          setError(json?.error || 'Failed to register patient')
          setLoading(false)
          return
        }

        // success
        onSubmit(json)
        setFormData({
      name: "",
      age: "",
      gender: "Male",
      diagnosis: "",
      severity: "Moderate",
      duration: "",
          admissionDate: new Date().toISOString().split("T")[0],
      bedNumber: "",
      doctor: "",
    })
        setLoading(false)
      } catch (err) {
        setError('Network error')
        setLoading(false)
      }
    })()
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Patient Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Patient Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Age *</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="45"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Diagnosis */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Diagnosis *</label>
          <input
            type="text"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Pneumonia"
          />
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Severity Level *</label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Expected Treatment Duration *</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="5 days"
          />
        </div>

        {/* Admission Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Admission Date *</label>
          <input
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Bed Number */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Assigned Bed Number *</label>
          <input
            type="text"
            name="bedNumber"
            value={formData.bedNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="A-101"
          />
        </div>

        {/* Doctor */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Attending Doctor *</label>
          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Dr. Sarah Johnson"
          />
        </div>
      </div>

      {/* status messages */}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 px-4 py-2 rounded-lg transition-opacity font-medium ${
            loading ? 'bg-primary/60 text-primary-foreground cursor-wait' : 'bg-primary text-primary-foreground hover:opacity-90'
          }`}
        >
          {loading ? 'Registering...' : 'Register Patient'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:opacity-70 transition-opacity font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
