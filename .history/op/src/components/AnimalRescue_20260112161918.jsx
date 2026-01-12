import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Ambulance, Stethoscope, Heart, Home, 
  Phone, Calendar, Users, Shield, 
  Pill, Syringe, Bandage, Thermometer,
  MapPin, Clock, AlertCircle, CheckCircle,
  Star, Award, Download, Share2,
  PhoneCall, Mail, Target, Activity,
  Droplets, Eye, Bone,  Plus, Minus
} from 'lucide-react'

function AnimalRescue() {
  const [expandedCards, setExpandedCards] = useState([])

  const toggleCard = (id) => {
    if (expandedCards.includes(id)) {
      setExpandedCards(expandedCards.filter(cardId => cardId !== id))
    } else {
      setExpandedCards([...expandedCards, id])
    }
  }

  const rescueServices = [
    {
      id: 1,
      icon: <Ambulance className="w-8 h-8" />,
      title: "24/7 Emergency Rescue",
      description: "Immediate response team for injured animals with dedicated ambulance service. Our rescue team is available round the clock to respond to emergency calls.",
      details: [
        "GPS-enabled ambulance with medical equipment",
        "Trained animal rescue professionals",
        "All-weather rescue operations",
        "Safe capture and transportation",
        "Emergency first aid kit onboard"
      ],
      color: "bg-red-50 border-red-200 hover:bg-red-100",
      iconColor: "text-red-600"
    },
    {
      id: 2,
      icon: <Stethoscope className="w-8 h-8" />,
      title: "On-site First Aid",
      description: "Immediate medical assistance at the rescue location before transportation to our medical facility.",
      details: [
        "Pain management and sedation",
        "Wound cleaning and dressing",
        "Stabilization of fractures",
        "Fluid therapy for dehydration",
        "Emergency oxygen supply"
      ],
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: 3,
      icon: <Bandage className="w-8 h-8" />,
      title: "Wound Treatment",
      description: "Complete wound care including surgical intervention, cleaning, and healing process management.",
      details: [
        "Surgical wound cleaning",
        "Antibiotic treatment",
        "Suture and stitch removal",
        "Regular dressing changes",
        "Infection prevention"
      ],
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 4,
      icon: <Syringe className="w-8 h-8" />,
      title: "Vaccination & Prevention",
      description: "Preventive healthcare and immunization to protect animals from common diseases.",
      details: [
        "Rabies vaccination",
        "Regular deworming",
        "Tick and flea treatment",
        "Annual booster shots",
        "Disease prevention"
      ],
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      id: 5,
      icon: <Heart className="w-8 h-8" />,
      title: "Post-operative Care",
      description: "Complete recovery support after surgery including pain management and rehabilitation.",
      details: [
        "Pain management medication",
        "Physical therapy sessions",
        "Special nutrition planning",
        "Regular health checkups",
        "Mobility assistance"
      ],
      color: "bg-pink-50 border-pink-200 hover:bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      id: 6,
      icon: <Home className="w-8 h-8" />,
      title: "Shelter & Foster Care",
      description: "Safe temporary accommodation during recovery with proper care and monitoring.",
      details: [
        "Separate recovery wards",
        "Temperature-controlled environment",
        "Clean bedding and sanitation",
        "24/7 monitoring",
        "Socialization activities"
      ],
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
      iconColor: "text-orange-600"
    }
  ]

  const impactStats = [
    { icon: <Ambulance className="w-6 h-6" />, value: "500+", label: "Animals Rescued" },
    { icon: <Heart className="w-6 h-6" />, value: "95%", label: "Recovery Rate" },
    { icon: <Home className="w-6 h-6" />, value: "300+", label: "Successful Releases" },
    { icon: <Users className="w-6 h-6" />, value: "50+", label: "Volunteers" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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

          {/* Main Content - Image Left, Content Right */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Column - Image */}
              <div className="bg-gradient-to-br from-blue-600 to-green-600 p-8 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-600/20"></div>
                <div className="relative z-10">
                  <div className="rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img 
                      src="/images/animal-rescue.jpg" 
                      alt="Animal Rescue Team" 
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%234FBF8B'/%3E%3Cpath d='M200 100 L250 150 L220 200 L180 200 L150 150 Z' fill='white'/%3E%3Ccircle cx='200' cy='100' r='15' fill='%233EAE66'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="rounded-xl overflow-hidden shadow-lg h-32">
                      <img 
                        src="/images/rescue1.jpg" 
                        alt="Rescue Operation" 
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.src = "/images/animal-rescue.jpg"}
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg h-32">
                      <img 
                        src="/images/rescue2.jpg" 
                        alt="Animal Treatment" 
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.src = "/images/animal-rescue.jpg"}
                      />
                    </div>
                  </div>

                  {/* Emergency Contact Card */}
                  <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-red-500 text-white p-3 rounded-full">
                        <PhoneCall className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Emergency Rescue Hotline</h3>
                        <p className="text-white/90 text-sm">Available 24/7</p>
                      </div>
                    </div>
                    <a 
                      href="tel:+919876543210" 
                      className="block text-center bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold text-lg transition-colors"
                    >
                      📞 Call Now: +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="p-8 lg:p-12">
                {/* Heading */}
                <div className="mb-8">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                    What We Do for Injured Animals
                  </h1>
                  <div className="h-2 w-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4"></div>
                  <p className="text-gray-600 text-lg">
                    Comprehensive rescue, treatment, and rehabilitation services for injured and distressed animals.
                    Our mission is to provide immediate medical care and safe recovery.
                  </p>
                </div>

                {/* Impact Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {impactStats.map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-xl text-center border border-blue-100">
                      <div className="flex justify-center mb-2">
                        <div className={`p-2 rounded-full ${index === 0 ? 'bg-red-100 text-red-600' : index === 1 ? 'bg-green-100 text-green-600' : index === 2 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Services Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-blue-600" />
                    Our Rescue & Treatment Services
                  </h2>
                  
                  <div className="space-y-4">
                    {rescueServices.map((service) => (
                      <div 
                        key={service.id}
                        className={`border rounded-xl p-5 transition-all duration-300 cursor-pointer ${service.color} ${expandedCards.includes(service.id) ? 'shadow-lg' : 'hover:shadow-md'}`}
                        onClick={() => toggleCard(service.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-full ${service.iconColor} bg-white shadow`}>
                              {service.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                              <p className="text-gray-600 mb-3">{service.description}</p>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
                            {expandedCards.includes(service.id) ? 
                              <Minus className="w-5 h-5 text-gray-500" /> : 
                              <Plus className="w-5 h-5 text-gray-500" />
                            }
                          </button>
                        </div>
                        
                        {expandedCards.includes(service.id) && (
                          <div className="mt-4 pl-16">
                            <h4 className="font-semibold text-gray-700 mb-3">Service Details:</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {service.details.map((detail, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-sm">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Response Process */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-100 mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <Activity className="w-6 h-6 text-blue-600" />
                    Emergency Response Process
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Phone className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-gray-800">1. Emergency Call</h4>
                      <p className="text-sm text-gray-600">Receive distress call</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Ambulance className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-gray-800">2. Dispatch Team</h4>
                      <p className="text-sm text-gray-600">Send rescue ambulance</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Stethoscope className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-gray-800">3. On-site Treatment</h4>
                      <p className="text-sm text-gray-600">Provide first aid</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Home className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-gray-800">4. Rehabilitation</h4>
                      <p className="text-sm text-gray-600">Recovery and release</p>
                    </div>
                  </div>
                </div>

                {/* How to Help Section */}
                <div className="bg-gradient-to-r from-[#50C779] to-[#3EAE66] p-6 rounded-xl text-white">
                  <h3 className="text-xl font-bold mb-4">How You Can Help Injured Animals</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold mb-2">🚨 Report Injured Animals</h4>
                      <p className="text-sm opacity-90">Call our emergency helpline immediately if you spot an injured animal</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">💝 Donate for Treatment</h4>
                      <p className="text-sm opacity-90">Your contribution helps us provide medical care and rehabilitation</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button className="bg-white text-[#50C779] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                      🚑 Report Emergency
                    </button>
                    <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
                      💰 Donate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Success Stories */}
            <div className="p-8 bg-gray-50 border-t">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🐾 Success Stories & Impact
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <a className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Raja's Recovery</h3>
                      <p className="text-sm text-gray-600">Street dog with broken leg</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Raja was hit by a vehicle and had multiple fractures. After 3 months of treatment and rehabilitation, he was successfully released back to his colony.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Bone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Moti's Healing</h3>
                      <p className="text-sm text-gray-600">Cow with deep wounds</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Moti was found with severe wire entanglement wounds. After surgical treatment and 2 months of care, she made a full recovery.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Birds Rescue</h3>
                      <p className="text-sm text-gray-600">Seasonal bird rescue program</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    We've rescued over 200 birds during extreme weather conditions and helped them recover before release back to nature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimalRescue