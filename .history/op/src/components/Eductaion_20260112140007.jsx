import React from 'react'
import { Link } from 'react-router-dom'

function Education() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link 
            to="/" 
            className="inline-flex items-center text-[#50C779] hover:text-[#3EAE66] mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Focus Areas
          </Link>

          {/* Page content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-[#50C779]">
                <img 
                  src="/images/mc1.avif" 
                  alt="Education" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Education Programs</h1>
                <p className="text-gray-600">Providing educational support and resources for those in need</p>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Education Initiatives</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#50C779]/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-[#50C779] mb-3">📚 School Support</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Providing school supplies and books</li>
                    <li>Uniform distribution programs</li>
                    <li>Scholarship opportunities</li>
                    <li>After-school tutoring</li>
                  </ul>
                </div>

                <div className="bg-[#3EAE66]/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-[#3EAE66] mb-3">🎓 Higher Education</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>College fee assistance</li>
                    <li>Vocational training programs</li>
                    <li>Skill development workshops</li>
                    <li>Career counseling</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Impact</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#50C779]">500+</div>
                  <div className="text-gray-600">Students Helped</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#50C779]">50+</div>
                  <div className="text-gray-600">Schools Supported</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#50C779]">1000+</div>
                  <div className="text-gray-600">Books Distributed</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#50C779]">200+</div>
                  <div className="text-gray-600">Scholarships Awarded</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#50C779]">
                <h4 className="text-lg font-bold text-gray-800 mb-3">How You Can Help</h4>
                <p className="text-gray-700 mb-4">
                  Support our education programs by donating school supplies, volunteering as a tutor, or contributing to our scholarship fund.
                </p>
                <button className="bg-[#50C779] hover:bg-[#3EAE66] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Donate to Education
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Eductaion