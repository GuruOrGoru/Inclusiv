"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { MapPin, Building2, Clock, DollarSign } from "lucide-react"

export function JobsFilters() {
  const jobTypes = [
    { id: "full-time", label: "Full-time", count: 1234 },
    { id: "part-time", label: "Part-time", count: 567 },
    { id: "contract", label: "Contract", count: 890 },
    { id: "remote", label: "Remote", count: 2345 }
  ]

  const locations = [
    { id: "new-york", label: "New York", count: 456 },
    { id: "california", label: "California", count: 789 },
    { id: "texas", label: "Texas", count: 234 },
    { id: "florida", label: "Florida", count: 345 }
  ]

  const companies = [
    { id: "tech-corp", label: "TechCorp", count: 45 },
    { id: "data-flow", label: "DataFlow Inc", count: 32 },
    { id: "design-studio", label: "Design Studio", count: 28 },
    { id: "innovate-co", label: "Innovate Co", count: 19 }
  ]

  const salaryRanges = [
    { id: "0-50k", label: "$0 - $50k", count: 234 },
    { id: "50k-75k", label: "$50k - $75k", count: 456 },
    { id: "75k-100k", label: "$75k - $100k", count: 789 },
    { id: "100k+", label: "$100k+", count: 567 }
  ]

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Type */}
        <div>
          <div className="flex items-center mb-3">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <h3 className="font-medium text-gray-900">Job Type</h3>
          </div>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id={type.id} />
                  <Label htmlFor={type.id} className="text-sm text-gray-700">
                    {type.label}
                  </Label>
                </div>
                <span className="text-xs text-gray-500">({type.count})</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div>
          <div className="flex items-center mb-3">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <h3 className="font-medium text-gray-900">Location</h3>
          </div>
          <div className="space-y-2">
            {locations.map((location) => (
              <div key={location.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id={location.id} />
                  <Label htmlFor={location.id} className="text-sm text-gray-700">
                    {location.label}
                  </Label>
                </div>
                <span className="text-xs text-gray-500">({location.count})</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Company */}
        <div>
          <div className="flex items-center mb-3">
            <Building2 className="h-4 w-4 mr-2 text-gray-500" />
            <h3 className="font-medium text-gray-900">Company</h3>
          </div>
          <div className="space-y-2">
            {companies.map((company) => (
              <div key={company.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id={company.id} />
                  <Label htmlFor={company.id} className="text-sm text-gray-700">
                    {company.label}
                  </Label>
                </div>
                <span className="text-xs text-gray-500">({company.count})</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Salary Range */}
        <div>
          <div className="flex items-center mb-3">
            <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
            <h3 className="font-medium text-gray-900">Salary Range</h3>
          </div>
          <div className="space-y-2">
            {salaryRanges.map((range) => (
              <div key={range.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id={range.id} />
                  <Label htmlFor={range.id} className="text-sm text-gray-700">
                    {range.label}
                  </Label>
                </div>
                <span className="text-xs text-gray-500">({range.count})</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            Clear All Filters
          </Button>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}