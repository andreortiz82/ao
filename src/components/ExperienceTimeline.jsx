import style from "../styles/about.module.css";

export const ExperienceTimeline = (props) => {
  return (
    <div className={style["about-timline"]}>
      <h3>Experience</h3>

      <table>
        <tbody>
          <tr>
            <th>2005</th>
            <td>
              I completed my education and started interning at a record label
              in New York City. Initially, my primary focus was on music
              production and studio recording. However, unexpectedly, my
              creative talents were acknowledged, leading to an invitation to
              collaborate with the design and marketing teams. It was during
              this period that I gained proficiency in using Photoshop, Flash,
              and acquired fundamental skills in web development.
            </td>
          </tr>
          <tr>
            <th>2007</th>
            <td>
              After relocating to Columbus, OH, I continued my journey of
              learning and gaining valuable agency experience. I had the
              opportunity to collaborate with prominent companies such as
              Procter & Gamble, Nationwide Insurance, Disney, Toyota USA, and
              Caterpillar. The demand for top-notch quality was substantial,
              prompting me to dedicate numerous late evenings both at the office
              and at home to enhance my skills in visual design, web
              development, ActionScript, video production, and motion graphics.
            </td>
          </tr>
          <tr>
            <th>2009</th>
            <td>
              The rise of the iPhone had a significant impact on the decline of
              Flash. In response, I shifted my focus towards HTML, CSS, and
              Javascript. Additionally, I embarked on a journey to acquire
              knowledge in PHP, Ruby on Rails, and Python. I was fortunate to
              collaborate with some of the industry's finest professionals
              during this period, absorbing valuable insights and skills that I
              still apply to my work today.
            </td>
          </tr>

          <tr>
            <th>2010</th>
            <td>
              The tech startup scene was incredibly dynamic, with everyone
              striving to create products that could compete with giants like
              Facebook, Twitter, and LinkedIn. Armed with the skills I had
              acquired, I eagerly joined small teams to embark on the journey of
              creating something innovative. It was during this period that I
              transitioned into a product-focused designer, emphasizing user
              experience and interface design, while also gaining a profound
              understanding of the entrepreneurial aspects of building a
              business.
            </td>
          </tr>

          <tr>
            <th>2012</th>
            <td>
              After dedicating years to honing my skills and nurturing valuable
              connections, I made the decision to venture into freelancing. I
              provided a range of services, including UI/X design, branding,
              design systems, documentation, and front-end development. This
              freelance journey taught me the critical significance of effective
              communication, adeptly managing client expectations, navigating
              contract negotiations, and the art of building a robust
              professional network.
            </td>
          </tr>

          <tr>
            <th>2017 - Current</th>
            <td>
              Following several prosperous years as a freelancer, I made the
              choice to rejoin a team. An exciting opportunity emerged within
              the healthcare sector, and I was enthusiastic to make a meaningful
              contribution. Today, I collaborate with a group of highly skilled
              designers, developers, and product managers to create a system
              that enhances people's well-being. It's incredibly fulfilling
              work. My primary areas of focus include product design, design
              systems, and providing creative mentorship.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
