import React from "react";

export function truncateTextWithLink(text, maxLength, url) {
  if (text.length > maxLength) {
    return (
      <>
        {text.slice(0, maxLength)}
        ...
        <a href={url} target="_blank" rel="noopener noreferrer" className="read-more">
          อ่านต่อ 
        </a>
      </>
    );
  }
  return text;
}
