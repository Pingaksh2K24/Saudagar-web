import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get('auth-user')
    
    if (!userCookie) {
      return NextResponse.json({ error: 'No user found' }, { status: 401 })
    }
    
    const user = JSON.parse(userCookie.value)
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 401 })
  }
}