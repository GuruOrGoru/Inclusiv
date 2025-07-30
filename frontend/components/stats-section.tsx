import { getStats } from "@/lib/api"
import { Briefcase, Building2, Users, TrendingUp } from "lucide-react"

export async function StatsSection() {
  let stats
  try {
    stats = await getStats()
  } catch (error) {
    stats = {
      total_jobs: 10000,
      total_employers: 500,
      successful_placements: 2500,
      accessibility_score: 95,
    }
  }

  const statItems = [
    {
      icon: Briefcase,
      label: "Active Jobs",
      value: stats.total_jobs.toLocaleString(),
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Building2,
      label: "Partner Companies",
      value: stats.total_employers.toLocaleString(),
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Users,
      label: "Successful Placements",
      value: stats.successful_placements.toLocaleString(),
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: `${stats.accessibility_score}%`,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-gray-600">Join the growing community of inclusive employers and talented professionals</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <item.icon className={`h-8 w-8 ${item.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{item.value}</div>
              <div className="text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}