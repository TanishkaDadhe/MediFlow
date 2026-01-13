import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

const allowedSeverities = ['mild', 'moderate', 'severe', 'critical']

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      age,
      gender,
      diagnosis,
      severity,
      duration,
      admissionDate,
      bedNumber,
      doctor,
    } = body

    if (!name || !diagnosis) {
      return NextResponse.json({ error: 'name and diagnosis are required' }, { status: 400 })
    }

    const severityNormalized = severity ? String(severity).toLowerCase() : 'moderate'
    if (!allowedSeverities.includes(severityNormalized)) {
      return NextResponse.json({ error: 'invalid severity value' }, { status: 400 })
    }

    const insertObj: any = {
      full_name: name,
      age: age ? parseInt(age, 10) : null,
      gender,
      diagnosis,
      severity: severityNormalized,
      expected_duration: duration,
      admission_date: admissionDate ? new Date(admissionDate) : null,
      assigned_bed: bedNumber,
      attending_doctor: doctor,
    }

    const { data, error } = await supabaseAdmin.from('patients').insert(insertObj).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }
}
