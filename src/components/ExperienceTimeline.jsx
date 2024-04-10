import style from "../styles/about.module.css";

export const ExperienceTimeline = (props) => {
  return (
    <div className={style["about-timline"]}>
      <h3>Experience</h3>

      <table>
        <tbody>
          <tr>
            <th>2004</th>
            <td>
              After college, I started an internship at Sony Red in NYC. By a
              stroke of luck, one of my personal design projects sparked some
              interest, and I was invited to collaborate with the design and
              marketing teams. This fantastic opportunity allowed me to become
              proficient in Photoshop, Flash, and even pick up some foundational
              web development skills.
            </td>
          </tr>
          <tr>
            <th>2006</th>
            <td>
              My family and I relocated to Columbus, OH where I gained
              real-world agency experience. I had the opportunity to design
              materials for prominent clients such as Procter & Gamble,
              Nationwide Insurance, Disney, Toyota USA, and Caterpillar, among
              others. The expectations were high, but I welcomed the challenge.
              I worked diligently to level up in visual design, web development,
              ActionScript, video production, and motion graphics.
            </td>
          </tr>
          <tr>
            <th>2009</th>
            <td>
              The rise of the iPhone significantly contributed to the decline of
              Flash. In response, I shifted my focus to HTML, CSS, and
              Javascript. I worked closely with engineers on a daily basis to
              build products.
            </td>
          </tr>

          <tr>
            <th>2010</th>
            <td>
              This period was incredibly exhilarating. Everyone was eager to
              compete with Facebook, Twitter, and LinkedIn. Using my developed
              skills, I joined small teams aiming to create something innovative
              and fresh. As a designer, my focus shifted more towards product. I
              designed user experiences, keeping business objectives in mind.
              Although we didn't strike gold, the hustle was life changing.
            </td>
          </tr>

          <tr>
            <th>2013</th>
            <td>
              I decided to freelance in order to spend more time at home with my
              family. This allowed me to provide a range of services, including
              UI/X design, branding, design systems, documentation, and
              front-end development.
            </td>
          </tr>

          <tr>
            <th>2017 - Current</th>
            <td>
              After several rewarding years as a freelancer, I chose to rejoin a
              team. I found an exciting opportunity in the healthcare sector and
              was eager to make a significant contribution. Now, I work
              alongside a team of highly skilled designers, developers, and
              product managers to bring medicines to market and improve people's
              lives. My main focus areas are product design, design systems, and
              relationships.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
