import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = "(prefers-reduced-motion: no-preference)";

function settle(target: gsap.TweenTarget) {
  gsap.set(target, { clearProps: "filter,transform,opacity,visibility" });
}

/** Short load reveal: the title rises into place as the blur clears. */
function revealTitles() {
  const titles = document.querySelectorAll("[data-load-title]");
  if (!titles.length) return;
  gsap.from(titles, {
    y: 14,
    autoAlpha: 0,
    filter: "blur(10px)",
    duration: 0.65,
    ease: "power2.out",
    onComplete: () => settle(titles),
  });
}

/** Paragraphs de-blur and fade once as they enter. Scrub stays off. */
function revealCopy() {
  document.querySelectorAll("[data-reveal-copy]").forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      filter: "blur(8px)",
      duration: 0.75,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      onComplete: () => settle(el),
    });
  });
}

/** Section labels stagger the first time a batch enters. */
function revealSectionLabels() {
  const labels = document.querySelectorAll("[data-section-label]");
  if (!labels.length) return;
  gsap.set(labels, { autoAlpha: 0, y: 8, filter: "blur(6px)" });
  ScrollTrigger.batch("[data-section-label]", {
    start: "top 88%",
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        overwrite: true,
        onComplete: () => settle(batch),
      });
    },
  });
}

const motion = gsap.matchMedia();

motion.add(reduceMotion, () => {
  revealTitles();
  revealCopy();
  revealSectionLabels();
});
