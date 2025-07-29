import { getJobs } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Accessibility, DollarSign } from "lucide-react"
import Link from "next/link"

export async function JobsList() {
  let jobs
  try {
    jobs = await getJobs()
  } catch (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Unable to load jobs. Please ensure the backend is running on localhost:8414</p>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No jobs found. Try adjusting your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <Card key={job.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="font-medium text-lg">{job.company}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                    {job.type}
                  </div>
                  {job.salary_range && (
                    <div className="flex items-center text-green-600 font-medium">
                      <DollarSign className="h-4 w-4 mr-1" aria-hidden="true" />
                      {job.salary_range}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-2">
                  Posted {new Date(job.posted_date).toLocaleDateString()}
                </div>
                <Button asChild>
                  <Link href={`/jobs/${job.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

            {job.accessibility_features && job.accessibility_features.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Accessibility className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-700">Accessibility Features:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.accessibility_features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {job.accommodations && job.accommodations.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Available Accommodations:</div>
                <div className="flex flex-wrap gap-2">
                  {job.accommodations.slice(0, 3).map((accommodation, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {accommodation}
                    </Badge>
                  ))}
                  {job.accommodations.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.accommodations.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
