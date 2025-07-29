"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export function JobsSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")

  const handleSearch = () => {
    // This would trigger a search with the current filters
    console.log("Searching with:", { searchQuery, location, jobType })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="job-search" className="sr-only">
            Search jobs
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              aria-hidden="true"
            />
            <Input
              id="job-search"
              type="text"
              placeholder="Search jobs, skills, or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="location-select" className="sr-only">
            Location
          </label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location-select">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="california">California</SelectItem>
              <SelectItem value="texas">Texas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="job-type-select" className="sr-only">
            Job Type
          </label>
          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger id="job-type-select">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button onClick={handleSearch} className="px-8">
          <Search className="h-4 w-4 mr-2" aria-hidden="true" />
          Search Jobs
        </Button>

        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
          More Filters
        </Button>
      </div>
    </div>
  )
}
