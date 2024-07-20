
export const Timeline = (props) => {

  const TimelineItem = (props) => {
    return (
      <div className="mb-8 ml-4">
        <div className="absolute w-3 h-3 bg-zinc-900 dark:bg-zinc-100 rounded-full mt-1.5 -left-1.5 border border-white dark:border-zinc-100"></div>
        <time className="mb-1 text-md font-normal text-zinc-400 dark:text-zinc-400">{props.date}</time>
        <h3 className="">{props.title}</h3>
        <p className="">{props.description}</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 p-8 rounded">
      <h2 className="mb-8">Experience</h2>

        <div className="relative border-l border-zinc-300 dark:border-zinc-600">
          <TimelineItem title="Early Sparks" description="I interned for an EDM music label after college. . My educationual focus was sound design and studio recording techniques. While there, I was invited to collaborate with the design and marketing teams. This fantastic opportunity helped me to learn Photoshop, Flash, and even pick up some foundational web design skills." date="2004, NYC New York" />
          <TimelineItem title="Digging In" description="My family and I relocated to Columbus, OH where I gained
              real-world agency experience. I had the opportunity to design
              materials for prominent clients such as Procter & Gamble,
              Nationwide Insurance, Disney, Toyota USA, and Caterpillar, among
              others. The expectations were high, but I welcomed the challenge.
              I worked diligently to level up in visual design, web development,
              ActionScript, video production, and motion graphics." date="2006, Columbus OH" />
          <TimelineItem title="Adjustments & Growth" description="The rise of the iPhone significantly contributed to the decline of
              Flash. In response, I shifted my focus to HTML, CSS, and
              Javascript. I worked closely with engineers on a daily basis to
              build products." date="2009, Columbus OH" />
          <TimelineItem title="Building Foundations" description="This period was incredibly exhilarating. Everyone was eager to
              compete with Facebook, Twitter, and LinkedIn. Using my developed
              skills, I joined small teams aiming to create something innovative
              and fresh. As a designer, my focus shifted more towards product. I
              designed user experiences, keeping business objectives in mind.
              Although we didn't strike gold, the hustle was life changing." date="2010, Columbus OH" />
          <TimelineItem title="Taking Risks" description="I begin freelancing in order to spend more time at home with my
              family. I provided a range of services, including UI/X design,
              branding, design systems, documentation, and front-end
              development." date="2012, Austin TX" />
          <TimelineItem title="Back in the band" description="After several rewarding years as a freelancer, I chose to rejoin a
              team. I found an exciting opportunity in the healthcare sector and
              was eager to make a significant contribution. Now, I work
              alongside a team of highly skilled designers, developers, and
              product managers to bring medicines to market and improve people's
              lives. My main focus areas are product design, design systems, and
              relationships." date="2017 - Current, Austin TX" />
        </div>
    </div>
  );
};
