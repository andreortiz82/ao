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
              Post-education internship at Sony Red in NYC. After a time and
              completely by accident, a personal design project caught some
              attention, leading to an invitation to collaborate with the design
              and marketing teams. It was during this period that I gained
              proficiency in using Photoshop, Flash, and acquired fundamental
              skills in web development.
            </td>
          </tr>
          <tr>
            <th>2006</th>
            <td>
              A new Ortiz familiy relocate to Columbus, OH. I gaining valuable
              agency experience. I design material for Procter & Gamble,
              Nationwide Insurance, Disney, Toyota USA, and Caterpillar, to name
              a few. The demand for top-notch quality was substantial, I
              dedicate evenings both at the office and at home to level up in
              visual design, web development, ActionScript, video production,
              and motion graphics.
            </td>
          </tr>
          <tr>
            <th>2009</th>
            <td>
              The rise of the iPhone had a significant impact on the decline of
              Flash. In response, I shifted my focus towards HTML, CSS, and
              Javascript. I paired with and learned from enigneers on a daily
              basis to build successful products. Lessons I still apply to my
              work today.
            </td>
          </tr>

          <tr>
            <th>2010</th>
            <td>
              This time was incredibly exciting. Everyone wanted to compete with
              Facebook, Twitter, and LinkedIn. With the skills I had developed,
              I sought out small teams in hopes of building something innovative
              and fresh. As a designer, I became more product-focused. I was
              creating user experiences that aligned with the business goals. I
              never did make millions but the hustle was life changing.
            </td>
          </tr>

          <tr>
            <th>2013</th>
            <td>
              I wanted to spend more time at home with my family, I made the
              decision to freelance. I provided a range of services, including
              UI/X design, branding, design systems, documentation, and
              front-end development. This freelance experience taught me the
              critical significance of effective communication, adeptly managing
              client expectations, navigating contract negotiations, and the art
              of building a robust professional network.
            </td>
          </tr>

          <tr>
            <th>2017 - Current</th>
            <td>
              Following several amazing years as a freelancer, I decided to
              rejoin a team. An exciting opportunity emerged in the healthcare
              space and I was enthusiastic to make a meaningful contribution.
              Today, I collaborate with a group of highly skilled designers,
              developers, and product managers to bring medicines to market and
              improve peoples lives. My primary areas of focus is product
              design, design systems, and relationships.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
