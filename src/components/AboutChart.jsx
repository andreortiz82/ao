export const AboutKeywords = (props) => {
  const keywords = props.data
  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, i) => {
        return (
          <span key={i} className="bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 px-4 py-2 font-semibold rounded-full">
            {keyword.label}
          </span>
        );
      })}
    </div>
  );
}
