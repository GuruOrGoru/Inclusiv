import { Navigation } from "@/components/navigation"
import { JobDetails } from "@/components/job-details"
import { RelatedJobs } from "@/components/related-jobs"
import { Footer } from "@/components/footer"

interface JobPageProps {
  params: {
    id: string
  }
}

export default function JobPage({ params }: JobPageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <JobDetails jobId={params.id} />
          </div>
          <div className="lg:col-span-1">
            <RelatedJobs />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}