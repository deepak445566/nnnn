import React from 'react'
import { Link } from 'react-router-dom'

function Education() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
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

          {/* Main Content - Image Left, Text Right */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Hero Section with Image and Title */}
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Left Column - Image */}
              <div className="flex flex-col">
                <div className="rounded-xl overflow-hidden shadow-lg h-64 md:h-full">
                  <img 
                    src="/images/ed1.jpg" 
                    alt="Education Programs" 
                    className="w-full h-full object-cover"
                  />
                </div>
           
              </div>

              {/* Right Column - Text Content */}
              <div>
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">Education Programs</h1>
                  <div className="h-1 w-20 bg-[#50C779] mb-4"></div>
                  <p className="text-gray-600 text-lg">
                    Empowering the next generation through quality education and learning opportunities
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#50C779]/10 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-[#50C779]">500+</div>
                    <div className="text-gray-600 text-sm">Students Helped</div>
                  </div>
                  <div className="bg-[#3EAE66]/10 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-[#3EAE66]">50+</div>
                    <div className="text-gray-600 text-sm">Schools Supported</div>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="bg-gray-50 p-5 rounded-xl mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">📚 Our Mission</h3>
                  <p className="text-gray-700">
                    We believe that education is the most powerful tool for breaking the cycle of poverty. 
                    Our programs provide comprehensive educational support to underprivileged children, 
                    ensuring they have access to quality learning resources and opportunities.
                  </p>
                </div>

             

            
              </div>
            </div>

            {/* Detailed Programs Section */}
            <div className="p-8 bg-gray-50 border-t">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Education Initiatives in Detail</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#50C779]/20 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-[#50C779]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Primary Education</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Free books and stationery distribution
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      School uniform provision
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      After-school tutoring centers
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Nutrition programs for students
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#3EAE66]/20 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-[#3EAE66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Higher Education</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3EAE66] rounded-full"></div>
                      College scholarship programs
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3EAE66] rounded-full"></div>
                      Vocational training centers
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3EAE66] rounded-full"></div>
                      Career counseling and guidance
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3EAE66] rounded-full"></div>
                      Internship opportunities
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education