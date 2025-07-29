"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Accessibility, Briefcase, Users, TrendingUp } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav
      className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-primary">
              <Accessibility className="h-8 w-8" aria-hidden="true" />
              <span>Inclusiv 🚀</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/jobs"
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Briefcase className="inline h-4 w-4 mr-1" aria-hidden="true" />
                Jobs
              </Link>
              <Link
                href="/employers"
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Users className="inline h-4 w-4 mr-1" aria-hidden="true" />
                Employers
              </Link>
              <Link
                href="/insights"
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <TrendingUp className="inline h-4 w-4 mr-1" aria-hidden="true" />
                Insights
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/jobs"
                className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                <Briefcase className="inline h-4 w-4 mr-2" aria-hidden="true" />
                Jobs
              </Link>
              <Link
                href="/employers"
                className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                <Users className="inline h-4 w-4 mr-2" aria-hidden="true" />
                Employers
              </Link>
              <Link
                href="/insights"
                className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                <TrendingUp className="inline h-4 w-4 mr-2" aria-hidden="true" />
                Insights
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
