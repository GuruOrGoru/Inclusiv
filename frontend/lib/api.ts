const API_BASE_URL = "http://localhost:8414"

export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  description: string
  requirements: string[]
  accommodations: string[]
  salary_range?: string
  posted_date: string
  accessibility_features: string[]
}

export interface Employer {
  id: string
  name: string
  description: string
  industry: string
  size: string
  accessibility_rating: number
  open_positions: number
  logo_url?: string
}

export interface Insight {
  id: string
  title: string
  content: string
  category: string
  published_date: string
  author: string
}

export interface Stats {
  total_jobs: number
  total_employers: number
  successful_placements: number
  accessibility_score: number
}

async function fetchAPI(endpoint: string) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error)
    throw error
  }
}

export async function getJobs(): Promise<Job[]> {
  return fetchAPI("/api/jobs")
}

export async function getJob(id: string): Promise<Job> {
  return fetchAPI(`/api/jobs/${id}`)
}

export async function getEmployers(): Promise<Employer[]> {
  return fetchAPI("/api/employers")
}

export async function getEmployer(id: string): Promise<Employer> {
  return fetchAPI(`/api/employers/${id}`)
}

export async function getInsights(): Promise<Insight[]> {
  return fetchAPI("/api/insights")
}

export async function getStats(): Promise<Stats> {
  return fetchAPI("/api/stats")
}

export async function searchJobs(query: string, filters?: any): Promise<Job[]> {
  const params = new URLSearchParams()
  if (query) params.append("q", query)
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, String(value))
    })
  }
  return fetchAPI(`/api/jobs/search?${params.toString()}`)
}
