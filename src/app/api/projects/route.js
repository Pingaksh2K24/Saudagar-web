import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '../../lib/firebase'
import { collection, getDocs, addDoc, serverTimestamp, query, where } from 'firebase/firestore'

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

export async function GET() {
  const user = await verifyUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const projectsRef = collection(db, 'projects')
    const snapshot = await getDocs(projectsRef)
    
    // Get all projects first
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
    }))
    
    // Fetch tasks for each project
    const projectsWithTasks = await Promise.all(
      projects.map(async (project) => {
        try {
          const tasksRef = collection(db, 'tasks')
          const tasksQuery = query(tasksRef, where('projectId', '==', project.id))
          const tasksSnapshot = await getDocs(tasksQuery)
          
          const tasks = tasksSnapshot.docs.map(taskDoc => ({
            id: taskDoc.id,
            ...taskDoc.data(),
            createdAt: taskDoc.data().createdAt?.toDate?.()?.toISOString() || taskDoc.data().createdAt
          }))
          
          return { ...project, tasks }
        } catch (error) {
          console.error(`Error fetching tasks for project ${project.id}:`, error)
          return { ...project, tasks: [] }
        }
      })
    )
    
    return NextResponse.json({ projects: projectsWithTasks, message: 'Projects with tasks fetched successfully' })
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
    const { name, description, status, priority, budget } = await request.json()
    
    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description required' }, { status: 400 })
    }
    
    const projectData = {
      name,
      description,
      status: status || 'active',
      priority: priority || 'medium', 
      budget: budget || 0,
      tasks: [],
      createdBy: user.name || user.email || 'Current User',
      createdAt: serverTimestamp(),
      userId: user.id || user.email
    }
    
    const projectsRef = collection(db, 'projects')
    const docRef = await addDoc(projectsRef, projectData)
    
    const newProject = {
      id: docRef.id,
      ...projectData,
      createdAt: new Date().toISOString()
    }
    
    return NextResponse.json({ 
      project: newProject, 
      message: 'Project created successfully in Firebase!' 
    }, { status: 201 })
  } catch (error) {
    console.error('Firebase Create Error:', error)
    return NextResponse.json({ 
      error: `Failed to create project: ${error.message}`,
      details: error.code || 'Unknown Firebase error'
    }, { status: 500 })
  }
}