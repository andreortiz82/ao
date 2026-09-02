export const projects = [
  {
    slug: "design-systems",
    href: "/work/design-systems",
    index: "01",
    title: "Design Systems",
    line: "Multiple brands. Growing teams. Products delivered.",
    meta: "Foundations · Tokens · Examples",
    headline: "A design system isn’t a component library.",
    emphasis: "It’s the contract.",
    body: "Written in tokens, maintained in code, and felt in every screen. Explore foundations, tokens, components, examples, governance, and agentic skills for distributed teams.",
  },
  {
    slug: "ai-chatbot",
    href: "/work/ai-chatbot",
    index: "02",
    title: "AI Chatbot",
    line: "Trust, context, and control when the output isn’t predictable.",
    meta: "Chat · Context · Control",
    headline: "Designing for AI isn’t about making chatbots look good.",
    emphasis: "It’s about trust and control.",
    body: "Non-deterministic interfaces need context, provenance, and a human in the loop. This working example is being built — the chat, context panel, and agent surfaces will live here.",
  },
  {
    slug: "scheduling",
    href: "/work/scheduling",
    index: "03",
    title: "Scheduling",
    line: "Organizational scheduling as a product problem, not a calendar.",
    meta: "Calendar · Windows · Status",
    headline: "Scheduling for one person is a calendar.",
    emphasis: "For an organization, it’s a product problem.",
    body: "Rules, conflicts, states, and consequences — at a scale where naive calendars break. This working example is being built — availability, windows, and workflow will live here.",
  },
  {
    slug: "finance",
    href: "/work/finance",
    index: "04",
    title: "Finance",
    line: "Making money legible, actions safe, and decisions confident.",
    meta: "Budgets · Invoices · Payables",
    headline: "Money is emotional.",
    emphasis: "Financial UX is a clarity problem.",
    body: "Complex numbers need context; every action needs confidence. This working example is being built — budgets, invoices, and payables will live here.",
  },
] as const;

export type Project = (typeof projects)[number];

export function getProject(slug: string): Project {
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    throw new Error(`Unknown project: ${slug}`);
  }
  return project;
}
