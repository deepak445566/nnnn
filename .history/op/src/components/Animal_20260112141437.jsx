import React from 'react'
import { Link } from 'react-router-dom'

function AnimalFeed() {
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
                    src="/images/mc5.jpg" 
                    alt="Animal Feed Distribution" 
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = "/images/animal-feed.jpg"}
                  />
                </div>
                
                {/* Additional Images Grid */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="rounded-lg overflow-hidden h-24">
                    <img 
                      src="/images/animal1.jpg" 
                      alt="Cattle Feed" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/images/mc5.jpg"}
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden h-24">
                    <img 
                      src="/images/animal2.jpg" 
                      alt="Street Animals" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/images/mc5.jpg"}
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden h-24">
                    <img 
                      src="/images/animal3.jpg" 
                      alt="Animal Care" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/images/mc5.jpg"}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Text Content */}
              <div>
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">Animal Feed</h1>
                  <div className="h-1 w-20 bg-[#50C779] mb-4"></div>
                  <p className="text-gray-600 text-lg">
                    Providing nutritious feed and care for animals, street animals, and livestock
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#50C779]/10 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-[#50C779]">5K+</div>
                    <div className="text-gray-600 text-sm">Animals Fed Daily</div>
                  </div>
                  <div className="bg-[#3EAE66]/10 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-[#3EAE66]">100+</div>
                    <div className="text-gray-600 text-sm">Feeding Centers</div>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="bg-gray-50 p-5 rounded-xl mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">🐄 Our Mission</h3>
                  <p className="text-gray-700">
                    We believe in the welfare of all living beings. Our animal feed programs ensure 
                    that street animals, livestock, and pets receive proper nutrition, veterinary care, 
                    and protection. We work to prevent animal suffering and promote compassionate care.
                  </p>
                </div>

                {/* Key Programs */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Key Programs</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#50C779] text-white p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Street Animal Feeding</h4>
                        <p className="text-gray-600 text-sm">Daily food for stray dogs and cats</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#3EAE66] text-white p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Livestock Support</h4>
                        <p className="text-gray-600 text-sm">Feed for cattle, goats, and poultry</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#50C779] text-white p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Veterinary Care</h4>
                        <p className="text-gray-600 text-sm">Medical treatment for injured animals</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animal Types */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🐾 Animals We Help</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779] text-lg">🐕</div>
                      <div className="text-sm text-gray-600">Street Dogs</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779] text-lg">🐈</div>
                      <div className="text-sm text-gray-600">Street Cats</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779] text-lg">🐄</div>
                      <div className="text-sm text-gray-600">Cattle</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-bold text-[#50C779] text-lg">🐦</div>
                      <div className="text-sm text-gray-600">Birds</div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-[#50C779] to-[#3EAE66] p-6 rounded-xl text-white">
                  <h3 className="text-xl font-bold mb-3">Feed the Voiceless</h3>
                  <p className="mb-4">Your help provides nutrition to animals in need</p>
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-white text-[#50C779] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                      Donate for Animals
                    </button>
                    <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
                      Volunteer in Feeding
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Programs Section */}
            <div className="p-8 bg-gray-50 border-t">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Animal Welfare Initiatives</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#50C779]/20 p-3 rounded-lg">
                      <div className="text-2xl">🍖</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Street Animal Feeding</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Daily feeding stations in colonies
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Water bowls installation in summer
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Special feeding during festivals
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Puppy/kitten care programs
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#3EAE66]/20 p-3 rounded-lg">
                      <div className="text-2xl">🐄</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Livestock Support</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Cattle feed for dairy animals
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Fodder for goats and sheep
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Poultry feed distribution
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3AE66] rounded-full"></div>
                      Assistance during drought
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#50C779]/20 p-3 rounded-lg">
                      <div className="text-2xl">🏥</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Animal Healthcare</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Vaccination camps for animals
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Treatment for injured animals
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Sterilization programs
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#50C779] rounded-full"></div>
                      Emergency rescue services
                    </li>
                  </ul>
                </div>
              </div>

              {/* Animal Feed Types */}
              <div className="mt-8 bg-white p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🌾 Types of Animal Feed</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#50C779]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🌿</span>
                    </div>
                    <h4 className="font-bold text-gray-800">Green Fodder</h4>
                    <p className="text-sm text-gray-600">Fresh grass and leaves</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#3AE66]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🌾</span>
                    </div>
                    <h4 className="font-bold text-gray-800">Dry Fodder</h4>
                    <p className="text-sm text-gray-600">Hay and straw</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#50C779]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🥜</span>
                    </div>
                    <h4 className="font-bold text-gray-800">Concentrates</h4>
                    <p className="text-sm text-gray-600">Grains and oilcakes</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#3AE66]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🥩</span>
                    </div>
                    <h4 className="font-bold text-gray-800">Pet Food</h4>
                    <p className="text-sm text-gray-600">Dog and cat food</p>
                  </div>
                </div>
              </div>

              {/* Feeding Cost Breakdown */}
              <div className="mt-8 bg-white p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">💰 Feeding Cost Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Dog Food (per day)</span>
                    <span className="font-bold text-[#50C779]">₹20</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Cat Food (per day)</span>
                    <span className="font-bold text-[#50C779]">₹15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Cattle Feed (per day)</span>
                    <span className="font-bold text-[#50C779]">₹50</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Bird Feed (per day)</span>
                    <span className="font-bold text-[#50C779]">₹5</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="text-lg font-bold text-gray-800">Monthly cost per animal</span>
                    <span className="text-2xl font-bold text-[#3AE66]">₹600 - ₹1500</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  * Monthly feeding cost varies by animal type and size
                </div>
              </div>

              {/* Impact Statistics */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-[#50C779]">5000+</div>
                  <div className="text-sm text-gray-600">Animals Fed Daily</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-[#3AE66]">100+</div>
                  <div className="text-sm text-gray-600">Feeding Locations</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-[#50C779]">50+</div>
                  <div className="text-sm text-gray-600">Volunteers</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-[#3AE66]">365</div>
                  <div className="text-sm text-gray-600">Days of Feeding</div>
                </div>
              </div>

              {/* How to Help Section */}
              <div className="mt-8 bg-gradient-to-r from-[#50C779] to-[#3EAE66] p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-4">How You Can Help Animals</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">🍽️ Set Up Feeding Station</h4>
                    <p className="text-sm opacity-90">Install water bowls and feeding points in your locality</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">🏠 Foster Animals</h4>
                    <p className="text-sm opacity-90">Temporarily care for injured or orphaned animals</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">📞 Report Animal Distress</h4>
                    <p className="text-sm opacity-90">Call our helpline for injured or sick animals</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">🎯 Adopt Don't Shop</h4>
                    <p className="text-sm opacity-90">Give a home to street animals instead of buying pets</p>
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

export default AnimalFeed