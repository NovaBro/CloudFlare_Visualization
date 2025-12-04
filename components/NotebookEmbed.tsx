import React, { useEffect } from 'react';

interface NotebookEmbedProps {
  /**
   * Observable notebook ID (e.g., "c234e5b925ac43ec")
   */
  notebookId: string;
  /**
   * Cell name to render (e.g., "graph1")
   */
  cellName: string;
  /**
   * Container class for styling
   */
  className?: string;
}

// Flag to track if script is already loaded
let scriptLoaded = false;

export const NotebookEmbed: React.FC<NotebookEmbedProps> = ({
  notebookId,
  cellName,
  className = 'w-full h-full'
}) => {
  useEffect(() => {
    // Load the Observable embeds script only once
    if (!scriptLoaded && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@observablehq/embeds@4';
      script.async = true;
      script.onload = () => {
        scriptLoaded = true;
      };
      document.body.appendChild(script);
    }

    // Hide scrollbars on iframe
    const style = document.createElement('style');
    style.innerHTML = `
      iframe {
        scrolling: no !important;
        overflow: hidden !important;
      }
      iframe html, iframe body {
        overflow: hidden !important;
      }
    `;
    if (!document.querySelector('style[data-scrollbar-hide]')) {
      style.setAttribute('data-scrollbar-hide', 'true');
      document.head.appendChild(style);
    }
  }, []);

  const embedUrl = `https://observablehq.com/embed/${notebookId}?cells=${cellName}`;

  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        scrolling="no"
        style={{
          border: 'none',
          borderRadius: '0.5rem',
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}
        title={`Observable ${cellName}`}
      />
    </div>
  );
};
