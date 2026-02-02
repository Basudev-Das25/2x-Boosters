import "./Footer.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      contactRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <footer id="contact" className="footer">
      {/* CONTACT */}
      <div ref={contactRef} className="footer-contact">
        <h2>Contact</h2>
        <p>
          For partnerships, media, and official communication, reach out via
          email or socials.
        </p>

        <div className="contact-info">
          <span>Email</span>
          <a href="mailto:contact@2x.gg">contact@2x.gg</a>
        </div>

        <div className="contact-socials">
          <a href="#" aria-label="Twitter">Twitter</a>
          <a href="#" aria-label="YouTube">YouTube</a>
          <a href="#" aria-label="Twitch">Twitch</a>
          <a href="#" aria-label="Instagram">Instagram</a>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="footer-divider" />

      {/* FOOTER BAR */}
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} 2X Boosters</span>
        <span>All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
