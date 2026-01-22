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
 

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
    
  

      

      {/* Video Section - This is the auto-play section */}
      <section 
        ref={pageRef} 
        className="py-20 px-6 container mx-auto" 
        id="video-section"
      >
        <div className="max-w-6xl mx-auto">
          
          
          {/* Video Container */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-auto max-h-[70vh]"
               
                muted
                playsInline
                preload="metadata"
                poster="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              >
                <source
                  src="/images/ho.mp4"
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