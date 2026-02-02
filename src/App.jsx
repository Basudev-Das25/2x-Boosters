
import { useEffect } from 'react'
import './App.css'
import Lenis from 'lenis'

import Navbar from './components/navbar/Navbar.jsx'
import Hero from './sections/hero/Hero.jsx'
import Team from './sections/team/Team.jsx'
import Creators from './sections/creators/Creators.jsx'
import Footer from './sections/Footer/Footer.jsx'
import Cursor from './components/cursor/Cursor.jsx'

import VideoPreloader from './components/common/VideoPreloader.jsx'

function App() {
  const videoAssets = [
    "https://res.cloudinary.com/dun5g7rad/video/upload/f_auto,q_auto/hero-launch_m46mas.mp4",
    "https://res.cloudinary.com/dun5g7rad/video/upload/f_auto,q_auto/Aediton_player_video_l7c4xh.mp4",
    "https://res.cloudinary.com/dun5g7rad/video/upload/f_auto,q_auto/Alsojoyy_player_video_dwav8d.mp4"
  ];

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle internal anchor links with Lenis
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      // Only intercept internal links starting with #
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        lenis.scrollTo(href, {
          offset: 0,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [])

  return (
    <>
      <Cursor />
      <VideoPreloader videoPaths={videoAssets} />
      <Navbar />
      <main>
        <Hero />
        <Team />
        <Creators />
      </main>
      <Footer />
    </>
  )
}

export default App
