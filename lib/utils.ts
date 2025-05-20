import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface jobType {
  id: string
  title: string
  company: string
  location: string
  type: string
  experience: string
  remote: boolean
  hybrid: boolean
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  skills: string[]
}
