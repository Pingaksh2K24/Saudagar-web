import { create } from 'zustand'

export const useProjectStore = create((set) => ({
  selectedProject: null,
  allProjects: [],
  
  setSelectedProject: (project) => set({ selectedProject: project }),
  setAllProjects: (projects) => set({ allProjects: projects }),
  
  clearSelectedProject: () => set({ selectedProject: null })
}))