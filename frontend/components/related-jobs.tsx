import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Building2 } from "lucide-react"
import Link from "next/link"

export function RelatedJobs() {
  const relatedJobs = [
    {
      id: "2",
      title: "Frontend Developer",
      company: "AccessTech",
      location: "Remote",
      posted_date: "2024-01-14",
      salary: "$80,000 - $110,000"
    },
    {
      id: "3",
      title: "UX Designer",
      company: "InclusiveDesign Co",
      location: "New York, NY",
      posted_date: "2024-01-13",
      salary: "$90,000 - $120,000"
    },
    {
      id: "4",
      title: "Data Analyst",
      company: "DataForAll",
      location: "Chicago, IL",
      posted_date: "2024-01-12",
      salary: "$70,000 - $95,000"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle>About TechForAll Inc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">TechForAll Inc</h3>
              <p className="text-sm text-gray-600">Technology • 500-1000 employees</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            TechForAll is a leading technology company committed to creating inclusive workplaces and accessible products. We believe diversity drives innovation.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Founded:</span>
              <span className="font-medium">2015</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Industry:</span>
              <span className="font-medium">Technology</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Open Jobs:</span>
              <span className="font-medium">23</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Jobs
          </Button>
        </CardContent>
      </Card>

      {/* Related Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Similar Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {relatedJobs.map((job) => (
              <div key={job.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                <h4 className="font-semibold text-gray-900 mb-1">
                  <Link href={`/jobs/${job.id}`} className="hover:text-blue-600 transition-colors">
                    {job.title}
                  </Link>
                </h4>
                <p className="text-blue-600 text-sm font-medium mb-2">{job.company}</p>
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(job.posted_date).toLocaleDateString()}
                  </span>
                  <span className="text-xs font-medium text-green-600">
                    {job.salary}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View More Jobs
          </Button>
        </CardContent>
      </Card>

      {/* Job Alert */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Get Job Alerts</h3>
          <p className="text-sm text-gray-600 mb-4">
            Never miss out on similar opportunities. Get notified when new jobs match your criteria.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create Alert
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}