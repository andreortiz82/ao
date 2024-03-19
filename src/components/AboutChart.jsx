import style from "../styles/about.module.css";

export const AboutChart = (props) => {
  return (
    <div className={style["about-skill-chart"]}>
      <h5>{props.title}</h5>
      <div className={style["wrapper"]}>
        <div className={style["bars"]}>
          {props.data.map((skill, i) => {
            return (
              <div key={skill.label} className={style["bar"]}>
                <span
                  className={style["bar-label"]}
                  style={{ width: skill.amount }}
                >
                  {skill.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className={style["keys"]}>
          <span className={style["key"]}>Some Exposure</span>
          <span className={style["key"]}>Experienced</span>
          <span className={style["key"]}>Skills</span>
          <span className={style["key"]}>Mad Skills</span>
        </div>
      </div>
    </div>
  );
};

export const AboutKeywords = (props) => {
  const keywords = props.data
  return (
    <div className={style["skill-block"]}>
    <h5>{props.title}</h5>
    <div className={style["about-skill-keywords"]}>
      
      {keywords.map((keyword, i) => {
        return (
          <span key={i} className={style["keyword"]}>
            {keyword.label}
          </span>
        );
      })}
    </div>
    </div>
  );
}
