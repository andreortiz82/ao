export function Chapter({ id, index, title, lede, children }) {
  return (
    <section className="dsys-chapter" id={id} aria-labelledby={`${id}-heading`}>
      <header className="dsys-chapter-head dsys-reveal">
        <p className="dsys-index">{index}</p>
        <h2 id={`${id}-heading`}>{title}</h2>
        <p className="dsys-lede">{lede}</p>
      </header>
      <div className="dsys-chapter-body dsys-reveal">{children}</div>
    </section>
  );
}

export function Panel({ children, className = "" }) {
  return <div className={`dsys-panel ${className}`.trim()}>{children}</div>;
}

export function Label({ children }) {
  return <p className="dsys-label">{children}</p>;
}
