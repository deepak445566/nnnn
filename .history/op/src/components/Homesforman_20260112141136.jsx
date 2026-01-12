import React from 'react'
import { Link } from 'react-router-dom'

function Shelter() {
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
                    src="/images/mc4.jpg" 
                    alt="Home & Shelter" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Additional Images Grid */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="rounded-lg overflow-hidden h-24">
                    <img 
                      src="/images/shelter1.jpg" 
                      alt="Shelter Home" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/images/mc4.jpg"}
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden h-24">
                    <img 
                      src="/images/shelter2.jpg" 
                      alt="Renovation Work" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/images/mc4.jpg"}
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden h-24">
                    <img 
                      src="/images/shelter3.jpg" 
                      alt="Safe Housing" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/images/mc4.jpg"}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Text Content */}
              <div>
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">Home & Shelter</h1>
                  <div className="h-1 w-20 bg-[#50C779] mb-4"></div>
                  <p className="text-gray-600 text-lg">
                    Providing safe housing, shelter homes, and housing assistance for those without proper accommodation
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#50C779]/10 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-[#50C779]">100+</div>
                    <div className="text-gray-600 text-sm">Families Helped</div>
                  </div>
                  <div className="bg-[#3EAE66]/10 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-[#3EAE66]">25+</div>
                    <div className="text-gray-600 text-sm">Shelter Homes</div>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="bg-gray-50 p-5 rounded-xl mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">🏠 Our Mission</h3>
                  <p className="text-gray-700">
                    We believe that everyone deserves a safe and secure place to call home. Our shelter programs 
                    provide temporary and permanent housing solutions, home repairs for vulnerable families, 
                    and shelter facilities for homeless individuals and children.
                  </p>
                </div>

                {/* Key Programs */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Key Programs</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#50C779] text-white p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Shelter Homes</h4>
                        <p className="text-gray-600 text-sm">Safe temporary accommodation facilities</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#3EAE66] text-white p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Emergency Shelter</h4>
                        <p className="text-gray-600 text-sm">Immediate housing during disasters</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#50C779] text-white p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Home Repairs</h4>
                        <p className="text-gray-600 text-sm">Renovation and repair for vulnerable homes</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shelter Types */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🛌 Shelter Types</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779] text-lg">👨‍👩‍👧‍👦</div>
                      <div className="text-sm text-gray-600">Family Shelters</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779] text-lg">👶</div>
                      <div className="text-sm text-gray-600">Children's Homes</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779] text-lg">👵</div>
                      <div className="text-sm text-gray-600">Senior Citizens</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779] text-lg">🚨</div>
                      <div className="text-sm text-gray-600">Emergency Shelters</div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-[#50C779] to-[#3EAE66] p-6 rounded-xl text-white">
                  <h3 className="text-xl font-bold mb-3">Provide Shelter, Save Lives</h3>
                  <p className="mb-4">Help us build homes for those without shelter</p>
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-white text-[#50C779] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                      Donate for Shelter
                    </button>
                    <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
                      Volunteer in Construction
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Programs Section */}
            <div className="p-8 bg-gray-50 border-t">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Shelter Initiatives in Detail</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#50C779]/20 p-3 rounded-lg">
                      <div className="text-2xl">🏘️</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Permanent Shelters</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Low-cost housing projects
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Community housing complexes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Housing for disaster victims
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Affordable rental homes
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#3EAE66]/20 p-3 rounded-lg">
                      <div className="text-2xl">⛺</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Temporary Shelters</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Emergency shelters during disasters
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Night shelters for homeless
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Transit homes for migrants
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Seasonal shelters in extreme weather
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#50C779]/20 p-3 rounded-lg">
                      <div className="text-2xl">🔨</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Home Improvement</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Structural repairs and renovation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Toilet construction in homes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Water supply and sanitation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Basic furniture and appliances
                    </li>
                  </ul>
                </div>
              </div>

              {/* Shelter Facilities */}
              <div className="mt-8 bg-white p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🏡 Shelter Facilities Provided</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#50C779]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🛏️</span>
                    </div>
                    <h4 className="font-bold text-gray-800">Sleeping Area</h4>
                    <p className="text-sm text-gray-600">Clean beds and bedding</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#3AE66]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🍲</span>
                    </div>
                    <h4 className="font-bold text-gray-800">Kitchen</h4>
                    <p className="text-sm text-gray-600">Cooking facilities</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#50C779]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🚿</span>
                    </div>
                    <h4 className="font-bold text-gray-800">Bathrooms</h4>
                    <p className="text-sm text-gray-600">Clean sanitation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#3AE66]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">⚕️</span>
                    </div>
                    <h4 className="font-bold text-gray-800">Medical Care</h4>
                    <p className="text-sm text-gray-600">Basic health services</p>
                  </div>
                </div>
              </div>

              {/* Construction Cost Breakdown */}
              <div className="mt-8 bg-white p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">💰 Shelter Cost Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Building Materials</span>
                    <span className="font-bold text-[#50C779]">₹50,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Labor Costs</span>
                    <span className="font-bold text-[#50C779]">₹30,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Furniture & Fixtures</span>
                    <span className="font-bold text-[#50C779]">₹15,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Utilities Setup</span>
                    <span className="font-bold text-[#50C779]">₹5,000</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="text-lg font-bold text-gray-800">Total per shelter</span>
                    <span className="text-2xl font-bold text-[#3AE66]">₹1,00,000</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  * ₹1,00,000 can build one complete shelter unit for a family
                </div>
              </div>

              {/* Impact Statistics */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-[#50C779]">365</div>
                  <div className="text-sm text-gray-600">Days of shelter</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-[#3AE66]">50+</div>
                  <div className="text-sm text-gray-600">People per shelter</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-[#50C779]">20+</div>
                  <div className="text-sm text-gray-600">Years lifespan</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-[#3AE66]">500+</div>
                  <div className="text-sm text-gray-600">Total beneficiaries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home