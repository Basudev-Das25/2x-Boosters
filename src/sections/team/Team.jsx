import { useEffect, useRef, useState } from "react";
import "./Team.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DetailModal from "../../components/modal/DetailModal";
import Reveal from "../../components/common/Reveal";

const teamMembers = [
  {
    name: "AEDITON",
    role: "Duelist",
    cloudinaryId: "Aediton_player_video_l7c4xh",
    trackerUrl: "https://tracker.gg/valorant/profile/riot/AEDITONX%2300001/overview",
    popoutImage: "/images/agents/jett_popout.jpg",
    riotId: { name: "AEDITONX", tag: "00001" },
    stats: { "K/D": "1.42", "HS%": "34%", "Main": "Jett" },
    bio: "Aggressive entry fragger known for creating space and highlight-reel plays."
  },
  {
    name: "BERLIN [IGL]",
    role: "Controller",
    trackerUrl: "https://tracker.gg/valorant/profile/riot/BERLIN%233325/overview",
    popoutImage: "/images/agents/omen_popout.jpg",
    riotId: { name: "BERLIN", tag: "3325" },
    // videoSrc: "...", // Optional: leave undefined to test image fallback
    imageSrc: "/images/characters/clove_-_valorant-removebg-preview.png", // Placeholder
    stats: { "K/D": "1.10", "AST": "12.4", "Main": "Omen" },
    bio: "The mastermind behind the strategies. Calm under pressure and precise with utility."
  },
  {
    name: "CUPCAKE",
    role: "Initiator",
    cloudinaryId: "hero-launch_m46mas",
    trackerUrl: "https://tracker.gg/valorant/profile/riot/Cupcake%23kappu/overview",
    popoutImage: "/images/agents/Fade_popout.jpg",
    riotId: { name: "Cupcake", tag: "kappu" },
    stats: { "K/D": "1.25", "ADR": "156", "Main": "Fade" },
    bio: "Info gatherer extraordinaire. Sets up the team for success with perfect lineups."
  },
  {
    name: "ALSOJOYY",
    role: "Sentinel",
    cloudinaryId: "Alsojoyy_player_video_dwav8d",
    trackerUrl: "https://tracker.gg/valorant/profile/riot/Alsojoyy%23suii/overview",
    popoutImage: "/images/agents/killjoy_popout.jpg",
    riotId: { name: "ALSOJOYY", tag: "suii" }, // Fixed casing consistency too
    stats: { "K/D": "1.15", "Clutch": "18%", "Main": "Killjoy" },
    bio: "The anchor of the defense. Locks down sites and punishes overaggression."
  },
  {
    name: "EXEC",
    role: "Flex",
    cloudinaryId: "hero-launch_m46mas",
    trackerUrl: "https://tracker.gg/valorant/profile/riot/DragonianBD%23GGss/overview",
    popoutImage: "/images/agents/cypher_popout.jpg",
    riotId: { name: "DragonianBD", tag: "GGss" },
    stats: { "K/D": "1.30", "Flex": "Yes", "Main": "Cypher" },
    bio: "Versatile player capable of filling any role the team needs at a high level."
  },
];

const TeamCard = ({ member, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 18;
    const rotateY = (x - centerX) / 18;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
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
      className="team-card team-card-animate"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onClick={() => onClick(member)}
    >
      <div className="card-inner">
        <div className="card-bg" />
        <div className="character-popout">
          <img src={member.popoutImage} alt={member.name} />
        </div>

        <div className="player-info">
          <h3>{member.name}</h3>
          <span>{member.role}</span>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const sectionRef = useRef(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-card-animate",
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="team" ref={sectionRef} className="team">
        <div className="team-header">
          <Reveal>
            <h2>Pro Team</h2>
          </Reveal>
          <Reveal delay={0.2} blur={true}>
            <p>Elite roster competing at the highest level</p>
          </Reveal>
        </div>

        <div className="team-grid">
          {teamMembers.map((player, index) => (
            <TeamCard
              key={index}
              member={player}
              onClick={setSelectedMember}
            />
          ))}
        </div>
      </section>

      <DetailModal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        data={selectedMember}
      />
    </>
  );
};

export default Team;
