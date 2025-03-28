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
const lazers = gsap.utils.toArray(".lazer");

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollTrigger);

gsap.to(".welcome", {
  duration: 1,
  y: -500,
  scrollTrigger: {
    trigger: ".welcome",
    start: "bottom center",
    end: "bottom top",
    scrub: 1,
    //   markers: true,
  },
});

gsap.to(".welcome-me", {
  duration: 1,
  y: -200,
  scrollTrigger: {
    trigger: ".welcome-me",
    start: "top top",
    end: "bottom top",
    scrub: 1,
    //   markers: true,
  },
});

gsap.fromTo(
  ".thank-you",
  { y: -200 },
  {
    duration: 2,
    y: 0,
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
    { y: 0 },
    {
      duration: 1,
      y: -100,
      // onStart, onUpdate, onRepeat, onComplete
      scrollTrigger: {
        trigger: box,
        start: "center bottom",
        end: "bottom top",
        scrub: 1,

        //   markers: true,
      },
    }
  );
});

copies.forEach((box: any) => {
  gsap.fromTo(
    box,
    { y: -50 },
    {
      y: 200,
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

lazers.forEach((box: any) => {
  gsap.fromTo(
    box,
    {
      x: -1000,
      y: random(0, 300),
      boxShadow: arrayElement(["0 0 10px 5px #F90E9B", "0 0 10px 5px #0C8AFF"]),
    },
    {
      y: random(0, 800),
      rotation: arrayElement([random(0, 15), random(0, -15)]),
      boxShadow: arrayElement(["0 0 10px 5px #F90E9B", "0 0 10px 5px #0C8AFF"]),
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
