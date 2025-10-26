import { NextResponse } from 'next/server'

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    console.log('Deleting game with ID:', id)
    
    // Yahan tumhara database logic aayega
    // For now, just return success
    
    return NextResponse.json({ success: true, message: 'Game deleted successfully' })
  } catch (error) {
    console.error('Error deleting game:', error)
    return NextResponse.json({ error: 'Failed to delete game' }, { status: 500 })
  }
}