"use client";

import { useEffect, useRef, useState } from "react";
import {
  Building,
  TrendingUp,
  Shield,
  Users,
  Zap,
  Award,
  Calendar,
  FileText,
  ArrowRight,
  Quote,
  Sparkles,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Play,
  Award as AwardIcon,
  Star,
  Download,
  Code,
  Wrench,
} from "lucide-react";

interface FounderStoryProps {
  variant?: "third-person" | "first-person";
}

export default function FounderStory({
  variant = "third-person",
}: FounderStoryProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialPlaying, setIsTestimonialPlaying] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [rotationCount, setRotationCount] = useState(0);
  const MAX_ROTATIONS = 3;

  const sectionRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<NodeJS.Timeout | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Add handler functions
  const handleIndicatorClick = (index: number) => {
    setActiveSlide(index);
    setRotationCount(0);
    setIsTestimonialPlaying(false);
  };

  const handlePlayPauseClick = () => {
    setIsTestimonialPlaying(!isTestimonialPlaying);
  };

  const handlePrevClick = () => {
    setActiveSlide((prev) => (prev - 1 + 3) % 3);
    setRotationCount(0);
    setIsTestimonialPlaying(false);
  };

  const handleNextClick = () => {
    setActiveSlide((prev) => (prev + 1) % 3);
    setRotationCount(0);
    setIsTestimonialPlaying(false);
  };

  const handleTestimonialIndicatorClick = (index: number) => {
    setActiveTestimonial(index);
    setIsTestimonialPlaying(false);
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate stats counter
          const statElements =
            statsRef.current?.querySelectorAll(".stat-value");
          if (statElements) {
            statElements.forEach((element) => {
              const value = parseInt(element.textContent || "0");
              animateCounter(element as HTMLElement, value, 2000);
            });
          }
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Testimonial autoplay
  useEffect(() => {
    if (isTestimonialPlaying) {
      testimonialRef.current = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % 3);
      }, 5000);
    }

    return () => {
      if (testimonialRef.current) clearInterval(testimonialRef.current);
    };
  }, [isTestimonialPlaying]);

  // Auto-play carousel - stops after 3 complete rotations
  useEffect(() => {
    if (rotationCount >= MAX_ROTATIONS) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % 3;
        if (next === 0) {
          setRotationCount((count) => count + 1);
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [rotationCount]);

  // Handle testimonial navigation
  const handleTestimonialNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % 3);
    setIsTestimonialPlaying(false);
  };

  const handleTestimonialPrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + 3) % 3);
    setIsTestimonialPlaying(false);
  };

  // Animate counter
  const animateCounter = (
    element: HTMLElement,
    target: number,
    duration: number,
  ) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + (target > 300 ? "+" : "");
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + (target > 300 ? "+" : "");
      }
    }, 16);
  };

  // Button handler for demo
  const handleBookDemo = () => {
    window.location.href = "/scheduleConsultation";
  };

  return (
    <section
      ref={sectionRef}
      id="founder-story"
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-warm-white to-white scroll-mt-[100px] py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ paddingTop: "100px" }}
    >
      {/* Background decorative elements matching your theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-bl from-amber-gold/5 to-transparent rounded-full blur-3xl transition-all duration-1500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-tr from-warm-navy/5 to-transparent rounded-full blur-3xl transition-all duration-1500 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute top-1/3 left-1/4 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-gradient-to-br from-brand-teal/3 to-transparent rounded-full blur-3xl transition-all duration-1500 delay-600 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-gold/20 to-transparent animate-shimmer h-px top-1/4" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-gold/20 to-transparent animate-shimmer h-px top-2/4" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-gold/20 to-transparent animate-shimmer h-px top-3/4" />
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div
          className={`w-full transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* HEADER SECTION - Original with proper spacing */}
          <div className="text-center mb-10 animate-fadeInUp">
            {/* Animated header badge */}
            <div className="mb-3 sm:mb-2 md:mb-2 animate-fadeInUp">
              <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-navy leading-tight">
                <div className="h-26 sm:h-20 md:h-20 lg:h-14 flex items-center justify-center flex-wrap">
                  <span className="text-warm-navy">
                    30 Years of
                    <span className="text-gradient-gold font-bold ml-2">
                      Building for Builders
                    </span>
                  </span>
                </div>
              </h1>
            </div>

            {/* Trust line */}
            <div className="mb-2 sm:mb-1 animate-fadeInUp delay-100">
              <span className="inline-block text-xs md:text-sm font-medium tracking-wide uppercase bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text">
                Built for Tomorrow, We Start Today
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-sm md:text-sm text-warm-navy uppercase font-medium leading-relaxed mb-3 sm:mb-2 md:mb-3 max-w-xl mx-auto animate-fadeInUp delay-200">
              Proven expertise from decades in the trenches
            </p>
            <p className="text-xs sm:text-xs md:text-xs text-warm-gray font-medium leading-relaxed mb-5 sm:mb-4 md:mb-4 max-w-lg mx-auto animate-fadeInUp delay-300">
              We understand what makes homebuilders succeed.
            </p>

            {/* Founder Quick Info */}
            <div className="max-w-md mx-auto bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-lg p-4 border border-amber-gold/10 animate-fadeInUp delay-400">
              <p className="text-xs sm:text-xs md:text-sm text-deep-charcoal font-medium">
                <span className="font-semibold text-gradient-gold">
                  "I've spent 30 years learning what makes homebuilders
                  succeed."
                </span>{" "}
                Now that knowledge powers your AI.
              </p>
            </div>

            {/* Founder Info with Image */}
            <div
              className={`flex flex-col items-center gap-4 transition-all duration-900 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] delay-100 ${
                isVisible
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 -rotate-3"
              }`}
            >
              <div className="flex items-center gap-4 bg-gradient-to-br from-white/60 to-amber-50/40 backdrop-blur-2xl px-6 py-3.5 rounded-2xl shadow-2xl shadow-amber-gold/15 border-2 border-white/40 border-t-white/70 border-l-white/70 hover:shadow-amber-gold/25 hover:from-white/70 hover:to-amber-50/50 hover:border-white/60 transition-all duration-600 group hover:-translate-y-0.5 relative">
                {/* Badge for credibility */}
                <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse-slow z-10">
                  VERIFIED
                </div>

                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/60 shadow-2xl group-hover:shadow-amber-gold/25 group-hover:border-amber-300/50 transition-all duration-500 flex-shrink-0">
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-transparent to-amber-300/20 blur-sm group-hover:blur-md group-hover:from-amber-500/40 transition-all duration-700 z-0" />

                  <div className="relative w-full  overflow-hidden">
                    {" "}
                    {/* Add this wrapper */}
                    <img
                      src="/Website Assets/Photographs/founderaboutpic.png"
                      alt="Steven Fabry - Founder & CEO"
                      className="relative w-full h-full object-fill transition-transform duration-700 group-hover:scale-110 z-10"
                    />
                  </div>
                  {/* Professional ring effect */}
                  <div className="absolute inset-0 ring-2 ring-inset ring-white/50 group-hover:ring-amber-300/60 group-hover:ring-4 rounded-full transition-all duration-500 z-20" />

                  {/* Status indicator */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm z-30 group-hover:scale-125 transition-transform duration-300" />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-deep-charcoal bg-gradient-to-r from-deep-charcoal to-amber-900 bg-clip-text text-transparent group-hover:from-amber-700 group-hover:to-amber-950 transition-all duration-500 tracking-tight">
                      Steven Fabry
                    </h3>
                    {/* Certification badge */}
                    <div className="text-xs bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200 font-medium">
                      CEO
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-amber-900/80 group-hover:text-amber-950 transition-colors duration-300">
                      Founder & Chief Executive Officer
                    </p>

                    <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-amber-300/40">
                      {/* Enhanced rating display */}
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 text-amber-500 fill-amber-500 group-hover:text-amber-600 group-hover:fill-amber-600 group-hover:scale-110 transition-all duration-300"
                            style={{ transitionDelay: `${i * 50}ms` }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-amber-700 group-hover:text-amber-800 transition-colors duration-300">
                        5.0
                      </span>
                    </div>
                  </div>

                  {/* Professional tagline */}
                  <p className="text-xs text-warm-gray/80 group-hover:text-amber-800/90 transition-colors duration-300 mt-1 italic max-w-[220px]">
                    30+ years in executive leadership
                  </p>
                </div>

                {/* Subtle professional accent */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Main Content Grid - Stacks on mobile, 2 columns on desktop */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-start px-2 sm:px-0">
            {/* Left Column - Founder Story & Image */}
            <div className="space-y-4 sm:space-y-6 w-full">
              {/* Founder Story Card */}
              <div
                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-gold/10 hover:shadow-gold/20 transition-all duration-300 hover-lift w-full ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-gold to-soft-gold rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-gradient-to-br from-brand-teal to-teal-600 rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-[8px] sm:text-xs text-white font-bold">
                          ✓
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gradient-navy">
                        The Story Behind AI for Homebuilders
                      </h3>
                      <p className="text-[10px] xs:text-xs sm:text-sm text-warm-gray">
                        From manual workflows to intelligent automation
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base">
                    <p className="leading-relaxed text-deep-charcoal">
                      <span className="font-semibold text-gradient-gold">
                        Steven Fabry
                      </span>{" "}
                      started designing workflows and business processes for
                      builders at 29. He built Master Manuals, evolved it into
                      Compendia, and served 300+ builders across 28 states.
                    </p>

                    <p className="leading-relaxed text-deep-charcoal">
                      <span className="font-semibold text-gradient-teal">
                        AI for Homebuilders is Compendia 2.0
                      </span>
                      —the same deep domain expertise, now powered by AI to get
                      more value from your existing systems, processes, and
                      people.
                    </p>

                    <p className="leading-relaxed text-deep-charcoal">
                      It&apos;s not about chasing the latest tech trend.
                      It&apos;s about applying 30 years of operational wisdom to
                      make your business more profitable, with happier employees
                      and customers.
                    </p>
                  </div>

                  {/* Quote Card */}
                  <div
                    className={`mt-5 sm:mt-6 md:mt-8 bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-4 sm:p-5 md:p-6 border-l-4 border-amber-gold shadow-inner hover:shadow-lg transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-gold/20 to-amber-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                      </div>
                      <div>
                        <p className="text-deep-charcoal italic text-sm sm:text-base md:text-lg leading-relaxed">
                          &quot;I&apos;ve spent 30 years learning what makes
                          homebuilders succeed. Now I&apos;m putting that
                          knowledge into AI that actually works for you.&quot;
                        </p>
                        <div className="flex items-center gap-2 mt-2 sm:mt-3">
                          <div className="w-6 h-px sm:w-8 bg-amber-gold" />
                          <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-warm-gray">
                            Steven Fabry, Founder & CEO
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Table */}
                  <div
                    ref={statsRef}
                    className={`mt-5 sm:mt-6 md:mt-8 transition-all duration-700 delay-500 w-full ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 bg-gradient-to-r from-warm-white to-white rounded-xl p-3 sm:p-4 md:p-5 border border-amber-gold/10 shadow-inner w-full">
                      {[
                        {
                          value: 17,
                          label: "Years as CEO (Compendia)",
                          icon: Clock,
                        },
                        { value: 87, label: "Employees Led", icon: Users },
                        {
                          value: 300,
                          label: "Builder Clients",
                          icon: Building,
                        },
                        { value: 28, label: "States Served", icon: MapPin },
                      ].map((stat, idx) => (
                        <div
                          key={idx}
                          className="text-center p-1.5 sm:p-2 md:p-3 group"
                        >
                          <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-gold/10 to-soft-gold/5 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                            <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-gold" />
                          </div>
                          <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-gradient-navy mb-1">
                            <span className="stat-value">
                              {stat.value}
                              {stat.label.includes("Clients") ? "+" : ""}
                            </span>
                          </div>
                          <div className="text-[8px] xs:text-[10px] sm:text-xs text-warm-gray leading-tight">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Legacy Company Card */}
              <div
                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-gold/10 hover:shadow-gold/20 transition-all duration-300 hover-lift w-full ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-warm-navy/10 to-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-warm-navy" />
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gradient-navy">
                      Our Legacy Company
                    </h3>
                  </div>

                  <div className="relative w-full h-40 xs:h-44 sm:h-52 md:h-56 lg:h-64 rounded-xl overflow-hidden group">
                    <img
                      src="/Website Assets/Photographs/Founder former company.jpeg"
                      alt="Compendia - Former Company serving 300+ builders"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] xs:text-xs sm:text-sm font-semibold tracking-wide">
                            Compendia
                          </p>
                          <p className="text-[8px] xs:text-[10px] sm:text-xs opacity-90">
                            Served 300+ builders across 28 states
                          </p>
                        </div>
                      </div>
                      <p className="text-[8px] xs:text-[10px] sm:text-xs opacity-95 leading-relaxed">
                        The foundation of our expertise comes from 17 years of
                        hands-on experience serving the homebuilding industry
                        through Compendia, where we developed deep operational
                        knowledge that now powers our AI solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Trust Points & Testimonials */}
            <div className="space-y-4 sm:space-y-6 w-full">
              {/* Why Builders Trust Us */}
              <div
                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-gold/10 hover:shadow-gold/20 transition-all duration-300 hover-lift w-full ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-5 md:mb-6">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-amber-gold/20 to-amber-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-amber-gold" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gradient-navy">
                        Why Builders Trust Us
                      </h3>
                      <p className="text-[10px] xs:text-xs sm:text-sm text-warm-gray">
                        Three pillars of our expertise
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {/* Card 1 */}
                    <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-3 sm:p-4 border border-amber-gold/10 shadow-sm hover:shadow-md hover-lift transition-all duration-300 group">
                      <div className="flex flex-col xs:flex-row items-start gap-2 sm:gap-3 md:gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-gold/10 to-soft-gold/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Wrench className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-deep-charcoal mb-1 sm:mb-2 group-hover:text-gradient-gold transition-all duration-300">
                            We Understand How The Homebuilding Business Really
                            Works
                          </h4>
                          <p className="text-[10px] xs:text-xs sm:text-sm text-warm-gray mb-1 sm:mb-2">
                            <span className="font-semibold text-deep-charcoal">
                              Founded by Steven Fabry,
                            </span>{" "}
                            industry veteran, Harvard Business School graduate,
                            and former CEO of an 87-person company serving 300
                            homebuilders in 28 states with a successful private
                            equity exit.
                          </p>
                          <p className="text-[10px] xs:text-xs sm:text-sm text-warm-gray">
                            We understand the sales and customer experience, the
                            multidisciplinary nature of the business, and the
                            daily realities across Operations, IT, Marketing &
                            Sales, Finance, Legal, HR, and the field.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gradient-to-r from-warm-navy/5 to-blue-50 rounded-xl p-3 sm:p-4 border border-warm-navy/10 shadow-sm hover:shadow-md hover-lift transition-all duration-300 group">
                      <div className="flex flex-col xs:flex-row items-start gap-2 sm:gap-3 md:gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-warm-navy/10 to-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Code className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-warm-navy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-deep-charcoal mb-1 sm:mb-2 group-hover:text-gradient-navy transition-all duration-300">
                            We Work With Your Systems
                          </h4>
                          <p className="text-[10px] xs:text-xs sm:text-sm text-warm-gray">
                            No IT overhaul required. Our AI plugs into your
                            existing CRM, warranty platform, and tools.
                          </p>
                          <div className="inline-flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-warm-navy/10 rounded-full">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-warm-navy rounded-full animate-pulse" />
                            <span className="text-[8px] xs:text-[10px] sm:text-xs font-semibold text-warm-navy">
                              You get more value from the systems you&apos;ve
                              already invested in.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gradient-to-r from-brand-teal/5 to-green-50 rounded-xl p-3 sm:p-4 border border-brand-teal/10 shadow-sm hover:shadow-md hover-lift transition-all duration-300 group">
                      <div className="flex flex-col xs:flex-row items-start gap-2 sm:gap-3 md:gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-teal/10 to-green-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-brand-teal" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-deep-charcoal mb-1 sm:mb-2 group-hover:text-gradient-teal transition-all duration-300">
                            We Prioritize Your People
                          </h4>
                          <p className="text-[10px] xs:text-xs sm:text-sm text-warm-gray">
                            AI for Humans means your team stays employed,
                            empowered, happier, and more effective than ever. AI
                            handles the repetitive work so your people can focus
                            on relationships, judgment, and problem-solving.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials Carousel */}
              <div
                className={`bg-gradient-to-br from-deep-charcoal to-warm-navy rounded-2xl shadow-navy overflow-hidden transition-all duration-300 hover:shadow-navy-lg w-full ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-0 mb-4 sm:mb-5 md:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-gold/20 to-amber-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-gold" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gradient-gold">
                          Industry Insights
                        </h3>
                        <p className="text-[10px] xs:text-xs sm:text-sm text-warm-gray">
                          Trusted by industry leaders
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 self-end xs:self-auto">
                      <button
                        onClick={handlePlayPauseClick}
                        className="p-1 sm:p-1.5 md:p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
                        title={
                          isTestimonialPlaying
                            ? "Pause autoplay"
                            : "Play autoplay"
                        }
                      >
                        {isTestimonialPlaying ? (
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-amber-gold rounded-sm" />
                        ) : (
                          <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-amber-gold" />
                        )}
                      </button>
                      <button
                        onClick={handlePrevClick}
                        className="p-1 sm:p-1.5 md:p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-warm-white" />
                      </button>
                      <button
                        onClick={handleNextClick}
                        className="p-1 sm:p-1.5 md:p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-warm-white" />
                      </button>
                    </div>
                  </div>

                  {/* Testimonial Indicators */}
                  <div className="flex justify-center gap-1 sm:gap-1.5 mb-4 sm:mb-5 md:mb-6">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => handleTestimonialIndicatorClick(index)}
                        className={`h-1 sm:h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                          index === activeTestimonial
                            ? "bg-amber-gold w-4 sm:w-6 md:w-8"
                            : "bg-warm-white/30 hover:bg-warm-white/50 w-1 sm:w-1.5 md:w-2"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Expert Insights Carousel */}
                  <div className="relative w-full">
                    {/* Carousel Container */}
                    <div className="relative overflow-hidden rounded-xl w-full">
                      {/* Slides */}
                      <div
                        className="flex transition-transform duration-500 ease-in-out w-full"
                        style={{
                          transform: `translateX(-${activeSlide * 100}%)`,
                        }}
                      >
                        {/* Slide 1 - Steven Fabry */}
                        <div className="w-full flex-shrink-0">
                          <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-amber-gold/10 backdrop-blur-sm">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-gold/30 to-amber-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-gold" />
                              </div>
                              <div>
                                <div className="text-[10px] xs:text-xs sm:text-sm font-semibold text-gradient-gold">
                                  Expert Insight
                                </div>
                                <div className="text-[8px] xs:text-[10px] sm:text-xs text-warm-white/70">
                                  30+ Years Experience
                                </div>
                              </div>
                            </div>
                            <p className="text-warm-white italic text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed mb-2 sm:mb-3">
                              &quot;I&apos;ve spent 30 years learning what makes
                              homebuilders succeed. Now I&apos;m putting that
                              knowledge into AI that actually works for
                              you.&quot;
                            </p>
                            <div className="flex items-center gap-2 pt-2 sm:pt-3 border-t border-white/10">
                              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-amber-gold/30 to-amber-gold/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-[8px] xs:text-[10px] sm:text-xs font-bold text-white">
                                  SF
                                </span>
                              </div>
                              <div className="min-w-0">
                                <div className="text-[10px] xs:text-xs sm:text-sm font-medium text-white truncate">
                                  Steven Fabry
                                </div>
                                <div className="text-[8px] xs:text-[10px] sm:text-xs text-warm-white/70 truncate">
                                  Founder & CEO
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Slide 2 - Jennifer Davis */}
                        <div className="w-full flex-shrink-0">
                          <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-amber-gold/10 backdrop-blur-sm">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-gold/30 to-amber-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-gold" />
                              </div>
                              <div>
                                <div className="text-[10px] xs:text-xs sm:text-sm font-semibold text-gradient-gold">
                                  Industry Impact
                                </div>
                                <div className="text-[8px] xs:text-[10px] sm:text-xs text-warm-white/70">
                                  500+ Builders
                                </div>
                              </div>
                            </div>
                            <p className="text-warm-white italic text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed mb-2 sm:mb-3">
                              &quot;We&apos;ve seen conversion rates increase by
                              40% and response times drop from hours to seconds.
                              This isn&apos;t the future—it&apos;s happening
                              now.&quot;
                            </p>
                            <div className="flex items-center gap-2 pt-2 sm:pt-3 border-t border-white/10">
                              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-amber-gold/30 to-amber-gold/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-[8px] xs:text-[10px] sm:text-xs font-bold text-white">
                                  JD
                                </span>
                              </div>
                              <div className="min-w-0">
                                <div className="text-[10px] xs:text-xs sm:text-sm font-medium text-white truncate">
                                  Jennifer Davis
                                </div>
                                <div className="text-[8px] xs:text-[10px] sm:text-xs text-warm-white/70 truncate">
                                  Director of Sales
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Slide 3 - Mike Reynolds */}
                        <div className="w-full flex-shrink-0">
                          <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-amber-gold/10 backdrop-blur-sm">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-gold/30 to-amber-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-gold" />
                              </div>
                              <div>
                                <div className="text-[10px] xs:text-xs sm:text-sm font-semibold text-gradient-gold">
                                  Warranty Innovation
                                </div>
                                <div className="text-[8px] xs:text-[10px] sm:text-xs text-warm-white/70">
                                  85% Faster Resolution
                                </div>
                              </div>
                            </div>
                            <p className="text-warm-white italic text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed mb-2 sm:mb-3">
                              &quot;Our warranty team was drowning in routine
                              calls. Now AI handles 40% automatically, and our
                              team focuses on what really matters—solving
                              complex issues.&quot;
                            </p>
                            <div className="flex items-center gap-2 pt-2 sm:pt-3 border-t border-white/10">
                              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-amber-gold/30 to-amber-gold/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-[8px] xs:text-[10px] sm:text-xs font-bold text-white">
                                  MR
                                </span>
                              </div>
                              <div className="min-w-0">
                                <div className="text-[10px] xs:text-xs sm:text-sm font-medium text-white truncate">
                                  Mike Reynolds
                                </div>
                                <div className="text-[8px] xs:text-[10px] sm:text-xs text-warm-white/70 truncate">
                                  Warranty Manager
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Carousel Indicators */}
                      <div className="flex justify-center gap-1.5 mt-3 sm:mt-4">
                        {[0, 1, 2].map((index) => (
                          <button
                            key={index}
                            onClick={() => handleIndicatorClick(index)}
                            className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                              activeSlide === index
                                ? "bg-gradient-to-r from-amber-gold to-soft-gold w-4 sm:w-5 md:w-6"
                                : "bg-white/30 hover:bg-white/50 w-1 sm:w-1.5"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Floating quote badge */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-br from-amber-gold to-soft-gold text-deep-charcoal text-[8px] xs:text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-0.5 md:py-1 rounded-full shadow-gold animate-bounce-slow">
                      99 Industry Insights
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="animate-fadeInUp delay-800 w-full">
                <button
                  onClick={handleBookDemo}
                  className="w-full group flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 btn-gold font-semibold py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-6 rounded-xl hover:shadow-gold-lg hover-lift transition-all duration-300 text-xs sm:text-sm md:text-base"
                >
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-deep-charcoal" />
                  <span className="text-deep-charcoal whitespace-nowrap">
                    See Your 12-Home ROI
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-deep-charcoal group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx global>{`
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
