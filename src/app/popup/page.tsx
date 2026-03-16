// app/video/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { Calendar, PlayCircle, ArrowLeft, Download, X, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Email Capture Modal Component (unchanged)
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
      console.log("Ebook download request:", { email, name, company, timestamp: new Date().toISOString(), ebook: ebookUrl });
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
              <h3 className="text-xl font-semibold text-gradient-gold mb-2">Thank You!</h3>
              <p className="text-deep-charcoal/80 mb-1">Your free ebook is downloading...</p>
              <p className="text-xs text-warm-gray">
                We've sent a copy to <span className="font-medium text-amber-gold">{email}</span>
              </p>
              <div className="mt-6 pt-6 border-t border-amber-gold/10">
                <p className="text-xs text-warm-gray">Check your email for additional resources</p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-amber-gold/10 to-soft-gold/10 mb-4 border border-amber-gold/20">
                  <Download className="w-7 h-7 text-amber-gold" />
                </div>
                <h3 className="text-xl font-semibold text-gradient-navy mb-2">Download Your Free E-Book</h3>
                <p className="text-sm text-warm-gray">Get instant access to "AI for Homebuilders: The Complete Guide"</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-warm-navy mb-1.5">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-gray" />
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
                  <label className="block text-xs font-medium text-warm-navy mb-1.5">Your Name (Optional)</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-3 text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-warm-white"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-warm-navy mb-1.5">Company Name (Optional)</label>
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
                    <p className="text-warm-navy text-xs text-center">{error}</p>
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

