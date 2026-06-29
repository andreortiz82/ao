import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_ROTATING_LABELS } from "../consts";

gsap.registerPlugin(ScrollTrigger);

const labels = [...HERO_ROTATING_LABELS];

function initHeroRotate(el: HTMLElement) {
  let i = 0;

  const cycle = () => {
    gsap.to(el, {
      opacity: 0,
      y: -10,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        i = (i + 1) % labels.length;
        el.textContent = labels[i];
        gsap.fromTo(
          el,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => gsap.delayedCall(2.4, cycle),
          },
        );
      },
    });
  };

  gsap.delayedCall(2.4, cycle);
}

export function initHomeMotion() {
  const hero = document.querySelector(".home-hero");
  const name = document.querySelector(".hero-name");
  const rotating = document.querySelector(".rotating") as HTMLElement | null;
  const tiles = gsap.utils.toArray<HTMLElement>(".work-tile");

  if (name) {
    gsap.from(name, {
      opacity: 0,
      y: 28,
      duration: 0.9,
      ease: "power3.out",
    });
  }

  if (rotating) {
    gsap.from(rotating, {
      opacity: 0,
      y: 36,
      duration: 0.95,
      delay: 0.1,
      ease: "power3.out",
      onComplete: () => initHeroRotate(rotating),
    });
  }

  if (tiles.length) {
    gsap.set(tiles, { opacity: 0, y: 40 });

    gsap.to(tiles, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.09,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".work-grid",
        start: "top 88%",
        once: true,
      },
    });
  }

  if (hero) {
    gsap.from(hero, {
      "--hero-line-scale": 0,
      duration: 1.1,
      delay: 0.2,
      ease: "power3.inOut",
    });
  }

  const siteHeader = document.querySelector("body > header");
  if (siteHeader) {
    gsap.from(siteHeader, {
      y: -16,
      opacity: 0,
      duration: 0.65,
      ease: "power2.out",
    });
  }
}

export function initCaseStudyMotion() {
  const header = document.querySelector(".cs-header");
  const heroImg = document.querySelector(".cs-hero-media");
  const article = document.querySelector(".ao-md-content-container");

  if (header) {
    gsap.from(header.children, {
      opacity: 0,
      y: 24,
      duration: 0.7,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.05,
    });
  }

  if (heroImg) {
    gsap.from(heroImg, {
      opacity: 0,
      scale: 1.03,
      duration: 1,
      ease: "power2.out",
      delay: 0.15,
    });
  }

  if (article) {
    gsap.from(article, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: article,
        start: "top 90%",
        once: true,
      },
    });
  }

  const demoFrames = gsap.utils.toArray<HTMLElement>(".demo-frame");
  demoFrames.forEach((frame) => {
    gsap.from(frame, {
      opacity: 0,
      y: 32,
      duration: 0.85,
      ease: "power2.out",
      scrollTrigger: {
        trigger: frame,
        start: "top 92%",
        once: true,
      },
    });
  });
}

export function initBlogMotion() {
  const siteHeader = document.querySelector("body > header");
  if (siteHeader) {
    gsap.from(siteHeader, {
      y: -16,
      opacity: 0,
      duration: 0.65,
      ease: "power2.out",
    });
  }

  const cards = gsap.utils.toArray<HTMLElement>(".blog-card");
  if (!cards.length) return;

  gsap.set(cards, { opacity: 0, y: 32 });

  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.07,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".blog-grid",
      start: "top 88%",
      once: true,
    },
  });
}
