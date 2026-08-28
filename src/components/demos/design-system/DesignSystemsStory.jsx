import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KitProvider } from "./kit.jsx";
import { FigmaOrigin, FoundationTokens, LightDark } from "./OriginAndTokens.jsx";
import {
  Typography,
  Iconography,
  MultiBrand,
  AtomicDesign,
} from "./TypeBrandAtomic.jsx";
import { DosDonts, Governance, Payoff } from "./PracticeAndPayoff.jsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TOC = [
  { href: "#origin", id: "origin", label: "01 Origin" },
  { href: "#tokens", id: "tokens", label: "02 Tokens" },
  { href: "#theme", id: "theme", label: "03 Themes" },
  { href: "#type", id: "type", label: "04 Type" },
  { href: "#icons", id: "icons", label: "05 Icons" },
  { href: "#brand", id: "brand", label: "06 Brands" },
  { href: "#atomic", id: "atomic", label: "07 Atomic" },
  { href: "#pairs", id: "pairs", label: "08 Practice" },
  { href: "#governance", id: "governance", label: "09 Govern" },
  { href: "#payoff", id: "payoff", label: "10 Explorer" },
];

export default function DesignSystemsStory() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
          desktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduce, motion, desktop } = context.conditions;

          if (reduce) {
            gsap.set(".ds-reveal, .ds-map-row, .ds-layer", {
              opacity: 1,
              y: 0,
              clearProps: "transform",
            });
            return;
          }

          if (motion) {
            gsap.from(".ds-hero .ds-reveal", {
              opacity: 0,
              y: 24,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.08,
            });

            gsap.utils.toArray(".ds-chapter").forEach((chapter) => {
              const bits = chapter.querySelectorAll(".ds-reveal");
              if (!bits.length) return;
              gsap.from(bits, {
                opacity: 0,
                y: 20,
                duration: 0.55,
                ease: "power2.out",
                stagger: 0.06,
                scrollTrigger: {
                  trigger: chapter,
                  start: "top 82%",
                  once: true,
                },
              });
            });

            gsap.utils.toArray(".ds-chapter").forEach((chapter) => {
              ScrollTrigger.create({
                trigger: chapter,
                start: "top 28%",
                end: "bottom 28%",
                onToggle: (self) => {
                  if (!self.isActive) return;
                  const id = chapter.getAttribute("id");
                  root.current?.querySelectorAll(".ds-toc a").forEach((link) => {
                    link.classList.toggle(
                      "is-active",
                      link.getAttribute("href") === `#${id}`,
                    );
                  });
                },
              });
            });
          }

          if (desktop) {
            const pinToken = root.current?.querySelector(".ds-token-pin");
            if (pinToken) {
              ScrollTrigger.create({
                trigger: pinToken,
                start: "top 96px",
                end: "+=42%",
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
              });
              const rows = pinToken.querySelectorAll(
                ".ds-map-row:not(.ds-map-head)",
              );
              gsap.from(rows, {
                opacity: 0.35,
                y: 12,
                stagger: 0.06,
                ease: "none",
                scrollTrigger: {
                  trigger: pinToken,
                  start: "top 70%",
                  end: "+=35%",
                  scrub: true,
                },
              });
            }

            const pinAtomic = root.current?.querySelector(".ds-atomic-pin");
            if (pinAtomic) {
              ScrollTrigger.create({
                trigger: pinAtomic,
                start: "top 96px",
                end: "+=38%",
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
              });
              gsap.from(pinAtomic.querySelectorAll(".ds-layer"), {
                opacity: 0.4,
                y: 16,
                stagger: 0.12,
                ease: "none",
                scrollTrigger: {
                  trigger: pinAtomic,
                  start: "top 75%",
                  end: "+=30%",
                  scrub: true,
                },
              });
            }
          }
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <KitProvider>
      <div ref={root} className="ds-story">
        <nav className="ds-toc" aria-label="Story chapters">
          {TOC.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <header className="ds-hero">
          <p className="ds-kicker ds-reveal">Work sample · Design systems</p>
          <h1 className="ds-hero-title ds-reveal">
            From a few hexes to a <em>system</em> a team can ship.
          </h1>
          <p className="ds-lede ds-reveal">
            Organizations start with one-off color decisions in Figma. Those
            picks do not scale. This page is the walkthrough — live tokens,
            themes, type, icons, brands, atoms, governance — ending on an
            explorer you can operate.
          </p>
        </header>

        <FigmaOrigin />
        <FoundationTokens />
        <LightDark />
        <Typography />
        <Iconography />
        <MultiBrand />
        <AtomicDesign />
        <DosDonts />
        <Governance />
        <Payoff />
      </div>
    </KitProvider>
  );
}
