import React, { useRef, useEffect, useState } from 'react';

const AutoPlayVideoPage = () => {
  const videoRef = useRef(null);
  const pageRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Monitor scroll and play video when page comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            setIsVideoVisible(true);
            
            // Wait a moment to ensure video element is ready
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.play().catch((error) => {
                  console.log('Auto-play failed:', error);
                });
                setHasPlayed(true);
              }
            }, 300);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of page is visible
    );

    if (pageRef.current) {
      observer.observe(pageRef.current);
    }

    return () => {
      if (pageRef.current) {
        observer.unobserve(pageRef.current);
      }
    };
  }, [hasPlayed]);

  // Handle manual video play
  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setHasPlayed(true);
    }
  };

  // Handle manual video pause
  const handlePauseClick = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Reset video
  const handleResetClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
      setHasPlayed(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">Auto-Play Video Demo</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="hover:text-blue-400 transition">Home</a>
            <a href="#about" className="hover:text-blue-400 transition">About</a>
            <a href="#video-section" className="hover:text-blue-400 transition">Video</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Home Section */}
      <section className="py-20 px-6 container mx-auto" id="home">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Scroll-Triggered Video Auto-Play</h2>
          <p className="text-xl text-gray-300 mb-10">
            Scroll down and when you reach the video section, the video will automatically start playing. This is implemented using the Intersection Observer API.
          </p>
          <div className="animate-bounce mt-20">
            <div className="text-gray-400">Scroll Down</div>
            <div className="text-4xl">↓</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-gray-800/30" id="about">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About This Demo</h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bg-gray-800/50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Technical Implementation</h3>
              <p className="text-gray-300">
                This page uses React's useRef hook and Intersection Observer API to detect when elements come into view. When at least 50% of the video container is visible, the video automatically plays.
              </p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">How To Use</h3>
              <p className="text-gray-300">
                Scroll down the page until you see the video section. The video will automatically start playing. You can also use the control buttons below the video to manually control playback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - This is the auto-play section */}
      <section 
        ref={pageRef} 
        className="py-20 px-6 container mx-auto" 
        id="video-section"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Auto-Play Video</h2>
          <p className="text-gray-400 text-center mb-10">
            {isVideoVisible ? 
              "✅ Video is in view and auto-playing" : 
              "⬇️ Keep scrolling, video will auto-play when this section comes into view"}
          </p>
          
          {/* Video Container */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-auto max-h-[70vh]"
                controls
                muted
                playsInline
                preload="metadata"
                poster="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              
              {/* Custom Overlay Control */}
              {!isVideoVisible && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-5xl mb-4">▶️</div>
                    <h3 className="text-2xl font-bold mb-2">Video Ready</h3>
                    <p className="text-gray-300">Will auto-play when scrolled into view</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Video Control Buttons */}
           
          </div>
          
       
        </div>
      </section>

    

    
    </div>
  );
};

export default AutoPlayVideoPage;