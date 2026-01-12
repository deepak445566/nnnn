import React from 'react'
import { Link } from 'react-router-dom'
import { Ambulance, Heart, Phone, ArrowRight, Stethoscope, Home } from 'lucide-react'

function AnimalRescue() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-lg overflow-hidden my-8 p-6">
      <div className="grid md:grid-cols-3 gap-0">
        {/* Left Column - Single Image */}
        <div className="relative overflow-hidden">
          <img 
            src="/images/ar1.jpg" 
            alt="Animal Rescue" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%234FBF8B'/%3E%3Cpath d='M200 150 L260 220 L230 280 L170 280 L140 220 Z' fill='white'/%3E%3Ccircle cx='200' cy='150' r='20' fill='%233EAE66'/%3E%3Cpath d='M120 320 Q200 360 280 320' stroke='white' stroke-width='10' fill='none'/%3E%3C/svg%3E";
            }}
          />
          
          {/* Overlay Stats */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-white text-lg font-bold">500+</div>
                <div className="text-white/80 text-xs">Rescued</div>
              </div>
              <div className="text-center">
                <div className="text-white text-lg font-bold">95%</div>
                <div className="text-white/80 text-xs">Recovery</div>
              </div>
              <div className="text-center">
                <div className="text-white text-lg font-bold">300+</div>
                <div className="text-white/80 text-xs">Released</div>
              </div>
            </div>
          </div>
          
          {/* Emergency Badge */}
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Phone className="w-3 h-3" />
            24/7
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="md:col-span-2 p-6">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                <Ambulance className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Animal Rescue & Treatment
              </h2>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">
              We provide emergency medical care, treatment, and rehabilitation for injured animals. 
              Our dedicated team works round the clock to rescue, treat, and release animals back to their natural habitat.
            </p>
          </div>
          
          {/* Services Icons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Stethoscope className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">Medical Care</div>
                <div className="text-gray-500 text-xs">Treatment & Surgery</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
              <div className="p-2 bg-green-100 rounded-lg">
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">Shelter</div>
                <div className="text-gray-500 text-xs">Recovery & Foster</div>
              </div>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 text-sm mb-3">Our Services Include:</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 text-xs">Emergency Rescue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 text-xs">Wound Treatment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 text-xs">Vaccination</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 text-xs">Rehabilitation</span>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              to="/animal-rescue" 
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-3 rounded-lg font-bold hover:opacity-90 transition-all hover:shadow-lg text-sm flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              View Full Program
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <a 
              href="tel:+919876543210" 
              className="flex-1 bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 px-4 py-3 rounded-lg font-bold transition-all hover:shadow-lg text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Emergency Call
            </a>
          </div>
          
          {/* Small Note */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              Report injured animals immediately for quick rescue
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimalRescue