"use client";

import {
  ArrowRight,
  Zap,
  MessageSquare,
  Calendar,
  CheckCircle,
  Users,
  TrendingUp,
  BarChart3,
  Shield,
  Mail,
  Phone,
  Target,
  Clock,
  DollarSign,
  Home,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  ExternalLink,
  BookOpen,
  Star,
  Target as TargetIcon,
  Users as UsersIcon,
  DollarSign as DollarSignIcon,
  ArrowUpRight,
  Video,
  Download,
  PlayCircle,
  Mail as MailIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Email Capture Modal Component (from your original code)
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
  ebookUrl = "/Website Assets/bookpdf/AI_for_Homebuilders_Ebook (1).pdf",
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Ebook download request:", {
        email,
        name: name || "Not provided",
        company: company || "Not provided",
        timestamp: new Date().toISOString(),
        ebook: ebookUrl,
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
      <div className="relative w-full max-w-md bg-gradient-to-br from-warm-white to-warm-white/95 rounded-2xl overflow-hidden shadow-2xl border border-amber-gold/20">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-deep-charcoal/10 hover:bg-deep-charcoal/20 flex items-center justify-center text-deep-charcoal transition-all duration-300"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 md:p-8">
          {isSuccess ? (
            <div className="text-center animate-fadeIn">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-gold/5 to-soft-gold/5 mb-4 border border-amber-gold/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-gold/10 to-soft-gold/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-brand-teal" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gradient-gold mb-2">
                Thank You!
              </h3>
              <p className="text-deep-charcoal/80 mb-1">
                Your free ebook is downloading...
              </p>
              <p className="text-xs text-warm-gray">
                We've sent a copy to{" "}
                <span className="font-medium text-amber-gold">{email}</span>
              </p>
              <div className="mt-6 pt-6 border-t border-amber-gold/10">
                <p className="text-xs text-warm-gray">
                  Check your email for additional resources
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-amber-gold/10 to-soft-gold/10 mb-4 border border-amber-gold/20">
                  <Download className="w-7 h-7 text-amber-gold" />
                </div>
                <h3 className="text-xl font-semibold text-gradient-navy mb-2">
                  Download Your Free E-Book
                </h3>
                <p className="text-sm text-warm-gray">
                  Get instant access to "AI for Homebuilders: The Complete
                  Guide"
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-warm-navy mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-gray" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-warm-white"
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
                    className="w-full px-3 py-3 text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-warm-white"
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
                    className="w-full px-3 py-3 text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-warm-white"
                    placeholder="Your Homebuilding Company"
                  />
                </div>

                {error && (
                  <div className="bg-amber-gold/5 border border-amber-gold/20 rounded-xl p-3 animate-fadeIn">
                    <p className="text-warm-navy text-xs text-center">
                      {error}
                    </p>
                  </div>
                )}

                <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-3 border border-amber-gold/10">
                  <p className="text-center text-xs text-deep-charcoal/70">
                    <span className="font-medium text-amber-gold">
                      No spam ever.
                    </span>{" "}
                    We respect your privacy and only send relevant content.
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

function VideoCarouselModal({
  isOpen,
  onClose,
  agentType,
}: {
  isOpen: boolean;
  onClose: () => void;
  agentType: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Example videos for the carousel
  let videos: { id: number; title: string; url: string; agent_type: string }[] =
    [];

  if (agentType === "sales") {
    videos = [
      {
        id: 1,
        title: "AI Sales Agent",
        url: "/Website Assets/video/sales-agent-demo-1.mov",
        agent_type: "sales",
      },
      {
        id: 3,
        title: "AI Sales Agent",
        url: "/Website Assets/video/sales-agent-demo-2.mp4",
        agent_type: "sales",
      },
    ];
  } else if (agentType === "marketing") {
    videos = [
      {
        id: 2,
        title: "AI Marketing Agent",
        url: "/Website Assets/video/marketing-agent-demo.mov",
        agent_type: "marketing",
      },
    ];
  } else if (agentType === "warranty") {
    videos = [
      {
        id: 4,
        title: "AI Warranty Concierge",
        url: "/Website Assets/video/warranty-agent-demo.mp4",
        agent_type: "warranty",
      },
    ];
  }

  const nextVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-warm-white rounded-2xl overflow-hidden shadow-2xl border border-amber-gold/20 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-gold/10 bg-warm-white bg-gradient-to-r from-warm-white to-warm-white/95">
          <h3 className="text-xl font-bold text-gradient-navy">
            {videos[currentIndex]?.title || "Video Overview"}
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-amber-gold/5 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-amber-gold/10 hover:shadow-gold/5 group"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-deep-charcoal group-hover:text-amber-gold transition-colors" />
          </button>
        </div>

        {/* Video Area */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          {videos.length > 0 && videos[currentIndex] ? (
            <video
              key={videos[currentIndex].id}
              src={videos[currentIndex].url}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-white">No video available</div>
          )}

          {/* Navigation Controls */}
          {videos.length > 1 && (
            <>
              <button
                onClick={prevVideo}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-white/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={nextVideo}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-white/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                aria-label="Next video"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {videos.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {videos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-amber-gold scale-125 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-white/50 hover:bg-white/80"}`}
                  aria-label={`Go to video ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RevenueEngineSection() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [activePopup, setActivePopup] = useState<number | null>(null);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const [showEbookModal, setShowEbookModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoAgentType, setVideoAgentType] = useState<string>("");
  const sectionRef = useRef(null);

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

  // Show Chatbot ONLY when the Warranty Concierge Modal is open
  useEffect(() => {
    if (activePopup === 3) {
      document.body.classList.add("show-chatbot");
      if ((window as any).botpressWebChat) {
        (window as any).botpressWebChat.sendEvent({ type: "show" });
      }
    } else {
      document.body.classList.remove("show-chatbot");
      if ((window as any).botpressWebChat) {
        (window as any).botpressWebChat.sendEvent({ type: "hide" });
      }
    }
  }, [activePopup]);

  const handleVideoClick = (e: React.MouseEvent, agentType: string) => {
    e.preventDefault();
    e.stopPropagation();
    setVideoAgentType(agentType);
    setShowVideoModal(true);
  };

  const handleEbookDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEbookModal(true);
  };

  const handleEbookSuccess = (email: string) => {
    console.log("Ebook downloaded from RevenueEngine by:", email);
  };

  const pillars = [
    {
      id: 1,
      agentType: "marketing",
      title: "Marketing Agent",
      subtitle: "The 24/7 Content Engine That Generates Qualified Leads",
      outcome: "MORE LEADS",
      icon: TrendingUp,
      color: "amber",
      description:
        "Generate 900+ qualified leads annually with automated video content",
      bullets: [
        "✅ Publish nique videos/month automatically",
        "✅ Distributes across 5 platforms",
        "✅ Captures every lead in under 60 seconds",
      ],
      workflow: [
        { label: "Create", color: "amber" },
        { label: "Publishes", color: "amber" },
        { label: "Lead capture", color: "amber" },
      ],
      metrics: [],
      cta: "Explore All Solutions →",
      popup: {
        title: "AI Marketing Agent",
        subtitle: "The 24/7 Content Engine That Generates Qualified Leads",
        description:
          "Transform your social media presence from a cost center into a lead generation machine. Create, publish, and optimize hyper-visible, user-driven, across multiple platforms—automatically capturing and qualifying every engagement in real-time.",
        features: [
          "Publish 30 unique professional videos per month automatically",
          "Distribute to YouTube Shorts, TikTok, Instagram, Facebook, and your website daily",
          "AI for Home Builders Closing 50–300 Homes/Year",
          "Capture every lead in under 60 seconds",
          "Route qualified leads directly to your sales team",
        ],
        keyMetric: "2.5 Qualified Leads Per Day",
        keyMetricValue: "900 Qualified Leads/Year",
      },
      cardAnimation:
        "hover:rotate-y-12 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)]",
    },
    {
      id: 2,
      agentType: "sales",
      title: "Sales Agent",
      subtitle: "The Always-On Closer That Never Lets a Lead Slip",
      outcome: "MORE SALES",
      icon: Zap,
      color: "brand-teal",
      description:
        "Instantly respond, qualify, and book appointments for every lead, 24/7/365",
      bullets: [
        "✅ Responds to every inquiry instantly",
        "✅ Qualifies and scores leads automatically",
        "✅ Books appointments directly into calendars",
      ],
      workflow: [
        { label: "Change lead", color: "brand-teal" },
        { label: "Nurture", color: "brand-teal" },
        { label: "Book appointment", color: "brand-teal" },
      ],
      metrics: [],
      cta: "Explore All Solutions →",
      popup: {
        title: "AI Sales Agent",
        subtitle: "The Always-On Closer That Never Lets a Lead Slip",
        description:
          "Discover 400+ lead capture and conversion prompts using AI-powered generative AI technology. Our platform is designed to help you close more deals faster and increase revenue.",
        features: [
          "Respond to every inquiry in under 60 seconds while leads are hot",
          "Adopt intelligent qualification questions and create lead performance",
          "Book model hours based directly into sales calendar",
          "Send personalized follow-up and nurture sequence",
        ],
        keyMetric: "<60s Lead Response Time",
        keyMetricValue: "Never lose a hot lead",
      },
      cardAnimation:
        "hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] hover:scale-[1.03]",
    },
    {
      id: 3,
      agentType: "warranty",
      title: "Warranty Concierge",
      subtitle: "The Margin Protector That Eliminates Warranty Chaos",
      outcome: "LOWER COSTS",
      icon: Shield,
      color: "warm-navy",
      description:
        "Save $57,300 annually on a 100-home build with automated warranty support",
      bullets: [
        "✅ Resolves routine issues 24/7",
        "✅ Collects photos & details before escalating",
        "✅ Eliminates unnecessary truck rolls",
      ],
      workflow: [
        { label: "Request", color: "warm-navy" },
        { label: "Resolve", color: "warm-navy" },
        { label: "Escalate and Dispatch", color: "warm-navy" },
      ],
      metrics: [],
      cta: "Explore All Solutions →",
      popup: {
        title: "AI Warranty Concierge",
        subtitle: "The Margin Protector That Eliminates Warranty Chaos",
        description:
          "Deflect 40% of warranty calls by instantly resolving online issues, reducing truck rolls, and protecting brand reputation. Honoree our faster resolution while your warranty costs drop dramatically.",
        features: [
          "Handle H&K events, thermostat questions, and appliance troubleshooting 24/7",
          "Collect photos, videos, and details before escalating",
          "Provide instant acknowledgment even at midnight",
          "Reduce customer workload by 50%",
        ],
        keyMetric: "40% Call Detection Rate",
        keyMetricValue: "$57,300 Annual savings (100-home build)",
      },
      cardAnimation:
        "hover:skew-y-1 hover:shadow-[0_20px_40px_-15px_rgba(30,64,175,0.3)] hover:border-warm-navy/40",
    },
  ];

  const outcomes = [
    { label: "More leads", color: "amber", icon: UsersIcon },
    { label: "More sales", color: "brand-teal", icon: DollarSignIcon },
    { label: "Lower costs", color: "warm-navy", icon: ArrowRight },
    { label: "Happier homeowners", color: "amber", icon: UsersIcon },
    { label: "Happier Employees!", color: "amber", icon: UsersIcon }, // Added new outcome
  ];

  // Popup Component - REMOVED the Watch 2-Minute Overview button as requested
  const Popup = ({ pillar, onClose }: { pillar: any; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-warm-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn border border-amber-gold/20">
        <div className="sticky top-0 bg-warm-white border-b border-amber-gold/10 p-6 flex justify-between items-center">
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                pillar.color === "amber"
                  ? "bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 text-amber-gold border border-amber-gold/20"
                  : pillar.color === "brand-teal"
                    ? "bg-gradient-to-r from-green-500/20 to-emerald-500/10 text-green-600 border border-green-500/20"
                    : "bg-gradient-to-r from-warm-navy/10 to-blue-50 text-warm-navy border border-warm-navy/20"
              }`}
            >
              {pillar.outcome}
            </span>
            <h3 className="text-xl font-bold text-gradient-navy">
              {pillar.popup.title}
            </h3>
            <p className="text-sm text-warm-gray mt-1">
              {pillar.popup.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-amber-gold/5 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-amber-gold/10"
          >
            <X className="w-5 h-5 text-deep-charcoal" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-warm-gray mb-6 text-base leading-relaxed animate-fadeIn delay-100">
            {pillar.popup.description}
          </p>

          {/* Key Metric Highlight */}
          <div
            className={`mb-6 p-6 rounded-xl animate-fadeIn delay-200 border ${
              pillar.color === "amber"
                ? "bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 border-amber-gold/20"
                : pillar.color === "brand-teal"
                  ? "bg-gradient-to-r from-green-500/10 to-emerald-500/5 border-green-500/20"
                  : "bg-gradient-to-r from-warm-navy/5 to-blue-50 border-warm-navy/20"
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient-gold mb-2">
                {pillar.popup.keyMetricValue}
              </div>
              <div className="text-lg font-semibold text-deep-charcoal">
                {pillar.popup.keyMetric}
              </div>
            </div>
          </div>

          <div className="mb-6 animate-fadeIn delay-300">
            <h4 className="font-bold text-gradient-navy mb-4 text-lg">
              Key Features
            </h4>
            <ul className="space-y-3">
              {pillar.popup.features.map((feature: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 animate-slideIn"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 animate-pulse" />
                  <span className="text-deep-charcoal text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 animate-fadeIn delay-400">
            <Link href="/scheduleConsultation" className="flex-1">
              <button
                onClick={onClose}
                className="w-full btn-gold py-3 rounded-xl font-semibold hover:shadow-gold-lg transition-all duration-300 hover:scale-[1.02] text-base flex items-center justify-center gap-2 group"
              >
                <span className="text-deep-charcoal">
                  Book Your Demo
                </span>
                <ArrowRight className="w-5 h-5 text-deep-charcoal group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>

          <div className="mt-4">
            <button
              onClick={handleEbookDownload}
              className="w-full px-6 py-3 border border-amber-gold/30 text-amber-gold rounded-xl font-semibold hover:bg-amber-gold/5 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 hover-lift"
            >
              <Download className="w-5 h-5" />
              Download Free E-Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Popup Render */}
      {activePopup !== null && (
        <Popup
          pillar={pillars.find((p) => p.id === activePopup)}
          onClose={() => setActivePopup(null)}
        />
      )}

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEbookModal}
        onClose={() => setShowEbookModal(false)}
        onSuccess={handleEbookSuccess}
      />

      {/* Video Carousel Modal */}
      <VideoCarouselModal
        isOpen={showVideoModal}
        agentType={videoAgentType}
        onClose={() => setShowVideoModal(false)}
      />

      <section
        ref={sectionRef}
        id="revenue"
        className="relative min-h-screen overflow-hidden flex items-center bg-gradient-to-b from-warm-white to-warm-white/95 scroll-mt-[100px] pb-2 md:pb-8 lg:pb-20"
        style={{ paddingTop: "100px" }}
      >
        {/* Background decorative elements with enhanced animations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-amber-gold/5 to-transparent rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-warm-navy/5 to-transparent rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-green-500/3 to-transparent rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-amber-gold/3 to-transparent rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2.5s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* HEADER SECTION */}
          <div className="text-center mb-10 animate-fadeInUp">
            <div className="mb-8 sm:mb-9 md:mb-4 animate-fadeInUp">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-gradient-navy leading-tight">
                <div className="h-8 sm:h-10 md:h-14 lg:h-15 flex items-center justify-center flex-wrap">
                  <span className="text-warm-navy">AI FOR HOMEBUILDERS</span>
                  <span className="text-gradient-gold ml-2">SOLUTIONS</span>
                </div>
              </h1>
            </div>

            <div className="mb-2 sm:mb-1 animate-fadeInUp delay-100">
              <span className="inline-block text-xs md:text-sm font-medium tracking-wide uppercase bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text">
                AI THAT PAYS FOR ITSELF
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-warm-navy leading-relaxed mb-4 sm:mb-3 md:mb-4 max-w-3xl mx-auto animate-fadeInUp delay-200">
              Three AI agents working together as a single revenue and margin
              engine—plugging directly into the stack you already use.
            </h2>

            <div className="mb-6 sm:mb-5 md:mb-6 animate-fadeInUp delay-300">
              <p className="text-sm sm:text-sm md:text-base text-warm-gray font-semibold leading-relaxed max-w-2xl mx-auto">
                True turnkey implementation with the software you already use
              </p>
            </div>

            {/* REMOVED: The 3 boxes with marketing agent, sales and warranty (redundant) */}

            {/* Outcomes row - centered */}
            <div className="flex flex-wrap justify-center gap-3 mt-6 animate-fadeInUp delay-500">
              {outcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-amber-gold/20 rounded-full shadow-gold/10 hover:shadow-gold hover:-translate-y-1 transition-all duration-500 hover-lift group"
                >
                  <outcome.icon
                    className={`w-4 h-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 ${
                      outcome.color === "amber"
                        ? "text-amber-gold"
                        : outcome.color === "brand-teal"
                          ? "text-green-500"
                          : "text-warm-navy"
                    }`}
                  />
                  <span className="text-xs font-medium text-deep-charcoal group-hover:text-gradient-gold transition-colors duration-300">
                    {outcome.label}
                  </span>
                </div>
              ))}
            </div>
            <h2 className="text-xs md:text-lg pt-5 font-medium text-deep-charcoal group-hover:text-gradient-gold transition-colors duration-300">
              Get them individually or bundle and save!
            </h2>
          </div>

          {/* Three Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp delay-700">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.id}
                className={`group relative bg-white/90 backdrop-blur-sm rounded-xl border border-amber-gold/10 p-6 transition-all duration-700 animate-fadeInUp card-${pillar.color}-border ${
                  hoveredPillar === pillar.id
                    ? "shadow-gold-lg"
                    : "shadow-gold/10"
                } ${pillar.cardAnimation}`}
                onMouseEnter={() => setHoveredPillar(pillar.id)}
                onMouseLeave={() => setHoveredPillar(null)}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationDuration: "0.8s",
                  animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {/* Header - REMOVED tilting animation and icon as requested */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 mb-3 transition-all duration-500 group-hover:scale-105 rounded-lg border ${
                        pillar.color === "amber"
                          ? "bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 border border-amber-gold/20"
                          : pillar.color === "brand-teal"
                            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-500/20"
                            : "bg-gradient-to-r from-warm-navy/10 to-blue-50 border border-warm-navy/20"
                      }`}
                    >
                      <span className="text-xs font-semibold text-gradient-gold uppercase tracking-wide">
                        {pillar.outcome}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gradient-navy mb-2 group-hover:text-amber-gold transition-colors duration-500">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-warm-gray mb-2">
                      {pillar.subtitle}
                    </p>
                  </div>
                  {/* REMOVED icon/image div as requested */}
                </div>

                {/* Description */}
                <p className="text-warm-gray mb-6 leading-relaxed text-sm">
                  {pillar.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 mb-6">
                  {pillar.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 group/bullet text-sm"
                      style={{
                        animationDelay: `${idx * 100}ms`,
                        animation: `slideIn 0.5s ease-out ${idx * 0.1}s both`,
                      }}
                    >
                      <span className="text-base group-hover/bullet:scale-125 transition-transform duration-300">
                        {bullet.split(" ")[0]}
                      </span>
                      <span className="text-deep-charcoal group-hover/bullet:text-amber-gold transition-colors duration-300">
                        {bullet.replace("✅", "")}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* WORKFLOW CIRCLES with centered arrows */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-gold/10 relative">
                  {pillar.workflow.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1.5 group/step relative z-10"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-500 group-hover/step:scale-110 group-hover/step:-translate-y-1 ${
                          pillar.color === "amber"
                            ? "bg-amber-gold/10 text-amber-gold border border-amber-gold/30 group-hover/step:bg-amber-gold/20"
                            : pillar.color === "brand-teal"
                              ? "bg-green-500/10 text-green-600 border border-green-500/30 group-hover/step:bg-green-500/20"
                              : "bg-warm-navy/10 text-warm-navy border border-warm-navy/30 group-hover/step:bg-warm-navy/20"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <span
                        className={`text-[11px] font-medium transition-all duration-300 group-hover/step:scale-105 ${
                          pillar.color === "amber"
                            ? "text-amber-gold/80 group-hover/step:text-amber-gold"
                            : pillar.color === "brand-teal"
                              ? "text-green-600/80 group-hover/step:text-green-600"
                              : "text-warm-navy/80 group-hover/step:text-warm-navy"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                  
                  {/* Centered arrows between workflow steps - larger and centered */}
                  {pillar.workflow.map((_, idx) => {
                    if (idx < pillar.workflow.length - 1) {
                      return (
                        <div
                          key={`arrow-${idx}`}
                          className="absolute hidden md:flex items-center justify-center"
                          style={{
                            left: `calc(${(idx + 1) * (100 / pillar.workflow.length)}% - 20px)`,
                            top: '25%',
                            transform: 'translateX(-50%)',
                          }}
                        >
                          <ArrowRight
                            className={`w-6 h-6 ${
                              pillar.color === "amber"
                                ? "text-amber-gold/40 group-hover:text-amber-gold/60"
                                : pillar.color === "brand-teal"
                                  ? "text-green-500/40 group-hover:text-green-500/60"
                                  : "text-warm-navy/40 group-hover:text-warm-navy/60"
                            } transition-all duration-300 group-hover:scale-110`}
                            strokeWidth={2.5}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Two buttons: Explore and Watch Video - as requested */}
                <div className="mt-6 pt-4 border-t border-amber-gold/10 flex flex-col gap-3">
                  {/* Explore button */}
                  <button
                    onClick={() => setActivePopup(pillar.id)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group/btn relative overflow-hidden ${
                      pillar.color === "amber"
                        ? "btn-gold"
                        : pillar.color === "brand-teal"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-green-500/30"
                          : "bg-gradient-to-r from-warm-navy to-blue-600 text-white hover:from-warm-navy hover:to-blue-700"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    <span className="text-sm relative z-10">
                      Explore the {pillar.title}
                    </span>
                    <ArrowRight
                      className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500"
                      strokeWidth={2.5}
                    />
                  </button>
                  
                  {/* Watch 2-Minute Video button - MOVED from popup to front card */}
                  <button
                    onClick={(e) => handleVideoClick(e, pillar.agentType)}
                    className="w-full py-3 px-4 rounded-xl font-semibold border border-amber-gold/30 text-warm-navy bg-white/50 hover:bg-amber-gold/5 transition-all duration-500 hover:scale-[1.02] flex items-center justify-center gap-2 group/btn hover-lift"
                  >
                    <Video className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    <span className="text-sm">Watch 2-Minute Overview</span>
                  </button>
                </div>

                {/* Hover Indicator */}
                <div
                  className={`absolute -inset-1 rounded-xl border-2 border-transparent transition-all duration-700 pointer-events-none ${
                    hoveredPillar === pillar.id
                      ? pillar.color === "amber"
                        ? "border-amber-gold/40 scale-[1.02]"
                        : pillar.color === "brand-teal"
                          ? "border-green-500/40 scale-[1.02]"
                          : "border-warm-navy/40 scale-[1.02]"
                      : ""
                  }`}
                ></div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center animate-fadeInUp delay-800">
            <div className="bg-gradient-to-br from-deep-charcoal to-warm-navy rounded-2xl p-6 md:p-8 text-warm-white overflow-hidden shadow-navy-lg relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-gold/10 via-transparent to-amber-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse-slow"></div>
              <div className="absolute -top-10 -right-10 w-20 h-20 sm:w-32 sm:h-32 bg-amber-gold/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-1000"></div>
              <div
                className="absolute -bottom-10 -left-10 w-20 h-20 sm:w-32 sm:h-32 bg-amber-gold/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-1000"
                style={{ transitionDelay: "200ms" }}
              ></div>

              <div className="max-w-2xl mx-auto relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-amber-gold ">
                  Ready to Power Up Your Revenue Engine?
                </h3>
                <p className="text-sm sm:text-base text-warm-white/80 mb-6">
                  See how our three AI agents work together as a single revenue
                  engine—plugging directly into the stack you already use.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/scheduleConsultation">
                    <button className="btn-gold font-semibold py-3 px-8 rounded-xl hover:shadow-gold-lg hover-lift transition-all duration-500 text-sm sm:text-base flex items-center justify-center gap-2 group/btn w-full sm:w-auto relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal transition-all duration-500 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
                      <span className="text-deep-charcoal relative z-10">
                        See Your 12-Home ROI
                      </span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal group-hover/btn:translate-x-2 transition-transform duration-500 relative z-10" />
                    </button>
                  </Link>

                  <button
                    onClick={(e) => handleVideoClick(e, "")}
                    className="bg-white/10 backdrop-blur-sm border border-amber-gold/20 text-warm-white font-semibold py-3 px-8 rounded-xl hover:bg-amber-gold/10 hover:border-amber-gold transition-all duration-500 text-sm sm:text-base hover-lift flex items-center justify-center gap-2 group/btn w-full sm:w-auto relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    <Video className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 group-hover/btn:rotate-6 transition-all duration-500 relative z-10" />
                    <span className="relative z-10">
                      Watch 2-Minute Overview
                    </span>
                  </button>

                  <button
                    onClick={handleEbookDownload}
                    className="bg-transparent border border-amber-gold/30 text-warm-white font-semibold py-3 px-8 rounded-xl hover:bg-amber-gold/5 transition-all duration-500 text-sm sm:text-base hover-lift flex items-center justify-center gap-2 group/btn w-full sm:w-auto relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-gold/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-y-0.5 transition-transform duration-500 relative z-10" />
                    <span className="relative z-10">Download Free E-Book</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add custom animations to global styles */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
        .hover\\:rotate-y-12:hover {
          transform: perspective(1000px) rotateY(12deg);
        }
        .hover\\:skew-y-1:hover {
          transform: skewY(1deg);
        }
      `}</style>
    </>
  );
}