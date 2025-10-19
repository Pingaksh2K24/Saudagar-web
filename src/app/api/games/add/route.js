import { NextResponse } from 'next/server'
import { db } from '../../../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function POST(request) {
  try {
    const body = await request.json()
    const { 
      name, 
      description, 
      open_time, 
      close_time, 
      open_number, 
      close_number, 
      winning_number, 
      result_number, 
      status, 
      minimum_bet_amount, 
      max_bet_amount, 
      result_declared_at 
    } = body
    
    const gameData = {
      name,
      description,
      open_time,
      close_time,
      open_number: open_number || null,
      close_number: close_number || null,
      winning_number: winning_number || null,
      result_number: result_number || null,
      status: status || 'Active',
      minimum_bet_amount: minimum_bet_amount || 10,
      max_bet_amount: max_bet_amount || 5000,
      result_declared_at: result_declared_at || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    const docRef = await addDoc(collection(db, 'games'), gameData)
    
    return NextResponse.json({
      success: true,
      message: 'Game created successfully!',
      game: {
        id: docRef.id,
        ...gameData
      }
    })
  } catch (error) {
    console.error('Error creating game:', error)
    return NextResponse.json(
      { error: 'Failed to create game', details: error.message }, 
      { status: 500 }
    )
  }
}