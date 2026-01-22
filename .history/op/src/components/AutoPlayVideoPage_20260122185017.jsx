import React, { useRef, useEffect, useState } from 'react';

const AutoPlayVideoPage = () => {
  const videoRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  useEffect(() => {
    // Track user interaction for better autoplay handling
    const handleUserInteraction = () => {
      setUserHasInteracted(true);
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            // Try to play immediately if user has interacted
            if (userHasInteracted) {
              playVideo();
            } else {
              // Wait a bit for browsers that require user interaction
              setTimeout(() => {
                playVideo();
              }, 500);
            }
          }
          
          if (!entry.isIntersecting && hasPlayed) {
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
            }
          }
        });
      },
      { 
        threshold: 0.5, // Lower threshold for earlier play
        rootMargin: '0px 0px -50px 0px' // Play when bottom 50px enters viewport
      }
    );

    const currentVideo = videoRef.current;
    if (currentVideo) {
      observer.observe(currentVideo);
    }

    return () => {
      if (currentVideo) {
        observer.unobserve(currentVideo);
      }
    };
  }, [hasPlayed, userHasInteracted]);

  const playVideo = async () => {
    try {
      if (videoRef.current) {
        // Ensure video is muted for autoplay
        videoRef.current.muted = true;
        
        // Attempt to play
        await videoRef.current.play();
        setHasPlayed(true);
        console.log('Video autoplay successful');
      }
    } catch (error) {
      console.log('Autoplay failed, user interaction required:', error);
      
      // Add a play button overlay if autoplay fails
      const videoContainer = videoRef.current?.parentElement;
      if (videoContainer && !videoContainer.querySelector('.play-overlay')) {
        const playOverlay = document.createElement('div');
        playOverlay.className = 'play-overlay';
        playOverlay.innerHTML = `
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 10;
          ">
            <div style="
              width: 80px;
              height: 80px;
              background: rgba(255,255,255,0.9);
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 24px;
            ">
              ▶
            </div>
          </div>
        `;
        
        playOverlay.addEventListener('click', () => {
          videoRef.current?.play();
          playOverlay.remove();
        });
        
        videoContainer.style.position = 'relative';
        videoContainer.appendChild(playOverlay);
      }
    }
  };

  const handleVideoClick = () => {
    // Toggle play/pause on click
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="video-section">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <video
          ref={videoRef}
          className="w-full h-auto rounded-lg shadow-lg cursor-pointer"
         auto
          muted
          playsInline
          preload="metadata"
          onClick={handleVideoClick}
          poster="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        >
          <source src="/images/ho.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Optional: Loading state */}
        <div className="text-center mt-2 text-gray-500 text-sm">
          {hasPlayed ? 'Video playing' : 'Video will autoplay when in view'}
        </div>
      </div>
      
      {/* Add some scrollable content to test */}
      <div style={{ height: '150vh', padding: '20px' }}>
        <p>Scroll down to see the video autoplay...</p>
        <div style={{ height: '100vh' }}></div>
      </div>
    </div>
  );
};

export default AutoPlayVideoPage;