'use client';

import { useState, useEffect, useRef } from 'react';
import { Calculator, Layout, BarChart, Brain, Target, Users, Shield, Zap, ArrowRight, Sparkles, CheckCircle, TrendingUp, Clock, Video, Download, Calendar, X, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const services = [
  {
    icon: Calculator,
    title: 'AI Estimation & Costing',
    description: 'Instant, accurate cost estimates using machine learning algorithms trained on 10,000+ projects.',
    color: 'amber',
    features: ['Real-time material costing', 'Labor hour predictions', 'Budget variance alerts', 'Historical data analysis'],
    metrics: { value: '95%', label: 'Estimation accuracy' }
  },
  {
    icon: Layout,
    title: 'Smart Planning & Design',
    description: 'AI-optimized floor plans, material requirements, and workflow sequencing for maximum efficiency.',
    color: 'blue',
    features: ['Automated floor plan optimization', 'Material waste reduction', 'Workflow sequencing', 'Code compliance checks'],
    metrics: { value: '40%', label: 'Faster planning' }
  },
  {
    icon: BarChart,
    title: 'Progress Analytics & Tracking',
    description: 'Real-time project tracking, risk prediction, and performance analytics with automated reporting.',
    color: 'green',
    features: ['Real-time progress monitoring', 'Risk prediction algorithms', 'Automated KPI reports', 'Delay prevention alerts'],
    metrics: { value: '30%', label: 'Timeline improvement' }
  },
  {
    icon: Brain,
    title: 'Predictive Insights & Optimization',
    description: 'AI-driven recommendations for optimal outcomes, resource allocation, and quality control.',
    color: 'purple',
    features: ['Resource optimization', 'Quality control predictions', 'Subcontractor performance', 'ROI optimization'],
    metrics: { value: '25%', label: 'Cost reduction' }
  },
];

export default function Services() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // UPDATED: Navigate to popup page with return path
  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    router.push(
      `/popup?returnPath=${encodeURIComponent(currentPath)}&hash=${encodeURIComponent(currentHash)}`
    );
  };

  // Free book link handler
  const handleDownloadEbook = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("/Website Assets/bookpdf/AI_for_Homebuilders_Ebook (1).pdf", "_blank");
  };

  // Get color classes
  const getColorClasses = (color: string) => {
    const colorMap = {
      amber: {
        bg: 'bg-amber-500',
        light: 'bg-amber-50',
        text: 'text-amber-600',
        border: 'border-amber-200',
        gradient: 'from-amber-400 to-amber-600'
      },
      blue: {
        bg: 'bg-blue-500',
        light: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        gradient: 'from-blue-400 to-blue-600'
      },
      green: {
        bg: 'bg-green-500',
        light: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200',
        gradient: 'from-green-400 to-green-600'
      },
      purple: {
        bg: 'bg-purple-500',
        light: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200',
        gradient: 'from-purple-400 to-purple-600'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.amber;
  };

  return (
    <section 
      ref={sectionRef} 
      id="services" 
      className="relative py-20 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-gold/5 to-transparent rounded-full blur-3xl transition-all duration-1500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-100/10 to-transparent rounded-full blur-3xl transition-all duration-1500 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-gold/10 to-amber-gold/5 rounded-full mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Sparkles className="w-4 h-4 text-amber-gold animate-pulse" />
            <span className="text-sm font-medium text-amber-gold uppercase tracking-wider">
              AI-Powered Solutions
            </span>
          </div>
          
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-deep-charcoal mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Our <span className="text-gradient-gold">AI Solutions</span> for Builders
          </h2>
          
          <p className={`text-base md:text-lg text-warm-gray max-w-3xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Cutting-edge AI tools designed specifically for the construction industry, delivering measurable results and immediate ROI.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colorClasses = getColorClasses(service.color);
            
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s forwards` : 'none'
                }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => setActiveService(index)}
              >
                {/* Top Border Gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${colorClasses.gradient} rounded-t-2xl`} />
                
                {/* Service Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 ${colorClasses.light} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${colorClasses.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl md:text-2xl font-bold text-deep-charcoal">
                        {service.title}
                      </h3>
                      <div className={`px-3 py-1 ${colorClasses.light} rounded-full`}>
                        <span className={`text-sm font-bold ${colorClasses.text}`}>
                          {service.metrics.value}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">{service.metrics.label}</span>
                      </div>
                    </div>
                    <p className="text-warm-gray mt-2">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${
                        hoveredService === index ? colorClasses.light : 'bg-gray-50'
                      }`}
                    >
                      <CheckCircle className={`w-4 h-4 ${colorClasses.text}`} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Indicator */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-24 h-0.5 ${colorClasses.bg} transition-all duration-300 rounded-full`} />
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className={`bg-gradient-to-r from-amber-gold/5 via-white to-soft-gold/5 rounded-2xl p-8 border border-amber-gold/20 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-deep-charcoal mb-1">95%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
              <div className="text-xs text-gray-500">AI estimation precision</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-deep-charcoal mb-1">40%</div>
              <div className="text-sm text-gray-600">Faster Planning</div>
              <div className="text-xs text-gray-500">Time saved on projects</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-deep-charcoal mb-1">30%</div>
              <div className="text-sm text-gray-600">On-Time Delivery</div>
              <div className="text-xs text-gray-500">Project completion rate</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-deep-charcoal mb-1">25%</div>
              <div className="text-sm text-gray-600">Team Efficiency</div>
              <div className="text-xs text-gray-500">Productivity increase</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className={`mt-12 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
            <h3 className="text-2xl font-bold text-deep-charcoal mb-6 text-center">
              How Our AI Solutions Work
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center">
                    <div className="text-2xl font-bold text-amber-600">1</div>
                  </div>
                </div>
                <h4 className="font-bold text-lg text-deep-charcoal mb-2">Data Integration</h4>
                <p className="text-gray-600 text-sm">
                  Seamlessly connect with your existing systems and import project data
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                    <div className="text-2xl font-bold text-blue-600">2</div>
                  </div>
                </div>
                <h4 className="font-bold text-lg text-deep-charcoal mb-2">AI Analysis</h4>
                <p className="text-gray-600 text-sm">
                  Our algorithms analyze patterns and provide actionable insights
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center">
                    <div className="text-2xl font-bold text-green-600">3</div>
                  </div>
                </div>
                <h4 className="font-bold text-lg text-deep-charcoal mb-2">Smart Execution</h4>
                <p className="text-gray-600 text-sm">
                  Implement recommendations and monitor results in real-time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scheduleConsultation">
              <button className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-gold to-soft-gold text-white font-semibold py-3 px-8 rounded-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg">
                <Calendar className="w-5 h-5" />
                <span className="text-base">Schedule AI Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
            
            {/* UPDATED: Video button now navigates to popup page */}
            <button
              onClick={handleVideoClick}
              className="group inline-flex items-center justify-center gap-3 bg-white border-2 border-amber-gold text-amber-gold font-semibold py-3 px-8 rounded-lg hover:bg-amber-gold/5 transition-all duration-300 shadow-lg"
            >
              <Video className="w-5 h-5" />
              <span className="text-base">Watch 2-Minute Overview</span>
            </button>
            
            <button
              onClick={handleDownloadEbook}
              className="group inline-flex items-center justify-center gap-3 bg-white border-2 border-deep-charcoal text-deep-charcoal font-semibold py-3 px-8 rounded-lg hover:bg-deep-charcoal/5 transition-all duration-300 shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span className="text-base">Download Free E-Book</span>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Trusted by 300+ builders • 28 states • 95% satisfaction rate
          </p>
        </div>
      </div>

      {/* VIDEO POPUP MODAL - REMOVED COMPLETELY */}

      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes smooth-appear {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-smooth-appear {
          animation: smooth-appear 0.3s ease-out forwards;
        }

        .text-gradient-gold {
          background: linear-gradient(135deg, var(--amber-gold) 0%, var(--soft-gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}