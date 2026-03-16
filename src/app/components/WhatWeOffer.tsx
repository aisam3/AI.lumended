"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Brain,
  Zap,
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  Clock,
  DollarSign,
  BarChart,
  Building,
  FileText,
  Video,
  Download,
  Share2,
  Calendar,
  Headphones,
  Award,
  MapPin,
  Settings,
  X,
  PlayCircle,
  Mail,
} from "lucide-react";
import Link from "next/link";

// UPDATED VARIABLES BASED ON DOCUMENT
const COMPANY_NAME = "AI for Homebuilders";
const COMPANY_TAGLINE = "AI for Humans";
const FOUNDER_NAME = "Steven Fabry";
const CEO_YEARS = "17 Years as CEO (Compendia)";
const TEAM_SIZE = "87 Employees Led";
const CLIENT_COUNT = "300+ Builder Clients";
const STATES_SERVED = "28 States Served";
const ROI_PROJECTION = "12 Extra Homes"; // Conservative Year-1 projection
const IMPLEMENTATION_TIMELINE = "30-45 Days"; // Typical window from kickoff to live AI agents

// Workflow steps based on builder operations
const workflowSteps = [
  {
    step: 1,
    title: "Comprehensive Needs Assessment",
    description: "We analyze your specific homebuilding workflows, pain points, and existing systems to understand exactly how AI can transform your operations.",
    icon: Building,
    color: "amber",
    duration: "1-2 days",
    outcome: "Custom AI strategy tailored to your unique homebuilding operations",
    metrics: [
      "Current workflow analysis",
      "Pain point identification",
      "ROI opportunity assessment",
    ],
    image: "/workflow/assessment.jpg",
  },
  {
    step: 2,
    title: "Seamless System Integration",
    description: "Our AI plugs into your existing CRM, warranty platform, and tools. No IT overhaul required.",
    icon: Settings,
    color: "blue",
    duration: "3-5 days",
    outcome: "Fully integrated AI workflow layer on your existing stack",
    metrics: [
      "Plug into existing CRM",
      "Connect to warranty tools",
      "Zero data migration",
    ],
    quote: `"No big system upgrade required! Our AI solutions seamlessly integrate with your current technology stack."`,
    image: "/workflow/integration.jpg",
  },
  {
    step: 3,
    title: "AI-Powered Workflow Activation",
    description: "Our three AI agents begin working immediately: Marketing Agent, Sales Agent, and Warranty Concierge.",
    icon: Zap,
    color: "green",
    duration: "Immediate",
    outcome: "Automated operations begin delivering value",
    metrics: [
      "Marketing Agent: 900 Qualified Leads/Year",
      "Sales Agent: <60s Lead Response",
      "Warranty Concierge: 40% Call Deflection",
    ],
    image: "/workflow/activation.jpg",
  },
  {
    step: 4,
    title: "Team Training & Adoption",
    description: "Your team receives comprehensive training to work effectively with AI—ensuring smooth adoption and maximum utilization.",
    icon: Users,
    color: "purple",
    duration: "2-3 days",
    outcome: "Fully trained, confident team working with AI",
    metrics: [
      "90% team adoption rate",
      "30-day proficiency",
      "Ongoing support access",
    ],
    image: "/workflow/training.jpg",
  },
  {
    step: 5,
    title: "Continuous Performance Optimization",
    description: "Ongoing AI learning and optimization based on your data, with regular performance reviews to ensure maximum ROI.",
    icon: TrendingUp,
    color: "orange",
    duration: "Ongoing",
    outcome: "Continuous improvement and ROI growth",
    metrics: [
      "Monthly performance reviews",
      "AI model optimization",
      "ROI tracking and reporting",
    ],
    quote: `"I've spent 30 years learning what makes homebuilders succeed. Now I'm putting that knowledge into AI that actually works for you."`,
    image: "/workflow/optimization.jpg",
  },
];

