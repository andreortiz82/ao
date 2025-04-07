import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function random(min: number = 0, max: number = 100) {
  return Math.random() * (max - min) + min;
}

// Choose random element from array
const arrayElement = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const images = gsap.utils.toArray(".image");
const copies = gsap.utils.toArray(".copy");

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".welcome",
  { y: "5%" },
  {
    duration: 1,
    y: -100,
    opacity: 0,
    scrollTrigger: {
      trigger: ".welcome",
      start: "bottom top",
      end: "center top",
      scrub: 1,
      // markers: true,
    },
  }
);

gsap.fromTo(
  ".thank-you",
  { y: -200 },
  {
    duration: 2,
    y: 200,
    scrollTrigger: {
      trigger: ".thank-you",
      start: "top center",
      end: "top 10%",
      scrub: 1,
      // markers: true,
    },
  }
);

// Groups
images.forEach((box: any) => {
  gsap.fromTo(
    box,
    { y: 25 },
    {
      duration: 1,
      y: -25,
      scrollTrigger: {
        trigger: box,
        start: "center bottom",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      },
    }
  );
});

copies.forEach((box: any) => {
  gsap.fromTo(
    box,
    { y: 50 },
    {
      y: 150,
      duration: 1,
      scrollTrigger: {
        trigger: box,
        start: "top bottom",
        end: "bottom 10%",
        scrub: 1,
        //   markers: true,
      },
    }
  );
});
