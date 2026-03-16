"use client";

import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
  X,
  Star,
  ChevronRight,
  ChevronLeft,
  Home,
  Target,
  Shield,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Clock as ClockIcon,
  Check,
  Award,
  BarChart,
  PieChart,
  Download,
  Share2,
  Play,
  Pause,
  Heart,
  Eye,
  BarChart3,
  TrendingDown,
  FileText,
  Video,
  Image as ImageIcon,
  UserCheck,
  Building,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Define TypeScript interfaces
interface StoryMetric {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface StoryCTA {
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

interface StoryImage {
  type: string;
  src: string;
  alt: string;
}

interface StoryResult {
  metric: string;
  before: string;
  after: string;
  improvement: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StoryResource {
  type: string;
  title: string;
  size: string;
  url: string;
}

interface Story {
  id: number;
  title: string;
  subtitle: string;
  role: string;
  workflow: string;
  icon: React.ComponentType<{ className?: string }>;
  company: string;
  location: string;
  timeSaved: string;
  vignette: string;
  profileImage: string;
  before: {
    title: string;
    steps: string[];
    painPoints: string[];
  };
  after: {
    title: string;
    steps: string[];
    benefits: string[];
  };
  stat?: { value: string; label: string };
  metrics?: StoryMetric[];
  rating: number;
  testimonial: string;
  keyMetrics: Array<{
    icon: React.ComponentType<{ className?: string }>;
    value: string;
    label: string;
  }>;
  takeaway: string;
  images: StoryImage[];
  cta: {
    primary: StoryCTA;
    secondary?: StoryCTA;
  };
  detailedContent: {
    overview: string;
    processSteps: string[];
    results: StoryResult[];
    quote: string;
    videoUrl: string;
    resources: StoryResource[];
  };
  firstImageContent?: {
    tagline: string;
    steps: Array<{ icon: string; text: string }>;
    testimonial: string;
    ctaText: string;
  };
  secondImageContent?: {
    beforeAITitle: string;
    sarahBefore: {
      title: string;
      issues: string[];
    };
    teamBefore: {
      title: string;
      issues: string[];
    };
    transformationTitle: string;
    sarahAfter: {
      title: string;
      steps: string[];
    };
    teamAfter: {
      title: string;
      benefits: string[];
    };
    keyTakeaway: string;
    subTakeaway: string;
    finalCTA: string;
  };
}

export default function CustomerStories() {
  const router = useRouter();
  const [activeStory, setActiveStory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Toast notification
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Define stories with ALL original content + added workflow labels and profile pictures
  const stories: Story[] = [
    {
      id: 0,
      title: "Sarah's Journey",
      subtitle: "The Homebuyer Experience",
      role: "warranty",
      workflow: "Lead-to-Tour",
      icon: Users,
      company: "Ai.Lumened.",
      location: "Austin, TX",
      timeSaved: "3 weeks",
      vignette: "I felt guided and remembered, not just processed",
      profileImage:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      before: {
        title: "Before AI: The Reality Today",
        steps: [
          "Submit an inquiry and wait... and wait",
          "Get a generic reply (or no reply), then call",
          "Scheduling a walkthrough takes days and multiple touches",
          "Warnings: 'It's late, it's slow, warranty will be slow'",
          "Feel like she's texting a void with each contact",
        ],
        painPoints: ["Frustration", "Time-consuming", "Uncertainty", "Stress"],
      },
      after: {
        title: "Sarah's New Journey with AI",
        steps: [
          "Sees ad at 9:30 PM, asks about availability",
          "Gets instant, personalized response with 3D tour link",
          "Books a tour in minutes—already qualified",
          "Answers informed and confident, closes with excitement",
          "Warranty question? Clear up, fast resolution",
        ],
        benefits: ["Speed", "Clarity", "Confidence", "Personalization"],
      },
      stat: { value: "98%", label: "Satisfaction Score" },
      rating: 5,
      testimonial: "I felt guided and remembered, not just processed.",
      keyMetrics: [
        { icon: Clock, value: "3x faster", label: "Journey completion" },
        { icon: CheckCircle, value: "40% less", label: "Stress reported" },
        { icon: Home, value: "95% match", label: "Preference accuracy" },
      ],
      takeaway:
        "Homebuyers complete their journey up to 3x faster with ~40% less stress when AI handles communication and coordination.",
      images: [
        {
          type: "journey",
          src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          alt: "Homebuyer Journey Map",
        },
        {
          type: "dashboard",
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          alt: "AI Dashboard",
        },
        {
          type: "results",
          src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          alt: "Results Chart",
        },
      ],
      cta: {
        primary: {
          text: "Book Demo",
          icon: Calendar,
          action: () => handleScheduleDemo(0),
        },
        secondary: {
          text: "View Full Story",
          icon: ExternalLink,
          action: () => handleCTA(0, "viewFullJourney"),
        },
      },
      detailedContent: {
        overview:
          "Experience the journey from today's reality to tomorrow's transformation: the homebuyer and the employee.",
        processSteps: [
          "Initial preference analysis through conversational AI",
          "Real-time property matching across all available listings",
          "Virtual tours and 3D walkthroughs on demand",
          "Automated paperwork and document collection",
          "Seamless handoff to builder's sales team",
          "Post-purchase support and warranty onboarding",
        ],
        results: [
          {
            metric: "Response time",
            before: "24+ hours",
            after: "Instantly",
            improvement: "100%",
            icon: ClockIcon,
          },
          {
            metric: "Scheduling time",
            before: "Days",
            after: "Minutes",
            improvement: "99%",
            icon: Calendar,
          },
          {
            metric: "Customer satisfaction",
            before: "65%",
            after: "98%",
            improvement: "51%",
            icon: Heart,
          },
        ],
        quote:
          "I never imagined buying a home could be this easy. The AI understood my needs better than I did!",
        videoUrl: "https://example.com/sarah-demo.mp4",
        resources: [
          {
            type: "pdf",
            title: "Homebuyer Journey Case Study",
            size: "2.4 MB",
            url: "/downloads/sarah-case-study.pdf",
          },
          {
            type: "infographic",
            title: "AI4Homebuyers Process",
            size: "1.8 MB",
            url: "/downloads/homebuyer-infographic.pdf",
          },
          {
            type: "checklist",
            title: "Digital Homebuying Checklist",
            size: "0.9 MB",
            url: "/downloads/homebuyer-checklist.pdf",
          },
        ],
      },
      firstImageContent: {
        tagline: "Sarah's Journey - The Homebuyer Experience",
        steps: [
          { icon: "👀", text: "Sees ad at 9:30 PM" },
          { icon: "⚡", text: "Gets instant, personalized response" },
          { icon: "📅", text: "Books tour in minutes" },
          { icon: "✅", text: "Closes with confidence" },
          { icon: "🛡️", text: "Warranty handled seamlessly" },
        ],
        testimonial: "I felt guided and remembered, not just processed.",
        ctaText: "See the Full Journey →",
      },
      secondImageContent: {
        beforeAITitle: "Before AI: The Reality Today",
        sarahBefore: {
          title: "Sarah (The Homebuyer)",
          issues: [
            "Submit an inquiry and wait... and wait.",
            "Get a generic reply (or no reply), then call.",
            "Scheduling a walkthrough takes days and multiple touches.",
            "Warnings: 'It's late, it's slow, warranty will be slow.'",
            "Feel like she's texting a void with each contact.",
          ],
        },
        teamBefore: {
          title: "Matt, warranty",
          issues: [
            "Reviewing, qualifying, and reporting leads manually.",
            "Leads coming in at all hours—response depends on who's available.",
            "Warranty inbox chaos, clients buried in email threads.",
            "Wasting time on unqualified inquiries.",
            "Feeling like they're queuing, not serving.",
          ],
        },
        transformationTitle: "With AI: The Transformation",
        sarahAfter: {
          title: "Sarah's New Journey",
          steps: [
            "Sees ad at 9:30 PM, asks about availability",
            "Gets instant, personalized response with 3D tour link",
            "Books a tour in minutes—already qualified",
            "Answers informed and confident, closes with excitement",
            "Warranty question? Clear up, fast resolution",
          ],
        },
        teamAfter: {
          title: "Matt's New Day",
          benefits: [
            "Content created and distributed automatically",
            "Leads arrive pre-qualified with conversation history",
            "Appointments auto-scheduled into their calendar",
            "Focus on closing conversations, not inbox triage",
            "Warranty queue organized with full context—no hunting",
          ],
        },
        keyTakeaway: "AI Doesn't Threaten Your People. It Enables Them.",
        subTakeaway:
          "Your team handles the relationships. AI handles the repetitive work they hate anyway. The result? Happier employees, happier customers, and a healthier bottom line.",
        finalCTA: "See it in Action →",
      },
    },
    {
      id: 1,
      title: "Your Team's Day",
      subtitle: "The Employee Experience",
      role: "sales",
      workflow: "Sales & Warranty Day-in-the-Life",
      icon: Users,
      company: "Ai.Lumened.",
      location: "Nationwide",
      timeSaved: "15 hours/week",
      vignette: "I finally have time to do the work that matters.",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      before: {
        title: "Before AI: Team's Reality",
        steps: [
          "Reviewing, qualifying, and reporting leads manually",
          "Leads coming in at all hours—response depends on who's available",
          "Warranty inbox chaos, clients buried in email threads",
          "Wasting time on unqualified inquiries",
          "Feeling like they're queuing, not serving",
        ],
        painPoints: ["Manual work", "Stress", "Inefficiency", "Burnout"],
      },
      after: {
        title: "Team's New Day with AI",
        steps: [
          "Leads arrive pre-qualified",
          "Appointments auto-scheduled",
          "Focus on closing, not chasing",
          "Warranty queue organized",
          "No more drowning in admin",
        ],
        benefits: ["Automation", "Efficiency", "Focus", "Satisfaction"],
      },
      metrics: [
        { value: "15min", label: "Avg Response Time", icon: Zap },
        { value: "42%", label: "Productivity Increase", icon: TrendingUp },
        { value: "60%", label: "Stress Reduction", icon: Shield },
      ],
      rating: 4.8,
      testimonial: "I finally have time to do the work that matters.",
      keyMetrics: [
        { icon: Zap, value: "15 min", label: "Response time" },
        { icon: Users, value: "42%", label: "Productivity increase" },
        { icon: Shield, value: "60%", label: "Stress reduction" },
      ],
      takeaway: "40% more productivity with 60% less manual effort.",
      images: [
        {
          type: "workflow",
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          alt: "Team Workflow",
        },
        {
          type: "analytics",
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          alt: "Team Analytics",
        },
        {
          type: "collaboration",
          src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          alt: "Team Collaboration",
        },
      ],
      cta: {
        primary: {
          text: "Book Demo",
          icon: Calendar,
          action: () => handleScheduleDemo(1),
        },
        secondary: {
          text: "View Full Story",
          icon: ExternalLink,
          action: () => handleCTA(1, "viewFullJourney"),
        },
      },
      detailedContent: {
        overview:
          "Experience the journey from today's reality to tomorrow's transformation: the homebuyer and the employee.",
        processSteps: [
          "Leads arrive pre-qualified",
          "Appointments auto-scheduled",
          "Focus on closing, not chasing",
          "Warranty queue organized",
          "No more drowning in admin",
        ],
        results: [
          {
            metric: "Lead response time",
            before: "4 hours",
            after: "15 minutes",
            improvement: "94%",
            icon: ClockIcon,
          },
          {
            metric: "Team productivity",
            before: "60%",
            after: "85%",
            improvement: "42%",
            icon: TrendingUp,
          },
          {
            metric: "Employee satisfaction",
            before: "3.5/5",
            after: "4.8/5",
            improvement: "37%",
            icon: Heart,
          },
        ],
        quote: "I finally have time to do the work that matters.",
        videoUrl: "https://example.com/team-demo.mp4",
        resources: [
          {
            type: "pdf",
            title: "ai4homebuilder Team Playbook",
            size: "3.2 MB",
            url: "/downloads/team-playbook.pdf",
          },
          {
            type: "calculator",
            title: "Productivity Calculator",
            size: "1.2 MB",
            url: "/downloads/productivity-calculator.xlsx",
          },
          {
            type: "template",
            title: "Workflow Templates",
            size: "2.1 MB",
            url: "/downloads/workflow-templates.zip",
          },
        ],
      },
      firstImageContent: {
        tagline: "Your Team's Day - The Employee Experience",
        steps: [
          { icon: "📋", text: "Leads arrive pre-qualified" },
          { icon: "🤖", text: "Appointments auto-scheduled" },
          { icon: "🎯", text: "Focus on closing, not chasing" },
          { icon: "🗂️", text: "Warranty queue organized" },
          { icon: "📊", text: "No more drowning in admin" },
        ],
        testimonial: "I finally have time to do the work that matters.",
        ctaText: "See the Full Journey →",
      },
      secondImageContent: {
        beforeAITitle: "Before AI: The Reality Today",
        sarahBefore: {
          title: "Sales Team",
          issues: [
            "Spending hours on manual follow-ups",
            "Unpredictable pipeline with high leakage",
            "Heavy dependency on manual processes",
            "Missing after-hours leads",
            "Inconsistent customer experience",
          ],
        },
        teamBefore: {
          title: "Matt, warranty",
          issues: [
            "Overwhelmed with routine calls",
            "Manual tracking across multiple systems",
            "Slow resolution times",
            "Poor customer communication",
            "High rework rates",
          ],
        },
        transformationTitle: "With AI: The Transformation",
        sarahAfter: {
          title: "Sales Team's New Day",
          steps: [
            "Automated nurturing with personalized sequences",
            "Predictive forecasting with high accuracy",
            "Reduced manual work by 80%",
            "24/7 lead response capability",
            "Intelligent qualification and routing",
          ],
        },
        teamAfter: {
          title: "Matt's New Day",
          benefits: [
            "Automatic deflection of routine queries",
            "Predictive alerts for common issues",
            "Automated scheduling and dispatching",
            "Real-time tracking and updates",
            "Integrated knowledge management",
          ],
        },
        keyTakeaway: "AI Empowers Your People.",
        subTakeaway:
          "Your team focuses on building relationships and solving complex problems. AI handles the predictable, repetitive work. The result? Higher productivity, better morale, and improved results.",
        finalCTA: "See it in Action →",
      },
    },
    {
      id: 2,
      title: "Melissa's Success",
      subtitle: "Empowering Sales Teams with AI",
      role: "Sales Director",
      workflow: "Sales Engine",
      icon: TrendingUp,
      company: "Ai.Lumened.",
      location: "Denver, CO",
      timeSaved: "15 hours/week",
      vignette:
        "Melissa's team was drowning in manual follow-ups and missing opportunities daily. Lead response times were inconsistent, and conversions were slipping.",
      profileImage:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      before: {
        title: "Manual Operations",
        steps: [
          "4-6 hours daily on manual follow-ups",
          "Unpredictable pipeline with 40% leakage",
          "Heavy agency dependency at 60% of leads",
          "Missed 35% of after-hours leads",
          "Inconsistent qualification standards",
        ],
        painPoints: [
          "Manual work",
          "Lost leads",
          "High costs",
          "Inconsistency",
        ],
      },
      after: {
        title: "AI-Powered Pipeline",
        steps: [
          "Automated nurturing with personalized sequences",
          "Predictive forecasting with 90% accuracy",
          "Reduced agency use by 80%",
          "24/7 lead response under 2 minutes",
          "Intelligent qualification scoring",
        ],
        benefits: ["Automation", "Predictability", "Cost savings", "Speed"],
      },
      metrics: [
        { value: "15min", label: "Avg Response Time", icon: Zap },
        { value: "42%", label: "Appointment Rate", icon: Calendar },
        { value: "60%", label: "Cost Reduction", icon: DollarSign },
      ],
      rating: 4.8,
      testimonial:
        "Our team now focuses on closing deals, not chasing leads. The AI handles the grunt work, and we see more qualified appointments than ever.",
      keyMetrics: [
        { icon: Zap, value: "15 min", label: "Response time" },
        { icon: Users, value: "42%", label: "Appointment rate" },
        { icon: DollarSign, value: "60%", label: "Cost reduction" },
      ],
      takeaway: "40% more conversions with 60% less manual effort.",
      images: [
        {
          type: "workflow",
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          alt: "Warranty Workflow",
        },
        {
          type: "analytics",
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          alt: "Analytics Dashboard",
        },
        {
          type: "savings",
          src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          alt: "Cost Savings Chart",
        },
      ],
      cta: {
        primary: {
          text: "Book Demo",
          icon: Calendar,
          action: () => handleScheduleDemo(2),
        },
        secondary: {
          text: "View Full Story",
          icon: ExternalLink,
          action: () => handleCTA(2, "viewFullJourney"),
        },
      },
      detailedContent: {
        overview:
          "Melissa transformed her sales operation from manual and reactive to automated and predictive, achieving unprecedented efficiency.",
        processSteps: [
          "AI-powered lead scoring and prioritization",
          "Automated multi-channel follow-up sequences",
          "Intelligent calendar scheduling and reminders",
          "Real-time competitor and market analysis",
          "Predictive pipeline health monitoring",
          "Automated reporting and KPI tracking",
        ],
        results: [
          {
            metric: "Lead conversion rate",
            before: "12%",
            after: "28%",
            improvement: "133%",
            icon: TrendingUp,
          },
          {
            metric: "Sales cycle length",
            before: "45 days",
            after: "28 days",
            improvement: "38%",
            icon: ClockIcon,
          },
          {
            metric: "Team productivity",
            before: "4 deals/month",
            after: "8 deals/month",
            improvement: "100%",
            icon: UserCheck,
          },
        ],
        quote:
          "The AI doesn't just automate tasks—it makes our entire team smarter and more effective.",
        videoUrl: "https://example.com/melissa-demo.mp4",
        resources: [
          {
            type: "pdf",
            title: "Sales AI Playbook",
            size: "3.2 MB",
            url: "/downloads/sales-playbook.pdf",
          },
          {
            type: "calculator",
            title: "ROI Calculator",
            size: "1.2 MB",
            url: "/downloads/roi-calculator.xlsx",
          },
          {
            type: "template",
            title: "Sales Workflow Templates",
            size: "2.1 MB",
            url: "/downloads/sales-templates.zip",
          },
        ],
      },
    },
    {
      id: 3,
      title: "Matt's Efficiency",
      subtitle: "Revolutionizing Warranty Operations",
      role: "Warranty Manager",
      workflow: "Warranty Claim",
      icon: Shield,
      company: "Ai.Lumened.",
      location: "Seattle, WA",
      timeSaved: "$180K annually",
      vignette:
        "Matt's team was overwhelmed with routine calls instead of focusing on complex issues. Resolution times were slow, and customer satisfaction was declining.",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      before: {
        title: "Reactive Service",
        steps: [
          "50+ daily routine warranty calls",
          "Manual tracking across 3 different systems",
          "High rework rates (35% of cases)",
          "7+ day average resolution time",
          "Poor customer communication and updates",
        ],
        painPoints: [
          "High volume",
          "Manual tracking",
          "Slow resolutions",
          "Poor communication",
        ],
      },
      after: {
        title: "Proactive AI System",
        steps: [
          "40% automatic deflection of routine queries",
          "Predictive alerts for common issues",
          "Automated scheduling and dispatching",
          "Real-time tracking and updates",
          "Integrated vendor management",
        ],
        benefits: ["Automation", "Proactivity", "Speed", "Transparency"],
      },
      metrics: [
        { value: "40%", label: "Call Deflection", icon: Shield },
        { value: "$180K", label: "Annual Savings", icon: DollarSign },
        { value: "4.9/5", label: "Customer Rating", icon: Star },
      ],
      rating: 4.9,
      testimonial:
        "Our team now focuses on what matters—solving complex problems. The AI handles routine queries, and our customer satisfaction has never been higher.",
      keyMetrics: [
        { icon: Shield, value: "40%", label: "Call deflection" },
        { icon: DollarSign, value: "$180K", label: "Annual savings" },
        { icon: CheckCircle, value: "4.9/5", label: "Satisfaction" },
      ],
      takeaway: "60% cost reduction with 45% higher satisfaction.",
      images: [
        {
          type: "journey",
          src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          alt: "Home Illustration",
        },
        {
          type: "dashboard",
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          alt: "3D Dashboard",
        },
        {
          type: "results",
          src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          alt: "Growth Chart Icon",
        },
      ],
      cta: {
        primary: {
          text: "Book Demo",
          icon: Calendar,
          action: () => handleScheduleConsult(3),
        },
        secondary: {
          text: "View Full Story",
          icon: ExternalLink,
          action: () => handleCTA(3, "viewFullJourney"),
        },
      },
      detailedContent: {
        overview:
          "Matt transformed warranty operations from a cost center to a customer satisfaction engine, leveraging AI for routine tasks and focusing human expertise where it matters.",
        processSteps: [
          "AI-powered triage and classification of incoming requests",
          "Automated responses for 40+ common warranty questions",
          "Intelligent routing to appropriate teams or vendors",
          "Proactive maintenance alerts and prevention tips",
          "Automated customer updates and follow-ups",
          "Integrated quality assurance and analytics",
        ],
        results: [
          {
            metric: "Resolution time",
            before: "7 days",
            after: "2 days",
            improvement: "71%",
            icon: ClockIcon,
          },
          {
            metric: "Customer satisfaction",
            before: "3.2/5",
            after: "4.9/5",
            improvement: "53%",
            icon: Heart,
          },
          {
            metric: "Operational costs",
            before: "$300K",
            after: "$120K",
            improvement: "60%",
            icon: TrendingDown,
          },
        ],
        quote:
          "The AI handles the predictable so we can focus on the exceptional. It's transformed our entire operation.",
        videoUrl: "https://example.com/matt-demo.mp4",
        resources: [
          {
            type: "pdf",
            title: "Warranty AI Whitepaper",
            size: "4.1 MB",
            url: "/downloads/warranty-whitepaper.pdf",
          },
          {
            type: "checklist",
            title: "Warranty Process Checklist",
            size: "1.5 MB",
            url: "/downloads/warranty-checklist.pdf",
          },
          {
            type: "template",
            title: "Vendor Management Templates",
            size: "2.3 MB",
            url: "/downloads/vendor-templates.zip",
          },
        ],
      },
    },
  ];

  // MODIFIED: Download Case Study Function - Now fully functional

  // Install these packages first:
  // npm install jspdf jspdf-autotable

  // Professional PDF Generation using jsPDF
  const handleDownloadCaseStudy = (storyId: number) => {
    const story = stories[storyId];

    setShowToast(`Generating ${story.title} case study PDF...`);

    // Create new PDF document
    const doc = new jsPDF();
    let pageHeight = doc.internal.pageSize.height;
    let pageWidth = doc.internal.pageSize.width;
    let yPos = 20;

    // Helper function to check and add new page
    const checkPageBreak = (height = 15) => {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = 20;
        return true;
      }
      return false;
    };

    // Helper function to add section header
    const addSectionHeader = (title: string) => {
      checkPageBreak(20);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(26, 38, 57); // Dark blue
      doc.text(title, 15, yPos);
      yPos += 8;
      doc.setDrawColor(255, 215, 0); // Gold
      doc.line(15, yPos - 3, 105, yPos - 3);
      doc.setTextColor(0, 0, 0);
      yPos += 5;
    };

    // Helper function to add text with wrapping
    const addText = (
      text: string,
      fontSize = 11,
      isBold = false,
      indent = 0,
      color = "#333333",
    ) => {
      if (!text) return;
      checkPageBreak();
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.setTextColor(color === "#333333" ? 51 : parseInt(color.slice(1), 16));

      const splitText = doc.splitTextToSize(text, pageWidth - 30 - indent);
      splitText.forEach((line: string) => {
        checkPageBreak(5);
        doc.text(line, 15 + indent, yPos);
        yPos += 6;
      });
    };

    // Helper function to add bullet points
    const addBulletPoints = (items: string[], fontSize = 10) => {
      items.forEach((item) => {
        checkPageBreak(6);
        addText(`• ${item}`, fontSize, false, 5);
      });
    };

    // COVER PAGE
    doc.setFillColor(26, 38, 57); // Dark blue
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text(story.title, pageWidth / 2, 70, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text(story.subtitle, pageWidth / 2, 90, { align: "center" });

    doc.setFontSize(12);
    doc.text(`${story.company} | ${story.location}`, pageWidth / 2, 110, {
      align: "center",
    });
    doc.text(
      `Role: ${story.role} | Workflow: ${story.workflow}`,
      pageWidth / 2,
      120,
      { align: "center" },
    );

    doc.setTextColor(255, 215, 0); // Gold
    doc.setFontSize(16);
    doc.text(`Time Saved: ${story.timeSaved}`, pageWidth / 2, 140, {
      align: "center",
    });

    // Key metrics on cover
    doc.setTextColor(255, 255, 255);
    story.keyMetrics.slice(0, 3).forEach((metric, index) => {
      const xPos = (pageWidth / 4) * (index + 1);
      doc.setFontSize(20);
      doc.text(metric.value, xPos, 200, { align: "center" });
      doc.setFontSize(10);
      doc.text(metric.label, xPos, 210, { align: "center" });
    });

    // PAGE 2 - Executive Summary
    doc.addPage();
    yPos = 20;

    addSectionHeader("Executive Summary");
    addText(story.detailedContent.overview, 11);

    yPos += 10;
    addSectionHeader("Company Information");

    const companyInfo = [
      ["Company", story.company],
      ["Location", story.location],
      ["Role", story.role],
      ["Workflow", story.workflow],
      ["Time Saved", story.timeSaved],
      ["Rating", `${story.rating}/5`],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [["Field", "Value"]],
      body: companyInfo,
      theme: "striped",
      headStyles: { fillColor: [26, 38, 57], textColor: [255, 255, 255] },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 50 },
        1: { cellWidth: 120 },
      },
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    addSectionHeader("Testimonial");
    addText(`"${story.testimonial}"`, 12, true);
    addText(`— ${story.title.split("'")[0]}, ${story.role}`, 10);

    // PAGE 3 - Key Metrics
    checkPageBreak();
    addSectionHeader("Key Performance Indicators");

    story.keyMetrics.forEach((metric) => {
      addText(`${metric.label}: ${metric.value}`, 12, true);
    });

    // PAGE 4 - Before Analysis
    doc.addPage();
    yPos = 20;

    addSectionHeader("Before AI: Traditional Process");
    addBulletPoints(story.before.steps);

    yPos += 10;
    addText("Pain Points:", 12, true);
    addBulletPoints(story.before.painPoints);

    // PAGE 5 - After Analysis
    doc.addPage();
    yPos = 20;

    addSectionHeader("After AI: Transformed Process");
    addBulletPoints(story.after.steps);

    yPos += 10;
    addText("Key Benefits:", 12, true);
    addBulletPoints(story.after.benefits);

    // PAGE 6 - Measurable Results
    doc.addPage();
    yPos = 20;

    addSectionHeader("Measurable Results");

    const resultsData = story.detailedContent.results.map((r) => [
      r.metric,
      r.before,
      r.after,
      `+${r.improvement}`,
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [["Metric", "Before", "After AI", "Improvement"]],
      body: resultsData,
      theme: "grid",
      headStyles: {
        fillColor: [255, 215, 0],
        textColor: [26, 38, 57],
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40, textColor: [39, 174, 96], fontStyle: "bold" },
      },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // PAGE 7 - AI Process Flow
    checkPageBreak();
    addSectionHeader("AI-Powered Process Flow");

    story.detailedContent.processSteps.forEach((step, index) => {
      addText(`${index + 1}. ${step}`, 11);
      yPos += 2;
    });

    yPos += 5;
    addSectionHeader("Key Quote");
    addText(`"${story.detailedContent.quote}"`, 12, true);

    // PAGE 8 - Resources
    doc.addPage();
    yPos = 20;

    addSectionHeader("Available Resources");

    story.detailedContent.resources.forEach((resource) => {
      addText(
        `• ${resource.title} (${resource.type.toUpperCase()}) - ${resource.size}`,
        10,
      );
    });

    yPos += 10;
    addSectionHeader("Key Takeaway");
    addText(story.takeaway, 12, true);

    // PAGE 9 - First Image Content (if available)
    if (story.firstImageContent) {
      doc.addPage();
      yPos = 20;

      addSectionHeader(story.firstImageContent.tagline);

      story.firstImageContent.steps.forEach((step) => {
        addText(`${step.icon} ${step.text}`, 11);
      });

      yPos += 5;
      addText(`"${story.firstImageContent.testimonial}"`, 11, true);
    }

    // PAGE 10-11 - Second Image Content (if available)
    if (story.secondImageContent) {
      doc.addPage();
      yPos = 20;

      addSectionHeader(story.secondImageContent.beforeAITitle);

      addText(story.secondImageContent.sarahBefore.title, 12, true);
      story.secondImageContent.sarahBefore.issues.forEach((issue) => {
        addText(`• ${issue}`, 10, false, 5);
      });

      yPos += 5;
      addText(story.secondImageContent.teamBefore.title, 12, true);
      story.secondImageContent.teamBefore.issues.forEach((issue) => {
        addText(`• ${issue}`, 10, false, 5);
      });

      doc.addPage();
      yPos = 20;
      addSectionHeader(story.secondImageContent.transformationTitle);

      addText(story.secondImageContent.sarahAfter.title, 12, true);
      story.secondImageContent.sarahAfter.steps.forEach((step) => {
        addText(`• ${step}`, 10, false, 5);
      });

      yPos += 5;
      addText(story.secondImageContent.teamAfter.title, 12, true);
      story.secondImageContent.teamAfter.benefits.forEach((benefit) => {
        addText(`• ${benefit}`, 10, false, 5);
      });

      yPos += 10;
      addSectionHeader("Key Insight");
      addText(story.secondImageContent.keyTakeaway, 14, true);
      addText(story.secondImageContent.subTakeaway, 11);
      addText(story.secondImageContent.finalCTA, 12, true);
    }

    // Last Page - Footer
    doc.addPage();
    yPos = pageHeight / 2;

    doc.setFontSize(12);
    doc.setTextColor(128, 128, 128);
    doc.text(
      "© " + new Date().getFullYear() + " All Rights Reserved",
      pageWidth / 2,
      yPos,
      { align: "center" },
    );
    doc.text("CONFIDENTIAL - FOR INTERNAL USE ONLY", pageWidth / 2, yPos + 10, {
      align: "center",
    });
    doc.text(`${story.company} | ${story.location}`, pageWidth / 2, yPos + 20, {
      align: "center",
    });

    // Save the PDF
    doc.save(
      `${story.title.replace(/'/g, "").replace(/\s+/g, "-")}-Case-Study.pdf`,
    );

    setShowToast(`${story.title} case study PDF downloaded successfully!`);
  };

  // Handlers
  const handleCTA = (storyId: number, action: string) => {
    const story = stories[storyId];

    switch (action) {
      case "viewDemo":
        setShowToast(`Opening ${story.title} demo video...`);
        window.open(story.detailedContent.videoUrl, "_blank");
        break;

      case "downloadGuide":
      case "downloadEbook":
      case "downloadCaseStudy":
        simulateDownload(story.title, action);
        break;

      case "viewFullJourney":
        setSelectedStory(storyId);
        break;

      default:
        setSelectedStory(storyId);
    }
  };

  const simulateDownload = (title: string, type: string) => {
    setDownloadProgress(0);
    setShowToast(`Preparing ${title} download...`);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          setShowToast(`${title} downloaded successfully!`);
          setTimeout(() => setDownloadProgress(null), 2000);
          return null;
        }
        return prev + 20;
      });
    }, 200);
  };

  const handleBookDemo = () => {
    router.push("/scheduleConsultation");
  };

  const handleScheduleDemo = (storyId: number) => {
    router.push("/scheduleConsultation");
  };

  const handleScheduleConsult = (storyId: number) => {
    router.push("/scheduleConsultation");
  };

  const handleViewDemo = (storyId: number) => {
    const story = stories[storyId];
    setShowToast(`Opening ${story.title} demo...`);
    window.open(story.detailedContent.videoUrl, "_blank");
  };

  // Autoplay stories
  useEffect(() => {
    if (isPlaying && isVisible && selectedStory === null) {
      autoplayRef.current = setInterval(() => {
        setActiveStory((prev) => (prev + 1) % stories.length);
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPlaying, isVisible, selectedStory]);

  // Intersection Observer
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

  // Star Rating Component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? "text-amber-gold fill-amber-gold" : "text-warm-gray"}`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-deep-charcoal">
          {rating}/5
        </span>
      </div>
    );
  };

  // Resource icon mapper
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "calculator":
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <Download className="w-4 h-4" />;
    }
  };

  // Modal Component - UPDATED WITH YOUR STYLES
  const StoryModal = ({
    story,
    onClose,
  }: {
    story: Story;
    onClose: () => void;
  }) => {
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState<
      "summary" | "firstImage" | "secondImage"
    >("summary");

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-smooth-appear z-[60] flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-6xl bg-gradient-to-br from-warm-white to-white rounded-2xl overflow-hidden shadow-2xl border border-amber-gold/20 max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-amber-gold/10 bg-white/90 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-gold shadow-lg">
                  <img
                    src={story.profileImage}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gradient-navy">
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="px-2 py-0.5 bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 text-deep-charcoal rounded-full text-xs font-medium border border-amber-gold/20">
                      Workflow: {story.workflow}
                    </span>
                    <span className="text-xs sm:text-sm text-warm-gray">
                      {story.company}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-deep-charcoal transition-all duration-300 hover:scale-110"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          {(story.title.includes("Sarah") || story.title.includes("Team")) && (
            <div className="border-b border-amber-gold/10 px-4 sm:px-6 pt-3 bg-gradient-to-r from-amber-gold/5 to-transparent">
              <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all rounded-lg ${
                    activeTab === "summary"
                      ? "bg-amber-gold text-white shadow-gold"
                      : "text-warm-navy hover:text-amber-gold hover:bg-amber-gold/5"
                  }`}
                >
                  Summary
                </button>
                <button
                  onClick={() => setActiveTab("firstImage")}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all rounded-lg ${
                    activeTab === "firstImage"
                      ? "bg-amber-gold text-white shadow-gold"
                      : "text-warm-navy hover:text-amber-gold hover:bg-amber-gold/5"
                  }`}
                >
                  Journey Overview
                </button>
                <button
                  onClick={() => setActiveTab("secondImage")}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all rounded-lg ${
                    activeTab === "secondImage"
                      ? "bg-amber-gold text-white shadow-gold"
                      : "text-warm-navy hover:text-amber-gold hover:bg-amber-gold/5"
                  }`}
                >
                  Complete Details
                </button>
              </div>
            </div>
          )}

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* For Sarah and Team stories - Tabbed Content */}
            {story.title.includes("Sarah") || story.title.includes("Team") ? (
              <>
                {activeTab === "summary" && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                      {/* Story Info */}
                      <div className="bg-gradient-to-r from-amber-gold/5 to-transparent rounded-xl p-4 sm:p-6 border border-amber-gold/10">
                        <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                          <div className="relative w-full md:w-40 h-40 md:h-48 rounded-lg overflow-hidden bg-gradient-to-br from-warm-white to-white border border-amber-gold/20">
                            <img
                              src={story.images[activeImage].src}
                              alt={story.images[activeImage].alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                              <span className="px-2 py-1 bg-white rounded-full text-xs font-medium border border-amber-gold/20 text-deep-charcoal">
                                {story.role}
                              </span>
                              <span className="px-2 py-1 bg-white rounded-full text-xs font-medium border border-amber-gold/20 text-deep-charcoal">
                                {story.company}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-warm-gray">
                                <MapPin className="w-3 h-3" />
                                {story.location}
                              </span>
                            </div>
                            <p className="text-base sm:text-lg italic text-deep-charcoal mb-3">
                              "{story.testimonial}"
                            </p>
                            <StarRating rating={story.rating} />
                          </div>
                        </div>

                        {/* Process Steps */}
                        <div className="border-t border-amber-gold/10 pt-4 sm:pt-6">
                          <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2 text-gradient-navy">
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                            AI-Powered Process Flow
                          </h4>
                          <div className="space-y-2 sm:space-y-3">
                            {story.detailedContent.processSteps.map(
                              (step, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3 p-3 hover:bg-amber-gold/5 rounded-lg transition-all duration-300 hover-lift"
                                >
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-gold/20 to-amber-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-sm font-bold text-amber-gold">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <p className="text-sm sm:text-base text-deep-charcoal">
                                    {step}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Results Comparison */}
                      <div className="border border-amber-gold/10 rounded-xl p-4 sm:p-6">
                        <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 flex items-center gap-2 text-gradient-navy">
                          <BarChart className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                          Measurable Results
                        </h4>
                        <div className="space-y-3 sm:space-y-4">
                          {story.detailedContent.results.map(
                            (result, index) => {
                              const Icon = result.icon;
                              return (
                                <div
                                  key={index}
                                  className="bg-gradient-to-br from-warm-white to-white rounded-lg p-3 sm:p-4 border border-amber-gold/10 hover:border-amber-gold transition-all duration-300 hover-lift"
                                >
                                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                                    <div className="flex items-center gap-2">
                                      <Icon className="w-4 h-4 text-amber-gold" />
                                      <span className="font-medium text-sm sm:text-base text-deep-charcoal">
                                        {result.metric}
                                      </span>
                                    </div>
                                    <span className="text-xs sm:text-sm px-2 py-1 bg-gradient-to-r from-brand-teal/10 to-teal-100 text-brand-teal rounded-full font-medium">
                                      +{result.improvement}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="text-center">
                                      <div className="text-xs text-warm-gray">
                                        Before
                                      </div>
                                      <div className="text-base sm:text-lg font-bold text-warm-gray">
                                        {result.before}
                                      </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-warm-gray mx-2 sm:mx-4" />
                                    <div className="text-center">
                                      <div className="text-xs text-warm-gray">
                                        After AI
                                      </div>
                                      <div className="text-base sm:text-lg font-bold text-gradient-teal">
                                        {result.after}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            },
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4 sm:space-y-6">
                      {/* Stats Card */}
                      <div className="bg-gradient-to-br from-deep-charcoal to-warm-navy text-white rounded-xl p-4 sm:p-6 shadow-navy">
                        <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-gradient-gold">
                          Key Performance Indicators
                        </h4>
                        <div className="space-y-3 sm:space-y-4">
                          {story.keyMetrics.map((metric, index) => {
                            const Icon = metric.icon;
                            return (
                              <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-300 hover-lift"
                              >
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                                <div>
                                  <div className="text-xl sm:text-2xl font-bold text-gradient-gold">
                                    {metric.value}
                                  </div>
                                  <div className="text-xs sm:text-sm opacity-90 text-warm-white">
                                    {metric.label}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
                          <div className="flex justify-between">
                            <div>
                              <div className="text-xs sm:text-sm opacity-90">
                                Time Saved
                              </div>
                              <div className="text-lg sm:text-xl font-bold text-amber-gold">
                                {story.timeSaved}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs sm:text-sm opacity-90">
                                Impact
                              </div>
                              <div className="text-lg sm:text-xl font-bold text-amber-gold">
                                High
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-4 sm:p-6 border border-amber-gold/10">
                        <h4 className="text-base sm:text-lg font-bold mb-3 text-gradient-navy">
                          Ready for Your Transformation?
                        </h4>
                        <div className="space-y-2 sm:space-y-3">
                          <button
                            onClick={() => router.push("/scheduleConsultation")}
                            className="w-full btn-gold font-medium py-2.5 sm:py-3 rounded-xl hover:shadow-gold-lg hover-lift transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            <Calendar className="w-4 h-4 text-deep-charcoal" />
                            <span className="text-deep-charcoal">
                              Book Your 15-Minute Demo
                            </span>
                          </button>
                          <button
                            onClick={() => handleDownloadCaseStudy(story.id)}
                            className="w-full bg-white border border-amber-gold text-deep-charcoal py-2.5 sm:py-3 rounded-xl font-medium hover:bg-amber-gold/5 transition-all duration-300 hover-lift flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            <Download className="w-4 h-4" />
                            Download Case Study
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other tabs with your styles */}
                {activeTab === "firstImage" && story.firstImageContent && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-navy mb-2 sm:mb-3">
                        {story.firstImageContent.tagline}
                      </h3>
                    </div>

                    <div className="bg-gradient-to-r from-amber-gold/5 to-transparent rounded-xl p-4 sm:p-6 border border-amber-gold/10">
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-3 mb-4 sm:mb-6">
                        {story.firstImageContent.steps.map((step, index) => (
                          <div
                            key={index}
                            className="bg-white border border-amber-gold/20 rounded-lg p-3 sm:p-4 text-center hover:border-amber-gold transition-all duration-300 hover-lift"
                          >
                            <div className="text-2xl mb-1 sm:mb-2">
                              {step.icon}
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-deep-charcoal">
                              {step.text}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-white border border-amber-gold/20 rounded-lg p-4 sm:p-6">
                        <p className="text-base sm:text-lg italic text-deep-charcoal text-center">
                          "{story.firstImageContent.testimonial}"
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "secondImage" && story.secondImageContent && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-navy mb-2 sm:mb-3">
                        AI FOR HUMANS IN ACTION
                      </h3>
                      <p className="text-sm sm:text-base text-warm-navy mb-1 sm:mb-2">
                        Composite scenario based on real builder workflows.
                      </p>
                      <p className="text-sm sm:text-base text-warm-navy mb-1 sm:mb-2">
                        {story.secondImageContent.beforeAITitle}
                      </p>
                    </div>

                    {/* Before AI */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-gradient-to-br from-amber-gold/10 to-warm-white rounded-xl p-4 sm:p-5 border-2 border-amber-gold/30">
                        <h4 className="font-bold text-base sm:text-lg text-deep-charcoal mb-2 sm:mb-3">
                          {story.secondImageContent.sarahBefore.title}
                        </h4>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {story.secondImageContent.sarahBefore.issues.map(
                            (issue, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-gold mt-1.5 sm:mt-2 flex-shrink-0" />
                                <span className="text-sm text-warm-gray">
                                  {issue}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-warm-navy/10 to-warm-white rounded-xl p-4 sm:p-5 border-2 border-warm-navy/30">
                        <h4 className="font-bold text-base sm:text-lg text-deep-charcoal mb-2 sm:mb-3">
                          {story.secondImageContent.teamBefore.title}
                        </h4>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {story.secondImageContent.teamBefore.issues.map(
                            (issue, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-warm-navy mt-1.5 sm:mt-2 flex-shrink-0" />
                                <span className="text-sm text-warm-gray">
                                  {issue}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* With AI */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-gradient-to-br from-brand-teal/10 to-warm-white rounded-xl p-4 sm:p-5 border-2 border-brand-teal/30">
                        <h4 className="font-bold text-base sm:text-lg text-deep-charcoal mb-2 sm:mb-3">
                          {story.secondImageContent.sarahAfter.title}
                        </h4>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {story.secondImageContent.sarahAfter.steps.map(
                            (step, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-teal mt-1.5 sm:mt-2 flex-shrink-0" />
                                <span className="text-sm text-warm-gray">
                                  {step}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-warm-white rounded-xl p-4 sm:p-5 border-2 border-green-200">
                        <h4 className="font-bold text-base sm:text-lg text-deep-charcoal mb-2 sm:mb-3">
                          {story.secondImageContent.teamAfter.title}
                        </h4>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {story.secondImageContent.teamAfter.benefits.map(
                            (benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 mt-1.5 sm:mt-2 flex-shrink-0" />
                                <span className="text-sm text-warm-gray">
                                  {benefit}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Key Takeaway */}
                    <div className="bg-gradient-to-r from-amber-gold/5 to-transparent rounded-xl p-4 sm:p-6 text-center border border-amber-gold/10">
                      <h5 className="text-lg sm:text-xl font-bold text-gradient-navy mb-2 sm:mb-3">
                        {story.secondImageContent.keyTakeaway}
                      </h5>
                      <p className="text-sm sm:text-base text-deep-charcoal">
                        {story.secondImageContent.subTakeaway}
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* For Melissa and Matt stories */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  {/* Story Info */}
                  <div className="bg-gradient-to-r from-amber-gold/5 to-transparent rounded-xl p-4 sm:p-6 border border-amber-gold/10">
                    <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                      <div className="relative w-full md:w-40 h-40 md:h-48 rounded-lg overflow-hidden bg-gradient-to-br from-warm-white to-white border border-amber-gold/20">
                        <img
                          src={story.images[activeImage].src}
                          alt={story.images[activeImage].alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="px-2 py-1 bg-white rounded-full text-xs font-medium border border-amber-gold/20 text-deep-charcoal">
                            {story.role}
                          </span>
                          <span className="px-2 py-1 bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 text-deep-charcoal rounded-full text-xs font-medium border border-amber-gold/20">
                            Workflow: {story.workflow}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-warm-gray">
                            <MapPin className="w-3 h-3" />
                            {story.location}
                          </span>
                        </div>
                        <p className="text-base sm:text-lg italic text-deep-charcoal mb-3">
                          "{story.testimonial}"
                        </p>
                        <StarRating rating={story.rating} />
                      </div>
                    </div>
                  </div>

                  {/* Results Comparison */}
                  <div className="border border-amber-gold/10 rounded-xl p-4 sm:p-6">
                    <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-gradient-navy">
                      Measurable Results
                    </h4>
                    <div className="space-y-3 sm:space-y-4">
                      {story.detailedContent.results.map((result, index) => {
                        const Icon = result.icon;
                        return (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-warm-white to-white rounded-lg p-3 sm:p-4 border border-amber-gold/10 hover:border-amber-gold transition-all duration-300 hover-lift"
                          >
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4 text-amber-gold" />
                                <span className="font-medium text-sm sm:text-base text-deep-charcoal">
                                  {result.metric}
                                </span>
                              </div>
                              <span className="text-xs sm:text-sm px-2 py-1 bg-gradient-to-r from-brand-teal/10 to-teal-100 text-brand-teal rounded-full font-medium">
                                +{result.improvement}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-center">
                                <div className="text-xs text-warm-gray">
                                  Before
                                </div>
                                <div className="text-base sm:text-lg font-bold text-warm-gray">
                                  {result.before}
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-warm-gray mx-2 sm:mx-4" />
                              <div className="text-center">
                                <div className="text-xs text-warm-gray">
                                  After AI
                                </div>
                                <div className="text-base sm:text-lg font-bold text-gradient-teal">
                                  {result.after}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Stats Card */}
                  <div className="bg-gradient-to-br from-deep-charcoal to-warm-navy text-white rounded-xl p-4 sm:p-6 shadow-navy">
                    <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-gradient-gold">
                      Key Performance Indicators
                    </h4>
                    <div className="space-y-3 sm:space-y-4">
                      {story.keyMetrics.map((metric, index) => {
                        const Icon = metric.icon;
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-all duration-300 hover-lift"
                          >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-gold" />
                            <div>
                              <div className="text-xl sm:text-2xl font-bold text-gradient-gold">
                                {metric.value}
                              </div>
                              <div className="text-xs sm:text-sm opacity-90 text-warm-white">
                                {metric.label}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-xl p-4 sm:p-6 border border-amber-gold/10">
                    <h4 className="text-base sm:text-lg font-bold mb-3 text-gradient-navy">
                      Ready for Your Transformation?
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      <button
                        onClick={() => router.push("/scheduleConsultation")}
                        className="w-full btn-gold font-medium py-2.5 sm:py-3 rounded-xl hover:shadow-gold-lg hover-lift transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <Calendar className="w-4 h-4 text-deep-charcoal" />
                        <span className="text-deep-charcoal">
                          Book Your 15-Minute Demo
                        </span>
                      </button>
                      <button
                        onClick={() => handleDownloadCaseStudy(story.id)}
                        className="w-full bg-white border border-amber-gold text-deep-charcoal py-2.5 sm:py-3 rounded-xl font-medium hover:bg-amber-gold/5 transition-all duration-300 hover-lift flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <Download className="w-4 h-4" />
                        Download Case Study
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="successStory"
        className="relative min-h-screen overflow-hidden flex items-center bg-gradient-to-b from-warm-white to-white scroll-mt-[100px] pb-16 md:pb-20 lg:pb-24"
        style={{ paddingTop: "100px" }}
      >
        {/* Background decorative elements matching your theme */}
        <div className="absolute inset-0">
          <div
            className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-gold/5 to-transparent rounded-full blur-3xl transition-all duration-1500 ${isVisible ? "opacity-100" : "opacity-0"}`}
          />
          <div
            className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-warm-navy/5 to-transparent rounded-full blur-3xl transition-all duration-1500 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
          />
          <div
            className={`absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-brand-teal/3 to-transparent rounded-full blur-3xl transition-all duration-1500 delay-600 ${isVisible ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        <div className="relative container-custom px-4 sm:px-6 z-10">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* HEADER SECTION - Matching your font sizes and spacing */}
            <div className="text-center mb-10 animate-fadeInUp">
              {/* Animated header badge */}
              <div className="mb-0 sm:mb-2 md:mb-2 animate-fadeInUp">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl  font-bold text-gradient-navy leading-tight">
                  <div className="h-8 sm:h-10 md:h-12 flex items-center justify-center">
                    <span className="text-warm-navy">Real Stories, </span>
                    <span className="text-gradient-gold font-bold ml-2">
                      Real Results
                    </span>
                  </div>
                </h1>
              </div>

              {/* Trust line */}
              <div className="mb-2 sm:mb-1 animate-fadeInUp delay-100">
                <span className="inline-block text-xs md:text-sm font-medium tracking-wide uppercase bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text">
                  AI FOR HUMANS IN ACTION
                </span>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-sm md:text-sm text-warm-navy uppercase font-medium leading-relaxed mb-3 sm:mb-2 md:mb-3 max-w-xl mx-auto animate-fadeInUp delay-200">
                Two Stories. One Transformation.
              </p>
              <p className="text-xs sm:text-xs md:text-xs text-warm-gray font-medium leading-relaxed mb-5 sm:mb-4 md:mb-4 max-w-lg mx-auto animate-fadeInUp delay-300">
                Composite scenario based on real builder workflows. See how AI
                improves the experience for both your homebuyers and your
                team—from first inquiry to warranty resolution.
              </p>

              {/* Company Quote */}
              <div className="max-w-md mx-auto bg-gradient-to-r from-amber-gold/5 to-soft-gold/5 rounded-lg p-4 border border-amber-gold/10 animate-fadeInUp delay-400">
                <p className="text-xs sm:text-xs md:text-sm text-deep-charcoal font-medium">
                  <span className="font-semibold text-gradient-gold">
                    "Your team handles the relationships. AI handles the
                    repetitive work."
                  </span>{" "}
                  See the transformation.
                </p>
              </div>
            </div>

            {/* Story Navigation */}
            <div
              className={`flex flex-wrap justify-center gap-2 mb-6 md:mb-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {stories.map((story, index) => (
                <button
                  key={story.id}
                  onClick={() => {
                    setActiveStory(index);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 hover-lift ${
                    activeStory === index
                      ? "btn-gold text-deep-charcoal shadow-gold"
                      : "bg-white text-deep-charcoal border border-amber-gold/20 hover:border-amber-gold hover:shadow-gold/20"
                  }`}
                >
                  <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden">
                    <img
                      src={story.profileImage}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">
                    {story.title.includes("Sarah")
                      ? "warranty"
                      : story.title.includes("Team")
                        ? "sales"
                        : story.title.split("'")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Story Display */}
            <div
              className={`transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  className={`transition-all duration-300 ${activeStory === index ? "block" : "hidden"}`}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-gold/10 hover:shadow-gold/20 transition-all duration-300 hover-lift">
                    {/* Story Header with Profile */}
                    <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-gold/5 to-transparent">
                      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-amber-gold shadow-lg">
                            <img
                              src={story.profileImage}
                              alt={story.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Story Info */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="px-2 py-1 bg-white border border-amber-gold/20 rounded-full text-xs font-medium text-deep-charcoal">
                              {story.role}
                            </span>
                            <span className="px-2 py-1 bg-gradient-to-r from-amber-gold/10 to-soft-gold/5 text-deep-charcoal rounded-full text-xs font-medium border border-amber-gold/20">
                              Workflow: {story.workflow}
                            </span>
                            <span className="px-2 py-1 bg-white border border-amber-gold/20 rounded-full text-xs font-medium text-deep-charcoal">
                              {story.company}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient-navy mb-0">
                            {story.title}
                          </h3>
                          <p className="text-sm text-warm-gray mb-0">
                            {story.subtitle}
                          </p>

                          <div className="flex items-center gap-3 text-xs sm:text-sm text-warm-gray">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-6" />
                              {story.location}
                            </span>
                            <StarRating rating={story.rating} />
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="w-full md:w-auto mt-3 md:mt-0">
                          <div className="flex flex-row items-center gap-2">
                            {story.keyMetrics.slice(0, 3).map((metric, idx) => {
                              const Icon = metric.icon;
                              return (
                                <div
                                  key={idx}
                                  className="bg-white border border-amber-gold/10 rounded-lg p-2 text-center hover:border-amber-gold transition-all duration-300 flex-1 md:flex-none min-w-[80px]"
                                >
                                  <Icon className="w-3 h-3 sm:w-6 sm:h-6 text-amber-gold mx-auto mb-1" />
                                  <div className="text-xs sm:text-sm font-bold text-deep-charcoal">
                                    {metric.value}
                                  </div>
                                  <div className="text-xs text-warm-gray">
                                    {metric.label}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Testimonial */}
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-amber-gold/10">
                        <p className="text-sm sm:text-base text-deep-charcoal italic">
                          "{story.testimonial}"
                        </p>
                      </div>
                    </div>

                    {/* Before & After Comparison */}
                    <div className="p-4 sm:p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                        {/* Before */}
                        <div className="bg-gradient-to-br from-amber-gold/10 to-warm-white rounded-xl p-4 sm:p-5 border-2 border-amber-gold/30">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="p-2 bg-amber-gold/20 rounded-lg">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-gold" />
                            </div>
                            <div>
                              <h4 className="font-bold text-deep-charcoal text-sm sm:text-base md:text-lg">
                                {story.before.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-warm-gray">
                                Traditional manual process
                              </p>
                            </div>
                          </div>
                          <ul className="space-y-1.5 sm:space-y-2">
                            {story.before.steps.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-gold mt-1.5 sm:mt-2 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-warm-gray">
                                  {step}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* After */}
                        <div className="bg-gradient-to-br from-brand-teal/10 to-warm-white rounded-xl p-4 sm:p-5 border-2 border-brand-teal/30">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="p-2 bg-brand-teal/20 rounded-lg">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-brand-teal" />
                            </div>
                            <div>
                              <h4 className="font-bold text-deep-charcoal text-sm sm:text-base md:text-lg">
                                {story.after.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-warm-gray">
                                AI-powered automated process
                              </p>
                            </div>
                          </div>
                          <ul className="space-y-1.5 sm:space-y-2">
                            {story.after.steps.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1.5 sm:mt-2 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-warm-gray">
                                  {step}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Key Takeaway & Actions */}
                      <div className="bg-gradient-to-r from-amber-gold/5 to-transparent rounded-xl p-4 sm:p-5 border border-amber-gold/10">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 sm:mb-2">
                              <BarChart className="w-3 h-3 sm:w-4 sm:h-4 text-amber-gold" />
                              <h5 className="font-bold text-deep-charcoal text-sm sm:text-base">
                                Key Takeaway
                              </h5>
                            </div>
                            <p className="text-sm sm:text-base text-deep-charcoal font-medium">
                              {story.takeaway}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 mt-3 md:mt-0">
                            <button
                              onClick={() => setSelectedStory(story.id)}
                              className="btn-gold font-medium py-2 px-4 rounded-xl hover:shadow-gold-lg hover-lift transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                            >
                              <Eye className="w-4 h-4 text-deep-charcoal" />
                              <span className="text-deep-charcoal">
                                View Full Case Study
                              </span>
                            </button>

                            <button
                              onClick={() =>
                                router.push("/scheduleConsultation")
                              }
                              className="bg-white border border-amber-gold text-deep-charcoal py-2 px-4 rounded-xl font-medium hover:bg-amber-gold/5 transition-all duration-300 hover-lift flex items-center justify-center gap-2 text-sm"
                            >
                              <Calendar className="w-4 h-4" />
                              Book Demo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6">
              <button
                onClick={() => {
                  setActiveStory(
                    (prev) => (prev - 1 + stories.length) % stories.length,
                  );
                  setIsPlaying(false);
                }}
                className="p-1.5 sm:p-2 hover:bg-amber-gold/5 rounded-lg transition-all duration-300 hover-lift"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-warm-navy" />
              </button>

              <div className="flex gap-1 sm:gap-1.5">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveStory(index);
                      setIsPlaying(false);
                    }}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      activeStory === index
                        ? "bg-gradient-to-r from-amber-gold to-soft-gold w-4 sm:w-6"
                        : "bg-warm-gray/30 hover:bg-warm-gray/50 w-1.5 sm:w-2"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  setActiveStory((prev) => (prev + 1) % stories.length);
                  setIsPlaying(false);
                }}
                className="p-1.5 sm:p-2 hover:bg-amber-gold/5 rounded-lg transition-all duration-300 hover-lift"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-warm-navy" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notification - UPDATED WITH YOUR STYLES */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-br from-deep-charcoal to-warm-navy text-white px-4 py-3 rounded-xl shadow-navy-lg animate-fadeInUp flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-amber-gold" />
          <span className="text-sm text-warm-white">{showToast}</span>
        </div>
      )}

      {/* Modal */}
      {selectedStory !== null && (
        <StoryModal
          story={stories[selectedStory]}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
}
