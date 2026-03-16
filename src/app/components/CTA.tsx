"use client";

import {
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  X,
  
  CheckCircle,
  Clock,
  Star,
  Zap,
  Shield,
  Download,
  BookOpen,
  Users,
  Building,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Sparkles, BarChart3, Hammer } from "lucide-react";
// Add the Email Capture Modal Component (same as your other sections)
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Log the submission (in production, send to your API)
      console.log("Ebook download request:", {
        email,
        name: name || "Not provided",
        company: company || "Not provided",
        timestamp: new Date().toISOString(),
        ebook: ebookUrl,
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
      <div className="relative w-full max-w-md bg-gradient-to-br from-warm-white to-warm-white/95 rounded-2xl overflow-hidden shadow-2xl border border-amber-gold/20">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-deep-charcoal/10 hover:bg-deep-charcoal/20 flex items-center justify-center text-deep-charcoal transition-all duration-300"
          aria-label="Close modal"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <div className="p-5 sm:p-6 md:p-8">
          {isSuccess ? (
            <div className="text-center animate-fadeIn">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-gold/5 to-soft-gold/5 mb-3 sm:mb-4 border border-amber-gold/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-gold/10 to-soft-gold/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-brand-teal" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gradient-gold mb-2">
                Thank You!
              </h3>
              <p className="text-sm sm:text-base text-deep-charcoal/80 mb-1">
                Your free ebook is downloading...
              </p>
              <p className="text-[10px] sm:text-xs text-warm-gray">
                We've sent a copy to{" "}
                <span className="font-medium text-amber-gold">{email}</span>
              </p>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-amber-gold/10">
                <p className="text-[10px] sm:text-xs text-warm-gray">
                  Check your email for additional resources
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-gold/10 to-soft-gold/10 mb-3 sm:mb-4 border border-amber-gold/20">
                  <Download className="w-6 h-6 sm:w-7 sm:h-7 text-amber-gold" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gradient-navy mb-1 sm:mb-2">
                  Download Your Free E-Book
                </h3>
                <p className="text-xs sm:text-sm text-warm-gray">
                  Get instant access to "AI for Homebuilders: The Complete
                  Guide"
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-warm-navy mb-1 sm:mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-warm-gray" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-8 sm:pl-10 pr-2.5 sm:pr-3 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-warm-white"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-warm-navy mb-1 sm:mb-1.5">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-2.5 sm:px-3 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-warm-white"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-warm-navy mb-1 sm:mb-1.5">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-2.5 sm:px-3 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-warm-white"
                    placeholder="Your Homebuilding Company"
                  />
                </div>

                {error && (
                  <div className="bg-amber-gold/5 border border-amber-gold/20 rounded-xl p-2.5 sm:p-3 animate-fadeIn">
                    <p className="text-warm-navy text-[10px] sm:text-xs text-center">
                      {error}
                    </p>
                  </div>
                )}

                <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-2.5 sm:p-3 border border-amber-gold/10">
                  <p className="text-center text-[9px] sm:text-xs text-deep-charcoal/70">
                    <span className="font-medium text-amber-gold">
                      No spam ever.
                    </span>{" "}
                    We respect your privacy and only send relevant content.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-2.5 sm:py-3 font-semibold text-xs sm:text-sm rounded-xl shadow-gold hover:shadow-gold-lg hover-lift transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 sm:gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-deep-charcoal/30 border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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

export default function CTA() {
  const [animateStars, setAnimateStars] = useState(false);
  const [showEbookModal, setShowEbookModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    homesPerYear: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateStars(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleDemoClick = () => {
    window.location.href = "/scheduleConsultation";
  };

  const handleEbookDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEbookModal(true);
  };

  const handleEbookSuccess = (email: string) => {
    console.log("Ebook downloaded from CTA by:", email);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCallClick = () => (window.location.href = "tel:+15551234567");
  const handleEmailClick = () =>
    (window.location.href =
      "mailto:info@ai4homebuilder.com?subject=AI%20for%20Homebuilders%20Inquiry&body=Hello%20AI%20for%20Homebuilders%20team,");

  const homesPerYearOptions = [
    "Select...",
    "1-10 homes/year",
    "11-25 homes/year",
    "26-50 homes/year",
    "51-100 homes/year",
    "101-250 homes/year",
    "250+ homes/year",
  ];

  return (
    <>
      <EmailCaptureModal
        isOpen={showEbookModal}
        onClose={() => setShowEbookModal(false)}
        onSuccess={handleEbookSuccess}
      />

      {/* Main CTA Section - Compact Design - RESPONSIVE */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-gradient-to-br from-[var(--deep-charcoal)] via-gray-900 to-[var(--warm-navy)] py-12 sm:py-14 md:py-16 lg:py-20"
      >
        {/* Animated Background Elements - SCALED RESPONSIVELY */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--amber-gold)]/5 via-transparent to-[var(--soft-gold)]/5"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: "30px 30px sm:40px 40px lg:50px 50px",
            }}
          />
          {/* Floating background circles - RESPONSIVE SIZES */}
          <div className="absolute -top-16 sm:-top-20 right-16 sm:right-20 w-48 sm:w-56 lg:w-64 h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-[var(--amber-gold)]/3 to-transparent rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-16 sm:-bottom-20 -left-16 sm:-left-20 w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80 bg-gradient-to-br from-[var(--warm-navy)]/3 to-transparent rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 bg-gradient-to-br from-blue-500/3 to-transparent rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto px-3 sm:px-4">
            {/* Compact Header - RESPONSIVE TYPOGRAPHY */}
            <div
              className={`text-center mb-8 sm:mb-10 lg:mb-12 ${animateStars ? "animate-fadeInUp" : "opacity-0"}`}
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[var(--amber-gold)]/20 to-[var(--amber-gold)]/10 backdrop-blur-sm rounded-full mb-3 sm:mb-4 border border-[var(--amber-gold)]/30 animate-slideIn">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--amber-gold)] animate-pulse" />
                <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-[var(--amber-gold)] uppercase tracking-wider">
                  Ready to See It in Action?
                </span>
              </div>

              <h2
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 ${animateStars ? "animate-fadeInUp delay-100" : "opacity-0"}`}
              >
                15 minutes. No obligation.
              </h2>
              <p
                className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0 ${animateStars ? "animate-fadeInUp delay-200" : "opacity-0"}`}
              >
                We'll show you exactly how AI can work for your specific
                operation—and model how one extra home can pay for the system -See the ROI Math in Your Demo
              </p>
            </div>

            {/* ROI Focus Section - RESPONSIVE */}
            <div
              className={`bg-gradient-to-r from-[var(--amber-gold)]/10 to-transparent rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 mb-8 sm:mb-10 border border-[var(--amber-gold)]/20 backdrop-blur-sm transition-all duration-300 hover:border-[var(--amber-gold)]/30 hover-lift ${animateStars ? "animate-fadeInUp delay-300" : "opacity-0"}`}
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-5 lg:gap-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center animate-pulse">
                    <DollarSign className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white">
                      One Extra Home = System Paid For
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300">
                      See the ROI math in your demo
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full lg:w-auto">
                  <div className="text-center animate-fadeIn delay-100">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--amber-gold)]">
                      3x
                    </div>
                    <div className="text-[9px] sm:text-[10px] lg:text-xs text-gray-300">
                      Faster Lead Response
                    </div>
                  </div>
                  <div className="text-center animate-fadeIn delay-200">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--amber-gold)]">
                      40%
                    </div>
                    <div className="text-[9px] sm:text-[10px] lg:text-xs text-gray-300">
                      Less Manual Work
                    </div>
                  </div>
                  <div className="text-center animate-fadeIn delay-300">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--amber-gold)]">
                      2.5x
                    </div>
                    <div className="text-[9px] sm:text-[10px] lg:text-xs text-gray-300">
                      More Qualified Leads
                    </div>
                  </div>
                  <div className="text-center animate-fadeIn delay-400">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--amber-gold)]">
                      ROI
                    </div>
                    <div className="text-[9px] sm:text-[10px] lg:text-xs text-gray-300">
                      In First 90 Days
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Dual CTA Cards - RESPONSIVE GRID */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 ${animateStars ? "animate-fadeInUp delay-400" : "opacity-0"}`}
            >
              {/* Book Demo Card */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-700/50 backdrop-blur-sm hover:border-[var(--amber-gold)]/30 transition-all duration-300 group hover:-translate-y-1 hover-lift animate-slideIn">
                <div className="flex flex-col h-full">
                  <div className="mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-[var(--amber-gold)] to-[var(--soft-gold)] rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">
                      Book Your 15-Minute Demo
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
                      No obligation, just insights
                    </p>

                    <div className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 space-y-1.5 sm:space-y-2">
                      <ul className="space-y-1 pl-3 sm:pl-4">
                        <li
                          className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs animate-slideIn"
                          style={{ animationDelay: "100ms" }}
                        >
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                          Understand exactly how one extra home pays for the system 
                        </li>
                        <li
                          className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs animate-slideIn"
                          style={{ animationDelay: "200ms" }}
                        >
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                          See actual AI workflows for sales and warranty
                        </li>
                        <li
                          className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs animate-slideIn"
                          style={{ animationDelay: "300ms" }}
                        >
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                          Get a rough ROI calculation based on your numbers
                        </li>
                        <li
                          className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs animate-slideIn"
                          style={{ animationDelay: "300ms" }}
                        >
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                          Tailored to your operation—built for builders by
                          builders
                        </li>
                      </ul>
                    </div>
                  </div>

                 <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
  {/* First Item - Green */}
  <div
    className="flex items-start gap-2 sm:gap-3 text-gray-300 animate-slideIn"
    style={{ animationDelay: "100ms" }}
  >
    <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-green-500 animate-pulse" />
    </div>
    <div>
      <div className="text-xs sm:text-sm font-medium text-white">
        No obligation, just insights
      </div>
      <div className="text-[9px] sm:text-[10px] lg:text-xs text-gray-400">
        See actual AI workflows for sales and warranty
      </div>
    </div>
  </div>

  {/* Second Item - Blue */}
  <div
    className="flex items-start gap-2 sm:gap-3 text-gray-300 animate-slideIn"
    style={{ animationDelay: "200ms" }}
  >
    <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
      <BarChart3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-blue-500" />
    </div>
    <div>
      <div className="text-xs sm:text-sm font-medium text-white">
        Get a rough ROI calculation
      </div>
      <div className="text-[9px] sm:text-[10px] lg:text-xs text-gray-400">
        Based on your numbers
      </div>
    </div>
  </div>

  {/* Third Item - Purple */}
  <div
    className="flex items-start gap-2 sm:gap-3 text-gray-300 animate-slideIn"
    style={{ animationDelay: "300ms" }}
  >
    <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
      <Hammer className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-purple-500" />
    </div>
    <div>
      <div className="text-xs sm:text-sm font-medium text-white">
        Tailored to your operation
      </div>
      <div className="text-[9px] sm:text-[10px] lg:text-xs text-gray-400">
        Built for builders by builders
      </div>
    </div>
  </div>
</div>

                  <button
                    onClick={handleDemoClick}
                    className="w-full bg-gradient-to-r from-[var(--amber-gold)] to-[var(--soft-gold)] text-white font-semibold py-3 sm:py-3.5 rounded-lg hover:shadow-xl hover:shadow-[var(--amber-gold)]/20 transition-all duration-300 group/btn mt-auto hover-lift"
                  >
                    <span className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base">
                      <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                      Book Your 15-Minute Demo
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>

              {/* E-book Download Card */}
              <div
                className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-blue-700/30 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-1 hover-lift animate-slideIn"
                style={{ animationDelay: "100ms" }}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">
                      Download the Free Guide
                    </h3>
                    <div className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 space-y-1.5 sm:space-y-2">
                      <p className="font-medium">
                        AI for Home Builders: How One Extra Closing Can Pay for
                        Your AI System - See the ROI Math in Your Demo
                      </p>
                      <p className="font-medium text-[11px] sm:text-xs">
                        A practical guide to using AI to:
                      </p>

                      <ul className="space-y-1 pl-3 sm:pl-4">
                        <li
                          className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs animate-slideIn"
                          style={{ animationDelay: "100ms" }}
                        >
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                          Generate more leads
                        </li>
                        <li
                          className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs animate-slideIn"
                          style={{ animationDelay: "200ms" }}
                        >
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                          Close more sales
                        </li>
                        <li
                          className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs animate-slideIn"
                          style={{ animationDelay: "300ms" }}
                        >
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                          Reduce warranty workload
                        </li>
                      </ul>
                      <p
                        className="text-[9px] sm:text-[10px] lg:text-xs italic mt-1.5 sm:mt-2 animate-slideIn"
                        style={{ animationDelay: "400ms" }}
                      >
                        Without ripping out your CRM or warranty platform.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <div
                      className="flex items-start gap-2 sm:gap-3 text-gray-300 animate-slideIn"
                      style={{ animationDelay: "200ms" }}
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-amber-500" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-white">
                          Proven strategies
                        </div>
                        <div className="text-[9px] sm:text-[10px] lg:text-xs text-gray-400">
                          30 years of experience distilled
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex items-start gap-2 sm:gap-3 text-gray-300 animate-slideIn"
                      style={{ animationDelay: "300ms" }}
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-green-500 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-white">
                          Implementation guide
                        </div>
                        <div className="text-[9px] sm:text-[10px] lg:text-xs text-gray-400">
                          Step-by-step AI adoption
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleEbookDownload}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 sm:py-3.5 rounded-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 group/btn mt-auto hover-lift"
                  >
                    <span className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base">
                      <Download className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                      Download Free E-Book
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Compact Trust Indicators - RESPONSIVE FLEX */}
            <div
              className={`flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 ${animateStars ? "animate-fadeInUp delay-500" : "opacity-0"}`}
            >
              <div
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10 hover:border-[var(--amber-gold)]/30 transition-all duration-300 hover:-translate-y-1 hover-lift animate-slideIn"
                style={{ animationDelay: "100ms" }}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-green-400 animate-pulse" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] lg:text-xs text-white/80">
                    Trusted by
                  </div>
                  <div className="text-[11px] sm:text-xs lg:text-sm font-bold text-white">
                    300+ Builders
                  </div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10 hover:border-[var(--amber-gold)]/30 transition-all duration-300 hover:-translate-y-1 hover-lift animate-slideIn"
                style={{ animationDelay: "200ms" }}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-[var(--amber-gold)] animate-pulse" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] lg:text-xs text-white/80">
                    30 Years Experience
                  </div>
                  <div className="text-[11px] sm:text-xs lg:text-sm font-bold text-white">
                    Industry Veteran
                  </div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10 hover:border-[var(--amber-gold)]/30 transition-all duration-300 hover:-translate-y-1 hover-lift animate-slideIn"
                style={{ animationDelay: "300ms" }}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-yellow-400 animate-pulse" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] lg:text-xs text-white/80">
                    Compendia 2.0
                  </div>
                  <div className="text-[11px] sm:text-xs lg:text-sm font-bold text-white">
                    17 Years Experience
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>

        {/* CSS animations - UNCHANGED */}
        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

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

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }

          @keyframes smoothAppear {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .animate-slideIn {
            animation: slideIn 0.5s ease-out forwards;
          }

          .animate-scaleIn {
            animation: scaleIn 0.4s ease-out forwards;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-smooth-appear {
            animation: smoothAppear 0.3s ease-out forwards;
          }

          .animate-pulse {
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }

          .delay-100 {
            animation-delay: 100ms;
          }

          .delay-200 {
            animation-delay: 200ms;
          }

          .delay-300 {
            animation-delay: 300ms;
          }

          .delay-400 {
            animation-delay: 400ms;
          }

          .delay-500 {
            animation-delay: 500ms;
          }

          .delay-600 {
            animation-delay: 600ms;
          }

          .hover-lift {
            transition:
              transform 0.3s ease,
              box-shadow 0.3s ease;
          }

          .hover-lift:hover {
            transform: translateY(-4px);
            box-shadow:
              0 10px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          .container-custom {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1rem;
          }

          @media (min-width: 640px) {
            .container-custom {
              padding: 0 1.5rem;
            }
          }

          @media (min-width: 768px) {
            .container-custom {
              padding: 0 2rem;
            }
          }
        `}</style>
      </section>
    </>
  );
}
