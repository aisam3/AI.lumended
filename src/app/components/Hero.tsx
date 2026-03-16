"use client";

import {
  ArrowRight,
  Calendar,
  Maximize2,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [animationCount, setAnimationCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobilePlaying, setIsMobilePlaying] = useState(false);
  const [isDesktopPlaying, setIsDesktopPlaying] = useState(false);
  const [isMobileMuted, setIsMobileMuted] = useState(true);
  const [isDesktopMuted, setIsDesktopMuted] = useState(true);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const [showDesktopControls, setShowDesktopControls] = useState(false);

  // Fixed refs with proper null initial values
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const desktopControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const words = ["Homebuilders.", "Humans."];
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const pauseTime = 2000;

  // Video path
  const videoPath = "/Website Assets/video/VideoAI4Homebuidlers.mp4";
  const thumbnailPath = "/Website Assets/Photographs/founderaboutpic.png";

  const handleROIClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/scheduleConsultation");
  };

  // Handle mobile video play
  const handleMobilePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsMobilePlaying(true);
    setShowMobileControls(true);

    // Hide controls after 3 seconds
    if (mobileControlsTimeoutRef.current) {
      clearTimeout(mobileControlsTimeoutRef.current);
    }
    mobileControlsTimeoutRef.current = setTimeout(() => {
      setShowMobileControls(false);
    }, 3000);

    setTimeout(() => {
      if (mobileVideoRef.current) {
        mobileVideoRef.current.play().catch((error) => {
          console.log("Playback failed:", error);
        });
      }
    }, 50);
  };

  // Handle desktop video play
  const handleDesktopPlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsDesktopPlaying(true);
    setShowDesktopControls(true);

    // Hide controls after 3 seconds
    if (desktopControlsTimeoutRef.current) {
      clearTimeout(desktopControlsTimeoutRef.current);
    }
    desktopControlsTimeoutRef.current = setTimeout(() => {
      setShowDesktopControls(false);
    }, 3000);

    setTimeout(() => {
      if (desktopVideoRef.current) {
        desktopVideoRef.current.play().catch((error) => {
          console.log("Playback failed:", error);
        });
      }
    }, 50);
  };

  // Toggle mobile play/pause
  const toggleMobilePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mobileVideoRef.current) {
      if (mobileVideoRef.current.paused) {
        mobileVideoRef.current.play();
        setShowMobileControls(true);
        // Reset timeout
        if (mobileControlsTimeoutRef.current) {
          clearTimeout(mobileControlsTimeoutRef.current);
        }
        mobileControlsTimeoutRef.current = setTimeout(() => {
          setShowMobileControls(false);
        }, 3000);
      } else {
        mobileVideoRef.current.pause();
      }
    }
  };

  // Toggle desktop play/pause
  const toggleDesktopPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (desktopVideoRef.current) {
      if (desktopVideoRef.current.paused) {
        desktopVideoRef.current.play();
        setShowDesktopControls(true);
        // Reset timeout
        if (desktopControlsTimeoutRef.current) {
          clearTimeout(desktopControlsTimeoutRef.current);
        }
        desktopControlsTimeoutRef.current = setTimeout(() => {
          setShowDesktopControls(false);
        }, 3000);
      } else {
        desktopVideoRef.current.pause();
      }
    }
  };

  // Toggle mobile mute
  const toggleMobileMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mobileVideoRef.current) {
      mobileVideoRef.current.muted = !isMobileMuted;
      setIsMobileMuted(!isMobileMuted);

      // Show controls briefly
      setShowMobileControls(true);
      if (mobileControlsTimeoutRef.current) {
        clearTimeout(mobileControlsTimeoutRef.current);
      }
      mobileControlsTimeoutRef.current = setTimeout(() => {
        setShowMobileControls(false);
      }, 2000);
    }
  };

  // Toggle desktop mute
  const toggleDesktopMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (desktopVideoRef.current) {
      desktopVideoRef.current.muted = !isDesktopMuted;
      setIsDesktopMuted(!isDesktopMuted);

      // Show controls briefly
      setShowDesktopControls(true);
      if (desktopControlsTimeoutRef.current) {
        clearTimeout(desktopControlsTimeoutRef.current);
      }
      desktopControlsTimeoutRef.current = setTimeout(() => {
        setShowDesktopControls(false);
      }, 2000);
    }
  };

  // Navigate to popup page with return info
  const handleFullscreenClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    router.push(
      `/popup?returnPath=${encodeURIComponent(currentPath)}&hash=${encodeURIComponent(currentHash)}`,
    );
  };

  // FIXED: Toggle fullscreen function - press to enter, press again to exit
  const toggleFullscreen = (element: HTMLElement | null) => {
    if (!element) return;

    // Check if we're already in fullscreen
    const isFullscreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );

    if (isFullscreen) {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    } else {
      // Enter fullscreen
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).msRequestFullscreen) {
        (element as any).msRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        (element as any).mozRequestFullScreen();
      }
    }
  };

  const handleMobileFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFullscreen(mobileContainerRef.current);
  };

  const handleDesktopFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFullscreen(desktopContainerRef.current);
  };

  // Handle mouse enter/leave for desktop controls
  const handleDesktopMouseEnter = () => {
    setIsHovering(true);
    setShowDesktopControls(true);
    if (desktopControlsTimeoutRef.current) {
      clearTimeout(desktopControlsTimeoutRef.current);
    }
  };

  const handleDesktopMouseLeave = () => {
    setIsHovering(false);
    if (isDesktopPlaying) {
      if (desktopControlsTimeoutRef.current) {
        clearTimeout(desktopControlsTimeoutRef.current);
      }
      desktopControlsTimeoutRef.current = setTimeout(() => {
        setShowDesktopControls(false);
      }, 2000);
    } else {
      setShowDesktopControls(false);
    }
  };

  // Handle mouse enter/leave for mobile controls
  const handleMobileMouseEnter = () => {
    setShowMobileControls(true);
    if (mobileControlsTimeoutRef.current) {
      clearTimeout(mobileControlsTimeoutRef.current);
    }
  };

  const handleMobileMouseLeave = () => {
    if (isMobilePlaying) {
      if (mobileControlsTimeoutRef.current) {
        clearTimeout(mobileControlsTimeoutRef.current);
      }
      mobileControlsTimeoutRef.current = setTimeout(() => {
        setShowMobileControls(false);
      }, 2000);
    } else {
      setShowMobileControls(false);
    }
  };

  useEffect(() => {
    setIsVisible(true);

    return () => {
      if (mobileControlsTimeoutRef.current) {
        clearTimeout(mobileControlsTimeoutRef.current);
      }
      if (desktopControlsTimeoutRef.current) {
        clearTimeout(desktopControlsTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (animationCount >= 6) {
      setDisplayText("Homebuilders.");
      return;
    }

    if (isTyping) {
      if (displayText.length < words[currentWord].length) {
        timeout = setTimeout(() => {
          setDisplayText(words[currentWord].slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseTime);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, erasingSpeed);
      } else {
        timeout = setTimeout(() => {
          setCurrentWord((prev) => (prev + 1) % words.length);
          setIsTyping(true);
          setAnimationCount((prev) => prev + 1);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentWord, animationCount, words]);

  // Scroll to founder story function
  const scrollToFounderStory = (e: React.MouseEvent) => {
    e.preventDefault();

    if (window.location.pathname === "/") {
      const founderSection = document.getElementById("founder-story");
      if (founderSection) {
        const headerOffset = 100;
        const elementPosition = founderSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else {
      router.push("/#founder-story");
    }
  };

  // Handle hash on page load
  useEffect(() => {
    if (window.location.hash === "#founder-story") {
      setTimeout(() => {
        const founderSection = document.getElementById("founder-story");
        if (founderSection) {
          const headerOffset = 100;
          const elementPosition = founderSection.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 500);
    }
  }, []);

  return (
    <>
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
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
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
        .z-button {
          z-index: 40;
          position: relative;
        }

        /* Professional Video Container Styles */
        .video-container {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
          border-radius: inherit;
          overflow: hidden;
        }

        .video-container video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .video-frame {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .video-frame:hover {
          box-shadow: 0 30px 60px -12px rgba(212, 160, 62, 0.3);
          transform: translateY(-4px);
        }

        /* Professional Thumbnail Styles */
        .video-thumbnail-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          cursor: pointer;
          background: #000;
        }

        .video-thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s ease;
          filter: brightness(0.9);
        }

        .video-thumbnail-wrapper:hover .video-thumbnail {
          transform: scale(1.08);
          filter: brightness(1);
        }

        /* Play Button Overlay - Professional */
        .play-button-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.2);
          transition: all 0.4s ease;
          z-index: 10;
          backdrop-filter: blur(0px);
        }

        .video-thumbnail-wrapper:hover .play-button-overlay {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
        }

        .play-button {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4a03e, #b3892e);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 10px 30px -5px rgba(212, 160, 62, 0.5);
          border: 2px solid rgba(255, 255, 255, 0.3);
          animation: pulseGlow 2s infinite;
        }

        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 10px 30px -5px rgba(212, 160, 62, 0.5);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 15px 40px -3px rgba(212, 160, 62, 0.8);
            transform: scale(1.05);
          }
        }

        .play-button:hover {
          transform: scale(1.1);
          background: linear-gradient(135deg, #e6b04a, #c99a3a);
          box-shadow: 0 15px 40px -3px rgba(212, 160, 62, 0.8);
        }

        .play-button svg {
          width: 28px;
          height: 28px;
          color: white;
          margin-left: 3px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        /* Video Controls - Professional */
        .video-controls-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.7) 0%,
            transparent 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 16px;
          pointer-events: none;
        }

        .video-controls-overlay.visible {
          opacity: 1;
          pointer-events: all;
        }

        .video-controls-bar {
          display: flex;
          gap: 12px;
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(8px);
          padding: 8px 16px;
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
          transform: translateY(20px);
          transition: transform 0.3s ease;
          pointer-events: all;
        }

        .video-controls-overlay.visible .video-controls-bar {
          transform: translateY(0);
        }

        .video-control-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.15);
          cursor: pointer;
          color: white;
        }

        .video-control-btn:hover {
          background: #d4a03e;
          border-color: rgba(255, 255, 255, 0.5);
          transform: scale(1.1);
        }

        .video-control-btn svg {
          width: 18px;
          height: 18px;
        }

        /* Loading State */
        .video-loading {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.8);
          z-index: 25;
        }

        .video-loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: #d4a03e;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Desktop original styles */
        .desktop-image-frame {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.3);
        }

        .desktop-image-frame img {
          width: 100%;
          height: auto;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .desktop-image-frame:hover img {
          transform: scale(1.02);
        }

        .desktop-border-outer {
          position: absolute;
          inset: 0;
          border: 2px solid rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          pointer-events: none;
        }

        .desktop-border-inner {
          position: absolute;
          inset: 4px;
          border: 1px solid rgba(212, 160, 62, 0.2);
          border-radius: 18px;
          pointer-events: none;
        }

        /* FIXED: Fullscreen video styles - Proper video display with toggle */
        .video-frame:fullscreen,
        .video-frame:-webkit-full-screen,
        .video-frame:-moz-full-screen,
        .video-frame:-ms-fullscreen {
          background: black !important;
          width: 100vw !important;
          height: 100vh !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .video-frame:fullscreen .video-container,
        .video-frame:-webkit-full-screen .video-container,
        .video-frame:-moz-full-screen .video-container,
        .video-frame:-ms-fullscreen .video-container {
          width: 100% !important;
          height: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: black !important;
        }

        .video-frame:fullscreen video,
        .video-frame:-webkit-full-screen video,
        .video-frame:-moz-full-screen video,
        .video-frame:-ms-fullscreen video {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          max-width: 100vw !important;
          max-height: 100vh !important;
        }

        /* Larger controls in fullscreen */
        .video-frame:fullscreen .video-control-btn,
        .video-frame:-webkit-full-screen .video-control-btn,
        .video-frame:-moz-full-screen .video-control-btn,
        .video-frame:-ms-fullscreen .video-control-btn {
          width: 48px !important;
          height: 48px !important;
        }

        .video-frame:fullscreen .video-control-btn svg,
        .video-frame:-webkit-full-screen .video-control-btn svg,
        .video-frame:-moz-full-screen .video-control-btn svg,
        .video-frame:-ms-fullscreen .video-control-btn svg {
          width: 24px !important;
          height: 24px !important;
        }

        .video-frame:fullscreen .video-controls-bar,
        .video-frame:-webkit-full-screen .video-controls-bar,
        .video-frame:-moz-full-screen .video-controls-bar,
        .video-frame:-ms-fullscreen .video-controls-bar {
          padding: 12px 24px !important;
          gap: 16px !important;
        }

        /* Mobile Responsive Video Styles */
        @media (max-width: 1023px) {
          .play-button {
            width: 40px;
            height: 40px;
          }
          .play-button svg {
            width: 20px;
            height: 20px;
          }
          .video-control-btn {
            width: 28px;
            height: 28px;
          }
          .video-control-btn svg {
            width: 14px;
            height: 14px;
          }
          .video-controls-bar {
            padding: 4px 12px;
            gap: 8px;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .play-button {
            width: 48px;
            height: 48px;
          }
          .play-button svg {
            width: 24px;
            height: 24px;
          }
        }

        @media (min-width: 1024px) {
          .play-button {
            width: 64px;
            height: 64px;
          }
          .play-button svg {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>

      <section
        id="hero"
        className="relative w-full min-h-screen bg-white overflow-hidden"
      >
        <div className="relative w-full">
          {/* MOBILE/TABLET LAYOUT (< 1024px) */}
          <div className="lg:hidden relative w-full">
            <div className="pt-[80px] sm:pt-[90px]" />

            <div className="relative w-full px-4 sm:px-6">
              <div className="max-w-7xl mx-auto">
                {/* Picture on top */}
                <div className="relative w-full mb-6">
                  <div className="hero-image-wrapper relative">
                    <img
                      src="/Website Assets/homepic/home1.jpeg"
                      alt="Modern Home"
                      className="w-full h-auto aspect-[16/9] rounded-xl"
                    />
                    <div className="absolute inset-0 border-2 border-white/90 rounded-xl pointer-events-none" />
                    <div className="absolute inset-[4px] border border-amber-gold/15 rounded-[14px] pointer-events-none" />

                    {/* Mobile Video with Professional Controls */}
                    <div
                      className="absolute right-2 xs:right-3 sm:right-4 z-20"
                      style={{
                        bottom: "clamp(-5px, calc(-8px + 1vw), 0px)",
                        width: "clamp(90px, 25vw, 140px)",
                      }}
                    >
                      <div
                        ref={mobileContainerRef}
                        className="video-frame group"
                        onMouseEnter={handleMobileMouseEnter}
                        onMouseLeave={handleMobileMouseLeave}
                      >
                        <div className="relative rounded-xl overflow-hidden bg-black border-2 border-white/30">
                          <div className="aspect-[3/4] w-full">
                            {!isMobilePlaying ? (
                              // Professional Thumbnail with Animated Play Button
                              <div
                                className="video-thumbnail-wrapper"
                                onClick={handleMobilePlay}
                              >
                                <img
                                  src={thumbnailPath}
                                  alt="Video Thumbnail"
                                  className="video-thumbnail"
                                />
                                <div className="play-button-overlay">
                                  <div className="play-button">
                                    <Play fill="white" />
                                  </div>
                                </div>
                                {/* Decorative corner accents */}
                                <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-white/40 rounded-tl-lg pointer-events-none" />
                                <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-white/40 rounded-tr-lg pointer-events-none" />
                                <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-white/40 rounded-bl-lg pointer-events-none" />
                                <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-white/40 rounded-br-lg pointer-events-none" />
                              </div>
                            ) : (
                              // Professional Video Player with Controls
                              <div className="video-container">
                                <video
                                  ref={mobileVideoRef}
                                  src={videoPath}
                                  className="w-full h-full object-cover"
                                  onClick={toggleMobilePlay}
                                  playsInline
                                  muted={isMobileMuted}
                                  loop
                                />

                                {/* Custom Video Controls Overlay */}
                                <div
                                  className={`video-controls-overlay ${showMobileControls ? "visible" : ""}`}
                                >
                                  <div className="video-controls-bar">
                                    <button
                                      onClick={toggleMobilePlay}
                                      className="video-control-btn"
                                      aria-label={
                                        mobileVideoRef.current?.paused
                                          ? "Play"
                                          : "Pause"
                                      }
                                    >
                                      {mobileVideoRef.current?.paused ? (
                                        <Play size={18} />
                                      ) : (
                                        <Pause size={18} />
                                      )}
                                    </button>
                                    <button
                                      onClick={toggleMobileMute}
                                      className="video-control-btn"
                                      aria-label={
                                        isMobileMuted ? "Unmute" : "Mute"
                                      }
                                    >
                                      {isMobileMuted ? (
                                        <VolumeX size={18} />
                                      ) : (
                                        <Volume2 size={18} />
                                      )}
                                    </button>
                                    <button
                                      onClick={handleMobileFullscreen}
                                      className="video-control-btn"
                                      aria-label="Fullscreen"
                                    >
                                      <Maximize2 size={18} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Gold corner accents for video frame */}
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-gold/40 rounded-tl-xl pointer-events-none" />
                          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-gold/40 rounded-tr-xl pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-gold/40 rounded-bl-xl pointer-events-none" />
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-gold/40 rounded-br-xl pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content below picture - unchanged */}
                <div className="w-full">
                  {/* Title */}
                  <div className="mb-2 animate-fade-in-up">
                    <h1 className="text-3xl xs:text-4xl sm:text-4xl font-bold text-deep-charcoal leading-tight">
                      <div className="flex flex-row items-center flex-wrap">
                        <span className="text-warm-navy whitespace-nowrap">
                          AI for
                        </span>
                        <div className="relative flex items-center ml-0 sm:ml-2">
                          <span className="text-gradient-gold font-bold whitespace-nowrap">
                            {displayText}
                            {animationCount < 6 && (
                              <span className="inline-block w-[2px] h-5 sm:h-6 bg-amber-gold ml-1 animate-pulse"></span>
                            )}
                          </span>
                        </div>
                      </div>
                    </h1>
                  </div>

                  {/* Tagline */}
                  <div className="mb-1 animate-fade-in-up delay-100">
                    <span className="inline-block text-xs font-medium tracking-wide uppercase bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text whitespace-nowrap">
                      AI for Home Builders Closing 50–300 Homes/Year
                    </span>
                  </div>

                  {/* Main statement */}
                  <p className="text-sm text-warm-navy uppercase font-medium leading-relaxed mb-2 max-w-full animate-fade-in-up delay-200">
                    THE PROFIT FROM ONE EXTRA HOME PAYS FOR YOUR ANNUAL AI.
                  </p>

                  {/* Description */}
                  <p className="text-xs text-warm-gray font-medium leading-relaxed mb-4 max-w-full animate-fade-in-up delay-300">
                    We install turnkey AI agents on top of the systems you
                    already use—no rip-and-replace, no AI expertise required.
                    Your buyers, homeowners, and staff get faster, smarter
                    responses from day one.{" "}
                  </p>

                  {/* Value points */}
                  <div className="space-y-2 mb-6 max-w-full animate-fade-in-up delay-400">
                    <div>
                      <h3 className="text-base font-bold bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text mb-0">
                        Cost: 1 Extra Home
                      </h3>
                      <p className="text-xs text-warm-gray">
                        Pays for your annual AI system in most divisions.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base font-bold bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text mb-0">
                        ROI: 12 Extra Homes*
                      </h3>
                      <p className="text-xs text-warm-gray">
                        Illustrative Year-1 upside for a 150–250 home builder.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base font-bold bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text mb-0">
                        Quick: 45-60 Days
                      </h3>
                      <p className="text-xs text-warm-gray">
                        Typical window from kickoff to live AI agents.
                      </p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3 mb-4 max-w-full animate-fade-in-up delay-500">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 z-button">
                        <Link href="/scheduleConsultation" className="block">
                          <button
                            onClick={handleROIClick}
                            className="btn-gold w-full font-semibold py-4 px-4 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                          >
                            <Calendar className="w-4 h-4" />
                            <span className="whitespace-nowrap">
                              Book Your 15-Minute ROI Demo
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </Link>
                      </div>
                      <div className="flex-1 z-button">
                        <button
                          onClick={scrollToFounderStory}
                          className="w-full font-semibold py-4 px-4 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm border-2 border-amber-gold text-amber-gold hover:bg-amber-gold hover:text-deep-charcoal hover:-translate-y-0.5"
                        >
                          <span className="whitespace-nowrap">About</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-warm-gray italic max-w-full">
                      We'll map your lead + warranty flow and show how even one
                      extra home can pay for the system.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="animate-fade-in-up delay-600">
                    <div className="w-full">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-100 p-3 rounded-lg shadow-navy border border-warm-gray/10">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gradient-gold mb-0">
                              17
                            </div>
                            <div className="text-xs text-warm-gray leading-tight mb-1">
                              YEARS INDUSTRY
                              <br />
                              EXPERIENCE
                            </div>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-amber-gold to-soft-gold mx-auto"></div>
                          </div>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg shadow-teal border border-warm-gray/10">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gradient-gold mb-0">
                              300+
                            </div>
                            <div className="text-xs text-warm-gray leading-tight mb-1">
                              BUILDER
                              <br />
                              CLIENTS
                            </div>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-amber-gold to-soft-gold mx-auto"></div>
                          </div>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg shadow-gold border border-warm-gray/10">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gradient-gold mb-0">
                              28
                            </div>
                            <div className="text-xs text-warm-gray leading-tight mb-1">
                              STATES
                              <br />
                              SERVED
                            </div>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-amber-gold to-soft-gold mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP LAYOUT (≥ 1024px) - UNCHANGED */}
          <div className="hidden lg:block absolute inset-0">
            <div className="absolute inset-0">
              {/* Right side: Main Image Frame with Overlapping Video */}
              <div className="absolute right-0 top-0 bottom-0 w-[52%] flex items-top  justify-start pl-8 xl:pl-12 pt-28">
                <div className="relative w-[90%] max-w-[700px] h-auto ml-4">
                  {/* Main image container with video overlapping */}
                  <div className="relative w-full">
                    {/* Main Landscape Image */}
                    <div className="desktop-image-frame group">
                      <img
                        src="/Website Assets/homepic/home1.jpeg"
                        alt="Modern Home"
                        className="w-full h-auto object-cover min-h-[400px]"
                      />
                      <div className="desktop-border-outer" />
                      <div className="desktop-border-inner" />
                    </div>

                    {/* Desktop Video */}
                    <div
                      className="absolute -bottom-24 right-[180px] w-[30%] min-w-[240px] max-w-[300px] z-20"
                      style={{
                        bottom: "clamp(-90px, calc(-60px + 2vw), -90px)",
                      }}
                    >
                      <div
                        ref={desktopContainerRef}
                        className="video-frame group"
                        onMouseEnter={handleDesktopMouseEnter}
                        onMouseLeave={handleDesktopMouseLeave}
                      >
                        <div className="relative rounded-xl overflow-hidden bg-black border-2 border-white/30 shadow-2xl">
                          <div className="aspect-[9/16] w-full">
                            {!isDesktopPlaying ? (
                              // Desktop Thumbnail
                              <div
                                className="video-thumbnail-wrapper"
                                onClick={handleDesktopPlay}
                              >
                                <img
                                  src={thumbnailPath}
                                  alt="Video Thumbnail"
                                  className="video-thumbnail"
                                />
                                <div className="play-button-overlay">
                                  <div className="play-button">
                                    <Play fill="white" />
                                  </div>
                                </div>
                                {/* Decorative corner accents */}
                                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/40 rounded-tl-lg pointer-events-none" />
                                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white/40 rounded-tr-lg pointer-events-none" />
                                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white/40 rounded-bl-lg pointer-events-none" />
                                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/40 rounded-br-lg pointer-events-none" />
                              </div>
                            ) : (
                              // Desktop Video Player
                              <div className="video-container">
                                <video
                                  ref={desktopVideoRef}
                                  src={videoPath}
                                  className="w-full h-full object-cover"
                                  onClick={toggleDesktopPlay}
                                  playsInline
                                  muted={isDesktopMuted}
                                  loop
                                />

                                {/* Custom Video Controls Overlay */}
                                <div
                                  className={`video-controls-overlay ${showDesktopControls ? "visible" : ""}`}
                                >
                                  <div className="video-controls-bar">
                                    <button
                                      onClick={toggleDesktopPlay}
                                      className="video-control-btn"
                                      aria-label={
                                        desktopVideoRef.current?.paused
                                          ? "Play"
                                          : "Pause"
                                      }
                                    >
                                      {desktopVideoRef.current?.paused ? (
                                        <Play size={18} />
                                      ) : (
                                        <Pause size={18} />
                                      )}
                                    </button>
                                    <button
                                      onClick={toggleDesktopMute}
                                      className="video-control-btn"
                                      aria-label={
                                        isDesktopMuted ? "Unmute" : "Mute"
                                      }
                                    >
                                      {isDesktopMuted ? (
                                        <VolumeX size={18} />
                                      ) : (
                                        <Volume2 size={18} />
                                      )}
                                    </button>
                                    <button
                                      onClick={handleDesktopFullscreen}
                                      className="video-control-btn"
                                      aria-label="Fullscreen"
                                    >
                                      <Maximize2 size={18} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Gold corner accents for video frame */}
                          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-gold rounded-tl-xl pointer-events-none" />
                          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-gold rounded-tr-xl pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-gold rounded-bl-xl pointer-events-none" />
                          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-gold rounded-br-xl pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/98 to-transparent lg:w-[48%] lg:right-auto lg:left-0" />
            </div>
          </div>

          {/* Desktop Content */}
          <div className="hidden lg:block relative w-full h-full items-center justify-center pt-28 pb-6 px-8 min-h-screen">
            <div className="w-full max-w-7xl mx-auto">
              <div
                className={`w-full transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <div className="w-full max-w-[50%] xl:max-w-[46%] mr-auto">
                  {/* Title */}
                  <div className="mb-2 animate-fade-in-up">
                    <h1 className="text-5xl lg:text-6xl font-bold text-deep-charcoal leading-tight">
                      <div className="flex flex-row items-center flex-wrap">
                        <span className="text-warm-navy whitespace-nowrap">
                          AI for
                        </span>
                        <div className="relative flex items-center ml-2">
                          <span className="text-gradient-gold font-bold whitespace-nowrap">
                            {displayText}
                            {animationCount < 6 && (
                              <span className="inline-block w-[2px] h-10 xl:h-12 bg-amber-gold ml-1 animate-pulse"></span>
                            )}
                          </span>
                        </div>
                      </div>
                    </h1>
                  </div>

                  {/* Tagline */}
                  <div className="mb-1 animate-fade-in-up delay-100">
                    <span className="inline-block text-sm font-medium tracking-wide uppercase bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text whitespace-nowrap">
                      AI for Home Builders Closing 50–300 Homes/Year
                    </span>
                  </div>

                  {/* Main statement */}
                  <p className="text-sm text-warm-navy uppercase font-medium leading-relaxed mb-2 max-w-full animate-fade-in-up delay-200">
                    THE PROFIT FROM ONE EXTRA HOME PAYS FOR YOUR ANNUAL AI.
                  </p>

                  {/* Description */}
                  <p className="text-xs text-warm-gray font-medium leading-relaxed mb-4 max-w-[95%] animate-fade-in-up delay-300">
                    We install turnkey AI agents on top of the systems you
                    already use—no rip-and-replace, no AI expertise required.
                    Your buyers, homeowners, and staff get faster, smarter
                    responses from day one.{" "}
                  </p>

                  {/* Value points */}
                  <div className="space-y-3 mb-8 max-w-[95%] animate-fade-in-up delay-400">
                    <div className="flex items-start gap-2">
                      <div className="min-w-2 w-2 h-2 rounded-full bg-gradient-to-r from-amber-gold to-soft-gold mt-2.5"></div>
                      <div>
                        <h3 className="text-lg font-bold bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text mb-1">
                          Cost: 1 Extra Home
                        </h3>
                        <p className="text-sm text-warm-gray">
                          Pays for your annual AI system in most divisions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="min-w-2 w-2 h-2 rounded-full bg-gradient-to-r from-amber-gold to-soft-gold mt-2.5"></div>
                      <div>
                        <h3 className="text-lg font-bold bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text mb-1">
                          ROI: 12 Extra Homes*
                        </h3>
                        <p className="text-sm text-warm-gray">
                          Illustrative Year-1 upside for a 150–250 home builder.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="min-w-2 w-2 h-2 rounded-full bg-gradient-to-r from-amber-gold to-soft-gold mt-2.5"></div>
                      <div>
                        <h3 className="text-lg font-bold bg-gradient-to-r from-amber-gold to-soft-gold text-transparent bg-clip-text mb-1">
                          Quick: 45-60 Days
                        </h3>
                        <p className="text-sm text-warm-gray">
                          Typical window from kickoff to live AI agents.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3 mb-4 max-w-full animate-fade-in-up delay-500">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 z-button">
                        <Link href="/scheduleConsultation" className="block">
                          <button
                            onClick={handleROIClick}
                            className="btn-gold w-full font-semibold py-4 px-4 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                          >
                            <Calendar className="w-4 h-4" />
                            <span className="whitespace-nowrap">
                              Book Your 15-Minute ROI Demo
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </Link>
                      </div>
                      <div className="flex-1 z-button">
                        <button
                          onClick={scrollToFounderStory}
                          className="w-full font-semibold py-4 px-4 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm border-2 border-amber-gold text-amber-gold hover:bg-amber-gold hover:text-deep-charcoal hover:-translate-y-0.5"
                        >
                          <span className="whitespace-nowrap">About</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-warm-gray italic max-w-full">
                      We'll map your lead + warranty flow and show how even one
                      extra home can pay for the system.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="animate-fade-in-up delay-600">
                    <div className="w-screen max-w-[800px]">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-navy border border-warm-gray/10">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-amber-gold mb-1">
                              17
                            </div>
                            <div className="text-xs text-warm-gray leading-tight mb-2">
                              YEARS INDUSTRY EXPERIENCE
                            </div>
                            <div className="w-12 h-1 bg-gradient-to-r from-amber-gold to-soft-gold mx-auto"></div>
                          </div>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-teal border border-warm-gray/10">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gradient-gold mb-1">
                              300+
                            </div>
                            <div className="text-xs text-warm-gray leading-tight mb-2">
                              BUILDER CLIENTS
                            </div>
                            <div className="w-12 h-1 bg-gradient-to-r from-amber-gold to-soft-gold mx-auto"></div>
                          </div>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-gold border border-warm-gray/10">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gradient-gold mb-1">
                              28
                            </div>
                            <div className="text-xs text-warm-gray leading-tight mb-2">
                              STATES SERVED
                            </div>
                            <div className="w-12 h-1 bg-gradient-to-r from-amber-gold to-soft-gold mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs pt-4 text-amber-gold italic max-w-full">
                    Deep homebuilding ops experience, now focused on AI.
                  </p>
                  <p className="text-xs text-warm-gray italic max-w-full">
                    Illustrative scenario based on a 150–250 home builder and
                    average gross profit per home. We model your actual ROI in
                    the demo
                    Deep homebuilding ops experience, now focused on AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
