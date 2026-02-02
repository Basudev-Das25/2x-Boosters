import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Creators.css";
import DetailModal from "../../components/modal/DetailModal";

gsap.registerPlugin(ScrollTrigger);

const creators = [
  {
    name: "Creator One",
    platform: "YouTube / Twitch",
    imageSrc: "/images/characters/Jett_angry-removebg-preview.png", // Placeholder
    stats: { "Subs": "1.2M", "Views": "500M+" },
    bio: "Top tier content creator focused on educational gameplay and high-level analysis."
  },
  {
    name: "Creator Two",
    platform: "YouTube",
    imageSrc: "/images/characters/yoru_valorant-removebg-preview.png",
    stats: { "Subs": "850K", "Views": "200M+" },
    bio: "Known for insane highlight montages and community events."
  },
  {
    name: "Creator Three",
    platform: "Twitch",
    imageSrc: "/images/characters/clove_-_valorant-removebg-preview.png",
    stats: { "Followers": "2M", "Avg Viewers": "15K" },
    bio: "Variety streamer with a focus on competitive FPS titles."
  },
  {
    name: "Creator Four",
    platform: "YouTube / Kick",
    imageSrc: "/images/characters/Sage_angry-removebg-preview.png",
    stats: { "Subs": "500K", "Followers": "300K" },
    bio: "Rising star in the scene, bringing fresh energy and unique content ideas."
  },
];

const CreatorCard = ({ creator, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 25;
    const rotateY = (x - rect.width / 2) / 25;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-4px)
    `;
  };

  const resetTilt = () => {
    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
    `;
  };

  return (
    <div
      ref={cardRef}
      className="creator-card creator-card-animate"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onClick={() => onClick(creator)}
    >
      <div className="creator-image" />

      <div className="creator-info">
        <h3>{creator.name}</h3>
        <span>{creator.platform}</span>
      </div>
    </div>
  );
};

const Creators = () => {
  const sectionRef = useRef(null);
  const [selectedCreator, setSelectedCreator] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".creator-card-animate",
        { opacity: 0, y: 50, scale: 0.95, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="creators" ref={sectionRef} className="creators">
        <div className="creators-header">
          <h2>Creators</h2>
          <p>Content creators representing the team worldwide</p>
        </div>

        <div className="creators-grid">
          {creators.map((creator, index) => (
            <CreatorCard
              key={index}
              creator={creator}
              onClick={setSelectedCreator}
            />
          ))}
        </div>
      </section>

      <DetailModal
        isOpen={!!selectedCreator}
        onClose={() => setSelectedCreator(null)}
        data={selectedCreator}
      />
    </>
  );
};

export default Creators;
