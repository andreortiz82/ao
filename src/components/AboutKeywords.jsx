export const Tag = ({ label, size, key }) => {
  if (size === "small") {
    return (
      <a
        key={key}
        href={`/tag/${label}`}
        className="bg-zinc-100 text-black px-4 py-1 font-semibold rounded-full text-sm"
      >
        {label}
      </a>
    );
  } else {
    return (
      <a
        key={key}
        href={`/tag/${label}`}
        className="bg-zinc-100 text-black px-4 py-2 font-semibold rounded-full"
      >
        {label}
      </a>
    );
  }
};

export const AboutKeywords = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => {
        return <Tag key={i} label={tag} />;
      })}
    </div>
  );
};
