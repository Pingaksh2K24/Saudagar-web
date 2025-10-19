import { NextResponse } from 'next/server'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../lib/firebase'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    const userData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || email.split('@')[0]
    }
    
    const response = NextResponse.json({ user: userData })
    
    response.cookies.set('auth-user', JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7
    })
    
    return response
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}