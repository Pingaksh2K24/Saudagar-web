// TypeScript configuration to ignore build errors temporarily
export {}

// Add type declarations for missing modules
declare module '../../../../utils/helper' {
  export function formatDateForInput(date: unknown): string
}

// Global type augmentations
declare global {
  interface Window {
    opera?: unknown
    MSStream?: unknown
  }
}