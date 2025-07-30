import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Users, Star, Briefcase } from "lucide-react"
import Link from "next/link"

export function CompaniesGrid() {
  const companies = [
    {
      id: "1",
      name: "TechForAll Inc",
      description: "Leading technology company committed to creating inclusive workplaces and accessible products.",
      industry: "Technology",
      size: "500-1000",
      location: "San Francisco, CA",
      accessibility_rating: 4.8,
      open_positions: 23,
      logo_url: null
    },
    {
      id: "2",
      name: "AccessTech Solutions",
      description: "Innovative software solutions with a focus on accessibility and universal design.",
      industry: "Software",
      size: "100-500",
      location: "Austin, TX",
      accessibility_rating: 4.9,
      open_positions: 15,
      logo_url: null
    },
    {
      id: "3",
      name: "InclusiveDesign Co",
      description: "Design agency specializing in accessible and inclusive user experiences.",
      industry: "Design",
      size: "50-100",
      location: "New York, NY",
      accessibility_rating: 4.7,
      open_positions: 8,
      logo_url: null
    },
    {
      id: "4",
      name: "DataForAll Analytics",
      description: "Data analytics company with a commitment to diverse hiring and inclusive practices.",
      industry: "Analytics",
      size: "200-500",
      location: "Chicago, IL",
      accessibility_rating: 4.6,
      open_positions: 12,
      logo_url: null
    },
    {
      id: "5",
      name: "Universal Healthcare Tech",
      description: "Healthcare technology solutions designed with accessibility at the core.",
      industry: "Healthcare",
      size: "1000+",
      location: "Boston, MA",
      accessibility_rating: 4.8,
      open_positions: 35,
      logo_url: null
    },
    {
      id: "6",
      name: "Accessible Finance Corp",
      description: "Financial services company pioneering accessible banking and investment platforms.",
      industry: "Finance",
      size: "500-1000",
      location: "Seattle, WA",
      accessibility_rating: 4.5,
      open_positions: 18,
      logo_url: null
    }
  ]

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search companies..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All Industries</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Design</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All Sizes</option>
              <option>1-50</option>
              <option>51-200</option>
              <option>201-1000</option>
              <option>1000+</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {company.name}
                    </CardTitle>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium ml-1">{company.accessibility_rating}</span>
                      <span className="text-xs text-gray-500 ml-1">Accessibility</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                  {company.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {company.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {company.size} employees
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {company.open_positions} open positions
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {company.industry}
                  </Badge>
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Link href={`/companies/${company.id}`}>
                      View Company
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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