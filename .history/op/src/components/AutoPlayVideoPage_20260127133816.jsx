import React, { useRef, useEffect } from 'react';

const AutoPlayVideoPage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {
            console.log('Autoplay blocked');
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 } // 50% video visible होने पर trigger
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="video-section">
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <video
          ref={videoRef}
          className="w-full h-full rounded-lg shadow-lg"
          autoPlay      // 🔥 Autoplay
          muted         // 🔥 MUST for autoplay without button
          playsInline   // 🔥 Mobile friendly
          loop          // Loop video
        >
          <source src="/images/ho.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default AutoPlayVideoPage;
