import React from 'react'

function Focus() {
  return (
   <>
    <section className="py-16 px-8 lg:px-20 bg-white">
        <div className="container mx-auto" id="programs">
          <div className="text-center lg:mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 exo">
              Our Focus Areas
            </h2>
            <p className="text-xl text-gray-600 new max-w-3xl mx-auto">
              We are dedicated to providing comprehensive support for children, youth, and animal welfare
            </p>
          </div>

          {/* Services Grid - Circle Design */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 px-1 lg:px-4 -mt-15 lg:mt-0" >
            {/* Education */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                {/* Outer circle with hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 scale-0 group-hover:scale-110"></div>
                
                {/* Main circle with image */}
                <div className="relative h-36 w-36 lg:h-48 lg:w-48 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-[#50C779] transition-all duration-300">
                  <img 
                    src="/images/mc1.avif" 
                    alt="Education" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Content below circle */}
              <h3 className="text-xl font-bold mb-3 exo text-gray-800 group-hover:text-[#50C779] transition-colors duration-300">
                Education
              </h3>
            </div>

            {/* Clothes */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 scale-0 group-hover:scale-110"></div>
                
                <div className="relative h-36 w-36 lg:h-48 lg:w-48 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-[#50C779] transition-all duration-300">
                  <img 
                    src="/images/mc2.jpg" 
                    alt="Clothes" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 exo text-gray-800 group-hover:text-[#50C779] transition-colors duration-300">
                Clothes
              </h3>
            </div>

            {/* Food */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 scale-0 group-hover:scale-110"></div>
                
                <div className="relative h-36 w-36 lg:h-48 lg:w-48 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-[#50C779] transition-all duration-300">
                  <img 
                    src="/images/mc3.jpg" 
                    alt="Food" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 exo text-gray-800 group-hover:text-[#50C779] transition-colors duration-300">
                Food
              </h3>
            </div>

            {/* Home & Shelter */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 scale-0 group-hover:scale-110"></div>
                
                <div className="relative h-36 w-36 lg:h-48 lg:w-48 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-[#50C779] transition-all duration-300">
                  <img 
                    src="/images/mc4.jpg" 
                    alt="Home & Shelter" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 exo text-gray-800 group-hover:text-[#50C779] transition-colors duration-300">
                Home & Shelter
              </h3>
            </div>

            {/* Animal Feed - NEW */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#50C779] to-[#3EAE66] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500 scale-0 group-hover:scale-110"></div>
                
                <div className="relative h-36 w-36 lg:h-48 lg:w-48 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-[#50C779] transition-all duration-300">
                  <img 
                    src="/images/mc5.jpeg" 
                    alt="Animal Feed" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2350C779'/%3E%3Cpath d='M50 30 L65 50 L60 70 L40 70 L35 50 Z' fill='white'/%3E%3Ccircle cx='50' cy='30' r='5' fill='%233EAE66'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 exo text-gray-800 group-hover:text-[#50C779] transition-colors duration-300">
                Animal Feed
              </h3>
            </div>
          </div>
        </div>
      </section>
   </>
  )
}

export default Focus