// Key benefits for homebuilders
const keyBenefits = [
  {
    title: "Proven Homebuilder Experience",
    description: "Built by 30-year homebuilding operations veterans who understand your specific challenges.",
    icon: Award,
    color: "amber",
    stat: "30+ years experience",
  },
  {
    title: "No System Overhaul",
    description: "Works with your existing tools. Deploy AI without disrupting current operations.",
    icon: Shield,
    color: "blue",
    stat: "0 days downtime",
  },
  {
    title: "Measurable ROI",
    description: "Designed so one extra closing can pay for your AI system.",
    icon: DollarSign,
    color: "green",
    stat: "1 Extra Home Pays",
  },
  {
    title: "Proven Scale & Reliability",
    description: `Trusted by ${CLIENT_COUNT} builders across ${STATES_SERVED}. We know what works for homebuilders.`,
    icon: MapPin,
    color: "purple",
    stat: `${STATES_SERVED} states`,
  },
];

// Results timeline for homebuilders
const resultsTimeline = [
  {
    week: "Week 1-2",
    title: "Integration & Setup",
    activities: ["System assessment", "API connections", "Team orientation"],
    metrics: ["0% disruption", "100% security compliance"],
  },
  {
    week: "Week 3-4",
    title: "Initial Activation",
    activities: [
      "AI model training",
      "Marketing Agent activation",
      "Initial team training",
    ],
    metrics: ["Marketing Agent live", "Sales Agent ready", "2-hour response time"],
  },
  {
    week: "Month 2",
    title: "Performance Growth",
    activities: [
      "Performance optimization",
      "Warranty Concierge activation",
      "Process refinement",
    ],
    metrics: ["60% efficiency gain", "40% call deflection", "$57K+ savings identified"],
  },
  {
    week: "Month 3+",
    title: "Full ROI Realization",
    activities: [
      "Advanced AI features",
      "Cross-team integration",
      "Scale planning",
    ],
    metrics: [
      "90% adoption",
      "12+ extra homes projection",
      "Full ROI achieved",
    ],
  },
];

// Implementation options for homebuilders
const implementationOptions = [
  {
    type: "Standard",
    timeline: "30-45 days",
    features: ["Three AI agents", "Team training", "Monthly reviews"],
    bestFor: "Mid-sized homebuilders",
    price: "Custom ROI-based pricing",
  },
  {
    type: "Accelerated",
    timeline: "20-30 days",
    features: [
      "Priority integration",
      "Dedicated specialist",
      "Weekly optimization",
    ],
    bestFor: "Growing builders with urgency",
    price: "Custom ROI-based pricing",
  },
  {
    type: "Enterprise",
    timeline: "Custom",
    features: [
      "Full customization",
      "Executive sponsorship",
      "Strategic partnership",
    ],
    bestFor: "National builders & enterprises",
    price: "Strategic partnership",
  },
];

// Email Capture Modal Component
interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
  ebookUrl?: string;
}

function EmailCaptureModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  ebookUrl = "/Website Assets/bookpdf/AI_for_Homebuilders_Ebook (1).pdf" 
}: EmailCaptureModalProps) {
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log the submission (in production, send to your API)
      console.log("Ebook download request:", {
        email,
        name: name || "Not provided",
        company: company || "Not provided",
        timestamp: new Date().toISOString(),
        ebook: ebookUrl
      });

      // Show success state
      setIsSuccess(true);
      onSuccess(email);

      // Open PDF after a brief delay
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

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [selectedTimeline, setSelectedTimeline] = useState(0);
  const [showEbookModal, setShowEbookModal] = useState(false); // New state for ebook modal
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Autoplay for workflow steps
  useEffect(() => {
    if (isPlaying && isVisible) {
      autoplayRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % workflowSteps.length);
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPlaying, isVisible]);

  // Handle step navigation
  const handleNextStep = () => {
    setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    setIsPlaying(false);
  };

  const handlePrevStep = () => {
    setActiveStep(
      (prev) => (prev - 1 + workflowSteps.length) % workflowSteps.length,
    );
    setIsPlaying(false);
  };

  // Handle Watch Overview button - open video popup
  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowVideoPopup(true);
    document.body.style.overflow = "hidden";
  };

  // Close video popup
  const closeVideoPopup = () => {
    setShowVideoPopup(false);
    document.body.style.overflow = "auto";
  };

  // Handle Ebook Download - open email capture modal
  const handleEbookDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEbookModal(true);
  };

  const handleEbookSuccess = (email: string) => {
    console.log("Ebook downloaded from HowItWorks by:", email);
    // You can add analytics tracking here
  };

  // Get color classes - UPDATED to use your color palette
  const getColorClasses = (color: string) => {
    const colorMap = {
      amber: {
        bg: "bg-gradient-to-br from-amber-gold/20 to-soft-gold/10",
        text: "text-amber-gold",
        border: "border-amber-gold/20",
        gradient: "from-amber-gold to-soft-gold",
        light: "bg-amber-gold/5",
        iconBg: "bg-amber-gold/10",
      },
      blue: {
        bg: "bg-gradient-to-br from-warm-navy/20 to-blue-50",
        text: "text-warm-navy",
        border: "border-warm-navy/20",
        gradient: "from-warm-navy to-blue-600",
        light: "bg-warm-navy/5",
        iconBg: "bg-warm-navy/10",
      },
      green: {
        bg: "bg-gradient-to-br from-brand-teal/20 to-green-50",
        text: "text-brand-teal",
        border: "border-brand-teal/20",
        gradient: "from-brand-teal to-teal-500",
        light: "bg-brand-teal/5",
        iconBg: "bg-brand-teal/10",
      },
      purple: {
        bg: "bg-gradient-to-br from-purple-500/20 to-purple-100",
        text: "text-purple-700",
        border: "border-purple-200",
        gradient: "from-purple-400 to-purple-600",
        light: "bg-purple-50",
        iconBg: "bg-purple-100",
      },
      orange: {
        bg: "bg-gradient-to-br from-orange-400/20 to-orange-100",
        text: "text-orange-700",
        border: "border-orange-200",
        gradient: "from-orange-400 to-orange-600",
        light: "bg-orange-50",
        iconBg: "bg-orange-100",
      },
    };

    return colorMap[color as keyof typeof colorMap] || colorMap.amber;
  };

  // Button handlers - UPDATED FOR AI FOR HOMEBUILDERS
  const handleBookDemo = () => {
    // Scroll to Book Your 15-Minute Demo section
    const demoSection = document.getElementById("book-demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSeeROI = () => {
    // Navigate to schedule consultation page
    window.location.href = "/scheduleConsultation";
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative min-h-screen overflow-hidden flex items-center bg-gradient-to-b from-warm-white to-white scroll-mt-[100px] pb-16 md:pb-20 lg:pb-24" // Added bottom gap
      style={{ paddingTop: "100px" }}
    >
      {/* Background decorative elements matching your theme */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-gold/5 to-transparent rounded-full blur-3xl transition-all duration-1500 ${isVisible ? "opacity-100" : "opacity-0"}`} />
        <div className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-warm-navy/5 to-transparent rounded-full blur-3xl transition-all duration-1500 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`} />
        <div className={`absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-brand-teal/3 to-transparent rounded-full blur-3xl transition-all duration-1500 delay-600 ${isVisible ? "opacity-100" : "opacity-0"}`} />
      </div>

      <div className="relative container-custom px-4 sm:px-6">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* HEADER SECTION - Matching Hero font sizes and spacing */}
          <div className="text-center mb-10 animate-fadeInUp">
            {/* Animated header badge - same style as Hero */}
            <div className="mb-3 sm:mb-2 md:mb-2 animate-fadeInUp">
              <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-navy leading-tight">
                <div className="h-8 sm:h-10 md:h-14 flex items-center justify-center">
                  <span className="text-warm-navy">How It </span>
                  <span className="text-gradient-gold font-bold ml-2">
                    Works
                  </span>
                </div>
              </h1>
            </div>
            
            {/* Trust line - same style as Hero */}
            <div className="mb-2 sm:mb-1 animate-fadeInUp delay-100">
              <span className="inline-block text-xs md:text-sm font-medium tracking-wide uppercase bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text">
                Homebuilder-First Process
              </span>
            </div>
            
            {/* Subtitle - compact like Hero */}
            <p className="text-sm sm:text-sm md:text-sm text-warm-navy uppercase font-medium leading-relaxed mb-3 sm:mb-2 md:mb-3 max-w-xl mx-auto animate-fadeInUp delay-200">
              A proven 5-step process from 30+ years of homebuilding operations
            </p>
            <p className="text-xs sm:text-xs md:text-xs text-warm-gray font-medium leading-relaxed mb-5 sm:mb-4 md:mb-4 max-w-lg mx-auto animate-fadeInUp delay-300">
              No big system upgrades—just seamless AI integration that goes live in {IMPLEMENTATION_TIMELINE}.
            </p>

            {/* Company Quote - Matching Hero style */}
            <div className="max-w-md mx-auto bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-lg p-4 border border-amber-gold/10 animate-fadeInUp delay-400">
              <p className="text-xs sm:text-xs md:text-sm text-deep-charcoal font-medium">
                <span className="font-semibold text-gradient-gold">"No IT overhaul required."</span> Our AI plugs into your existing CRM, warranty platform, and tools.
              </p>
            </div>
          </div>

          {/* Interactive Workflow Visualization */}
          <div className="mb-12 animate-fadeInUp delay-500">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-gold/10 overflow-hidden hover:shadow-gold/20 transition-all duration-300">
              {/* Workflow Header */}
              <div className="p-4 sm:p-6 border-b border-amber-gold/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gradient-navy mb-1">
                      5-Step Implementation Process
                    </h2>
                    <p className="text-warm-gray text-sm sm:text-base">
                      Proven across {CLIENT_COUNT} homebuilder implementations
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-warm-navy hover:bg-amber-gold/5 rounded-lg transition-all duration-300 hover-lift"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Pause Auto-play</span>
                          <span className="sm:hidden">Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Play Auto-play</span>
                          <span className="sm:hidden">Play</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleVideoClick}
                      className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 btn-gold rounded-lg hover:shadow-gold-lg transition-all duration-300 text-sm font-medium hover-lift group"
                    >
                      <Video className="w-3 h-3 sm:w-4 sm:h-4 text-deep-charcoal" />
                      <span className="hidden sm:inline text-deep-charcoal">Watch Demo</span>
                      <span className="sm:hidden text-deep-charcoal">Demo</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Workflow Visualization */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Step Progress */}
                <div className="relative mb-6 sm:mb-8">
                  {/* Progress Line */}
                  <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-amber-gold/10 -translate-y-1/2 md:left-8 md:right-8" />
                  <div
                    className="absolute top-1/2 left-4 h-0.5 bg-gradient-to-r from-amber-gold to-soft-gold -translate-y-1/2 transition-all duration-500 md:left-8"
                    style={{
                      width: `${((activeStep + 1) / workflowSteps.length) * 100}%`,
                    }}
                  />

                  {/* Step Indicators */}
                  <div className="relative flex justify-between">
                    {workflowSteps.map((step, index) => {
                      const colorClasses = getColorClasses(step.color);
                      return (
                        <button
                          key={step.step}
                          onClick={() => {
                            setActiveStep(index);
                            setIsPlaying(false);
                          }}
                          className={`relative flex flex-col items-center group transition-all duration-300 ${index <= activeStep ? "opacity-100" : "opacity-60 hover:opacity-80"}`}
                        >
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-3 border-2 transition-all duration-300 hover:scale-110 ${
                              index <= activeStep
                                ? `${colorClasses.iconBg} border-white shadow-gold`
                                : "bg-warm-white border-gray-300"
                            }`}
                          >
                            <step.icon
                              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                                index <= activeStep
                                  ? colorClasses.text
                                  : "text-warm-gray"
                              }`}
                            />
                          </div>
                          <div className="text-center">
                            <div
                              className={`text-xs font-medium transition-colors ${
                                index <= activeStep
                                  ? "text-deep-charcoal"
                                  : "text-warm-gray"
                              }`}
                            >
                              Step {step.step}
                            </div>
                            <div
                              className={`text-xs transition-colors ${
                                index <= activeStep
                                  ? "text-warm-gray"
                                  : "text-warm-gray/60"
                              }`}
                            >
                              {step.duration}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Step Details */}
                <div
                  className={`transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Step Information */}
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 bg-amber-gold/5 rounded-full text-xs sm:text-sm text-amber-gold mb-2 border border-amber-gold/10">
                            <Clock className="w-3 h-3" />
                            {workflowSteps[activeStep].duration}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gradient-navy mb-2">
                            {workflowSteps[activeStep].title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={handlePrevStep}
                            className="p-1.5 sm:p-2 hover:bg-amber-gold/5 rounded-lg transition-all duration-300 hover-lift"
                            aria-label="Previous step"
                          >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-warm-navy" />
                          </button>
                          <button
                            onClick={handleNextStep}
                            className="p-1.5 sm:p-2 hover:bg-amber-gold/5 rounded-lg transition-all duration-300 hover-lift"
                            aria-label="Next step"
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-warm-navy" />
                          </button>
                        </div>
                      </div>

                      <p className="text-warm-gray text-base sm:text-lg leading-relaxed">
                        {workflowSteps[activeStep].description}
                      </p>

                      {workflowSteps[activeStep].quote && (
                        <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 border-l-4 border-amber-gold rounded-r">
                          <p className="text-deep-charcoal italic text-sm sm:text-base">
                            {workflowSteps[activeStep].quote}
                          </p>
                        </div>
                      )}

                      {/* Step Outcome */}
                      <div className="p-3 sm:p-4 bg-gradient-to-br from-warm-white to-white rounded-lg border border-amber-gold/10">
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <Target className="w-3 h-3 sm:w-4 sm:h-4 text-brand-teal" />
                          <span className="font-medium text-gradient-teal text-sm sm:text-base">
                            Expected Outcome:
                          </span>
                        </div>
                        <p className="text-deep-charcoal text-sm sm:text-base">
                          {workflowSteps[activeStep].outcome}
                        </p>
                      </div>
                    </div>

                    {/* Step Metrics */}
                    <div className="bg-gradient-to-br from-deep-charcoal to-warm-navy rounded-xl p-4 sm:p-6 text-white shadow-navy">
                      <h4 className="font-bold text-lg mb-3 sm:mb-4 text-gradient-gold">
                        Key Metrics & Activities
                      </h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {workflowSteps[activeStep].metrics.map(
                          (metric, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 sm:gap-3"
                            >
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-gold flex-shrink-0" />
                              <span className="text-warm-white text-sm sm:text-base">
                                {metric}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>

                      {/* Step Progress */}
                      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                          <span className="text-xs sm:text-sm text-warm-white/80">
                            Progress to Completion
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-amber-gold">
                            {Math.round(
                              ((activeStep + 1) / workflowSteps.length) * 100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-1.5 sm:h-2">
                          <div
                            className="bg-gradient-to-r from-amber-gold to-soft-gold h-1.5 sm:h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${((activeStep + 1) / workflowSteps.length) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-12 animate-fadeInUp delay-600">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gradient-navy mb-2">
                Why Our Process{" "}
                <span className="text-gradient-gold">
                  Works for Homebuilders
                </span>
              </h2>
              <p className="text-warm-gray text-sm sm:text-base max-w-2xl mx-auto px-4">
                Built on 30+ years of homebuilding operations experience by {FOUNDER_NAME}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {keyBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const colorClasses = getColorClasses(benefit.color);

                return (
                  <div
                    key={benefit.title}
                    className={`${colorClasses.bg} backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-gold/10 hover:shadow-gold-lg border ${colorClasses.border} hover-lift transition-all duration-300 card-${benefit.color}-border`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${colorClasses.iconBg} rounded-lg flex items-center justify-center mb-3 sm:mb-4 border ${colorClasses.border}`}
                    >
                      <Icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${colorClasses.text}`}
                      />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-deep-charcoal mb-1 sm:mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-warm-gray text-xs sm:text-sm mb-2 sm:mb-3">
                      {benefit.description}
                    </p>
                    <div className="text-lg sm:text-xl font-bold text-gradient-gold">
                      {benefit.stat}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results Timeline */}
          <div className="mb-12 animate-fadeInUp delay-700">
            <div className="bg-gradient-to-r from-amber-gold/5 via-white to-amber-gold/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-amber-gold/20 shadow-gold/10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gradient-navy mb-2">
                  Typical{" "}
                  <span className="text-gradient-gold">Results Timeline</span>
                </h2>
                <p className="text-warm-gray text-sm sm:text-base max-w-2xl mx-auto px-4">
                  What to expect during your {COMPANY_NAME} implementation
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {resultsTimeline.map((period, index) => (
                  <div
                    key={period.week}
                    className={`group cursor-pointer ${selectedTimeline === index ? "ring-2 ring-amber-gold" : ""}`}
                    onClick={() => setSelectedTimeline(index)}
                  >
                    <div
                      className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-gold/20 group-hover:border-amber-gold transition-all duration-300 hover-lift ${selectedTimeline === index ? "shadow-gold-lg" : "shadow-gold/10"}`}
                    >
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-gold/20 to-amber-gold/5 rounded-lg flex items-center justify-center border border-amber-gold/10">
                          <div className="text-amber-gold font-bold text-xs sm:text-sm">
                            {period.week.split(" ")[0]}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-deep-charcoal text-sm sm:text-base">
                            {period.week}
                          </div>
                          <div className="text-xs sm:text-sm text-warm-gray">
                            {period.title}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                        <h4 className="text-xs sm:text-sm font-medium text-deep-charcoal">
                          Key Activities:
                        </h4>
                        <ul className="space-y-1">
                          {period.activities.map((activity, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-xs sm:text-sm text-warm-gray"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-gold flex-shrink-0" />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <h4 className="text-xs sm:text-sm font-medium text-deep-charcoal">
                          Expected Metrics:
                        </h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {period.metrics.map((metric, i) => (
                            <span
                              key={i}
                              className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-amber-gold/10 text-xs text-deep-charcoal rounded border border-amber-gold/10"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline Details */}
              <div
                className={`mt-6 sm:mt-8 p-4 sm:p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-amber-gold/10 transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"} shadow-gold/10`}
              >
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-gradient-navy mb-2 sm:mb-3">
                      {resultsTimeline[selectedTimeline].week}:{" "}
                      {resultsTimeline[selectedTimeline].title}
                    </h4>
                    <p className="text-warm-gray text-sm sm:text-base mb-3 sm:mb-4">
                      During this phase, your team will focus on{" "}
                      {resultsTimeline[
                        selectedTimeline
                      ].activities[0].toLowerCase()}
                      and{" "}
                      {resultsTimeline[
                        selectedTimeline
                      ].activities[1].toLowerCase()}{" "}
                      to establish strong foundations for AI integration.
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-warm-gray">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>
                        Based on {CLIENT_COUNT} homebuilder implementations
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-gold/5 to-amber-gold/10 rounded-lg p-3 sm:p-4 border border-amber-gold/10">
                    <h5 className="font-medium text-deep-charcoal text-sm sm:text-base mb-2">
                      Implementation Support
                    </h5>
                    <ul className="space-y-1 sm:space-y-2">
                      <li className="flex items-center gap-2 text-xs sm:text-sm text-deep-charcoal">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-brand-teal flex-shrink-0" />
                        Dedicated implementation specialist
                      </li>
                      <li className="flex items-center gap-2 text-xs sm:text-sm text-deep-charcoal">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-brand-teal flex-shrink-0" />
                        Weekly progress reviews
                      </li>
                      <li className="flex items-center gap-2 text-xs sm:text-sm text-deep-charcoal">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-brand-teal flex-shrink-0" />
                        On-demand training resources
                      </li>
                      <li className="flex items-center gap-2 text-xs sm:text-sm text-deep-charcoal">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-brand-teal flex-shrink-0" />
                        Priority technical support
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Options */}
          <div className="mb-12 animate-fadeInUp delay-800">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gradient-navy mb-2">
                Choose Your{" "}
                <span className="text-gradient-gold">Implementation Path</span>
              </h2>
              <p className="text-warm-gray text-sm sm:text-base max-w-2xl mx-auto px-4">
                Flexible options based on your homebuilding business size, needs, and timeline
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {implementationOptions.map((option, index) => (
                <div
                  key={option.type}
                  className={`bg-white/90 backdrop-blur-sm rounded-xl border border-amber-gold/10 hover:border-amber-gold hover-lift transition-all duration-300 group card-${index === 0 ? 'gold' : index === 1 ? 'teal' : 'navy'}-border`}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-gradient-navy">
                        {option.type}
                      </h3>
                      <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 text-deep-charcoal rounded-full text-xs sm:text-sm font-medium border border-amber-gold/20">
                        {option.timeline}
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      {option.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-brand-teal flex-shrink-0" />
                          <span className="text-warm-gray text-xs sm:text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <div className="text-xs sm:text-sm text-warm-gray mb-1">
                        Best for:
                      </div>
                      <div className="font-medium text-deep-charcoal text-sm sm:text-base">
                        {option.bestFor}
                      </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <div className="text-xl sm:text-2xl font-bold text-gradient-gold">
                        {option.price}
                      </div>
                      <div className="text-xs sm:text-sm text-warm-gray">
                        Tailored to your specific homebuilding needs
                      </div>
                    </div>

                    <Link href="/scheduleConsultation">
                      <button
                        className="w-full group/btn flex items-center justify-center gap-1 sm:gap-2 btn-gold font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:shadow-gold-lg hover-lift transition-all duration-300 text-sm sm:text-base"
                      >
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-deep-charcoal" />
                        <span className="text-deep-charcoal">Book 15-Minute Demo</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-deep-charcoal group-hover/btn:translate-x-0.5 sm:group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="animate-fadeInUp delay-900">
            <div className="bg-gradient-to-br from-deep-charcoal to-warm-navy rounded-2xl p-4 sm:p-6 md:p-8 text-white overflow-hidden shadow-navy-lg">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gradient-gold">
                    Ready to Start Your{" "}
                    <span className="text-soft-gold">
                      Homebuilding AI Journey?
                    </span>
                  </h3>
                  <p className="text-warm-white/80 text-sm sm:text-base mb-4 sm:mb-6">
                    Get a personalized walkthrough of how {COMPANY_NAME} can
                    transform your homebuilding operations. Our 30-year experienced team will show you
                    exactly how to implement AI without disruption.
                  </p>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Building className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                      <span className="text-warm-white/80 text-sm sm:text-base">
                        {CLIENT_COUNT} successful homebuilder implementations
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                      <span className="text-warm-white/80 text-sm sm:text-base">
                        No system overhaul required
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                      <span className="text-warm-white/80 text-sm sm:text-base">
                        {ROI_PROJECTION} conservative Year-1 projection
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <Link href="/scheduleConsultation">
                    <button
                      className="w-full group flex items-center justify-center gap-2 sm:gap-3 btn-gold font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:shadow-gold-lg hover-lift transition-all duration-300 text-sm sm:text-base"
                    >
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal" />
                      <span className="text-deep-charcoal">See Your 12-Home ROI</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>

                  <button
                    onClick={handleVideoClick}
                    className="w-full group flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm border border-amber-gold/20 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-amber-gold/10 hover:border-amber-gold transition-all duration-300 text-sm sm:text-base hover-lift"
                  >
                    <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Watch 2-Minute Overview</span>
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Updated Ebook Button */}
                  <button
                    onClick={handleEbookDownload}
                    className="w-full group flex items-center justify-center gap-2 sm:gap-3 bg-transparent border border-amber-gold/30 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-amber-gold/5 transition-all duration-300 text-sm sm:text-base hover-lift"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Download Free E-Book</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Popup Modal - Using your existing component */}
      {showVideoPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-smooth-appear z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-gradient-to-br from-deep-charcoal to-black rounded-2xl overflow-hidden shadow-2xl border border-amber-gold/20">
            {/* Close Button */}
            <button
              onClick={closeVideoPopup}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Content Grid */}
            <div className="flex flex-col lg:flex-row">
              {/* Left Column - Video Player (70% width on desktop) */}
              <div className="lg:w-[70%] p-3 sm:p-4">
                <div className="bg-black rounded-lg overflow-hidden">
                  <video
                    className="w-full h-auto max-h-[80vh] object-contain"
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

                {/* Video Title Below */}
                <div className="mt-3">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    AI for Homebuilders: Transform Your Business
                  </h3>
                  <p className="text-xs text-warm-gray mt-1">
                    A comprehensive overview of our AI solutions
                  </p>
                </div>
              </div>

              {/* Right Column - Video Details (30% width on desktop) */}
              <div className="lg:w-[30%] p-3 sm:p-4 bg-gradient-to-b from-deep-charcoal/80 to-black border-t lg:border-t-0 lg:border-l border-warm-navy/30">
                <div className="h-full flex flex-col">
                  {/* Founder Info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-gold/20 to-warm-navy/30 overflow-hidden flex-shrink-0">
                        <img
                          src="/ai-for-homebuilders.jpg"
                          alt="Steven Fabry"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Steven Fabry
                        </div>
                        <div className="text-xs text-warm-gray">
                          Founder & CEO
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-warm-gray/80 bg-warm-navy/10 p-2 rounded-lg">
                      <p className="mb-1 font-medium text-white">
                        About this video:
                      </p>
                      <p>
                        This 2-minute overview demonstrates how AI.Lumen
                        delivers measurable ROI for homebuilders through
                        intelligent automation and seamless integration.
                      </p>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-white mb-2 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-gold rounded-full"></span>
                      VIDEO HIGHLIGHTS
                    </h4>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-gold/20 to-amber-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-gold"></div>
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">
                            Real AI Examples
                          </p>
                          <p className="text-xs text-warm-gray">
                            See how AI transforms daily operations
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-gold/20 to-amber-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-gold"></div>
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">
                            12-Home ROI
                          </p>
                          <p className="text-xs text-warm-gray">
                            Conservative first-year projection
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-gold/20 to-amber-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-gold"></div>
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">
                            30-45 Day Setup
                          </p>
                          <p className="text-xs text-warm-gray">
                            Quick turnkey implementation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-white mb-2 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-gold rounded-full"></span>
                      OUR TRACK RECORD
                    </h4>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-warm-navy/20 p-2 rounded-lg text-center">
                        <div className="text-base font-bold text-amber-gold">
                          17+
                        </div>
                        <div className="text-xs text-warm-gray">
                          Years Experience
                        </div>
                      </div>
                      <div className="bg-warm-navy/20 p-2 rounded-lg text-center">
                        <div className="text-base font-bold text-amber-gold">
                          300+
                        </div>
                        <div className="text-xs text-warm-gray">
                          Builder Clients
                        </div>
                      </div>
                      <div className="bg-warm-navy/20 p-2 rounded-lg text-center">
                        <div className="text-base font-bold text-amber-gold">
                          28
                        </div>
                        <div className="text-xs text-warm-gray">
                          States Served
                        </div>
                      </div>
                      <div className="bg-warm-navy/20 p-2 rounded-lg text-center">
                        <div className="text-base font-bold text-amber-gold">
                          45
                        </div>
                        <div className="text-xs text-warm-gray">
                          Days Avg. Setup
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-auto">
                    <div className="bg-gradient-to-r from-warm-navy/20 to-amber-gold/10 p-3 rounded-xl border border-warm-navy/30">
                      <p className="text-sm text-white font-medium mb-1">
                        Ready to see your ROI?
                      </p>
                      <p className="text-xs text-warm-gray mb-3">
                        Get a personalized consultation and see how AI can
                        work for your business.
                      </p>
                      <Link href="/scheduleConsultation">
                        <button
                          onClick={() => setShowVideoPopup(false)}
                          className="w-full py-2 bg-gradient-to-r from-amber-gold to-soft-gold text-deep-charcoal font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-gold/30 transition-all duration-300 text-sm"
                        >
                          Schedule Consultation
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Capture Modal for Ebook Download */}
      <EmailCaptureModal
        isOpen={showEbookModal}
        onClose={() => setShowEbookModal(false)}
        onSuccess={handleEbookSuccess}
      />
    </section>
  );
}