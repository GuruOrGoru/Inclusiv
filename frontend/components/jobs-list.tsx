import { getJobs } from "@/lib/api"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Building2, Bookmark, ExternalLink } from "lucide-react"
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
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    <Link href={`/jobs/${job.id}`} className="hover:text-blue-600 transition-colors">
                      {job.title}
                    </Link>
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(job.posted_date).toLocaleDateString()}
                    </div>
                    {job.salary && (
                      <div className="flex items-center text-green-600 font-medium">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Link href={`/jobs/${job.id}`}>
                    View Job
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-4">
              <p className="text-gray-700 line-clamp-3 leading-relaxed">
                {job.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {job.remote && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Remote
                  </Badge>
                )}
                <Badge variant="outline">Full-time</Badge>
                <Badge variant="outline">Inclusive</Badge>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  Posted {new Date(job.posted_date).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Quick Apply
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Pagination */}
      <div className="flex justify-center pt-8">
        <div className="flex items-center space-x-2">
          <Button variant="outline" disabled>Previous</Button>
          <Button variant="outline" className="bg-blue-600 text-white">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  )
}