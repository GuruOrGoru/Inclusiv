import { Navigation } from "@/components/navigation"
import { JobsSearch } from "@/components/jobs-search"
import { JobsList } from "@/components/jobs-list"
import { Footer } from "@/components/footer"

export default function JobsPage() {
  return (
    <main>
      <Navigation />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Opportunities</h1>
            <p className="text-xl text-gray-600">
              Find inclusive employment opportunities that match your skills and abilities
            </p>
          </div>
          <JobsSearch />
          <JobsList />
        </div>
      </div>
      <Footer />
    </main>
  )
}