// Create a separate component that uses useSearchParams
function VideoPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [returnPath, setReturnPath] = useState("/");
  const [returnHash, setReturnHash] = useState("");
  const [showEbookModal, setShowEbookModal] = useState(false);

  useEffect(() => {
    const path = searchParams.get("returnPath") || "/";
    const hash = searchParams.get("hash") || "";
    setReturnPath(path);
    setReturnHash(hash);
    setIsVisible(true);
  }, [searchParams]);

  const handleGoBack = () => {
    const url = returnHash ? `${returnPath}${returnHash}` : returnPath;
    router.push(url);
  };

  const handleEbookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEbookModal(true);
  };

  const handleEbookSuccess = (email: string) => {
    console.log("Ebook downloaded from Video page by:", email);
  };

  return (
    <>
      <EmailCaptureModal
        isOpen={showEbookModal}
        onClose={() => setShowEbookModal(false)}
        onSuccess={handleEbookSuccess}
      />

      <div className="min-h-screen bg-[var(--warm-white)] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Link */}
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-sm text-[var(--warm-gray)] hover:text-[var(--amber-gold)] transition-colors group mb-8 cursor-pointer animate-fadeIn"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          {/* Video Title */}
          <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--deep-charcoal)]">AI for Homebuilders Overview</h1>
            <p className="text-xs sm:text-sm text-[var(--warm-gray)] mt-1">2-minute overview of how AI.Lumen delivers measurable ROI</p>
          </div>

          {/* Video Player - UPDATED with local video file */}
          <div 
            className={`bg-black rounded-xl overflow-hidden shadow-2xl border border-[var(--amber-gold)]/30 transition-all duration-700 transform ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="aspect-video w-full">
              <video
                className="w-full h-full"
                controls
                playsInline
                poster="/Website Assets/Photographs/founder.jpg"
              >
                <source src="/Website Assets/video/VideoAI4Homebuidlers.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Video Info & Details */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Founder */}
              <div className="flex items-center gap-3 sm:gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--amber-gold)]/20 to-[var(--soft-gold)]/10 overflow-hidden border-2 border-[var(--amber-gold)]/50 flex-shrink-0">
                  <img
                    src="/Website Assets/Photographs/founder.jpg"
                    alt="Steven Fabry"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-[var(--deep-charcoal)]">Steven Fabry</h2>
                  <p className="text-xs sm:text-sm text-[var(--warm-gray)]">Founder & CEO</p>
                </div>
              </div>

              {/* About */}
              <div className="bg-[var(--amber-gold)]/5 p-4 sm:p-5 md:p-6 rounded-xl border border-[var(--amber-gold)]/20 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[var(--warm-navy)] mb-2 sm:mb-3">About this video:</h3>
                <p className="text-xs sm:text-sm md:text-base text-[var(--warm-gray)] leading-relaxed">
                  This 2-minute overview demonstrates how AI.Lumen delivers measurable ROI for 
                  homebuilders through intelligent automation and seamless integration. 
                  See real examples of AI transforming daily operations and learn how 
                  homebuilders are achieving significant returns.
                </p>
              </div>

              {/* Video Highlights */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[var(--amber-gold)] mb-3 sm:mb-4">VIDEO HIGHLIGHTS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-[var(--amber-gold)]/10 hover:shadow-md transition-shadow">
                    <PlayCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[var(--amber-gold)] mb-2" />
                    <p className="text-xs sm:text-sm font-medium text-[var(--deep-charcoal)]">Real AI Examples</p>
                    <p className="text-[10px] sm:text-xs text-[var(--warm-gray)] mt-1">See how AI transforms daily operations</p>
                  </div>
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-[var(--amber-gold)]/10 hover:shadow-md transition-shadow">
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[var(--amber-gold)] mb-2" />
                    <p className="text-xs sm:text-sm font-medium text-[var(--deep-charcoal)]">12-Home ROI</p>
                    <p className="text-[10px] sm:text-xs text-[var(--warm-gray)] mt-1">Conservative first-year projection</p>
                  </div>
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-[var(--amber-gold)]/10 hover:shadow-md transition-shadow">
                    <PlayCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[var(--amber-gold)] mb-2" />
                    <p className="text-xs sm:text-sm font-medium text-[var(--deep-charcoal)]">45 Day Setup</p>
                    <p className="text-[10px] sm:text-xs text-[var(--warm-gray)] mt-1">Quick turnkey implementation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Track Record & CTA */}
            <div className="space-y-6">
              
              {/* Track Record */}
              <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md border border-[var(--amber-gold)]/20 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[var(--warm-navy)] mb-3 sm:mb-4">OUR TRACK RECORD</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--amber-gold)]">17+</div>
                    <div className="text-[10px] sm:text-xs text-[var(--warm-gray)]">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--amber-gold)]">28</div>
                    <div className="text-[10px] sm:text-xs text-[var(--warm-gray)]">States</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--amber-gold)]">300+</div>
                    <div className="text-[10px] sm:text-xs text-[var(--warm-gray)]">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--amber-gold)]">45</div>
                    <div className="text-[10px] sm:text-xs text-[var(--warm-gray)]">Days</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                {/* Schedule Consultation Button */}
                <div className="bg-gradient-to-br from-[var(--deep-charcoal)] to-[var(--warm-navy)] p-4 sm:p-5 md:p-6 rounded-xl shadow-lg text-white">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">Ready to see your ROI?</h3>
                  <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4">
                    Get a personalized consultation.
                  </p>
                  <Link href="/scheduleConsultation">
                    <button className="w-full bg-[var(--amber-gold)] hover:bg-[var(--soft-gold)] text-[var(--deep-charcoal)] font-medium py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm">
                      <Calendar className="w-4 h-4" />
                      Schedule Consultation
                    </button>
                  </Link>
                </div>

                {/* Ebook Download Button */}
                <button
                  onClick={handleEbookClick}
                  className="w-full bg-warm-navy border-2 border-amber-gold text-amber-gold hover:bg-amber-gold hover:text-deep-charcoal font-medium py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm group"
                >
                  <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Download Free E-Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}

// Main export with Suspense wrapper
export default function VideoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--warm-white)] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[var(--amber-gold)]/30 border-t-[var(--amber-gold)] rounded-full animate-spin"></div>
      </div>
    }>
      <VideoPageContent />
    </Suspense>
  );
}