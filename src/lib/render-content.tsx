import React from "react";

function formatInlineText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Match ***bold italic***, **bold**, or *italic* — order matters
  const regex = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      parts.push(
        <strong key={`bi-${match.index}`}><em>{match[2]}</em></strong>
      );
    } else if (match[3]) {
      parts.push(<strong key={`b-${match.index}`}>{match[3]}</strong>);
    } else if (match[4]) {
      parts.push(<em key={`i-${match.index}`}>{match[4]}</em>);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      elements.push(
        <ul key={`bullets-${elements.length}`} className="list-disc list-inside space-y-1 my-3 text-forest-700">
          {bulletBuffer.map((item, i) => (
            <li key={i}>{formatInlineText(item)}</li>
          ))}
        </ul>
      );
      bulletBuffer = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith("- ")) {
      bulletBuffer.push(line.slice(2));
    } else {
      flushBullets();
      if (line.trim() === "") {
        elements.push(<br key={`br-${i}`} />);
      } else {
        elements.push(
          <p key={`p-${i}`} className="text-forest-700 leading-relaxed">
            {formatInlineText(line)}
          </p>
        );
      }
    }
  });

  flushBullets();
  return elements;
}
