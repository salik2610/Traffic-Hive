import React from 'react';
import { Camera, Users, Car, Siren, Info, Clock, Activity, BarChart3, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const FeatureCard = ({ title, description, icon: Icon }) => (
  <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
    <div className="flex items-center mb-4">
      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mr-4 shadow-inner">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
        {title}
      </h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const CapabilityCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group">
    <div className="flex items-center space-x-4 mb-4">
      <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-inner group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const HomePage = ({ onStartMonitoring }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 animate-fade-in"></div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8 relative z-10">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient">
                  TrafficHive
                </span>
                <br />
                <span className="text-4xl lg:text-5xl mt-4 block">Management System</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Revolutionizing urban mobility with AI-powered traffic management solutions for smarter, safer cities.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                onClick={onStartMonitoring}
              >
                Launch Monitoring System
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                onClick={() => window.location.href = '#features'}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-500 border border-blue-100">
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">30%</div>
            <div className="text-gray-600 font-medium">Reduced Traffic Congestion</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-500 border border-blue-100">
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">24/7</div>
            <div className="text-gray-600 font-medium">Real-time Monitoring</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-500 border border-blue-100">
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">50+</div>
            <div className="text-gray-600 font-medium">Cities Powered</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="w-full py-32 bg-gradient-to-b from-white to-blue-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
              Intelligent Traffic Management
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of features ensures optimal traffic flow and enhanced safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <FeatureCard
              title="Real-time Monitoring"
              description="Advanced AI-powered camera systems for continuous traffic flow analysis and optimization."
              icon={Camera}
            />
            <FeatureCard
              title="Smart Analytics"
              description="Data-driven insights for predictive traffic management and pattern recognition."
              icon={BarChart3}
            />
            <FeatureCard
              title="Emergency Response"
              description="Instant signal prioritization for emergency vehicles to ensure rapid response times."
              icon={Siren}
            />
          </div>
        </div>
      </div>

      {/* System Features Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-3xl transform -skew-y-2"></div>
          <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-blue-100">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                Advanced Capabilities
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our cutting-edge technology combines AI-powered analysis with real-time monitoring to deliver comprehensive traffic management solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CapabilityCard
                icon={Activity}
                title="Real-time Analytics"
                description="Advanced algorithms process traffic data instantly, providing immediate insights and actionable recommendations."
              />
              <CapabilityCard
                icon={Camera}
                title="Smart Surveillance"
                description="AI-powered cameras monitor traffic patterns 24/7, ensuring comprehensive coverage and accurate data collection."
              />
              <CapabilityCard
                icon={AlertTriangle}
                title="Incident Detection"
                description="Automatic detection and alert system for accidents, congestion, and other traffic anomalies."
              />
              <CapabilityCard
                icon={Clock}
                title="Predictive Timing"
                description="Smart signal timing adjustments based on historical data and real-time traffic conditions."
              />
              <CapabilityCard
                icon={Users}
                title="Pedestrian Safety"
                description="Advanced detection systems to protect pedestrians and ensure safe crossing at intersections."
              />
              <CapabilityCard
                icon={Car}
                title="Vehicle Classification"
                description="Accurate identification and counting of different vehicle types for better traffic management."
              />
            </div>

            <div className="mt-12 text-center">
              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={onStartMonitoring}
              >
                Experience Our Technology
                <ArrowRight className="ml-2 w-5 h-5 inline-block" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 