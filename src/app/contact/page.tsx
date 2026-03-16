"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Calendar, MessageSquare, User, Building, Home, CheckCircle, AlertCircle, Send, Download, ChevronRight, X, Globe, Clock, Users, Shield } from "lucide-react";

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

export default function ContactPage() {
  const [showEbookModal, setShowEbookModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    homesPerYear: "",
    message: "",
    inquiryType: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Form validation
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleEbookDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEbookModal(true);
  };

  const handleEbookSuccess = (email: string) => {
    console.log("Ebook downloaded from Contact page by:", email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      company: "",
      message: ""
    };

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Contact form submission:", {
        ...formData,
        timestamp: new Date().toISOString(),
        source: "contact-page"
      });

      setSubmitStatus("success");
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          homesPerYear: "",
          message: "",
          inquiryType: "general"
        });
        setSubmitStatus("idle");
      }, 3000);

    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/scheduleConsultation';
  };

  const handleReturnHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      description: "Call us for immediate assistance",
      value: " 760 500 84 86",
      color: "amber",
      action: "tel:+17605008486"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us a message anytime",
      value: "info@aiforhomebuilders.com",
      color: "brand-teal",
      action: "mailto:info@aiforhomebuilders.com"
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Serving builders nationwide",
      value: "Remote-first company",
      color: "warm-navy",
      action: null
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "We value your time",
      value: "< 2 business hours",
      color: "amber",
      action: null
    }
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry", icon: MessageSquare },
    { value: "demo", label: "Schedule Demo", icon: Calendar },
    { value: "sales", label: "Sales Questions", icon: Users },
    { value: "support", label: "Technical Support", icon: Shield },
    { value: "partnership", label: "Partnership", icon: Building }
  ];

  const homesPerYearOptions = [
    { value: "", label: "Select an option" },
    { value: "1-10", label: "1-10 homes/year" },
    { value: "11-25", label: "11-25 homes/year" },
    { value: "26-50", label: "26-50 homes/year" },
    { value: "51-100", label: "51-100 homes/year" },
    { value: "101-250", label: "101-250 homes/year" },
    { value: "251+", label: "251+ homes/year" }
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
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-brand-teal/3 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 mb-6 border border-amber-gold/20">
              <MessageSquare className="w-8 h-8 text-amber-gold" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gradient-navy mb-4">
              Let's Build Something Together
            </h1>
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 rounded-full border border-amber-gold/20 mb-6">
              <p className="text-sm font-medium text-deep-charcoal">
                Connect with the AI for Homebuilders Team
              </p>
            </div>
            <p className="text-lg text-warm-gray max-w-3xl mx-auto mb-8">
              Whether you're ready to transform your business with AI or just want to learn more, we're here to help. Get in touch for a personalized consultation.
            </p>
            
            {/* Header CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp delay-100">
              <button
                onClick={handleScheduleConsultation}
                className="btn-gold font-semibold py-3 px-6 rounded-xl hover:shadow-gold-lg hover-lift transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal" />
                <span className="text-deep-charcoal">Book Your 15-Minute Demo</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={handleEbookDownload}
                className="bg-white border border-amber-gold/20 text-deep-charcoal font-semibold py-3 px-6 rounded-xl hover:bg-amber-gold/5 hover:border-amber-gold transition-all duration-300 text-sm sm:text-base hover-lift flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                <span>Download Free E-Book</span>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-12 animate-fadeInUp delay-200">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-gold/10 p-6 shadow-gold/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-gold mb-2">300+</div>
                  <div className="text-sm text-warm-gray">Builder Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-gold mb-2">28</div>
                  <div className="text-sm text-warm-gray">States Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-gold mb-2">17</div>
                  <div className="text-sm text-warm-gray">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-gold mb-2">2</div>
                  <div className="text-sm text-warm-gray">Hour Response Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-1 animate-fadeInUp delay-300">
              <div className="bg-gradient-to-br from-warm-white to-white rounded-2xl border border-amber-gold/20 p-6 shadow-gold/10 h-full">
                <h2 className="text-2xl font-bold text-gradient-navy mb-6">Get in Touch</h2>
                
                <div className="space-y-6 mb-8">
                  {contactInfo.map((info, index) => (
                    <div 
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 hover-lift ${
                        info.color === 'amber' ? 'bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 border-amber-gold/20 hover:border-amber-gold/30' :
                        info.color === 'brand-teal' ? 'bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-green-500/20 hover:border-green-500/30' :
                        'bg-gradient-to-r from-warm-navy/5 to-blue-50 border-warm-navy/20 hover:border-warm-navy/30'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        info.color === 'amber' ? 'bg-gradient-to-r from-amber-gold/10 to-soft-gold/5' :
                        info.color === 'brand-teal' ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/5' :
                        'bg-gradient-to-r from-warm-navy/10 to-blue-50'
                      }`}>
                        <info.icon className={`w-6 h-6 ${
                          info.color === 'amber' ? 'text-amber-gold' :
                          info.color === 'brand-teal' ? 'text-green-600' :
                          'text-warm-navy'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-deep-charcoal mb-1">{info.title}</h3>
                        <p className="text-sm text-warm-gray mb-2">{info.description}</p>
                        {info.action ? (
                          <a 
                            href={info.action}
                            className={`text-sm font-medium hover:underline ${
                              info.color === 'amber' ? 'text-amber-gold hover:text-soft-gold' :
                              info.color === 'brand-teal' ? 'text-green-600 hover:text-emerald-600' :
                              'text-warm-navy hover:text-blue-600'
                            }`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-deep-charcoal">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ebook Download Card */}
                <div className="bg-gradient-to-br from-warm-navy to-deep-charcoal rounded-xl p-5 text-warm-white">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-amber-gold/20 to-warm-navy/30 flex items-center justify-center">
                      <Download className="w-6 h-6 text-amber-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-warm-white mb-1">Free Resource</h3>
                      <p className="text-sm text-warm-white/80">
                        Get our comprehensive guide to AI for homebuilders
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleEbookDownload}
                    className="w-full btn-gold font-semibold py-3 rounded-lg hover:shadow-gold-lg hover-lift transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-deep-charcoal" />
                    <span className="text-deep-charcoal">Download Free E-Book</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-2 animate-fadeInUp delay-400">
              <div className="bg-gradient-to-br from-warm-white to-white rounded-2xl border border-amber-gold/20 p-6 md:p-8 shadow-gold/10 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 flex items-center justify-center">
                    <Send className="w-6 h-6 text-amber-gold" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gradient-navy">Send Us a Message</h2>
                    <p className="text-sm text-warm-gray">
                      Fill out the form below and we'll get back to you within 2 business hours
                    </p>
                  </div>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/5 rounded-xl border border-green-500/20 animate-fadeIn">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-deep-charcoal">Message Sent Successfully!</p>
                        <p className="text-sm text-warm-gray">
                          Thank you for contacting us. We'll respond within 2 business hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-rose-500/5 rounded-xl border border-red-500/20 animate-fadeIn">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-semibold text-deep-charcoal">Something went wrong</p>
                        <p className="text-sm text-warm-gray">
                          Please try again or contact us directly via email or phone.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-deep-charcoal mb-2">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-gray" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3 py-3 rounded-xl border transition-all duration-200 bg-warm-white focus:outline-none ${
                            errors.name 
                              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' 
                              : 'border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10'
                          }`}
                          placeholder="John Smith"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-deep-charcoal mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-gray" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3 py-3 rounded-xl border transition-all duration-200 bg-warm-white focus:outline-none ${
                            errors.email 
                              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' 
                              : 'border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10'
                          }`}
                          placeholder="you@company.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company */}
                    <div>
                      <label className="block text-sm font-medium text-deep-charcoal mb-2">
                        Company Name *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-gray" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3 py-3 rounded-xl border transition-all duration-200 bg-warm-white focus:outline-none ${
                            errors.company 
                              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' 
                              : 'border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10'
                          }`}
                          placeholder="Your Homebuilding Company"
                        />
                      </div>
                      {errors.company && (
                        <p className="mt-1 text-xs text-red-500">{errors.company}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-deep-charcoal mb-2">
                        Phone Number (Optional)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-gray" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-3 rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-warm-white"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Homes Per Year */}
                    <div>
                      <label className="block text-sm font-medium text-deep-charcoal mb-2">
                        Homes Built Per Year *
                      </label>
                      <select
                        name="homesPerYear"
                        value={formData.homesPerYear}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-warm-white appearance-none"
                        required
                      >
                        {homesPerYearOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-sm font-medium text-deep-charcoal mb-2">
                        What can we help you with? *
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-warm-white appearance-none"
                        required
                      >
                        {inquiryTypes.map((type, index) => (
                          <option key={index} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-deep-charcoal mb-2">
                      Your Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-warm-gray" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className={`w-full pl-10 pr-3 py-3 rounded-xl border transition-all duration-200 bg-warm-white focus:outline-none ${
                          errors.message 
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' 
                            : 'border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10'
                        }`}
                        placeholder="Tell us about your homebuilding business and how we can help..."
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-gold w-full py-4 font-semibold rounded-xl shadow-gold hover:shadow-gold-lg hover-lift transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-deep-charcoal/30 border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 text-deep-charcoal group-hover:translate-x-1 transition-transform duration-300" />
                          <span className="text-deep-charcoal">Send Message</span>
                        </>
                      )}
                    </button>
                    <p className="mt-2 text-xs text-center text-warm-gray">
                      By submitting this form, you agree to our Privacy Policy and Terms of Service
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* FAQ/Additional Info Section */}
          <div className="mb-12 animate-fadeInUp delay-500">
            <div className="bg-gradient-to-br from-warm-white to-white rounded-2xl border border-amber-gold/20 p-6 md:p-8 shadow-gold/10">
              <h2 className="text-2xl font-bold text-gradient-navy mb-6 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl border border-amber-gold/10">
                    <h4 className="font-semibold text-deep-charcoal mb-2">What happens after I submit the form?</h4>
                    <p className="text-sm text-warm-gray">
                      Our team will contact you within 2 business hours to discuss your needs and schedule a personalized demo.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl border border-amber-gold/10">
                    <h4 className="font-semibold text-deep-charcoal mb-2">Is there a cost for the initial consultation?</h4>
                    <p className="text-sm text-warm-gray">
                      No, the 15-minute demo and initial consultation are completely free with no obligation.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl border border-amber-gold/10">
                    <h4 className="font-semibold text-deep-charcoal mb-2">Do you work with builders outside the US?</h4>
                    <p className="text-sm text-warm-gray">
                      Currently, we focus on the US market but have plans for international expansion. Contact us to discuss your location.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl border border-amber-gold/10">
                    <h4 className="font-semibold text-deep-charcoal mb-2">Can I integrate with my existing systems?</h4>
                    <p className="text-sm text-warm-gray">
                      Yes! Our AI agents plug into your existing CRM, warranty platform, and tools without requiring an IT overhaul.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="animate-fadeInUp delay-600">
            <div className="bg-gradient-to-br from-warm-navy to-deep-charcoal rounded-2xl p-8 text-warm-white overflow-hidden shadow-navy">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-gradient-gold mb-4">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-warm-white/80 mb-6">
                  Join 300+ homebuilders who are already using AI to generate more leads, close more sales, and reduce warranty workload.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <button
                    onClick={handleScheduleConsultation}
                    className="btn-gold font-semibold py-3 px-8 rounded-xl hover:shadow-gold-lg hover-lift transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 group"
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal" />
                    <span className="text-deep-charcoal">Book Your 15-Minute Demo</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-deep-charcoal group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  
                  <button
                    onClick={handleEbookDownload}
                    className="bg-white/10 backdrop-blur-sm border border-amber-gold/20 text-warm-white font-semibold py-3 px-8 rounded-xl hover:bg-amber-gold/10 hover:border-amber-gold transition-all duration-300 text-sm sm:text-base hover-lift flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Download Free E-Book</span>
                  </button>

                  <button
                    onClick={handleReturnHome}
                    className="bg-transparent border border-amber-gold/30 text-amber-gold font-semibold py-3 px-8 rounded-xl hover:bg-amber-gold/5 transition-all duration-300 text-sm sm:text-base hover-lift flex items-center justify-center gap-2"
                  >
                    <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Return to Homepage</span>
                  </button>
                </div>

                <div className="pt-6 border-t border-warm-white/10">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-warm-white/80">
                      <CheckCircle className="w-4 h-4 text-amber-gold" />
                      <span>No AI expertise required</span>
                    </div>
                    <div className="hidden md:block text-warm-white/30">•</div>
                    <div className="flex items-center gap-2 text-warm-white/80">
                      <CheckCircle className="w-4 h-4 text-amber-gold" />
                      <span>30-45 day implementation</span>
                    </div>
                    <div className="hidden md:block text-warm-white/30">•</div>
                    <div className="flex items-center gap-2 text-warm-white/80">
                      <CheckCircle className="w-4 h-4 text-amber-gold" />
                      <span>ROI from one extra closing</span>
                    </div>
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