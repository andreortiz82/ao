import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SystemProvider, ThemeDock } from "./parts/SystemContext.jsx";
import { HeroSection } from "./sections/HeroSection.jsx";
import { FoundationsSection } from "./sections/FoundationsSection.jsx";
import { TokensSection } from "./sections/TokensSection.jsx";
import { ComponentsSection } from "./sections/ComponentsSection.jsx";
import { ExamplesSection } from "./sections/ExamplesSection.jsx";
import { GovernanceSection } from "./sections/GovernanceSection.jsx";
import { SkillsSection } from "./sections/SkillsSection.jsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NAV = [
  { href: "#foundations", label: "Foundations" },
  { href: "#tokens", label: "Tokens" },
  { href: "#components", label: "Components" },
  { href: "#examples", label: "Examples" },
  { href: "#governance", label: "Governance" },
  { href: "#skills", label: "Skills" },
];

export default function DesignSystemsPage() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".dsys-reveal", { opacity: 1, y: 0 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".dsys-hero .dsys-reveal", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
        });
        gsap.utils.toArray(".dsys-chapter").forEach((chapter) => {
          gsap.from(chapter.querySelectorAll(".dsys-reveal"), {
            opacity: 0,
            y: 18,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 80%",
              once: true,
            },
          });
          ScrollTrigger.create({
            trigger: chapter,
            start: "top 30%",
            end: "bottom 30%",
            onToggle: (self) => {
              if (!self.isActive) return;
              const id = chapter.id;
              root.current?.querySelectorAll(".dsys-nav a").forEach((link) => {
                link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
              });
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <SystemProvider>
      <div ref={root} className="dsys-page">
        <ThemeDock />
        <nav className="dsys-nav" aria-label="Chapters">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <HeroSection />
        <FoundationsSection />
        <TokensSection />
        <ComponentsSection />
        <ExamplesSection />
        <GovernanceSection />
        <SkillsSection />
      </div>
    </SystemProvider>
  );
}
