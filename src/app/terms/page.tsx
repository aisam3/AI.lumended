"use client";

import { useState } from "react";
import { FileText, Shield, Scale, AlertTriangle, Book, Globe, Building, Mail, Phone, Download, Home, ChevronRight, Calendar, X } from "lucide-react";
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Ebook download request:", {
        email,
        name: name || "Not provided",
        company: company || "Not provided",
        timestamp: new Date().toISOString(),
        ebook: ebookUrl
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
                  <Book className="w-6 h-6 text-brand-teal" />
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

export default function TermsOfServicePage() {
  const [showEbookModal, setShowEbookModal] = useState(false);
  const lastUpdated = "January 27, 2026";

  const handleEbookDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEbookModal(true);
  };

  const handleEbookSuccess = (email: string) => {
    console.log("Ebook downloaded from Terms of Service by:", email);
  };

  // Handle navigation actions
  const handleReturnHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  const handleScheduleConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/scheduleConsultation';
  };

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: Scale,
      color: "amber",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            By accessing and using the AI for Homebuilders website and services (collectively, the "Services"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these Services, you shall be subject to any posted guidelines or rules applicable to such Services.
          </p>
          
          <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-5 border border-amber-gold/10 mb-6">
            <h5 className="font-semibold text-deep-charcoal mb-2">Eligibility</h5>
            <p className="text-sm text-warm-gray">
              You must be at least 18 years of age to use our Services. By using the Services, you represent and warrant that you are at least 18 years old and have the right, authority, and capacity to enter into this agreement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-4 border border-amber-gold/10 shadow-gold/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center">
                  <Building className="w-5 h-5 text-amber-gold" />
                </div>
                <h5 className="font-semibold text-deep-charcoal">For Homebuilders</h5>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-warm-gray">• Must be a legitimate homebuilding business</li>
                <li className="text-sm text-warm-gray">• Valid business registration required</li>
                <li className="text-sm text-warm-gray">• Must provide accurate company information</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-4 border border-amber-gold/10 shadow-gold/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-warm-navy/10 to-blue-50 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-warm-navy" />
                </div>
                <h5 className="font-semibold text-deep-charcoal">Geographic Scope</h5>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-warm-gray">• Services available in all 50 US states</li>
                <li className="text-sm text-warm-gray">• Currently serving 28+ states</li>
                <li className="text-sm text-warm-gray">• International expansion planned</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      id: "services",
      title: "Services Description",
      icon: FileText,
      color: "brand-teal",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            AI for Homebuilders provides artificial intelligence-powered solutions specifically designed for the homebuilding industry. Our Services include but are not limited to:
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-md flex items-center justify-center">
                  <span className="text-xs font-bold text-white">1</span>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-deep-charcoal mb-1">Marketing Agent</h5>
                <p className="text-sm text-warm-gray">AI-powered content generation and distribution for lead generation</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-md flex items-center justify-center">
                  <span className="text-xs font-bold text-white">2</span>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-deep-charcoal mb-1">Sales Agent</h5>
                <p className="text-sm text-warm-gray">Automated lead qualification and appointment scheduling</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-md flex items-center justify-center">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-deep-charcoal mb-1">Warranty Concierge</h5>
                <p className="text-sm text-warm-gray">AI-driven customer service and warranty claim management</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl p-5 border border-green-500/10">
            <h5 className="font-semibold text-deep-charcoal mb-2">Service Limitations</h5>
            <p className="text-sm text-warm-gray mb-2">
              Our Services are designed to augment and enhance your existing operations, not replace human judgment or decision-making. We do not guarantee specific results or outcomes from the use of our Services.
            </p>
            <p className="text-xs text-warm-gray">
              The Services are provided "as is" and "as available" without warranties of any kind, either express or implied.
            </p>
          </div>
        </>
      )
    },
    {
      id: "subscription",
      title: "Subscription & Payment Terms",
      icon: Shield,
      color: "warm-navy",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            Our Services are offered on a subscription basis. By subscribing to our Services, you agree to pay all applicable fees as described on our website.
          </p>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gradient-navy mb-3">Pricing Structure</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-4 text-center border border-warm-navy/10 shadow-gold/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-amber-gold">1x</span>
                </div>
                <h5 className="font-semibold text-deep-charcoal mb-2">ROI-Based Pricing</h5>
                <p className="text-xs text-warm-gray">Designed so one extra closing can pay for your AI system</p>
              </div>
              
              <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-4 text-center border border-warm-navy/10 shadow-gold/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-amber-gold">12</span>
                </div>
                <h5 className="font-semibold text-deep-charcoal mb-2">Conservative Projection</h5>
                <p className="text-xs text-warm-gray">Typical Year-1 results for mid-sized builders</p>
              </div>
              
              <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-4 text-center border border-warm-navy/10 shadow-gold/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-amber-gold">30-45</span>
                </div>
                <h5 className="font-semibold text-deep-charcoal mb-2">Implementation Period</h5>
                <p className="text-xs text-warm-gray">Days from kickoff to live AI agents</p>
              </div>
            </div>
            
            <h4 className="text-lg font-semibold text-gradient-navy mb-3">Payment Terms</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-warm-navy mt-2 flex-shrink-0"></div>
                <span className="text-deep-charcoal/90">All fees are quoted in US Dollars and are exclusive of applicable taxes</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-warm-navy mt-2 flex-shrink-0"></div>
                <span className="text-deep-charcoal/90">Payments are due upon subscription and subsequent renewal dates</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-warm-navy mt-2 flex-shrink-0"></div>
                <span className="text-deep-charcoal/90">We use secure third-party payment processors for all transactions</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-warm-navy/5 to-blue-50 rounded-xl p-5 border border-warm-navy/10">
            <h5 className="font-semibold text-deep-charcoal mb-2">Cancellation Policy</h5>
            <p className="text-sm text-warm-gray">
              You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing period. No refunds will be provided for partial months of service.
            </p>
          </div>
        </>
      )
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      icon: Book,
      color: "amber",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            All content included on this site, such as text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of AI for Homebuilders or its content suppliers and protected by international copyright laws.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-4 border border-amber-gold/10 shadow-gold/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-gold" />
                </div>
                <h5 className="font-semibold text-deep-charcoal">Our Rights</h5>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-warm-gray">• AI algorithms and proprietary technology</li>
                <li className="text-sm text-warm-gray">• Website design and user interface</li>
                <li className="text-sm text-warm-gray">• Documentation and training materials</li>
                <li className="text-sm text-warm-gray">• Brand trademarks and logos</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-4 border border-amber-gold/10 shadow-gold/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-amber-gold" />
                </div>
                <h5 className="font-semibold text-deep-charcoal">Your Rights</h5>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-warm-gray">• License to use our Services</li>
                <li className="text-sm text-warm-gray">• Ownership of your business data</li>
                <li className="text-sm text-warm-gray">• Generated content for your business</li>
                <li className="text-sm text-warm-gray">• Customer information and leads</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-5 border border-amber-gold/10">
            <h5 className="font-semibold text-deep-charcoal mb-2">License Grant</h5>
            <p className="text-sm text-warm-gray mb-2">
              We grant you a limited, non-exclusive, non-transferable, revocable license to use our Services for your internal business purposes, subject to these Terms of Service.
            </p>
            <p className="text-xs text-warm-gray">
              This license does not include any right to resell or commercially use our Services or their contents; any collection and use of any product listings, descriptions, or prices; any derivative use of our Services or their contents; or any use of data mining, robots, or similar data gathering and extraction tools.
            </p>
          </div>
        </>
      )
    },
    {
      id: "user-conduct",
      title: "User Conduct & Restrictions",
      icon: AlertTriangle,
      color: "brand-teal",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to use our Services:
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h5 className="font-semibold text-deep-charcoal mb-1">Prohibited Activities</h5>
                <p className="text-sm text-warm-gray">In any way that violates any applicable federal, state, local, or international law or regulation</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h5 className="font-semibold text-deep-charcoal mb-1">Unauthorized Access</h5>
                <p className="text-sm text-warm-gray">To impersonate or attempt to impersonate AI for Homebuilders, an employee, another user, or any other person or entity</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h5 className="font-semibold text-deep-charcoal mb-1">Data Misuse</h5>
                <p className="text-sm text-warm-gray">To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl p-5 border border-green-500/10">
            <h5 className="font-semibold text-deep-charcoal mb-2">Content Standards</h5>
            <p className="text-sm text-warm-gray mb-2">
              You are responsible for any content you submit through our Services. Content must not:
            </p>
            <ul className="space-y-1 text-sm text-warm-gray">
              <li>• Contain any material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable</li>
              <li>• Promote sexually explicit or pornographic material, violence, or discrimination</li>
              <li>• Infringe any patent, trademark, trade secret, copyright, or other intellectual property rights</li>
              <li>• Contain any material that could give rise to any civil or criminal liability under applicable laws</li>
            </ul>
          </div>
        </>
      )
    },
    {
      id: "disclaimer",
      title: "Disclaimer of Warranties",
      icon: Shield,
      color: "warm-navy",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. AI FOR HOMEBUILDERS MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE SERVICES OR THE INFORMATION, CONTENT, MATERIALS, OR PRODUCTS INCLUDED ON THIS SITE.
          </p>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gradient-navy mb-3">Specific Disclaimers</h4>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-warm-navy/5 to-blue-50 rounded-xl border border-warm-navy/10">
                <AlertTriangle className="w-5 h-5 text-amber-gold flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-deep-charcoal mb-1">No Guarantee of Results</h5>
                  <p className="text-sm text-warm-gray">We do not guarantee specific business outcomes, revenue increases, or cost savings from using our Services. Results may vary based on individual business circumstances.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-warm-navy/5 to-blue-50 rounded-xl border border-warm-navy/10">
                <AlertTriangle className="w-5 h-5 text-amber-gold flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-deep-charcoal mb-1">Third-Party Integration</h5>
                  <p className="text-sm text-warm-gray">Our Services integrate with third-party platforms. We are not responsible for the availability, performance, or functionality of these third-party services.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-warm-navy/5 to-blue-50 rounded-xl border border-warm-navy/10">
                <AlertTriangle className="w-5 h-5 text-amber-gold flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-deep-charcoal mb-1">AI Limitations</h5>
                  <p className="text-sm text-warm-gray">AI systems have limitations and may produce errors or unexpected results. Human oversight and verification are recommended for critical business decisions.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-warm-navy/5 to-blue-50 rounded-xl p-5 border border-warm-navy/10">
            <h5 className="font-semibold text-deep-charcoal mb-2">Limitation of Liability</h5>
            <p className="text-sm text-warm-gray">
              TO THE FULL EXTENT PERMISSIBLE BY APPLICABLE LAW, AI FOR HOMEBUILDERS DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
            </p>
          </div>
        </>
      )
    },
    {
      id: "termination",
      title: "Termination",
      icon: FileText,
      color: "amber",
      content: (
        <>
          <p className="mb-4 text-deep-charcoal/90">
            We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-5 border border-amber-gold/10 shadow-gold/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-gold" />
                </div>
                <div>
                  <h5 className="font-semibold text-deep-charcoal">Our Rights</h5>
                  <p className="text-sm text-warm-gray">We may terminate your access at our sole discretion</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-warm-gray">• Violation of these Terms</li>
                <li className="text-sm text-warm-gray">• Non-payment of fees</li>
                <li className="text-sm text-warm-gray">• Illegal or fraudulent activity</li>
                <li className="text-sm text-warm-gray">• Harm to other users or our Services</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-5 border border-amber-gold/10 shadow-gold/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-amber-gold" />
                </div>
                <div>
                  <h5 className="font-semibold text-deep-charcoal">Your Rights</h5>
                  <p className="text-sm text-warm-gray">You may terminate your subscription at any time</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-warm-gray">• Cancel via your account dashboard</li>
                <li className="text-sm text-warm-gray">• Contact customer support</li>
                <li className="text-sm text-warm-gray">• Termination effective at billing period end</li>
                <li className="text-sm text-warm-gray">• No refunds for partial periods</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-5 border border-amber-gold/10">
            <h5 className="font-semibold text-deep-charcoal mb-2">Upon Termination</h5>
            <p className="text-sm text-warm-gray mb-2">
              Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services.
            </p>
            <p className="text-xs text-warm-gray">
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </div>
        </>
      )
    },
    {
      id: "contact",
      title: "Contact Information",
      icon: Mail,
      color: "brand-teal",
      content: (
        <>
          <p className="mb-6 text-deep-charcoal/90">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-5 border border-amber-gold/10 shadow-gold/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h5 className="font-semibold text-deep-charcoal">Legal & Terms</h5>
                  <p className="text-sm text-warm-gray">For legal inquiries and terms questions</p>
                </div>
              </div>
              <a 
                href="mailto:legal@aiforhomebuilders.com" 
                className="text-green-600 font-medium hover:text-emerald-600 transition-colors duration-300"
              >
                 info@aiforhomebuilders.com
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-warm-white to-white rounded-xl p-5 border border-amber-gold/10 shadow-gold/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h5 className="font-semibold text-deep-charcoal">General Support</h5>
                  <p className="text-sm text-warm-gray">For general questions and support</p>
                </div>
              </div>
              <a 
                href="tel:+15551234567" 
                className="text-green-600 font-medium hover:text-emerald-600 transition-colors duration-300"
              >
                 760 500 84 86
              </a>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl p-5 border border-green-500/10">
            <h5 className="font-semibold text-deep-charcoal mb-2">Mailing Address</h5>
            <p className="text-sm text-warm-gray mb-3">
              AI for Homebuilders<br />
              123 Builder's Way, Suite 100<br />
              Construction City, ST 12345<br />
              United States
            </p>
            <p className="text-xs text-warm-gray">
              Please allow 2-3 business days for a response to written inquiries.
            </p>
          </div>
        </>
      )
    }
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
          {/* Header with Ebook Download */}
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 mb-6 border border-amber-gold/20">
              <Scale className="w-8 h-8 text-amber-gold" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gradient-navy mb-4">
              Terms of Service
            </h1>
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 rounded-full border border-amber-gold/20 mb-6">
              <p className="text-sm font-medium text-deep-charcoal">
                Last Updated: {lastUpdated}
              </p>
            </div>
            <p className="text-lg text-warm-gray max-w-3xl mx-auto mb-8">
              These Terms of Service govern your use of the AI for Homebuilders website and services. Please read them carefully before using our Services.
            </p>
            
            {/* Ebook Download Button in Header */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp delay-100">
              <button
                onClick={handleEbookDownload}
                className="btn-gold font-semibold py-3 px-6 rounded-xl hover:shadow-gold-lg hover-lift transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 group"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal" />
                <span className="text-deep-charcoal">Download Free E-Book</span>
              </button>
              <button
                onClick={handleScheduleConsultation}
                className="bg-white border border-amber-gold/20 text-deep-charcoal font-semibold py-3 px-6 rounded-xl hover:bg-amber-gold/5 hover:border-amber-gold transition-all duration-300 text-sm sm:text-base hover-lift flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>

          {/* Important Notice Banner */}
          <div className="mb-8 animate-fadeInUp delay-200">
            <div className="bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 rounded-2xl border border-amber-gold/20 p-6 shadow-gold/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gradient-navy mb-2">Important Notice</h3>
                  <p className="text-sm text-warm-gray mb-3">
                    By accessing or using our Services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Services.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-warm-gray">
                    <span className="font-medium text-amber-gold">Need legal advice?</span>
                    Consult with your legal counsel before agreeing to these terms.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mb-8 animate-fadeInUp delay-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-amber-gold/10 p-4 shadow-gold/10">
              <h3 className="text-lg font-semibold text-gradient-navy mb-4">Quick Navigation</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-300 hover-lift ${
                      section.color === 'amber' ? 'bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 hover:from-amber-gold/10 hover:to-soft-gold/10' :
                      section.color === 'brand-teal' ? 'bg-gradient-to-r from-green-500/5 to-emerald-500/5 hover:from-green-500/10 hover:to-emerald-500/10' :
                      'bg-gradient-to-r from-warm-navy/5 to-blue-50 hover:from-warm-navy/10 hover:to-blue-50'
                    } border ${
                      section.color === 'amber' ? 'border-amber-gold/20' :
                      section.color === 'brand-teal' ? 'border-green-500/20' :
                      'border-warm-navy/20'
                    }`}
                  >
                    <section.icon className={`w-3 h-3 ${
                      section.color === 'amber' ? 'text-amber-gold' :
                      section.color === 'brand-teal' ? 'text-green-600' :
                      'text-warm-navy'
                    }`} />
                    <span className="text-xs font-medium text-deep-charcoal truncate">{section.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Ebook Promo Section */}
          <div className="mb-10 animate-fadeInUp delay-400">
            <div className="bg-gradient-to-br from-warm-navy to-deep-charcoal rounded-2xl p-6 md:p-8 text-warm-white overflow-hidden shadow-navy">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-gradient-gold mb-4">
                    While You Review Our Terms...
                  </h3>
                  <p className="text-warm-white/80 mb-4">
                    Download our free e-book to learn how AI can transform your homebuilding business with practical strategies and real-world examples.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-gold"></div>
                      <span className="text-sm">Generate 900+ qualified leads annually</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-gold"></div>
                      <span className="text-sm">Save $57,300 on warranty management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-gold"></div>
                      <span className="text-sm">Go live in 30-45 days on your existing systems</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/3">
                  <button
                    onClick={handleEbookDownload}
                    className="w-full btn-gold font-semibold py-4 px-6 rounded-xl hover:shadow-gold-lg hover-lift transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <Download className="w-5 h-5 text-deep-charcoal" />
                    <span className="text-deep-charcoal font-bold">Get Free E-Book</span>
                  </button>
                  <p className="text-xs text-warm-white/60 text-center mt-2">
                    No commitment required
                  </p>
                </div>
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
                style={{ animationDelay: `${(index + 5) * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-warm-white to-white rounded-2xl border border-amber-gold/20 p-6 md:p-8 shadow-gold/10 hover:shadow-gold/20 transition-all duration-300 hover-lift">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      section.color === 'amber' ? 'bg-gradient-to-r from-amber-gold/10 to-soft-gold/5' :
                      section.color === 'brand-teal' ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/5' :
                      'bg-gradient-to-r from-warm-navy/10 to-blue-50'
                    }`}>
                      <section.icon className={`w-6 h-6 ${
                        section.color === 'amber' ? 'text-amber-gold' :
                        section.color === 'brand-teal' ? 'text-green-600' :
                        'text-warm-navy'
                      }`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gradient-navy">{section.title}</h2>
                      <div className={`inline-block px-3 py-1 mt-2 rounded-full text-xs font-semibold ${
                        section.color === 'amber' ? 'bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 text-amber-gold border border-amber-gold/20' :
                        section.color === 'brand-teal' ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/5 text-green-600 border border-green-500/20' :
                        'bg-gradient-to-r from-warm-navy/10 to-blue-50 text-warm-navy border border-warm-navy/20'
                      }`}>
                        Section {index + 1} of {sections.length}
                      </div>
                    </div>
                  </div>
                  {section.content}
                  
                  {/* Ebook Download Button at the end of each section */}
                  {index < sections.length - 1 && (
                    <div className="mt-8 pt-8 border-t border-amber-gold/10">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-deep-charcoal mb-1">Want to learn more?</h4>
                          <p className="text-sm text-warm-gray">Download our comprehensive guide to AI for homebuilders</p>
                        </div>
                        <button
                          onClick={handleEbookDownload}
                          className="bg-white border border-amber-gold/20 text-amber-gold font-semibold py-2.5 px-6 rounded-xl hover:bg-amber-gold/5 transition-all duration-300 hover-lift flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download E-Book</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Final CTA Section */}
          <div className="mt-12 mb-12 animate-fadeInUp delay-800">
            <div className="bg-gradient-to-br from-warm-white to-white rounded-2xl border border-amber-gold/20 p-8 shadow-gold/10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 mb-6 border border-amber-gold/20">
                  <Scale className="w-8 h-8 text-amber-gold" />
                </div>
                <h3 className="text-2xl font-bold text-gradient-navy mb-4">
                  Questions About These Terms?
                </h3>
                <p className="text-warm-gray mb-6">
                  If you have any questions about these Terms of Service or need clarification on any points, please don't hesitate to reach out to our legal team.
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
                      href="mailto:legal@aiforhomebuilders.com" 
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
                    <span className="hidden md:block text-warm-gray/30">•</span>
                    <span className="text-xs text-warm-gray/70">
                      Response within 2 business days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}