"use client";

import { useState } from "react";
import {
  Shield,
  Lock,
  Eye,
  Mail,
  Phone,
  Calendar,
  Download,
  ChevronRight,
  Home,
  Users,
  Building,
  Globe,
  FileText,
  Database,
  X,
} from "lucide-react";
import Link from "next/link";

// Email Capture Modal Component (Same as in your main code)
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
                  <Shield className="w-6 h-6 text-brand-teal" />
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

export default function PrivacyPolicyPage() {
  const [showEbookModal, setShowEbookModal] = useState(false);
  const lastUpdated = "January 27, 2026";

  const handleEbookDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEbookModal(true);
  };

  const handleEbookSuccess = (email: string) => {
    console.log("Ebook downloaded from Privacy Policy by:", email);
  };

  // Handle Schedule Consultation button
  const handleScheduleConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    // Scroll to consultation section or navigate
    const consultationSection = document.getElementById(
      "schedule-consultation",
    );
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If section doesn't exist on this page, navigate to homepage
      window.location.href = "/#schedule-consultation";
    }
  };

  // Handle navigation to homepage
  const handleReturnHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/";
  };

  const sections = [
    {
      id: "information-collected",
      title: "Information We Collect",
      icon: Database,
      color: "amber",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            We collect information that you provide directly to us when you:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-gold mt-2 flex-shrink-0"></div>
              <span className="text-deep-charcoal/90">
                Request a demo or consultation through our website
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-gold mt-2 flex-shrink-0"></div>
              <span className="text-deep-charcoal/90">
                Download our free e-book or other resources
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-gold mt-2 flex-shrink-0"></div>
              <span className="text-deep-charcoal/90">
                Sign up for our newsletter or marketing communications
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-gold mt-2 flex-shrink-0"></div>
              <span className="text-deep-charcoal/90">
                Contact us with questions or support requests
              </span>
            </li>
          </ul>

          <h4 className="text-lg font-semibold text-gradient-navy mb-3">
            Types of Information:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-4 border border-amber-gold/10 shadow-gold/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-gold" />
                </div>
                <h5 className="font-semibold text-deep-charcoal">
                  Personal Information
                </h5>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-warm-gray">
                  • Name and company information
                </li>
                <li className="text-sm text-warm-gray">
                  • Email address and phone number
                </li>
                <li className="text-sm text-warm-gray">• Job title and role</li>
                <li className="text-sm text-warm-gray">
                  • Number of homes built annually
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-4 border border-amber-gold/10 shadow-gold/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-warm-navy/10 to-blue-50 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-warm-navy" />
                </div>
                <h5 className="font-semibold text-deep-charcoal">
                  Technical Information
                </h5>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-warm-gray">
                  • IP address and device information
                </li>
                <li className="text-sm text-warm-gray">
                  • Browser type and version
                </li>
                <li className="text-sm text-warm-gray">
                  • Pages visited and time spent
                </li>
                <li className="text-sm text-warm-gray">
                  • Referral source and campaign data
                </li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Eye,
      color: "brand-teal",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            We use the information we collect to:
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0 mt-1">
                <Mail className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h5 className="font-semibold text-deep-charcoal mb-1">
                  Provide Services
                </h5>
                <p className="text-sm text-warm-gray">
                  To deliver the AI for Homebuilders services, respond to
                  inquiries, and provide customer support.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0 mt-1">
                <Building className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h5 className="font-semibold text-deep-charcoal mb-1">
                  Improve Our Products
                </h5>
                <p className="text-sm text-warm-gray">
                  To understand how our services are used and make improvements
                  to better serve homebuilders.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0 mt-1">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h5 className="font-semibold text-deep-charcoal mb-1">
                  Communicate with You
                </h5>
                <p className="text-sm text-warm-gray">
                  To send updates, marketing communications, and information
                  about our services (you can opt out at any time).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h5 className="font-semibold text-deep-charcoal mb-1">
                  Ensure Security
                </h5>
                <p className="text-sm text-warm-gray">
                  To protect against fraud, unauthorized access, and other
                  security issues.
                </p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: Users,
      color: "warm-navy",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            We do not sell, trade, or rent your personal information to third
            parties. We may share information only in the following
            circumstances:
          </p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gradient-navy mb-3">
              With Your Consent
            </h4>
            <p className="text-deep-charcoal/90 mb-4">
              We may share your information with third parties when we have your
              explicit consent to do so.
            </p>

            <h4 className="text-lg font-semibold text-gradient-navy mb-3">
              Service Providers
            </h4>
            <p className="text-deep-charcoal/90 mb-4">
              We work with trusted third-party service providers who assist us
              in operating our website and conducting our business. These
              providers are contractually obligated to protect your information.
            </p>

            <h4 className="text-lg font-semibold text-gradient-navy mb-3">
              Legal Requirements
            </h4>
            <p className="text-deep-charcoal/90">
              We may disclose your information if required to do so by law or in
              response to valid requests by public authorities (e.g., a court or
              government agency).
            </p>
          </div>

          <div className="bg-gradient-to-r from-warm-navy/5 to-blue-50 rounded-xl p-5 border border-warm-navy/10">
            <h5 className="font-semibold text-deep-charcoal mb-2">
              Business Transfers
            </h5>
            <p className="text-sm text-warm-gray">
              In the event of a merger, acquisition, or sale of all or a portion
              of our assets, your information may be transferred as part of that
              transaction. We will notify you via email and/or a prominent
              notice on our website of any change in ownership or uses of your
              personal information.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      color: "amber",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            We implement appropriate technical and organizational security
            measures to protect your personal information against unauthorized
            access, alteration, disclosure, or destruction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-4 text-center border border-amber-gold/10 shadow-gold/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-amber-gold" />
              </div>
              <h5 className="font-semibold text-deep-charcoal mb-2">
                Encryption
              </h5>
              <p className="text-xs text-warm-gray">
                All data transmissions are encrypted using SSL/TLS protocols
              </p>
            </div>

            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-4 text-center border border-amber-gold/10 shadow-gold/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-amber-gold" />
              </div>
              <h5 className="font-semibold text-deep-charcoal mb-2">
                Access Controls
              </h5>
              <p className="text-xs text-warm-gray">
                Strict access controls and authentication mechanisms
              </p>
            </div>

            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-4 text-center border border-amber-gold/10 shadow-gold/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-amber-gold" />
              </div>
              <h5 className="font-semibold text-deep-charcoal mb-2">
                Regular Audits
              </h5>
              <p className="text-xs text-warm-gray">
                Regular security audits and vulnerability assessments
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-5 border border-amber-gold/10">
            <h5 className="font-semibold text-deep-charcoal mb-2">
              Important Notice
            </h5>
            <p className="text-sm text-warm-gray mb-2">
              While we strive to use commercially acceptable means to protect
              your personal information, no method of transmission over the
              Internet or method of electronic storage is 100% secure. We cannot
              guarantee absolute security.
            </p>
            <p className="text-sm text-warm-gray">
              If you have any questions about the security of our services,
              please contact us at{" "}
              <span className="text-amber-gold font-medium">
                 info@aiforhomebuilders.com
              </span>
            </p>
          </div>
        </>
      ),
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices",
      icon: Shield,
      color: "brand-teal",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            Depending on your location, you may have certain rights regarding
            your personal information:
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10 hover-lift transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-deep-charcoal mb-1">
                  Access and Correction
                </h5>
                <p className="text-sm text-warm-gray">
                  You have the right to access and correct your personal
                  information
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10 hover-lift transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0">
                <Database className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-deep-charcoal mb-1">
                  Data Portability
                </h5>
                <p className="text-sm text-warm-gray">
                  You can request a copy of your data in a structured,
                  machine-readable format
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10 hover-lift transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-deep-charcoal mb-1">
                  Opt-Out
                </h5>
                <p className="text-sm text-warm-gray">
                  You can opt out of marketing communications at any time by
                  clicking "unsubscribe"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10 hover-lift transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-deep-charcoal mb-1">
                  Deletion
                </h5>
                <p className="text-sm text-warm-gray">
                  You can request deletion of your personal information under
                  certain circumstances
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl p-5 border border-green-500/10">
            <h5 className="font-semibold text-deep-charcoal mb-2">
              How to Exercise Your Rights
            </h5>
            <p className="text-sm text-warm-gray mb-3">
              To exercise any of these rights, please contact us at{" "}
              <span className="text-green-600 font-medium">
                info@aiforhomebuilders.com
              </span>
              . We will respond to your request within 30 days.
            </p>
            <p className="text-xs text-warm-gray">
              We may need to verify your identity before processing your
              request. In some cases, we may need to retain certain information
              for legal or legitimate business purposes.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      icon: FileText,
      color: "warm-navy",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            We use cookies and similar tracking technologies to track activity
            on our website and hold certain information.
          </p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gradient-navy mb-3">
              Types of Cookies We Use
            </h4>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-warm-navy mt-2 flex-shrink-0"></div>
                <div>
                  <h5 className="font-semibold text-deep-charcoal mb-1">
                    Essential Cookies
                  </h5>
                  <p className="text-sm text-warm-gray">
                    Required for the website to function properly
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-warm-navy mt-2 flex-shrink-0"></div>
                <div>
                  <h5 className="font-semibold text-deep-charcoal mb-1">
                    Analytics Cookies
                  </h5>
                  <p className="text-sm text-warm-gray">
                    Help us understand how visitors interact with our website
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-warm-navy mt-2 flex-shrink-0"></div>
                <div>
                  <h5 className="font-semibold text-deep-charcoal mb-1">
                    Marketing Cookies
                  </h5>
                  <p className="text-sm text-warm-gray">
                    Used to track visitors across websites for marketing
                    purposes
                  </p>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gradient-navy mb-3">
              Cookie Management
            </h4>
            <p className="text-deep-charcoal/90 mb-4">
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our service.
            </p>

            <div className="bg-gradient-to-r from-warm-navy/5 to-blue-50 rounded-xl p-5 border border-warm-navy/10">
              <h5 className="font-semibold text-deep-charcoal mb-2">
                Third-Party Cookies
              </h5>
              <p className="text-sm text-warm-gray">
                Some content or applications on the website are served by third
                parties, including content providers and application providers.
                These third parties may use cookies alone or in conjunction with
                other tracking technologies to collect information about you
                when you use our website.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "contact",
      title: "Contact Us",
      icon: Mail,
      color: "amber",
      content: (
        <>
          <p className="mb-6 text-deep-charcoal/90">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-5 border border-amber-gold/10 shadow-gold/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-amber-gold" />
                </div>
                <div>
                  <h5 className="font-semibold text-deep-charcoal">Email</h5>
                  <p className="text-sm text-warm-gray">
                    For privacy-related inquiries
                  </p>
                </div>
              </div>
              <a
                href="mailto:privacy@aiforhomebuilders.com"
                className="text-amber-gold font-medium hover:text-soft-gold transition-colors duration-300"
              >
                 info@aiforhomebuilders.com
              </a>
            </div>

            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-5 border border-amber-gold/10 shadow-gold/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-amber-gold" />
                </div>
                <div>
                  <h5 className="font-semibold text-deep-charcoal">Phone</h5>
                  <p className="text-sm text-warm-gray">
                    For general inquiries
                  </p>
                </div>
              </div>
              <a
                href="tel:+15551234567"
                className="text-amber-gold font-medium hover:text-soft-gold transition-colors duration-300"
              >
                 760 500 84 86
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-5 border border-amber-gold/10">
            <h5 className="font-semibold text-deep-charcoal mb-2">
              Data Protection Officer
            </h5>
            <p className="text-sm text-warm-gray mb-3">
              AI for Homebuilders has appointed a Data Protection Officer (DPO)
              who is responsible for overseeing questions in relation to this
              privacy policy.
            </p>
            <p className="text-xs text-warm-gray">
              If you have any questions about this privacy policy or our privacy
              practices, you may contact our DPO at the email address above.
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEbookModal}
        onClose={() => setShowEbookModal(false)}
        onSuccess={handleEbookSuccess}
      />

      <div className="min-h-screen bg-gradient-to-b from-warm-white to-warm-white/95 pt-24 pb-16">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-amber-gold/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-warm-navy/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 mb-6 border border-amber-gold/20">
              <Shield className="w-8 h-8 text-amber-gold" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gradient-navy mb-4">
              Privacy Policy
            </h1>
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 rounded-full border border-amber-gold/20 mb-6">
              <p className="text-sm font-medium text-deep-charcoal">
                Last Updated: {lastUpdated}
              </p>
            </div>
            <p className="text-lg text-warm-gray max-w-3xl mx-auto">
              At AI for Homebuilders, we are committed to protecting your
              privacy and being transparent about how we collect, use, and share
              your information.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="mb-8 animate-fadeInUp delay-100">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-amber-gold/10 p-4 shadow-gold/10">
              <h3 className="text-lg font-semibold text-gradient-navy mb-4">
                Quick Navigation
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 hover-lift ${
                      section.color === "amber"
                        ? "bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 hover:from-amber-gold/10 hover:to-soft-gold/10"
                        : section.color === "brand-teal"
                          ? "bg-gradient-to-r from-green-500/5 to-emerald-500/5 hover:from-green-500/10 hover:to-emerald-500/10"
                          : "bg-gradient-to-r from-warm-navy/5 to-blue-50 hover:from-warm-navy/10 hover:to-blue-50"
                    } border ${
                      section.color === "amber"
                        ? "border-amber-gold/20"
                        : section.color === "brand-teal"
                          ? "border-green-500/20"
                          : "border-warm-navy/20"
                    }`}
                  >
                    <section.icon
                      className={`w-4 h-4 ${
                        section.color === "amber"
                          ? "text-amber-gold"
                          : section.color === "brand-teal"
                            ? "text-green-600"
                            : "text-warm-navy"
                      }`}
                    />
                    <span className="text-sm font-medium text-deep-charcoal truncate">
                      {section.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="mb-10 animate-fadeInUp delay-200">
            <div className="bg-gradient-to-br from-warm-white to-white rounded-2xl border border-amber-gold/20 p-6 md:p-8 shadow-gold/10">
              <h2 className="text-2xl font-bold text-gradient-navy mb-4">
                Introduction
              </h2>
              <p className="text-deep-charcoal/90 mb-4">
                Welcome to AI for Homebuilders ("we," "our," or "us"). This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website{" "}
                <span className="text-amber-gold font-medium">
                  ai-for-homebuilders.vercel.app
                </span>{" "}
                or use our services.
              </p>
              <p className="text-deep-charcoal/90 mb-4">
                Please read this privacy policy carefully. If you do not agree
                with the terms of this privacy policy, please do not access the
                site or use our services.
              </p>
              <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-5 border border-amber-gold/10">
                <h5 className="font-semibold text-deep-charcoal mb-2">
                  Scope of This Policy
                </h5>
                <p className="text-sm text-warm-gray">
                  This policy applies to information we collect on this website,
                  in email, text, and other electronic messages between you and
                  this website, and through mobile and desktop applications you
                  download from this website.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-warm-white to-white rounded-2xl border border-amber-gold/20 p-6 md:p-8 shadow-gold/10 hover:shadow-gold/20 transition-all duration-300 hover-lift">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        section.color === "amber"
                          ? "bg-gradient-to-r from-amber-gold/10 to-soft-gold/5"
                          : section.color === "brand-teal"
                            ? "bg-gradient-to-r from-green-500/10 to-emerald-500/5"
                            : "bg-gradient-to-r from-warm-navy/10 to-blue-50"
                      }`}
                    >
                      <section.icon
                        className={`w-6 h-6 ${
                          section.color === "amber"
                            ? "text-amber-gold"
                            : section.color === "brand-teal"
                              ? "text-green-600"
                              : "text-warm-navy"
                        }`}
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gradient-navy">
                      {section.title}
                    </h2>
                  </div>
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* Policy Updates */}
          <div className="mt-10 mb-12 animate-fadeInUp delay-700">
            <div className="bg-gradient-to-br from-warm-navy to-deep-charcoal rounded-2xl p-6 md:p-8 text-warm-white overflow-hidden shadow-navy">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-gradient-gold mb-4">
                  Policy Updates
                </h3>
                <p className="text-warm-white/80 mb-6">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last Updated" date.
                </p>
                <p className="text-warm-white/80">
                  You are advised to review this Privacy Policy periodically for
                  any changes. Changes to this Privacy Policy are effective when
                  they are posted on this page.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center animate-fadeInUp delay-800">
            <div className="bg-gradient-to-br from-warm-white to-white rounded-2xl border border-amber-gold/20 p-8 shadow-gold/10">
              <h3 className="text-2xl font-bold text-gradient-navy mb-4">
                Questions About Our Privacy Policy?
              </h3>
              <p className="text-warm-gray mb-6 max-w-2xl mx-auto">
                If you have any questions or concerns about our privacy
                practices, or if you would like to exercise your privacy rights,
                please don't hesitate to contact us.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleReturnHome}
                  className="btn-gold font-semibold py-3 px-8 rounded-xl hover:shadow-gold-lg hover-lift transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 group"
                >
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal" />
                  <span className="text-deep-charcoal">Return to Homepage</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button
                  onClick={handleEbookDownload}
                  className="bg-white border border-amber-gold/20 text-deep-charcoal font-semibold py-3 px-8 rounded-xl hover:bg-amber-gold/5 hover:border-amber-gold transition-all duration-300 text-sm sm:text-base hover-lift flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                  <span>Download Free E-Book</span>
                </button>

                <button
                  onClick={handleScheduleConsultation}
                  className="bg-transparent border border-amber-gold/30 text-amber-gold font-semibold py-3 px-8 rounded-xl hover:bg-amber-gold/5 transition-all duration-300 text-sm sm:text-base hover-lift flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Schedule Consultation</span>
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-amber-gold/10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <a
                    href="mailto:privacy@aiforhomebuilders.com"
                    className="flex items-center gap-2 text-sm text-warm-gray hover:text-amber-gold transition-colors duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    info@aiforhomebuilders.com
                  </a>
                  <span className="hidden md:block text-warm-gray/30">•</span>
                  <a
                    href="tel:+15551234567"
                    className="flex items-center gap-2 text-sm text-warm-gray hover:text-amber-gold transition-colors duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    760 500 84 86
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
