import React from 'react'
import { Link } from 'react-router-dom'
import { Ambulance, Heart, Phone, ArrowRight } from 'lucide-react'

function AnimalRescueHome() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-md p-6 my-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image & Stats */}
        <div>
          <div className="rounded-lg overflow-hidden mb-4">
            <img 
              src="/images/animal-rescue.jpg" 
              alt="Animal Rescue" 
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%234FBF8B'/%3E%3Cpath d='M200 100 L250 150 L220 200 L180 200 L150 150 Z' fill='white'/%3E%3Ccircle cx='200' cy='100' r='15' fill='%233EAE66'/%3E%3C/svg%3E";
              }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-3 rounded-lg text-center shadow-sm">
              <div className="text-lg font-bold text-blue-600">500+</div>
              <div className="text-xs text-gray-600">Rescued</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center shadow-sm">
              <div className="text-lg font-bold text-green-600">95%</div>
              <div className="text-xs text-gray-600">Recovery</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center shadow-sm">
              <div className="text-lg font-bold text-purple-600">300+</div>
              <div className="text-xs text-gray-600">Released</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Ambulance className="w-5 h-5 text-red-500" />
            Animal Rescue & Treatment
          </h2>
          
          <p className="text-gray-600 text-sm mb-4">
            Providing emergency medical care, treatment, and rehabilitation for injured animals. 
            Our team works 24/7 to save and heal distressed animals.
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              24/7 Emergency Rescue Service
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Medical Treatment & Surgery
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Rehabilitation & Release
            </div>
          </div>

          <div className="flex gap-3">
            <Link 
              to="/animal-rescue" 
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Learn More
            </Link>
            <a 
              href="tel:+919876543210" 
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Emergency
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimalRescueHome