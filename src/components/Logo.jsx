export const Logo = ({ alt }) => {
  const style = "dark:fill-zinc-100 fill-zinc-900";

  return (
    <div className="w-[100px]" title={alt}>
      <svg
        className="w-full h-full"
        width="100"
        height="50"
        viewBox="0 0 100 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={style}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M28.169 0L56.338 49.2537H0L28.169 0ZM13.2639 41.5578L28.169 15.4962L43.0741 41.5578H13.2639Z"
        />
        <path
          className={style}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M100 24.6269C100 38.2279 88.9648 49.2537 75.3521 49.2537C61.7395 49.2537 50.7042 38.2279 50.7042 24.6269C50.7042 11.0258 61.7395 0 75.3521 0C88.9648 0 100 11.0258 100 24.6269ZM92.3077 24.6269C92.3077 33.968 84.726 41.5578 75.3521 41.5578C65.9782 41.5578 58.3965 33.968 58.3965 24.6269C58.3965 15.2857 65.9782 7.6959 75.3521 7.6959C84.726 7.6959 92.3077 15.2857 92.3077 24.6269Z"
        />
      </svg>
    </div>
  );
};
