// import { NextResponse } from 'next/server'
// import { db } from '../../lib/firebase'
// import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore'

// export async function GET() {
//   try {
//     const gamesCollection = collection(db, 'games')
//     const gamesSnapshot = await getDocs(gamesCollection)
//     const games = gamesSnapshot.docs.map(doc => ({
//       id: doc.id,
//       game_name: doc.data().gameName,
//       game_type: doc.data().type || 'single',
//       status: doc.data().status || 'active',
//       min_bet_amount: doc.data().minBet || 10,
//       max_bet_amount: doc.data().maxBet || 1000,
//       created_at: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
//       ...doc.data()
//     }))
    
//     return NextResponse.json({ games })
//   } catch (error) {
//     console.error('Error fetching games:', error)
//     return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 })
//   }
// }

// export async function POST(request) {
//   console.log('API Route called')
//   try {
//     const body = await request.json()
//     console.log('Request body:', body)
//     const { gameName, description, openTime, closeTime, status, resultNumber } = body
    
//     // Get current user from headers or session (you may need to implement auth middleware)
//     const currentUserId = request.headers.get('user-id') || 'admin' // Temporary fallback
//     console.log('Current user ID:', currentUserId)
    
//     const gameData = {
//       gameName,
//       description,
//       openTime,
//       closeTime,
//       status,
//       resultNumber: resultNumber || null,
//       createdAt: serverTimestamp(),
//       createdBy: currentUserId,
//       updatedAt: serverTimestamp(),
//       updatedBy: currentUserId
//     }
//     console.log('Game data to save:', gameData)

//     const docRef = await addDoc(collection(db, 'games'), gameData)
//     console.log('Document created with ID:', docRef.id)
    
//     const response = {
//       success: true,
//       message: 'Game created successfully!',
//       game: {
//         gameId: docRef.id,
//         ...gameData
//       }
//     }
//     console.log('Sending response:', response)
//     return NextResponse.json(response)
//   } catch (error) {
//     console.error('Error creating game:', error)
//     console.error('Error stack:', error.stack)
//     const errorResponse = { error: 'Failed to create game', details: error.message }
//     console.log('Sending error response:', errorResponse)
//     return NextResponse.json(errorResponse, { status: 500 })
//   }
// }