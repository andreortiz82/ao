// export const keywords = [
//   { label: "Product Design" },
//   { label: "UI / UX" },
//   { label: "Prototyping" },
//   { label: "Wireframing" },
//   { label: "Design Systems" },
//   { label: "Design Tokens" },
//   { label: "UI Kits" },
//   { label: "Figma" },
//   { label: "Adobe CC" },
//   { label: "Front-End Development" },
//   { label: "React" },
//   { label: "Javascript" },
//   { label: "UI Components" },
//   { label: "Clojurescript" },
//   { label: "Ruby on Rails" },
//   { label: "Python" },
//   { label: "AI / LLM" },
//   { label: "Ollama" },
//   { label: "AI Agents" },
//   { label: "Node" },
//   { label: "SQLite" },
//   { label: "HTML / CSS" },
//   { label: "Tailwind" },
//   { label: "REST" },
//   { label: "Web Design" },
//   { label: "Video Production" },
//   { label: "Sound Design" },
//   { label: "Branding" },
//   { label: "Illustration" },
// ];

export const Tag = ({ label, size, key }) => {
  if (size === "small") {
    return (
      <a
        key={key}
        href={`/tag/${label}`}
        className="bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 px-4 py-1 font-semibold rounded-full text-sm"
      >
        {label}
      </a>
    );
  } else {
    return (
      <a
        key={key}
        href={`/tag/${label}`}
        className="bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 px-4 py-2 font-semibold rounded-full"
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
