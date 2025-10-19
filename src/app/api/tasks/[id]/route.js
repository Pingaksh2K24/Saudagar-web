import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import {db} from '../../../lib/firebase'

export async function GET(request, { params }) {
  try {
    const taskRef = doc(db, 'tasks', params.id)
    const taskSnap = await getDoc(taskRef)
    
    if (taskSnap.exists()) {
      return Response.json({
        success: true,
        task: { id: taskSnap.id, ...taskSnap.data() }
      })
    } else {
      return Response.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      )
    }
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const taskData = await request.json()
    const taskRef = doc(db, 'tasks', params.id)
    
    await updateDoc(taskRef, {
      ...taskData,
      updatedAt: new Date()
    })
    
    return Response.json({
      success: true,
      task: { id: params.id, ...taskData }
    })
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const taskRef = doc(db, 'tasks', params.id)
    await deleteDoc(taskRef)
    
    return Response.json({
      success: true,
      message: 'Task deleted successfully'
    })
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}