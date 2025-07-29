import { getStats } from "@/lib/api"
import { Briefcase, Building2, Users, TrendingUp } from "lucide-react"

export async function StatsSection() {
  let stats
  try {
    stats = await getStats()
  } catch (error) {
    // Fallback if API is not available
    stats = {
      total_jobs: 0,
      total_employers: 0,
      successful_placements: 0,
      accessibility_score: 0,
    }
  }

  const statItems = [
    {
      icon: Briefcase,
      label: "Active Job Opportunities",
      value: stats.total_jobs.toLocaleString(),
      color: "text-blue-600",
    },
    {
      icon: Building2,
      label: "Partner Employers",
      value: stats.total_employers.toLocaleString(),
      color: "text-green-600",
    },
    {
      icon: Users,
      label: "Successful Placements",
      value: stats.successful_placements.toLocaleString(),
      color: "text-purple-600",
    },
    {
      icon: TrendingUp,
      label: "Accessibility Score",
      value: `${stats.accessibility_score}%`,
      color: "text-orange-600",
    },
  ]

  return (
    <section className="py-16 bg-white" aria-labelledby="stats-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="stats-heading" className="sr-only">
          Platform Statistics
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-16 h-16 ${item.color.replace("text-", "bg-").replace("-600", "-100")} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <item.icon className={`h-8 w-8 ${item.color}`} aria-hidden="true" />
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
