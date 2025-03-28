import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { storytimeData } from "./data";

function random(min: number = 0, max: number = 100) {
  return Math.random() * (max - min) + min;
}

// Choose random element from array
const arrayElement = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

gsap.registerPlugin(ScrollTrigger);

export const Storyline = () => {
  const idea = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const images = gsap.utils.toArray(".image");
      const copies = gsap.utils.toArray(".copy");
      const lazers = gsap.utils.toArray(".lazer");

      // Singles
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
            y: random(0, 1000),
            boxShadow: arrayElement([
              "0 0 10px 5px #F90E9B",
              "0 0 10px 5px #0C8AFF",
            ]),
          },
          {
            y: random(0, 1000),
            rotation: arrayElement([random(0, 15), random(0, -15)]),
            boxShadow: arrayElement([
              "0 0 10px 5px #F90E9B",
              "0 0 10px 5px #0C8AFF",
            ]),
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
    },
    { scope: idea }
  );

  return (
    <div ref={idea}>
      <section className="welcome-section w-full h-[140vh] bg-black text-white flex flex-col items-center justify-center">
        <div className="welcome-container">
          <h1 className="font-black text-8xl welcome">Blah blah...</h1>
        </div>
        <div className="image-container">
          <img className="welcome-me" src="/me-photo-1.png" alt="me1" />
        </div>
        <div className="lazer-container">
          <span className="lazer "></span>
          <span className="lazer "></span>
          <span className="lazer "></span>
          <span className="lazer "></span>
          <span className="lazer "></span>
        </div>
      </section>
      {storytimeData.map((story, idx) => (
        <section
          key={idx}
          className="flex w-full h-[150vh] content-container bg-slate-100 odd:bg-slate-50"
        >
          <div className="w-[80%] m-auto flex  gap-10 content-block">
            <div className="bg-slate-50 border flex justify-center items-center rounded image w-[760px] h-[600px] drop-shadow-md">
              <img src={story.images[0]} alt="sketch" />
            </div>

            <div className="copy w-[640px] text-2xl flex flex-col gap-5">
              <p className="text-3xl leading-11">{story.heading}</p>
              <a href={story.url} className="text-blue-500">
                Read More
              </a>
            </div>
          </div>
        </section>
      ))}
      <section className="foo w-full h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="font-black text-8xl thank-you">Thank you</h1>
      </section>
    </div>
  );
};
