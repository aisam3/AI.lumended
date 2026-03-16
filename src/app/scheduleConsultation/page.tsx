'use client';

import { useState, useEffect } from 'react';

export default function ScheduleDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    annualClosings: '',
    role: '',
    painPoint: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  // Prevent hydration errors by not rendering animations until mounted
  if (!mounted) {
    return null; // or a loading skeleton
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.company.trim()) errors.company = 'Company name is required';
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    setFormErrors({}); // Clear any previous errors
    
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send invitation');
      }
      
      setIsSubmitted(true);
      
      // Track successful submission (optional)
      console.log('Demo request successful for:', formData.email);
      
    } catch (error) {
      console.error('Submission error:', error);
      setFormErrors({ 
        submit: error instanceof Error ? error.message : 'Failed to submit form. Please try again.' 
      });
      
      // Scroll to error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      annualClosings: '',
      role: '',
      painPoint: '',
      notes: ''
    });
    setFormErrors({});
  };

  return (
    <section 
      id="demo-section"
      className="relative min-h-screen overflow-hidden flex items-center bg-warm-white scroll-mt-[100px]"
      style={{ paddingTop: "100px" }}
      suppressHydrationWarning
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0" suppressHydrationWarning>
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-amber-gold/5 to-transparent rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-warm-navy/5 to-transparent rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-br from-brand-teal/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main container */}
      <div className="relative container-custom">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} suppressHydrationWarning>
          {/* HEADER SECTION */}
          <div className="text-center mb-8 sm:mb-10 animate-fadeInUp">
            <div className="mb-3 sm:mb-2 md:mb-2 animate-fadeInUp">
              <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-navy leading-tight">
                <div className="h-8 sm:h-10 md:h-14 flex items-center justify-center">
                  <span className="text-warm-navy">Schedule Your </span>
                  <span className="text-gradient-gold font-bold ml-2">
                    Demo
                  </span>
                </div>
              </h1>
            </div>
            
            <div className="mb-2 sm:mb-1 animate-fadeInUp delay-100">
              <span className="inline-block text-xs md:text-sm font-medium tracking-wide uppercase bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text">
                See Your 12-Home ROI
              </span>
            </div>
            
            <p className="text-sm sm:text-sm md:text-sm text-warm-navy uppercase font-medium leading-relaxed mb-3 sm:mb-2 md:mb-3 max-w-xl mx-auto animate-fadeInUp delay-200">
              Get a personalized walkthrough tailored to your business
            </p>
            <p className="text-xs sm:text-xs md:text-xs text-warm-gray font-medium leading-relaxed mb-5 sm:mb-4 md:mb-4 max-w-lg mx-auto animate-fadeInUp delay-300">
              No pressure, just possibilities. See exactly how AI can enhance your operation.
            </p>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
            {/* LEFT COLUMN - BENEFIT CARDS */}
            <div className="lg:col-span-2">
              <div className="space-y-4 md:space-y-5">
                {/* Card 1: Personal Consultation */}
                <div className="card-gold-border bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-gold hover:shadow-gold-lg hover-lift group transition-all duration-300 animate-fadeInUp delay-400">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-gold/10 to-soft-gold/10 flex items-center justify-center mb-3 group-hover:animate-pulse-gold border border-amber-gold/10">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-gold/15 to-soft-gold/15 flex items-center justify-center border border-amber-gold/20">
                        <div className="text-lg font-semibold bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text">15</div>
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gradient-gold mb-1">Personal Consultation</h3>
                    <p className="text-xs text-deep-charcoal/80 font-normal px-2">
                      A focused conversation tailored to your specific needs and goals
                    </p>
                  </div>
                </div>

                {/* Card 2: Seamless Integration */}
                <div className="card-teal-border bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-teal hover:shadow-teal-lg hover-lift group transition-all duration-300 animate-fadeInUp delay-500">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-teal/10 to-blue-50 flex items-center justify-center mb-3 group-hover:animate-pulse border border-brand-teal/10">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-teal/15 to-blue-100 flex items-center justify-center border border-brand-teal/20">
                        <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gradient-teal mb-1">Seamless Integration</h3>
                    <p className="text-xs text-deep-charcoal/80 font-normal px-2">
                      See how AI complements your existing systems without disruption
                    </p>
                  </div>
                </div>

                {/* Card 3: Customized ROI */}
                <div className="card-navy-border bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-navy hover:shadow-navy-lg hover-lift group transition-all duration-300 animate-fadeInUp delay-600">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-warm-navy/10 to-blue-50 flex items-center justify-center mb-3 group-hover:animate-pulse border border-warm-navy/10">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-warm-navy/15 to-blue-100 flex items-center justify-center border border-warm-navy/20">
                        <svg className="w-5 h-5 text-warm-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gradient-navy mb-1">Customized ROI</h3>
                    <p className="text-xs text-deep-charcoal/80 font-normal px-2">
                      Get a personalized projection for your specific business
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-6 bg-gradient-to-br from-white/50 to-white/20 backdrop-blur-sm rounded-xl p-4 border border-amber-gold/10 shadow-gold/10 animate-fadeInUp delay-700">
                <h4 className="text-xs font-semibold text-warm-navy mb-3 uppercase tracking-wider text-center">
                  <span className="bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text">Trusted by Builders</span>
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gradient-gold">17+</div>
                    <div className="text-xs text-warm-gray font-medium">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gradient-gold">300+</div>
                    <div className="text-xs text-warm-gray font-medium">Builder Clients</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - FORM */}
            <div className="lg:col-span-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-gold/20 p-5 md:p-6 lg:p-7 animate-scaleIn delay-300">
                <div className="text-center mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gradient-gold mb-2">
                    Request Your Demo
                  </h3>
                  <p className="text-xs sm:text-sm text-deep-charcoal/80 font-normal max-w-md mx-auto">
                    Share your details and we'll coordinate a time that works for you
                  </p>
                </div>
                
                {isSubmitted ? (
                  <div className="text-center py-8 animate-fadeIn">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-50 to-emerald-50 mb-4 border border-green-200">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gradient-gold mb-2">Demo Requested!</h4>
                    <p className="text-deep-charcoal/80 mb-6 text-sm font-normal max-w-md mx-auto">
                      We've sent a Calendly invitation to <strong>{formData.email}</strong>. 
                      Please check your inbox (and spam folder) to schedule your personalized walkthrough.
                    </p>
                    <button
                      onClick={resetForm}
                      className="btn-gold font-medium text-sm px-6 py-3 rounded-lg shadow-gold hover:shadow-gold-lg hover-lift transition-all duration-300"
                    >
                      Schedule Another Demo
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5" noValidate>
                    {/* Error summary at top */}
                    {formErrors.submit && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fadeIn">
                        <p className="text-red-600 text-sm text-center">{formErrors.submit}</p>
                      </div>
                    )}
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="animate-slideIn">
                        <label className="block text-xs sm:text-sm font-medium text-warm-navy mb-1.5">
                          Your Name <span className="text-amber-gold">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 text-sm rounded-xl border ${
                            formErrors.name ? 'border-red-300 bg-red-50/50' : 'border-amber-gold/20 hover:border-amber-gold/30'
                          } focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm`}
                          placeholder="John Smith"
                          disabled={isSubmitting}
                          aria-invalid={!!formErrors.name}
                          aria-describedby={formErrors.name ? "name-error" : undefined}
                        />
                        {formErrors.name && (
                          <p id="name-error" className="mt-1.5 text-xs text-red-500">{formErrors.name}</p>
                        )}
                      </div>
                      
                      <div className="animate-slideIn delay-100">
                        <label className="block text-xs sm:text-sm font-medium text-warm-navy mb-1.5">
                          Email Address <span className="text-amber-gold">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 text-sm rounded-xl border ${
                            formErrors.email ? 'border-red-300 bg-red-50/50' : 'border-amber-gold/20 hover:border-amber-gold/30'
                          } focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm`}
                          placeholder="john@company.com"
                          disabled={isSubmitting}
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? "email-error" : undefined}
                        />
                        {formErrors.email && (
                          <p id="email-error" className="mt-1.5 text-xs text-red-500">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="animate-slideIn delay-200">
                      <label className="block text-xs sm:text-sm font-medium text-warm-navy mb-1.5">
                        Company Name <span className="text-amber-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 text-sm rounded-xl border ${
                          formErrors.company ? 'border-red-300 bg-red-50/50' : 'border-amber-gold/20 hover:border-amber-gold/30'
                        } focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm`}
                        placeholder="Your Company"
                        disabled={isSubmitting}
                        aria-invalid={!!formErrors.company}
                        aria-describedby={formErrors.company ? "company-error" : undefined}
                      />
                      {formErrors.company && (
                        <p id="company-error" className="mt-1.5 text-xs text-red-500">{formErrors.company}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="animate-slideIn delay-300">
                        <label className="block text-xs sm:text-sm font-medium text-warm-navy mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                          placeholder="(123) 456-7890"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="animate-slideIn delay-400">
                        <label className="block text-xs sm:text-sm font-medium text-warm-navy mb-1.5">
                          Annual Closings
                        </label>
                        <select
                          name="annualClosings"
                          value={formData.annualClosings}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm appearance-none"
                          disabled={isSubmitting}
                        >
                          <option value="">Select range</option>
                          <option value="1-10">1-10 closings</option>
                          <option value="11-50">11-50 closings</option>
                          <option value="51-100">51-100 closings</option>
                          <option value="101-250">101-250 closings</option>
                          <option value="251-500">251-500 closings</option>
                          <option value="501+">501+ closings</option>
                        </select>
                      </div>
                    </div>

                    <div className="animate-slideIn delay-500">
                      <label className="block text-xs sm:text-sm font-medium text-warm-navy mb-1.5">
                        Your Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        placeholder="CEO, COO, Sales Director, etc."
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="animate-slideIn delay-600">
                      <label className="block text-xs sm:text-sm font-medium text-warm-navy mb-1.5">
                        Main Challenge
                      </label>
                      <textarea
                        name="painPoint"
                        value={formData.painPoint}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
                        placeholder="What's your biggest operational challenge with your current systems?"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="animate-slideIn delay-700">
                      <label className="block text-xs sm:text-sm font-medium text-warm-navy mb-1.5">
                        Additional Information
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-amber-gold/20 hover:border-amber-gold/30 focus:border-amber-gold focus:ring-2 focus:ring-amber-gold/10 focus:outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
                        placeholder="Any specific needs, systems you use, or questions you have..."
                        disabled={isSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-gold w-full py-4 font-semibold text-sm rounded-xl shadow-gold hover:shadow-gold-lg hover-lift transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 animate-slideIn delay-800 group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-deep-charcoal/30 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm">Sending Invitation...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-deep-charcoal font-medium">Request Your Demo</span>
                          <svg className="w-4 h-4 text-deep-charcoal group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>

                    <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-4 animate-fadeInUp delay-900 border border-amber-gold/10">
                      <p className="text-center text-xs sm:text-sm text-deep-charcoal/70">
                        <span className="font-medium text-amber-gold">✓ Your privacy is respected.</span> No spam, just professional conversation about your business.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}