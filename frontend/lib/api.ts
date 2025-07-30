const API_BASE_URL = "http://localhost:8414"

export interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  remote: boolean
  salary?: string
  posted_date: string
  apply_url?: string
}

export interface JobsResponse {
  count: number
  jobs: Job[]
}

async function fetchAPI(endpoint: string) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    
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
  const response: JobsResponse = await fetchAPI("/jobs")
  return response.jobs || []
}

export async function getJob(id: string): Promise<Job> {
  const jobs = await getJobs()
  const job = jobs.find(j => j.id === id)
  if (!job) {
    throw new Error(`Job with id ${id} not found`)
  }
  return job
}

export async function getStats() {
  // Mock stats since backend doesn't provide this endpoint
  return {
    total_jobs: 10000,
    total_employers: 500,
    successful_placements: 2500,
    accessibility_score: 95
  }
}

export async function searchJobs(query: string, filters?: any): Promise<Job[]> {
  // For now, just return all jobs since backend doesn't support search
  return getJobs()
}