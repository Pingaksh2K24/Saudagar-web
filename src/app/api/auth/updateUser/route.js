// import { NextResponse } from 'next/server'
// import { db } from '../../../lib/firebase'
// import { doc, updateDoc, getDoc } from 'firebase/firestore'

// export async function PUT(request) {
//   try {
//     const { id, full_name, email, mobile_number, role, status } = await request.json()

//     if (!id) {
//       return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
//     }

//     const userRef = doc(db, 'users', id.toString())
    
//     // Check if user exists
//     const userDoc = await getDoc(userRef)
//     if (!userDoc.exists()) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }

//     // Update user data
//     const updateData = {}
//     if (full_name) updateData.full_name = full_name
//     if (email) updateData.email = email
//     if (mobile_number) updateData.mobile_number = mobile_number
//     if (role) updateData.role = role
//     if (status) updateData.status = status
    
//     updateData.updated_at = new Date().toISOString()

//     await updateDoc(userRef, updateData)

//     return NextResponse.json({ 
//       message: 'User updated successfully',
//       user: { id, ...updateData }
//     }, { status: 200 })

//   } catch (error) {
//     console.error('Update user error:', error)
//     return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
//   }
// }