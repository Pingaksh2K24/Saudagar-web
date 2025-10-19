import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, where } from 'firebase/firestore'
import { db } from '../../lib/firebase'

async function verifyUser() {
  try {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get('auth-user')
    
    if (!userCookie) return null
    
    return JSON.parse(userCookie.value)
  } catch {
    return null
  }
}

export async function GET(request) {
  const user = await verifyUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    
    const tasksRef = collection(db, 'tasks')
    let tasksQuery = tasksRef
    
    if (projectId) {
      tasksQuery = query(tasksRef, where('projectId', '==', projectId))
    }
    
    const snapshot = await getDocs(tasksQuery)
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
    }))
    
    return NextResponse.json({ tasks, message: 'Tasks fetched successfully' })
  } catch (error) {
    console.error('Firebase Error:', error)
    return NextResponse.json({ 
      error: `Firebase Error: ${error.message}`,
      details: error.code || 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request) {
  const user = await verifyUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, description, status, priority, projectId, projectName, dueDate } = await request.json()
    
    if (!title || !description || !projectId) {
      return NextResponse.json({ error: 'Title, description, and projectId are required' }, { status: 400 })
    }
    
    const taskData = {
      title,
      description,
      status: status || 'pending',
      priority: priority || 'medium',
      projectId,
      projectName: projectName || 'Unknown Project',
      dueDate: dueDate || null,
      createdBy: user.name || user.email || 'Current User',
      createdAt: serverTimestamp(),
      userId: user.id || user.email || user.uid
    }
    
    const tasksRef = collection(db, 'tasks')
    const docRef = await addDoc(tasksRef, taskData)
    
    const newTask = {
      id: docRef.id,
      taskId: docRef.id,
      ...taskData,
      createdAt: new Date().toISOString()
    }
    
    return NextResponse.json({ 
      task: newTask, 
      message: 'Task created successfully in Firebase!' 
    }, { status: 201 })
  } catch (error) {
    console.error('Firebase Create Error:', error)
    return NextResponse.json({ 
      error: `Failed to create task: ${error.message}`,
      details: error.code || 'Unknown Firebase error'
    }, { status: 500 })
  }
}

export async function PUT(request) {
  const user = await verifyUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, title, description, status, priority, dueDate } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 })
    }
    
    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(status && { status }),
      ...(priority && { priority }),
      ...(dueDate !== undefined && { dueDate }),
      updatedAt: serverTimestamp()
    }
    
    const taskRef = doc(db, 'tasks', id)
    await updateDoc(taskRef, updateData)
    
    const updatedTask = {
      id,
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    return NextResponse.json({ 
      task: updatedTask, 
      message: 'Task updated successfully!' 
    })
  } catch (error) {
    console.error('Firebase Update Error:', error)
    return NextResponse.json({ 
      error: `Failed to update task: ${error.message}`,
      details: error.code || 'Unknown Firebase error'
    }, { status: 500 })
  }
}

export async function DELETE(request) {
  const user = await verifyUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 })
    }
    
    const taskRef = doc(db, 'tasks', id)
    await deleteDoc(taskRef)
    
    return NextResponse.json({ 
      message: 'Task deleted successfully!',
      taskId: id
    })
  } catch (error) {
    console.error('Firebase Delete Error:', error)
    return NextResponse.json({ 
      error: `Failed to delete task: ${error.message}`,
      details: error.code || 'Unknown Firebase error'
    }, { status: 500 })
  }
}