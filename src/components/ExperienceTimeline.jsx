import style from '../styles/about.module.css'

export const ExperienceTimeline = (props) => {

    return (
        <div className={style["about-timline"]}>
            <h3>Experience</h3>

            <table>
                <tbody>
                    <tr>
                        <th>2006</th>
                        <td>Completed a school and began interning at a New York City record
                            label. My focus was on music production and studio recording. Completely by accident, I started working with the creative
                            marketing team. It was during this time I learned Photoshop, Flash, and the basics of web development.</td>
                    </tr>
                    <tr>
                        <th>2007</th>
                        <td>Relocated to Columbus, OH were I continued to learn and gain real agency
                            experience. I worked with clients like: Procter & Gamble, Nationwide,
                            Disney, Toyota USA, and Catepillar. As you would expect, the demand for
                            quality was high and I spent many late evenings learning: visual design,
                            web development, video production, and motion graphics.</td>
                    </tr>
                    <tr>
                        <th>2009</th>
                        <td>The iPhone was killing Flash. I began to focus on HTML, CSS, and Javascript.
                            I also started to learn PHP, Ruby on Rails and Python. I was fortunate to be
                            working with some of the best people in the industry. I learned a lot from
                            them and continue to use those skills today.</td>
                    </tr>

                    <tr>
                        <th>2010</th>
                        <td>The tech startup environment was potent. Everyone was hustling and trying to
                            build products to compete with Facebook, Twitter, and LinkedIn. Using the
                            skills I learned so far, I was excited to build something new with small
                            teams. During this time, I learned a lot about being a <i>product minded</i> designer, user
                            experience, and how to build a business.</td>
                    </tr>

                    <tr>
                        <th>2012</th>
                        <td>After years of developing my skills and building strong relationships, I decided to start freelancing. I offered services for
                            UI/X design, branding, design systems development, and front-end
                            development. I learned the importance of communication and how to manage
                            client expectations. I also learned how to run a business, how to lead
                            external teams, and the joys of US tax policy.</td>
                    </tr>

                    <tr>
                        <th>2017 - Current</th>
                        <td>After years of successful freelancing, I decided to join a team again.
                            An opportunity in the healthcare space presented itself, and I was eager to contribute. Today, I work with a team of talented designers, developers, and product managers to build a system that helps people live healthier lives. It's incredibly rewarding to work.</td>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}