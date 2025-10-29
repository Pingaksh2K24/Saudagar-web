// import { NextResponse } from 'next/server'
// import { db } from '../../../lib/firebase'
// import { collection, getDocs } from 'firebase/firestore'

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