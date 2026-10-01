// Renders Product.description, which is plain text with light structure
// (official brand copy, see the official_product_descriptions migration):
// blank-line separated blocks, "## Heading" lines for sections and "• "
// lines for bullet lists. Anything else is a paragraph, so legacy one-line
// descriptions and admin-typed text render unchanged.
type Block =
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "text"; text: string };

const BULLET = /^[•\-*]\s+/;

function parse(source: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of source.replace(/\r\n/g, "\n").split(/\n\s*\n/)) {
    let lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines[0]?.startsWith("## ")) {
      blocks.push({ kind: "heading", text: lines[0].slice(3).trim() });
      lines = lines.slice(1);
    }
    // A block can mix a lead-in line with bullets ("This set contains:" + items).
    let text: string[] = [];
    let items: string[] = [];
    const flush = () => {
      if (text.length) blocks.push({ kind: "text", text: text.join("\n") });
      if (items.length) blocks.push({ kind: "list", items });
      text = [];
      items = [];
    };
    for (const line of lines) {
      if (BULLET.test(line)) {
        if (text.length) {
          blocks.push({ kind: "text", text: text.join("\n") });
          text = [];
        }
        items.push(line.replace(BULLET, ""));
      } else {
        if (items.length) flush();
        text.push(line);
      }
    }
    flush();
  }
  return blocks;
}

export function ProductDescription({ text }: { text: string }) {
  const blocks = parse(text);
  return (
    <div className="mt-7 flex max-w-[60ch] flex-col gap-3 text-sm leading-relaxed text-neutral-600">
      {blocks.map((block, i) => {
        if (block.kind === "heading") {
          return (
            <h2 key={i} className="mt-4 text-[11px] font-medium tracking-[0.16em] text-neutral-900 uppercase">
              {block.text}
            </h2>
          );
        }
        if (block.kind === "list") {
          return (
            <ul key={i} className="flex list-disc flex-col gap-1 pl-5 marker:text-neutral-400">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
