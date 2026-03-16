"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Shield, Zap, Users, Clock, CreditCard, CheckCircle, Key, BarChart3 } from "lucide-react";

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      id: 0,
      question: "Do we need a big IT project to make this work?",
      answer: "No. We work with the tools you already use—your website forms, CRM, email, and calendars. Most builders don't need additional software; they need smarter workflows on top of what they already have.",
      icon: HelpCircle,
      category: "Implementation"
    },
    {
      id: 1,
      question: "Will this replace my salespeople?",
      answer: "No. The goal is to make your sales team more effective, not smaller. AI handles the repetitive outreach and admin work so your people can spend more time in real conversations and writing contracts.",
      icon: Users,
      category: "Team Impact"
    },
    {
      id: 2,
      question: "Which CRMs and systems do you work with?",
      answer: "We can support most builder-focused and general CRMs, including Lasso, HubSpot, Salesforce, and others. If you're using a custom or legacy system, we'll map what's possible during your AI Revenue Audit.",
      icon: Key,
      category: "Integration"
    },
    {
      id: 3,
      question: "How long until we see results?",
      answer: "Most builders see improvements in speed-to-lead and follow-up coverage in the first 30–45 days of a pilot. Revenue impact typically shows up in the next selling cycle as more appointments and better conversion.",
      icon: Clock,
      category: "Timeline"
    },
    {
      id: 4,
      question: "Is our data secure?",
      answer: "Yes. We use industry-standard security practices and work within your existing systems whenever possible. We do not resell your data. Details are covered in our agreements and security overview.",
      icon: Shield,
      category: "Security"
    },
    {
      id: 5,
      question: "How do you price this?",
      answer: "We price based on scope: number of communities/divisions, workflows, and integrations. The ROI target is simple: a multiple of your investment in additional closings and hours saved. You'll see a clear range before you commit.",
      icon: CreditCard,
      category: "Pricing"
    },
    {
      id: 6,
      question: "What if my team doesn't adopt it?",
      answer: "We design workflows around how your team already works and keep the visible changes minimal. Training is short, and we monitor utilization and results with you. If it's not being used, we fix it or shut it off.",
      icon: CheckCircle,
      category: "Adoption"
    }
  ];

  const categories = [
    { id: "all", label: "All Questions", count: faqs.length },
    { id: "Implementation", label: "Implementation", count: 1 },
    { id: "Team Impact", label: "Team Impact", count: 1 },
    { id: "Integration", label: "Integration", count: 1 },
    { id: "Timeline", label: "Timeline", count: 1 },
    { id: "Security", label: "Security", count: 1 },
    { id: "Pricing", label: "Pricing", count: 1 },
    { id: "Adoption", label: "Adoption", count: 1 }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFaqs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-[var(--warm-white)]">
      <div className="container-custom relative">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--amber-gold)] to-[var(--soft-gold)] rounded-lg flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium uppercase tracking-wide text-[var(--amber-gold)]">
              Common Questions
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--deep-charcoal)] mb-4">
            Frequently Asked Questions
          </h2>
          
          <p className="text-base md:text-lg text-[var(--warm-gray)] max-w-3xl mx-auto">
            Get clear answers about implementing AI in your homebuilding business
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-[var(--amber-gold)] to-[var(--soft-gold)] text-white shadow-lg'
                  : 'bg-white text-[var(--warm-gray)] border border-[var(--warm-gray)]/20 hover:border-[var(--amber-gold)]/50'
              }`}
            >
              <span>{category.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                selectedCategory === category.id
                  ? 'bg-white/20'
                  : 'bg-[var(--warm-gray)]/10'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-white rounded-xl border border-[var(--warm-gray)]/20 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-[var(--warm-white)]/50 transition-colors duration-200"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-2 rounded-lg ${
                      openFaq === faq.id 
                        ? 'bg-gradient-to-br from-[var(--amber-gold)] to-[var(--soft-gold)]' 
                        : 'bg-[var(--warm-white)]'
                    }`}>
                      <faq.icon className={`w-4 h-4 ${
                        openFaq === faq.id ? 'text-white' : 'text-[var(--amber-gold)]'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium uppercase text-[var(--amber-gold)] tracking-wide">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--deep-charcoal)] pr-4">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  
                  <div className={`p-1 rounded-full border transition-all duration-300 ${
                    openFaq === faq.id 
                      ? 'border-[var(--amber-gold)] bg-[var(--amber-gold)]/10' 
                      : 'border-[var(--warm-gray)]/30'
                  }`}>
                    {openFaq === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-[var(--amber-gold)]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[var(--warm-gray)]" />
                    )}
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openFaq === faq.id ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="px-6 pb-6 pt-2 border-t border-[var(--warm-gray)]/10">
                    <div className="flex gap-4">
                      <div className="w-10 flex-shrink-0"></div> {/* Spacer for icon alignment */}
                      <div className="flex-1">
                        <p className="text-[var(--warm-gray)] leading-relaxed">
                          {faq.answer}
                        </p>
                        
                        {/* Additional context or links */}
                        {faq.id === 2 && (
                          <div className="mt-3 pt-3 border-t border-[var(--warm-gray)]/10">
                            <p className="text-sm font-medium text-[var(--deep-charcoal)] mb-2">
                              Popular Builder CRMs we integrate with:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {["Lasso", "HubSpot", "Salesforce", "Buildertrend", "CoConstruct"].map((crm) => (
                                <span key={crm} className="px-3 py-1 bg-[var(--warm-white)] text-[var(--warm-gray)] rounded-full text-sm">
                                  {crm}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {faq.id === 3 && (
                          <div className="mt-3 p-3 bg-gradient-to-r from-[var(--amber-gold)]/5 to-[var(--soft-gold)]/5 rounded-lg">
                            <div className="flex items-center gap-2 text-sm">
                              <Zap className="w-4 h-4 text-[var(--amber-gold)]" />
                              <span className="font-medium text-[var(--deep-charcoal)]">
                                Typical results timeline:
                              </span>
                            </div>
                            <div className="mt-2 grid grid-cols-3 gap-2">
                              <div className="text-center p-2 bg-white rounded border">
                                <div className="text-lg font-bold text-[var(--amber-gold)]">0-30 days</div>
                                <div className="text-xs text-[var(--warm-gray)]">Faster response</div>
                              </div>
                              <div className="text-center p-2 bg-white rounded border">
                                <div className="text-lg font-bold text-[var(--amber-gold)]">30-60 days</div>
                                <div className="text-xs text-[var(--warm-gray)]">More appointments</div>
                              </div>
                              <div className="text-center p-2 bg-white rounded border">
                                <div className="text-lg font-bold text-[var(--amber-gold)]">60-90 days</div>
                                <div className="text-xs text-[var(--warm-gray)]">Revenue impact</div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {faq.id === 5 && (
                          <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100/30 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 text-sm mb-2">
                              <BarChart3 className="w-4 h-4 text-blue-600" />
                              <span className="font-medium text-[var(--deep-charcoal)]">
                                ROI-based pricing approach:
                              </span>
                            </div>
                            <ul className="space-y-1 text-sm text-[var(--warm-gray)]">
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                <span>Scope-based (communities, workflows)</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                <span>Clear ROI multiple target</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                <span>Transparent range before commitment</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}