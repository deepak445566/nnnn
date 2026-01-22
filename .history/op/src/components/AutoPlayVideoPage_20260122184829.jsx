import React, { useRef, useEffect, useState } from 'react';

const AutoPlayVideoPage = () => {
  const videoRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.play().catch((error) => {
                  console.log('Auto-play failed:', error);
                });
                setHasPlayed(true);
              }
            }, 300);
          }
          
          if (!entry.isIntersecting && hasPlayed) {
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.8 }
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
  }, [hasPlayed]);

  return (
    <div>
      <video
        ref={videoRef}
        className="w-full h-auto"
        controls
        muted
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      >
        <source src="/images/ho.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default AutoPlayVideoPage;