import { getJobs } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Accessibility, Building2 } from "lucide-react"
import Link from "next/link"

export async function FeaturedJobs() {
  let jobs
  try {
    const allJobs = await getJobs()
    jobs = allJobs.slice(0, 6)
  } catch (error) {
    jobs = []
  }

  if (jobs.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
            <p className="text-xl text-gray-600">Discover inclusive opportunities from top employers</p>
          </div>
          <div className="text-center text-gray-600">
            <p>Loading opportunities... Please ensure the backend is running on localhost:8414</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
          <p className="text-xl text-gray-600">Discover inclusive opportunities from top employers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {job.title}
                      </CardTitle>
                      <p className="text-blue-600 font-medium">{job.company}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  
                  {job.remote && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Remote Friendly
                    </Badge>
                  )}

                  <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>

                  {job.salary && (
                    <div className="flex items-center text-green-600 font-semibold">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(job.posted_date).toLocaleDateString()}
                    </div>
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Link href={`/jobs/${job.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            <Link href="/jobs">
              View All Jobs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}