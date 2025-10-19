import { NextResponse } from 'next/server'
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { auth } from '../../../lib/firebase'

export async function POST(request) {
  try {
    const { email, password, name } = await request.json()
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    await updateProfile(user, {
      displayName: name
    })
    
    await signOut(auth)
    
    return NextResponse.json({
      user: {
        uid: user.uid,
        email: user.email,
        name: name
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}