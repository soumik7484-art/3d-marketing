import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { useTypewriter } from './useTypewriter';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const serviceOptions = ["Brand", "Digital", "Campaign", "Other"];

  // Custom typewriter hook
  const { displayed, done } = useTypewriter("we'd love to\nhear from you!", 38, 600);

  // References for video playback and scrubbing
  const videoRef = useRef(null);
  const prevXRef = useRef(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  // 1. Desktop Mouse Scrubbing Hook
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (e) => {
      // Ignore scrubbing on screens smaller than 1024px width
      if (window.innerWidth < 1024) {
        prevXRef.current = null;
        return;
      }

      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      // Update the target scrub time based on (delta / window.innerWidth) * 0.8 * duration
      const deltaTime = (delta / window.innerWidth) * 0.8 * duration;
      let targetTime = video.currentTime + deltaTime;
      targetTime = Math.max(0, Math.min(duration, targetTime));

      targetTimeRef.current = targetTime;

      // If we're not currently executing a seek, seek to the target time
      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTime;
      }
    };

    // Seeked event listener to handle smooth frame-to-frame tracking
    const handleSeeked = () => {
      if (!video) return;
      const diff = Math.abs(video.currentTime - targetTimeRef.current);
      // If target time has moved while we were seeking, seek again
      if (diff > 0.05) {
        video.currentTime = targetTimeRef.current;
      } else {
        isSeekingRef.current = false;
      }
    };

    // Reset previous X when mouse leaves/enters window to prevent timeline jumping
    const handleMouseEnter = (e) => {
      prevXRef.current = e.clientX;
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (video) {
        video.removeEventListener('seeked', handleSeeked);
      }
    };
  }, []);

  // 2. Mobile Autoplay Hook
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleAutoplayCheck = () => {
      if (window.innerWidth < 1024) {
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.play().catch((err) => {
          console.warn("Video play was interrupted or blocked by browser policies:", err);
        });
      } else {
        video.autoplay = false;
        video.pause();
      }
    };

    // Run check initially
    handleAutoplayCheck();

    // Recheck on window resize
    window.addEventListener('resize', handleAutoplayCheck);
    return () => {
      window.removeEventListener('resize', handleAutoplayCheck);
    };
  }, []);

  // Toggle service pill selection
  const handleServiceToggle = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      
      {/* Background Video Component */}
      <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-right lg:object-right-bottom"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
        />
      </div>

      {/* Content Layout Container */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        
        {/* Interactive Navbar */}
        <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
          {/* Logo (Left side) */}
          <div className="flex flex-row items-center gap-3">
            <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
              Mainframe®
            </span>
            <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
              &#10033;
            </span>
          </div>

          {/* Desktop Nav Links (Center) */}
          <nav className="hidden md:flex flex-row items-center text-[23px] text-black font-normal select-none">
            <a href="#labs" className="hover:opacity-60 transition-opacity">Labs</a>
            <span className="opacity-40">,&nbsp;</span>
            <a href="#studio" className="hover:opacity-60 transition-opacity">Studio</a>
            <span className="opacity-40">,&nbsp;</span>
            <a href="#openings" className="hover:opacity-60 transition-opacity">Openings</a>
            <span className="opacity-40">,&nbsp;</span>
            <a href="#shop" className="hover:opacity-60 transition-opacity">Shop</a>
          </nav>

          {/* Desktop CTA (Right) */}
          <div className="hidden md:block">
            <a href="#touch" className="text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity">
              Get in touch
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden flex-col gap-[5px] justify-center items-center w-8 h-8 z-20 relative cursor-pointer focus:outline-none border-none bg-transparent"
            aria-label="Toggle Navigation Menu"
          >
            <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </header>

        {/* Mobile Navigation Overlay */}
        <div
          className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm flex flex-col justify-center items-center gap-8 md:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center gap-6 text-[32px] font-medium text-black">
            <a
              href="#labs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:opacity-60 transition-opacity"
            >
              Labs
            </a>
            <a
              href="#studio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:opacity-60 transition-opacity"
            >
              Studio
            </a>
            <a
              href="#openings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:opacity-60 transition-opacity"
            >
              Openings
            </a>
            <a
              href="#shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:opacity-60 transition-opacity"
            >
              Shop
            </a>
            <a
              href="#touch"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-black underline underline-offset-4 hover:opacity-60 transition-opacity mt-4"
            >
              Get in touch
            </a>
          </nav>
        </div>

        {/* Overarching Layout Engine */}
        <main id="spade-hero" className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center pt-28 lg:pt-0">
          <div className="max-w-4xl">
            
            {/* Typewriter Hook and Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
                {displayed}
                {!done && (
                  <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
                )}
              </h1>
            </motion.div>

            {/* Secondary Description Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="w-full"
            >
              <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
                Whether you have questions, feedback, <br /> drop us a message and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            {/* Interactive Multi-Select Service Pills */}
            <div className="w-full max-w-3xl">
              <h2 className="text-2xl font-medium tracking-tight mb-2 text-black select-none">
                What sort of service?
              </h2>
              <p className="opacity-85 text-[#738273] mb-8 select-none">
                Select all that apply
              </p>

              {/* Flex wrapper for service buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                {serviceOptions.map((service) => {
                  const isActive = selectedServices.includes(service);
                  return (
                    <motion.button
                      key={service}
                      onClick={() => handleServiceToggle(service)}
                      whileTap={{ scale: 0.95 }}
                      layout
                      className={`px-5 py-3 rounded-full text-base font-medium flex flex-row items-center gap-2 cursor-pointer transition-colors duration-200 select-none ${
                        isActive
                          ? "bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform"
                          : "bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55"
                      }`}
                    >
                      <AnimatePresence initial={false} mode="popLayout">
                        {isActive && (
                          <motion.span
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="flex items-center justify-center"
                          >
                            <Check className="w-4 h-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <span>{service}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Contingent Feedback Status Banner */}
              <div className="min-h-[72px] flex items-center">
                <AnimatePresence mode="wait">
                  {selectedServices.length === 0 ? (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0.5, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="italic text-xs text-[#738273]"
                    >
                      Please click to select services above.
                    </motion.p>
                  ) : (
                    <motion.div
                      key="active"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="w-full overflow-hidden"
                    >
                      <div className="bg-[#FAFBF9] border border-[#EAECE9] rounded-2xl p-5 flex flex-row items-center justify-between gap-4 mt-2">
                        <span className="text-sm sm:text-base text-[#1C2E1E] font-medium tracking-tight">
                          Ready to inquire about: <span className="font-semibold">{selectedServices.join(", ")}</span>
                        </span>
                        <motion.button
                          whileHover={{ x: 3 }}
                          className="text-[#4D6D47] uppercase text-xs font-bold tracking-wider hover:opacity-80 transition-opacity flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                        >
                          Let's Go <span className="text-sm">→</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </main>
      </div>

    </div>
  );
}

export default App;
