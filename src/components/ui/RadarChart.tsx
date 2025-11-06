'use client';

import { useEffect, useState } from 'react';

interface RadarChartProps {
  data: {
    label: string;
    value: number; // 0-5 scale
  }[];
}

export function RadarChart({ data }: RadarChartProps) {
  const [animatedValues, setAnimatedValues] = useState<number[]>(data.map(() => 0));

  // Animate values on mount
  useEffect(() => {
    const duration = 1200; // ms
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(data.map(d => d.value * easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [data]);

  const size = 500;
  const center = size / 2;
  const maxRadius = size / 2 - 60;
  const levels = 5;
  const angleStep = (Math.PI * 2) / data.length;

  // Calculate point position
  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const radius = (value / 5) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Generate polygon path
  const generatePath = (values: number[]) => {
    return values
      .map((value, i) => {
        const point = getPoint(i, value);
        return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
      })
      .join(' ') + ' Z';
  };

  return (
    <div>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto"
        style={{ maxWidth: '600px', margin: '0 auto', display: 'block' }}
      >
        {/* Background circles (levels) */}
        {Array.from({ length: levels }, (_, i) => {
          const radius = ((i + 1) / levels) * maxRadius;
          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#666666"
              strokeWidth="2"
            />
          );
        })}

        {/* Axis lines */}
        {data.map((_, i) => {
          const endPoint = getPoint(i, 5);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="#666666"
              strokeWidth="2"
            />
          );
        })}

        {/* Data polygon */}
        <path
          d={generatePath(animatedValues)}
          fill="#FFFFFF"
          fillOpacity="0.2"
          stroke="#FFFFFF"
          strokeWidth="4"
        />

        {/* Data points */}
        {animatedValues.map((value, i) => {
          const point = getPoint(i, value);
          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="6"
              fill="#FFFFFF"
            />
          );
        })}

        {/* Labels */}
        {data.map((item, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const labelRadius = maxRadius + 40;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);

          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fontWeight="600"
              fill="#FFFFFF"
              className="pointer-events-none"
            >
              {item.label}
            </text>
          );
        })}

        {/* Level labels (0-5) */}
        {Array.from({ length: levels + 1 }, (_, i) => {
          const value = i;
          const y = center - (i / levels) * maxRadius;
          return (
            <text
              key={i}
              x={center + 10}
              y={y}
              fontSize="10"
              fill="#999999"
              fontWeight="bold"
            >
              {value}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
