import { Search, FileText, Handshake, Trophy } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search & Discover",
      description: "Browse through thousands of inclusive job opportunities tailored to your skills and needs."
    },
    {
      icon: FileText,
      title: "Apply with Confidence",
      description: "Submit your application knowing that employers value diversity and provide necessary accommodations."
    },
    {
      icon: Handshake,
      title: "Connect & Interview",
      description: "Engage with inclusive employers who understand and support your unique abilities."
    },
    {
      icon: Trophy,
      title: "Land Your Dream Job",
      description: "Start your new career journey with companies committed to creating accessible workplaces."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your journey to meaningful employment starts here. Follow these simple steps to find your perfect job match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200 z-0" />
              )}
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}