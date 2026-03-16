"use client";

import { useState } from "react";
import { 
  Book, 
  Video, 
  FileText, 
  Download, 
  Calendar, 
  ChevronRight, 
  Home,
  Users,
  TrendingUp,
  Shield,
  CheckCircle,
  X,
  Mail,
  ExternalLink,
  BarChart3,
  Clock,
  Play
} from "lucide-react";

// Email Capture Modal Component - UPDATED TO MATCH YOUR STYLE
function EmailCaptureModal({ 
  isOpen, 
  onClose, 
  onSuccess,
  ebookUrl = "/Website Assets/bookpdf/AI_for_Homebuilders_Ebook (1).pdf" 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess: (email: string) => void;
  ebookUrl?: string;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Ebook download request:", {
        email,
        name: name || "Not provided",
        company: company || "Not provided",
        timestamp: new Date().toISOString()
      });

      setIsSuccess(true);
      onSuccess(email);

      setTimeout(() => {
        window.open(ebookUrl, "_blank", "noopener,noreferrer");
        onClose();
      }, 1500);

    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setName("");
    setCompany("");
    setError("");
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-smooth-appear z-[60] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-gradient-to-br from-warm-white to-white rounded-2xl overflow-hidden shadow-2xl border border-amber-gold/20">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-deep-charcoal transition-all duration-300"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 md:p-8">
          {isSuccess ? (
            <div className="text-center animate-fadeIn">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-50 to-emerald-50 mb-4 border border-green-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gradient-gold mb-2">
                Thank You!
              </h3>
              <p className="text-deep-charcoal/80 mb-1">
                Your free ebook is downloading...
              </p>
              <p className="text-xs text-warm-gray">
                We've sent a copy to <span className="font-medium text-amber-gold">{email}</span>
              </p>
              <div className="mt-6 pt-6 border-t border-amber-gold/10">
                <p className="text-xs text-warm-gray">
                  Check your email for additional resources
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-amber-gold/10 to-soft-gold/10 mb-4 border border-amber-gold/20">
                  <Download className="w-7 h-7 text-amber-gold" />
                </div>
                <h3 className="text-xl font-semibold text-gradient-navy mb-2">
                  Download Your Free E-Book
                </h3>
                <p className="text-sm text-warm-gray">
                  Get instant access to "AI for Homebuilders: The Complete Guide"
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-warm-navy mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-gray" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-white"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-warm-navy mb-1.5">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-3 text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-white"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-warm-navy mb-1.5">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-3 text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-white"
                    placeholder="Your Homebuilding Company"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 animate-fadeIn">
                    <p className="text-red-600 text-xs text-center">{error}</p>
                  </div>
                )}

                <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-3 border border-amber-gold/10">
                  <p className="text-center text-xs text-deep-charcoal/70">
                    <span className="font-medium text-amber-gold">No spam ever.</span> We respect your privacy and only send relevant content.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-3 font-semibold text-sm rounded-xl shadow-gold hover:shadow-gold-lg hover-lift transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-deep-charcoal/30 border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Free E-Book</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const [showEbookModal, setShowEbookModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleEbookDownload = () => {
    setShowEbookModal(true);
  };

  const handleVideoWatch = () => {
    setShowVideoModal(true);
  };

  const handleScheduleConsultation = () => {
    window.location.href = '/scheduleConsultation';
  };

  const handleEbookSuccess = (email: string) => {
    console.log("Ebook downloaded from Resources by:", email);
  };

  // Animation on mount
  useState(() => {
    setIsVisible(true);
  });

  const resources = [
    {
      id: 1,
      type: "ebook",
      title: "AI for Homebuilders: Complete Guide",
      description: "A practical guide to using AI for lead generation, sales conversion, and warranty management.",
      icon: Book,
      color: "amber",
      stats: "45 pages • 30 min read"
    },
    {
      id: 2,
      type: "video",
      title: "2-Minute Business Overview",
      description: "See how AI delivers ROI for homebuilders through intelligent automation.",
      icon: Video,
      color: "blue",
      stats: "2:15 • HD quality"
    },
    {
      id: 3,
      type: "case-study",
      title: "Midwest Builder Success Story",
      description: "How a 50-home/year builder increased conversions by 40% with AI Sales Agent.",
      icon: TrendingUp,
      color: "green",
      stats: "Case study • 8 min read"
    },
    {
      id: 4,
      type: "tool",
      title: "ROI Calculator Template",
      description: "Calculate your exact ROI potential with AI based on your current operations.",
      icon: BarChart3,
      color: "amber",
      stats: "Excel/Sheets • 5 templates"
    }
  ];

  return (
    <>
      {/* Modals */}
      <EmailCaptureModal
        isOpen={showEbookModal}
        onClose={() => setShowEbookModal(false)}
        onSuccess={handleEbookSuccess}
      />

      {/* Video Modal - UPDATED TO MATCH YOUR STYLE */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-smooth-appear z-[60] flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-gradient-to-br from-deep-charcoal to-black rounded-2xl overflow-hidden shadow-2xl border border-amber-gold/20">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video">
              <video
                className="w-full h-full object-contain"
                controls
                autoPlay
                muted
                playsInline
              >
                <source
                  src="/Website Assets/video/Video for AI for Homebuidlers.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="p-6 bg-gradient-to-b from-deep-charcoal/80 to-black border-t border-warm-navy/30">
              <h3 className="text-lg font-semibold text-white mb-2">
                AI for Homebuilders: Business Overview
              </h3>
              <p className="text-warm-gray text-sm">
                Learn how AI can transform your homebuilding business in 2 minutes
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="relative min-h-screen overflow-hidden flex items-center bg-gradient-to-b from-warm-white to-white scroll-mt-[100px] pb-16 md:pb-20 lg:pb-24" style={{ paddingTop: "100px" }}>
        {/* Background decorative elements matching your theme */}
        <div className="absolute inset-0">
          <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-gold/5 to-transparent rounded-full blur-3xl transition-all duration-1500 ${isVisible ? "opacity-100" : "opacity-0"}`} />
          <div className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-warm-navy/5 to-transparent rounded-full blur-3xl transition-all duration-1500 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`} />
          <div className={`absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-brand-teal/3 to-transparent rounded-full blur-3xl transition-all duration-1500 delay-600 ${isVisible ? "opacity-100" : "opacity-0"}`} />
        </div>

        <div className="relative container-custom px-4 sm:px-6">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* HEADER SECTION - Matching font sizes and spacing */}
            <div className="text-center mb-10 animate-fadeInUp">
              {/* Animated header badge */}
              <div className="mb-3 sm:mb-2 md:mb-2 animate-fadeInUp">
                <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-navy leading-tight">
                  <div className="h-8 sm:h-10 md:h-14 flex items-center justify-center">
                    <span className="text-warm-navy">Free </span>
                    <span className="text-gradient-gold font-bold ml-2">
                      Resources
                    </span>
                  </div>
                </h1>
              </div>
              
              {/* Trust line */}
              <div className="mb-2 sm:mb-1 animate-fadeInUp delay-100">
                <span className="inline-block text-xs md:text-sm font-medium tracking-wide uppercase bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text">
                  Homebuilder-First Materials
                </span>
              </div>
              
              {/* Subtitle */}
              <p className="text-sm sm:text-sm md:text-sm text-warm-navy uppercase font-medium leading-relaxed mb-3 sm:mb-2 md:mb-3 max-w-xl mx-auto animate-fadeInUp delay-200">
                Essential tools and insights from 30+ years of homebuilding operations
              </p>
              <p className="text-xs sm:text-xs md:text-xs text-warm-gray font-medium leading-relaxed mb-5 sm:mb-4 md:mb-4 max-w-lg mx-auto animate-fadeInUp delay-300">
                No cost, no commitment—just practical resources to help you understand AI's impact on your business.
              </p>

              {/* Company Quote */}
              <div className="max-w-md mx-auto bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-lg p-4 border border-amber-gold/10 animate-fadeInUp delay-400">
                <p className="text-xs sm:text-xs md:text-sm text-deep-charcoal font-medium">
                  <span className="font-semibold text-gradient-gold">"One extra closing can pay for your AI system."</span> Download our guide to see how.
                </p>
              </div>
            </div>

            {/* Featured Resource */}
            <div className="mb-12 animate-fadeInUp delay-500">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-gold/10 hover:shadow-gold/20 transition-all duration-300 hover-lift">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Icon Section */}
                    <div className="lg:w-1/3 text-center lg:text-left">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-gold/20 to-soft-gold/10 mb-4 mx-auto lg:mx-0 border border-amber-gold/20">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-gold/10 to-amber-gold/5 flex items-center justify-center">
                          <Book className="w-10 h-10 text-amber-gold" />
                        </div>
                      </div>
                      <div className="hidden lg:block">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 rounded-full text-xs text-deep-charcoal font-medium border border-amber-gold/20">
                          <CheckCircle className="w-3 h-3 text-brand-teal" />
                          Most Popular Resource
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-2/3 text-center lg:text-left">
                      <div className="lg:hidden mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 rounded-full text-xs text-deep-charcoal font-medium border border-amber-gold/20">
                          <CheckCircle className="w-3 h-3 text-brand-teal" />
                          Most Popular Resource
                        </div>
                      </div>
                      
                      <h2 className="text-xl sm:text-2xl font-bold text-gradient-navy mb-3">
                        AI for Homebuilders: The Complete Guide
                      </h2>
                      <p className="text-warm-gray text-sm sm:text-base mb-6">
                        Everything you need to know about implementing AI in your homebuilding business. 
                        Includes ROI calculations, implementation checklists, and real-world case studies from 300+ builder implementations.
                      </p>
                      
                      {/* Stats */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex items-center gap-1 px-2 py-1 bg-amber-gold/5 rounded text-xs text-deep-charcoal border border-amber-gold/10">
                          <Clock className="w-3 h-3" />
                          <span>45 pages • 30 min read</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-brand-teal/5 rounded text-xs text-deep-charcoal border border-brand-teal/10">
                          <TrendingUp className="w-3 h-3" />
                          <span>Includes ROI Calculator</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-warm-navy/5 rounded text-xs text-deep-charcoal border border-warm-navy/10">
                          <Users className="w-3 h-3" />
                          <span>300+ Builder Case Studies</span>
                        </div>
                      </div>
                      
                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handleEbookDownload}
                          className="btn-gold font-medium py-3 px-6 rounded-xl shadow-gold hover:shadow-gold-lg hover-lift transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4 text-deep-charcoal" />
                          <span className="text-deep-charcoal">Download Free E-Book</span>
                        </button>
                        
                        <button
                          onClick={handleScheduleConsultation}
                          className="bg-transparent border border-amber-gold/20 hover:border-amber-gold hover:bg-amber-gold/5 text-deep-charcoal font-medium py-3 px-6 rounded-xl transition-all duration-300 hover-lift flex items-center justify-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Schedule Consultation</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resource Grid */}
            <div className="mb-12 animate-fadeInUp delay-600">
              <div className="text-center mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gradient-navy mb-2">
                  Additional{" "}
                  <span className="text-gradient-gold">
                    Free Resources
                  </span>
                </h2>
                <p className="text-warm-gray text-sm sm:text-base max-w-2xl mx-auto px-4">
                  Tools and insights to help you understand AI's impact on homebuilding
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  const getColorClasses = (color: string) => {
                    const colorMap = {
                      amber: {
                        bg: "bg-gradient-to-br from-amber-gold/20 to-soft-gold/10",
                        text: "text-amber-gold",
                        border: "border-amber-gold/20",
                        iconBg: "bg-gradient-to-br from-amber-gold/10 to-soft-gold/5",
                        tagBg: "bg-gradient-to-r from-amber-gold/10 to-soft-gold/5",
                        tagText: "text-amber-gold"
                      },
                      blue: {
                        bg: "bg-gradient-to-br from-warm-navy/20 to-blue-50",
                        text: "text-warm-navy",
                        border: "border-warm-navy/20",
                        iconBg: "bg-gradient-to-br from-warm-navy/10 to-blue-100",
                        tagBg: "bg-gradient-to-r from-warm-navy/10 to-blue-100",
                        tagText: "text-warm-navy"
                      },
                      green: {
                        bg: "bg-gradient-to-br from-brand-teal/20 to-green-50",
                        text: "text-brand-teal",
                        border: "border-brand-teal/20",
                        iconBg: "bg-gradient-to-br from-brand-teal/10 to-teal-100",
                        tagBg: "bg-gradient-to-r from-brand-teal/10 to-teal-100",
                        tagText: "text-brand-teal"
                      }
                    };
                    return colorMap[color as keyof typeof colorMap] || colorMap.amber;
                  };

                  const colorClasses = getColorClasses(resource.color);

                  return (
                    <div 
                      key={resource.id}
                      className={`${colorClasses.bg} backdrop-blur-sm rounded-xl p-5 shadow-gold/10 hover:shadow-gold-lg border ${colorClasses.border} hover-lift transition-all duration-300 animate-fadeInUp`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses.iconBg} border ${colorClasses.border}`}>
                          <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                        </div>
                        <div className="flex-1">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-2 ${colorClasses.tagBg} ${colorClasses.tagText}`}>
                            {resource.type === 'ebook' ? 'E-Book' : 
                             resource.type === 'video' ? 'Video' :
                             resource.type === 'case-study' ? 'Case Study' : 'Tool'}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-deep-charcoal mb-2">
                            {resource.title}
                          </h3>
                          <p className="text-warm-gray text-xs sm:text-sm mb-3">
                            {resource.description}
                          </p>
                          <p className="text-xs text-warm-gray/70">
                            {resource.stats}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={resource.type === 'video' ? handleVideoWatch : handleEbookDownload}
                        className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-300 hover-lift flex items-center justify-center gap-2 ${
                          resource.type === 'video' 
                            ? 'bg-gradient-to-r from-warm-navy/10 to-blue-100 hover:from-warm-navy/20 hover:to-blue-200 text-warm-navy border border-warm-navy/20' 
                            : 'btn-gold text-deep-charcoal'
                        }`}
                      >
                        {resource.type === 'video' ? (
                          <>
                            <Video className="w-4 h-4" />
                            Watch Video
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Download Now
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Section */}
            <div className="animate-fadeInUp delay-700">
              <div className="bg-gradient-to-br from-deep-charcoal to-warm-navy rounded-2xl p-6 md:p-8 text-white overflow-hidden shadow-navy-lg">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gradient-gold">
                      Ready to Transform Your{" "}
                      <span className="text-soft-gold">
                        Homebuilding Business?
                      </span>
                    </h3>
                    <p className="text-warm-white/80 text-sm sm:text-base mb-4 sm:mb-6">
                      Join 300+ homebuilders who are already using AI to drive growth and efficiency. 
                      Get a personalized walkthrough of how AI can work for your specific operations.
                    </p>

                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                        <span className="text-warm-white/80 text-sm sm:text-base">
                          No credit card required
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                        <span className="text-warm-white/80 text-sm sm:text-base">
                          30-45 day implementation
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                        <span className="text-warm-white/80 text-sm sm:text-base">
                          ROI from first month
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <button
                      onClick={handleScheduleConsultation}
                      className="w-full group flex items-center justify-center gap-2 sm:gap-3 btn-gold font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl hover:shadow-gold-lg hover-lift transition-all duration-300 text-sm sm:text-base"
                    >
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal" />
                      <span className="text-deep-charcoal">Book 15-Minute Demo</span>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={handleVideoWatch}
                      className="w-full group flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm border border-amber-gold/20 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl hover:bg-amber-gold/10 hover:border-amber-gold transition-all duration-300 text-sm sm:text-base hover-lift"
                    >
                      <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Watch 2-Minute Overview</span>
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <button
                      onClick={() => window.location.href = '/'}
                      className="w-full group flex items-center justify-center gap-2 sm:gap-3 bg-transparent border border-amber-gold/30 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl hover:bg-amber-gold/5 transition-all duration-300 text-sm sm:text-base hover-lift"
                    >
                      <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Return to Home</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}