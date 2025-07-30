import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, DollarSign, Building2, Users, Accessibility, ExternalLink, Bookmark, Share2 } from "lucide-react"

interface JobDetailsProps {
  jobId: string
}

export function JobDetails({ jobId }: JobDetailsProps) {
  // Mock job data - in real app, fetch based on jobId
  const job = {
    id: jobId,
    title: "Senior Software Engineer",
    company: "TechForAll Inc",
    location: "San Francisco, CA (Remote)",
    salary: "$120,000 - $160,000",
    posted_date: "2024-01-15",
    description: "We're looking for a passionate Senior Software Engineer to join our inclusive team. You'll work on cutting-edge projects while enjoying a supportive environment that values diversity and provides comprehensive accommodations.",
    requirements: [
      "5+ years of software development experience",
      "Proficiency in React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Strong problem-solving and communication skills",
      "Bachelor's degree in Computer Science or equivalent experience"
    ],
    responsibilities: [
      "Design and develop scalable web applications",
      "Collaborate with cross-functional teams",
      "Mentor junior developers",
      "Participate in code reviews and technical discussions",
      "Contribute to architectural decisions"
    ],
    benefits: [
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements and remote options",
      "Professional development budget ($3,000/year)",
      "Ergonomic workspace setup assistance",
      "Mental health and wellness programs",
      "Inclusive company culture and ERGs"
    ],
    accommodations: [
      "Screen reader compatible development environment",
      "Flexible working hours",
      "Ergonomic equipment provided",
      "Sign language interpreters for meetings",
      "Accessible office facilities",
      "Customizable workspace setup"
    ]
  }

  return (
    <div className="space-y-6">
      {/* Job Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {job.title}
                </CardTitle>
                <p className="text-xl text-blue-600 font-semibold mb-3">{job.company}</p>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Posted {new Date(job.posted_date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {job.salary}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-green-100 text-green-800">Remote Friendly</Badge>
            <Badge variant="outline">Full-time</Badge>
            <Badge variant="outline">Senior Level</Badge>
            <Badge className="bg-blue-100 text-blue-800">Inclusive Employer</Badge>
          </div>
          <div className="flex space-x-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 flex-1">
              <ExternalLink className="h-5 w-5 mr-2" />
              Apply Now
            </Button>
            <Button variant="outline" size="lg">
              Save Job
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Responsibilities */}
      <Card>
        <CardHeader>
          <CardTitle>Key Responsibilities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {job.responsibilities.map((resp, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{resp}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Benefits & Perks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Accommodations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Accessibility className="h-5 w-5 mr-2 text-blue-600" />
            Available Accommodations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {job.accommodations.map((accommodation, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{accommodation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Apply Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Apply?</h3>
            <p className="text-gray-600 mb-4">
              Join a company that values your unique abilities and provides the support you need to succeed.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="h-5 w-5 mr-2" />
              Apply for This Position
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}