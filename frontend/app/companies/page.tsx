import { Navigation } from "@/components/navigation"
import { CompaniesGrid } from "@/components/companies-grid"
import { Footer } from "@/components/footer"

export default function CompaniesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inclusive Companies</h1>
          <p className="text-gray-600">Discover employers committed to accessibility and diversity</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CompaniesGrid />
      </div>
      
      <Footer />
    </main>
  )
}