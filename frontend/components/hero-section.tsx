import { Button } from "@/components/ui/button"
import { ArrowRight, Accessibility, Heart, Target } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Bridging Abilities to{" "}
            <span className="text-primary bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Inclusiv is an AI-powered career platform that matches individuals with disabilities to meaningful
            employment opportunities based on their skills and abilities, not their limitations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="/jobs">
                Find Opportunities
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              <Link href="/employers">For Employers</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Accessibility className="h-8 w-8 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ability-Focused Matching</h3>
              <p className="text-gray-600">
                Our AI focuses on what you can do, matching your skills and abilities to the right opportunities.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Intelligent Accommodations</h3>
              <p className="text-gray-600">
                Get personalized accommodation recommendations and career pathway guidance.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Growth</h3>
              <p className="text-gray-600">
                Transform your career with personalized guidance and meaningful employment connections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
