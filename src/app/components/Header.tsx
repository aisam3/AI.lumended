"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Download, CheckCircle, Mail } from "lucide-react";

// Email Capture Modal (unchanged - keeping it exactly as you had)
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
        name,
        company,
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
                  Ai for Homebuilders (12-Home ROI)
                </h3>{" "}
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEbookModal, setShowEbookModal] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/#hero" },
    { name: "Solutions", href: "/#revenue" },
    { name: "Case Studies", href: "/#successStory" },
    { name: "About", href: "/#founder-story" },
  ];

  const scrollToElement = (elementId: string) => {
    if (typeof window === "undefined") return;
    setIsMenuOpen(false);
    if (window.location.pathname === "/") {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      router.push(`/#${elementId}`);
    }
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const elementId = href.substring(1);
      scrollToElement(elementId);
    } else {
      setIsMenuOpen(false);
      router.push(href);
    }
  };

  const handleConsultationClick = () => {
    setIsMenuOpen(false);
    router.push("/scheduleConsultation");
  };

  const handleEbookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEbookModal(true);
  };

  const handleEbookSuccess = (email: string) => {
    console.log("Ebook downloaded from Header by:", email);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-warm-white/85 border-b border-amber-gold/10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 sm:h-24 flex items-center justify-between">
            {/* Logo - cleaned up, no duplication */}
            <Link
              href="/"
              className="flex items-center gap-3 sm:gap-4 no-underline group"
              onClick={handleLogoClick}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-11 sm:w-14 h-11 sm:h-14 rounded-xl bg-gradient-to-br from-warm-white to-amber-50 flex items-center justify-center shadow-md border border-amber-gold/25 group-hover:scale-105 transition-transform">
                  <img
                    src="/ai-for-homebuilders.png"
                    alt="AI.Lumen Logo"
                    className="w-8 sm:w-12 h-8 sm:h-10 object-contain"
                  />
                </div>
                <div className="text-[7px] sm:text-[8px] font-bold text-amber-gold tracking-[0.18em] uppercase mt-2 text-center leading-none">
                  AI LUMEN <br /> COMPANY
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-black text-warm-navy tracking-tight leading-none group-hover:text-deep-charcoal transition-colors">
                  AI.Lumened
                </h1>
                <div className="h-1.5 sm:h-0.5 w-20 sm:w-28 bg-gradient-to-r from-amber-gold to-transparent " />
                <h2 className="text-sm sm:text-base font-bold text-gradient-gold tracking-wide italic">
                  AI for homebuilders.
                </h2>
              </div>
            </Link>

            {/* Desktop Nav + CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <nav className="flex items-center gap-1.5 bg-warm-navy/90 px-2 py-1.5 rounded-full shadow-inner border border-amber-gold/15">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="px-5 py-2 rounded-full text-sm font-medium text-warm-white hover:text-amber-gold hover:bg-amber-gold/10 transition-all"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-3 ml-4">
                <button
                  onClick={handleEbookClick}
                  className="px-5 py-2.5 rounded-full border border-amber-gold/40 text-warm-navy hover:bg-amber-gold/10 hover:border-amber-gold/60 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <Download size={16} />
                  Free E-book
                </button>
                <button
                  onClick={handleConsultationClick}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-gold to-soft-gold text-deep-charcoal font-medium shadow-md hover:shadow-lg hover:brightness-105 transition-all"
                >
                  Book Demo
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-warm-navy p-2 hover:bg-amber-gold/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - professional & attractive */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-20 sm:top-24 right-4 left-4 bg-gradient-to-b from-deep-charcoal to-warm-navy rounded-2xl shadow-2xl border border-amber-gold/20 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className="flex items-center w-full px-6 py-4 text-left text-warm-white hover:text-amber-gold hover:bg-amber-gold/10 transition-colors text-base font-medium border-b border-amber-gold/5 last:border-none"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="p-6 pt-2 border-t border-amber-gold/15 bg-black/20">
              <button
                onClick={handleEbookClick}
                className="w-full py-3.5 mb-3 rounded-xl border-2 border-amber-gold/40 text-warm-white hover:bg-amber-gold/10 hover:border-amber-gold/60 font-medium transition-all flex items-center justify-center gap-2 text-base"
              >
                <Download size={18} />
                Free E-book
              </button>

              <button
                onClick={handleConsultationClick}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-gold via-soft-gold to-amber-gold bg-[length:200%_auto] animate-gradient-x text-deep-charcoal font-semibold text-lg shadow-lg hover:shadow-2xl hover:brightness-110 transition-all"
              >
                Book Demo
              </button>
            </div>
          </div>
        </div>
      )}

      <EmailCaptureModal
        isOpen={showEbookModal}
        onClose={() => setShowEbookModal(false)}
        onSuccess={handleEbookSuccess}
      />
    </>
  );
}
