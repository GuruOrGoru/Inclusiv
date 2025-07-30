import { Navigation } from "@/components/navigation"
import { JobsSearch } from "@/components/jobs-search"
import { JobsList } from "@/components/jobs-list"
import { JobsFilters } from "@/components/jobs-filters"
import { Footer } from "@/components/footer"

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Job</h1>
          <p className="text-gray-600">Discover inclusive opportunities that match your skills and needs</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobsFilters />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <JobsSearch />
            <JobsList />
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}