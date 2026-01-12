import React from 'react'
import { Link } from 'react-router-dom'

function Clothes() {
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
                    src="/images/mc2.jpg" 
                    alt="Clothes Distribution" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Additional Images Grid */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="rounded-lg overflow-hidden h-24">
                    <img 
                      src="/images/clothes1.jpg" 
                      alt="Winter Clothes" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/images/mc2.jpg"}
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden h-24">
                    <img 
                      src="/images/clothes2.jpg" 
                      alt="School Uniforms" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/images/mc2.jpg"}
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden h-24">
                    <img 
                      src="/images/clothes3.jpg" 
                      alt="Clothing Drive" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/images/mc2.jpg"}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Text Content */}
              <div>
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">Clothes Distribution</h1>
                  <div className="h-1 w-20 bg-[#50C779] mb-4"></div>
                  <p className="text-gray-600 text-lg">
                    Providing warm clothes, school uniforms, and essential clothing to those in need
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#50C779]/10 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-[#50C779]">10K+</div>
                    <div className="text-gray-600 text-sm">Clothes Distributed</div>
                  </div>
                  <div className="bg-[#3EAE66]/10 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-[#3EAE66]">50+</div>
                    <div className="text-gray-600 text-sm">Distribution Camps</div>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="bg-gray-50 p-5 rounded-xl mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">👕 Our Mission</h3>
                  <p className="text-gray-700">
                    We believe that access to proper clothing is a basic human right. Our clothing 
                    distribution programs ensure that individuals and families have access to 
                    appropriate attire for different seasons and occasions, maintaining their 
                    dignity and protection from harsh weather conditions.
                  </p>
                </div>


                {/* Donation Types */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🎁 What We Accept</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779]">👚</div>
                      <div className="text-sm text-gray-600">New Clothes</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779]">🔄</div>
                      <div className="text-sm text-gray-600">Gently Used</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779]">🧥</div>
                      <div className="text-sm text-gray-600">Winter Wear</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779]">👟</div>
                      <div className="text-sm text-gray-600">Footwear</div>
                    </div>
                  </div>
                </div>

              
              </div>
            </div>

            {/* Detailed Programs Section */}
            <div className="p-8 bg-gray-50 border-t">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Clothing Initiatives in Detail</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#50C779]/20 p-3 rounded-lg">
                      <div className="text-2xl">❄️</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Winter Relief</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Woolen sweaters and jackets
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Blankets and shawls
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Thermal wear distribution
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Socks and gloves
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#3EAE66]/20 p-3 rounded-lg">
                      <div className="text-2xl">👔</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">School Uniforms</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3EAE66] rounded-full"></div>
                      Complete uniform sets
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3EAE66] rounded-full"></div>
                      School shoes and socks
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Bags and stationery
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Raincoats and umbrellas
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#50C779]/20 p-3 rounded-lg">
                      <div className="text-2xl">👕</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Daily Wear</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      T-shirts and shirts
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Pants and trousers
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Traditional wear
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Footwear for all ages
                    </li>
                  </ul>
                </div>
              </div>

              {/* Distribution Process */}
              <div className="mt-8 bg-white p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📦 Our Distribution Process</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#50C779]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-[#50C779]">1</span>
                    </div>
                    <h4 className="font-bold text-gray-800">Collection</h4>
                    <p className="text-sm text-gray-600">Gather donated clothes</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#3AE66]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-[#3AE66]">2</span>
                    </div>
                    <h4 className="font-bold text-gray-800">Sorting</h4>
                    <p className="text-sm text-gray-600">Clean and categorize</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#50C779]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-[#50C779]">3</span>
                    </div>
                    <h4 className="font-bold text-gray-800">Packing</h4>
                    <p className="text-sm text-gray-600">Prepare distribution kits</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#3AE66]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold text-[#3AE66]">4</span>
                    </div>
                    <h4 className="font-bold text-gray-800">Distribution</h4>
                    <p className="text-sm text-gray-600">Deliver to those in need</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clothes