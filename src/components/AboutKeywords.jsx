export const Tag = ({ label, size, key }) => {
  if (size === "small") {
    return (
      <a
        key={key}
        href={`/tag/${label}`}
        className="flex items-center justify-center bg-tag text-tag-label hover:text-tag-label-hover hover:bg-tag-primary hover:text-base px-4 py-1 font-semibold rounded-full text-sm text-nowrap"
      >
        {label}
      </a>
    );
  } else {
    return (
      <a
        key={key}
        href={`/tag/${label}`}
        className="flex items-center justify-center bg-tag text-tag-label hover:text-tag-label-hover hover:bg-tag-primary hover:text-base px-4 py-2 font-semibold rounded-full text-nowrap"
      >
        {label}
      </a>
    );
  }
};

export const AboutKeywords = ({ tags }) => {
  return (
    <article className="relative z-10">
      <div className="flex flex-wrap gap-4 justify-center">
        {tags.map((tag, i) => {
          return <Tag key={i} label={tag} />;
        })}
      </div>
    </article>
  );
};
