import { getEmployers } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Briefcase } from "lucide-react"
import Link from "next/link"

export async function FeaturedEmployers() {
  let employers
  try {
    const allEmployers = await getEmployers()
    employers = allEmployers.slice(0, 4) // Show first 4 employers
  } catch (error) {
    employers = []
  }

  if (employers.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white" aria-labelledby="featured-employers-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="featured-employers-heading" className="text-3xl font-bold text-gray-900 mb-4">
            Inclusive Employers
          </h2>
          <p className="text-xl text-gray-600">Companies committed to creating accessible and inclusive workplaces</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {employers.map((employer) => (
            <Card key={employer.id} className="hover:shadow-lg transition-shadow text-center">
              <CardHeader>
                {employer.logo_url && (
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <img
                      src={employer.logo_url || "/placeholder.svg"}
                      alt={`${employer.name} logo`}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                )}
                <CardTitle className="text-lg">{employer.name}</CardTitle>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" aria-hidden="true" />
                  <span className="text-sm font-medium">{employer.accessibility_rating}/5</span>
                  <span className="text-xs text-gray-500 ml-1">Accessibility</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-700 text-sm line-clamp-3">{employer.description}</p>

                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" aria-hidden="true" />
                      {employer.size}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" aria-hidden="true" />
                      {employer.open_positions} jobs
                    </div>
                  </div>

                  <Badge variant="outline" className="text-xs">
                    {employer.industry}
                  </Badge>

                  <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                    <Link href={`/employers/${employer.id}`}>View Company</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/employers">View All Employers</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
