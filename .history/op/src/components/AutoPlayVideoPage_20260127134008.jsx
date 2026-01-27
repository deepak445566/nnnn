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
  const enableSound = () => {
  const video = videoRef.current;
  if (video) {
    video.muted = false;    // sound on
    video.play();           // resume play with sound
  }
};


  return (
   <div
  className="video-wrapper"
  onClick={enableSound}   // user click pe sound on
  style={{ cursor: 'pointer' }}
>
  <video
    ref={videoRef}
    className="w-full h-full rounded-lg shadow-lg"
    autoPlay
    muted
    playsInline
    loop
  >
    <source src="/images/ho.mp4" type="video/mp4" />
  </video>
</div>

  );
};

export default AutoPlayVideoPage;
