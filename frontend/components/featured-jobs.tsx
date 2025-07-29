import { getJobs } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Accessibility } from "lucide-react"
import Link from "next/link"

export async function FeaturedJobs() {
  let jobs
  try {
    const allJobs = await getJobs()
    jobs = allJobs.slice(0, 6) // Show first 6 jobs
  } catch (error) {
    jobs = []
  }

  if (jobs.length === 0) {
    return (
      <section className="py-16 bg-gray-50" aria-labelledby="featured-jobs-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="featured-jobs-heading" className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Opportunities
          </h2>
          <div className="text-center text-gray-600">
            <p>Loading opportunities... Please ensure the backend is running on localhost:8414</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="featured-jobs-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="featured-jobs-heading" className="text-3xl font-bold text-gray-900 mb-4">
            Featured Opportunities
          </h2>
          <p className="text-xl text-gray-600">Discover inclusive job opportunities tailored to your abilities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <div className="flex items-center text-gray-600 text-sm">
                  <span className="font-medium">{job.company}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
                    {job.location}
                  </div>

                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                    {job.type}
                  </div>

                  {job.salary_range && <div className="text-sm font-medium text-green-600">{job.salary_range}</div>}

                  <p className="text-gray-700 text-sm line-clamp-3">{job.description}</p>

                  {job.accessibility_features && job.accessibility_features.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Accessibility className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <div className="flex flex-wrap gap-1">
                        {job.accessibility_features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {job.accessibility_features.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{job.accessibility_features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <Button asChild className="w-full mt-4">
                    <Link href={`/jobs/${job.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/jobs">View All Opportunities</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
