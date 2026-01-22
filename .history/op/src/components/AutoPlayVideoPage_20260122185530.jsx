import React, { useRef, useEffect, useState } from 'react';

const AutoPlayVideoPage = () => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // जब video viewport में आए तो play करो
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (videoRef.current) {
              videoRef.current.play().catch((error) => {
                console.log('Autoplay failed:', error);
                // Agar autoplay fail हो तो user को play button दिखाओ
                showPlayButton();
              });
            }
          } else {
            // जब video viewport से बाहर जाए तो pause करो
            setIsVisible(false);
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
            }
          }
        });
      },
      { 
        threshold: 0.5 // 50% video visible होने पर trigger
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
  }, []);

  // Play button दिखाने के लिए function
  const showPlayButton = () => {
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
  };

  // Video को click करने पर play/pause toggle करना
  const handleVideoClick = () => {
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
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }} >
        <video
          ref={videoRef}
          className="w-full h-full rounded-lg shadow-lg cursor-pointer"
          muted
          
          playsInline
          preload="auto"
          loop // Agar video loop में चलाना चाहो तो
          onClick={handleVideoClick}
          poster="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        >
          <source src="/images/ho.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Status indicator */}
        <div className="text-center mt-2 text-gray-500 text-sm">
          {isVisible ? 'Video playing automatically' : 'Scroll to play video'}
        </div>
      </div>
      
    
    </div>
  );
};

export default AutoPlayVideoPage;