import React, { useEffect, useRef } from 'react';
import { Runtime, Inspector } from '@observablehq/runtime';

interface ObservableChartProps {
  /**
   * The default export from your downloaded Observable notebook module.
   * Usage: import define from './my-notebook.js';
   */
  define: any; 
  /**
   * The name(s) of the specific cell(s) you want to render.
   * Pass an array to render multiple cells that interact with each other (e.g. ["viewof year", "chart"]).
   */
  names: string[];
}

export const ObservableChart: React.FC<ObservableChartProps> = ({ define, names }) => {
  // We use a map to store references to the DOM elements for each cell
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  // Store the runtime so we can dispose of it cleanly
  const runtimeRef = useRef<any>(null);

  useEffect(() => {
    // 1. Dispose of previous runtime if it exists (hot reload safety)
    if (runtimeRef.current) {
      runtimeRef.current.dispose();
    }

    // 2. Initialize the Observable Runtime
    const runtime = new Runtime();
    runtimeRef.current = runtime;
    
    // 3. Load the module
    // The observer callback determines where each cell gets rendered
    runtime.module(define, (name: string) => {
      // If the current cell name matches one of the names we requested...
      if (names.includes(name)) {
        // Find the corresponding DIV in our refs map
        const el = cellRefs.current.get(name);
        if (el) {
          // Render the cell into that DIV
          return new Inspector(el);
        }
      }
      // For all other cells (dependencies), return null (run in background, don't render)
      return null;
    });

    // 4. Cleanup on unmount
    return () => {
      runtime.dispose();
      runtimeRef.current = null;
    };
  }, [define, names]); // Re-run if the notebook definition or requested cells change

  return (
    <div className="w-full h-full flex flex-col gap-4 observable-container">
      {names.map((name) => (
        <div 
          key={name} 
          // Callback ref to store the DOM element in our Map
          ref={(el) => {
            if (el) cellRefs.current.set(name, el);
            else cellRefs.current.delete(name);
          }}
          className="observable-cell w-full"
        />
      ))}
    </div>
  );
};
