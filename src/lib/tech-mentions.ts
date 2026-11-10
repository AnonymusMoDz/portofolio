const TECH_NAMES = [
  "TypeScript",
  "JavaScript",
  "React Native",
  "React",
  "Next.js",
  "Three.js",
  "WebGL",
  "Node.js",
  "Express",
  "NestJS",
  "PHP",
  "Laravel",
  "Livewire",
  "Python",
  "Django",
  "Flask",
  "FastAPI",
  "Flutter",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "SQL",
  "OpenAI",
  "Pinecone",
  "Weaviate",
  "Azure",
  "AWS",
  "Docker",
  "Kubernetes",
  "Terraform",
];

/** The technologies a role's highlights name, so chips always match the written history. */
export function techMentioned(highlights: string[] = []): string[] {
  const text = highlights.join(" ");
  return TECH_NAMES.filter((name) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^\\w])${escaped}(?![\\w])(?! Native)`).test(text);
  });
}
