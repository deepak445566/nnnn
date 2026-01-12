import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Ambulance, Stethoscope, Heart, Home, 
  Phone, Syringe, Bandage, CheckCircle,
  ArrowRight
} from 'lucide-react'

function AnimalRescueHome() {
  const rescueServices = [
    {
      id: 1,
      icon: <Ambulance className="w-6 h-6" />,
      title: "Emergency Rescue",
      description: "24/7 ambulance service for injured animals",
      color: "text-red-600"
    },
    {
      id: 2,
      icon: <Stethoscope className="w-6 h-6" />,
      title: "First Aid",
      description: "Immediate on-site medical assistance",
      color: "text-blue-600"
    },
    {
      id: 3,
      icon: <Bandage className="w-6 h-6" />,
      title: "Wound Treatment",
      description: "Complete wound care and healing",
      color: "text-green-600"
    },
    {
      id: 4,
      icon: <Syringe className="w-6 h-6" />,
      title: "Vaccination",
      description: "Preventive healthcare and immunization",
      color: "text-purple-600"
    }
  ]

  const stats = [
    { value: "500+", label: "Animals Rescued" },
    { value: "95%", label: "Recovery Rate" },
    { value: "300+", label: "Successful Releases" }
  ]

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-lg overflow-hidden my-8">
      <div className="grid md:grid-cols-3 gap-0">
        {/* Left Column - Image */}
        <div className="md:col-span-1 bg-gradient-to-br from-blue-600 to-green-600 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-600/20"></div>
          <div className="relative z-10">
            <div className="rounded-xl overflow-hidden shadow-lg mb-4">
              <img 
                src="/images/animal-rescue.jpg" 
                alt="Animal Rescue" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%234FBF8B'/%3E%3Cpath d='M200 100 L250 150 L220 200 L180 200 L150 150 Z' fill='white'/%3E%3Ccircle cx='200' cy='100' r='15' fill='%233EAE66'/%3E%3C/svg%3E";
                }}
              />
            </div>
            
            {/* Emergency Contact */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-500 text-white p-2 rounded-full">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Emergency Hotline</h3>
                  <p className="text-white/90 text-xs">24/7 Available</p>
                </div>
              </div>
              <a 
                href="tel:+919876543210" 
                className="block text-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold text-sm transition-colors"
              >
                📞 Call: +91 98765 43210
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="md:col-span-2 p-6">
          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Animal Rescue & Treatment
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-3"></div>
            <p className="text-gray-600 text-sm">
              We provide immediate medical care, treatment, and rehabilitation for injured and distressed animals.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-3 rounded-lg shadow-sm text-center border border-gray-100">
                <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {rescueServices.map((service) => (
              <div 
                key={service.id}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-full ${service.color} bg-opacity-20`}>
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">{service.title}</h3>
                </div>
                <p className="text-gray-600 text-xs">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 text-sm mb-3">What We Provide:</h4>
            <div className="space-y-2">
              {[
                "24/7 Emergency Rescue Service",
                "Medical Treatment & Surgery",
                "Rehabilitation & Foster Care",
                "Release back to Natural Habitat"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Link 
              to="/animal-rescue" 
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="flex-1 bg-white border-2 border-[#50C779] text-[#50C779] px-4 py-3 rounded-lg font-bold hover:bg-[#50C779] hover:text-white transition-colors text-sm">
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimalRescueHome