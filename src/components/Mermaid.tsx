import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter',
  look: 'handDrawn',
});

export default function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderChart = async () => {
      try {
        setError(null);
        // Clean up the chart string
        const cleanChart = chart.trim();
        if (!cleanChart) return;

        const { svg } = await mermaid.render(idRef.current, cleanChart);
        setSvg(svg);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError('Failed to render diagram. Please check the syntax.');
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className="my-4 p-4 glass rounded-xl text-red-400 text-xs font-mono">
        {error}
        <pre className="mt-2 opacity-50 overflow-x-auto">{chart}</pre>
      </div>
    );
  }

  return (
    <div 
      className="mermaid-container flex justify-center my-4 p-4 glass rounded-xl overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
