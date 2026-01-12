import React from 'react'
import { Link } from 'react-router-dom'

function Food() {
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
                    src="/images/mc3.jpg" 
                    alt="Food Distribution" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Additional Images Grid */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="rounded-lg overflow-hidden h-24">
                    <img 
                      src="/images/food1.jpg" 
                      alt="Community Kitchen" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/images/mc3.jpg"}
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden h-24">
                    <img 
                      src="/images/food2.jpg" 
                      alt="Food Packets" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/images/mc3.jpg"}
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden h-24">
                    <img 
                      src="/images/food3.jpg" 
                      alt="Meal Distribution" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/images/mc3.jpg"}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Text Content */}
              <div>
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">Food Distribution</h1>
                  <div className="h-1 w-20 bg-[#50C779] mb-4"></div>
                  <p className="text-gray-600 text-lg">
                    Providing nutritious meals and food essentials to fight hunger and malnutrition
                  </p>
                </div>

                {/* Quick Stats */}
                

                {/* Mission Statement */}
                <div className="bg-gray-50 p-5 rounded-xl mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">🍎 Our Mission</h3>
                  <p className="text-gray-700">
                    We are committed to eliminating hunger and malnutrition by providing regular, 
                    nutritious meals to those in need. Our food programs focus on balanced nutrition, 
                    especially for children, elderly, and vulnerable communities, ensuring no one 
                    sleeps hungry.
                  </p>
                </div>

                {/* Key Programs */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Key Programs</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#50C779] text-white p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Daily Meal Program</h4>
                        <p className="text-gray-600 text-sm">Hot, nutritious meals served daily</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#3EAE66] text-white p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Food Ration Kits</h4>
                        <p className="text-gray-600 text-sm">Monthly grocery essentials for families</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#50C779] text-white p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Nutrition for Children</h4>
                        <p className="text-gray-600 text-sm">Special nutrition programs for kids</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nutritional Focus */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🥦 Nutritional Focus</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779] text-lg">🌾</div>
                      <div className="text-sm text-gray-600">Whole Grains</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779] text-lg">🥛</div>
                      <div className="text-sm text-gray-600">Proteins</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779] text-lg">🥕</div>
                      <div className="text-sm text-gray-600">Vegetables</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779] text-lg">🍎</div>
                      <div className="text-sm text-gray-600">Fruits</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Detailed Programs Section */}
            <div className="p-8 bg-gray-50 border-t">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Food Initiatives in Detail</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#50C779]/20 p-3 rounded-lg">
                      <div className="text-2xl">🍲</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Community Kitchen</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Daily hot meal service
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Balanced nutritional meals
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Special meals for festivals
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Hygienic cooking facilities
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#3EAE66]/20 p-3 rounded-lg">
                      <div className="text-2xl">📦</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Ration Distribution</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Monthly grocery kits
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Rice, wheat, and pulses
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Cooking oil and spices
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Special kits for festivals
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#50C779]/20 p-3 rounded-lg">
                      <div className="text-2xl">👶</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Child Nutrition</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Supplementary nutrition
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Milk and eggs distribution
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Health check-ups
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Nutrition education
                    </li>
                  </ul>
                </div>
              </div>

              {/* Meal Value Breakdown */}
              <div className="mt-8 bg-white p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">💰 Meal Cost Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rice/Wheat</span>
                    <span className="font-bold text-[#50C779]">₹5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Lentils/Pulses</span>
                    <span className="font-bold text-[#50C779]">₹8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Vegetables</span>
                    <span className="font-bold text-[#50C779]">₹7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Spices & Oil</span>
                    <span className="font-bold text-[#50C779]">₹3</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="text-lg font-bold text-gray-800">Total per meal</span>
                    <span className="text-2xl font-bold text-[#3AE66]">₹23</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  * Each ₹23 provides one nutritious meal to a person in need
                </div>
              </div>

              {/* Impact Statistics */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-[#50C779]">3</div>
                  <div className="text-sm text-gray-600">Meals per day</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-[#3AE66]">21</div>
                  <div className="text-sm text-gray-600">Meals per week</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-[#50C779]">90</div>
                  <div className="text-sm text-gray-600">Meals per month</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-[#3AE66]">1080</div>
                  <div className="text-sm text-gray-600">Meals per year</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Food