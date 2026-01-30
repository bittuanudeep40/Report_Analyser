import { useEffect, useRef, useState, useCallback } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  layer: number;
}

interface Nebula {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

export function SpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<Star[]>([]);
  const [nebulas] = useState<Nebula[]>([
    { x: 20, y: 30, size: 400, color: "hsl(260, 60%, 30%)", opacity: 0.15 },
    { x: 80, y: 70, size: 500, color: "hsl(200, 70%, 25%)", opacity: 0.12 },
    { x: 50, y: 20, size: 350, color: "hsl(185, 60%, 25%)", opacity: 0.1 },
    { x: 10, y: 80, size: 300, color: "hsl(280, 50%, 28%)", opacity: 0.08 },
  ]);

  // Generate stars on mount
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = window.innerWidth < 768 ? 100 : 200;
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.5 + 0.1,
          twinkleSpeed: Math.random() * 3 + 2,
          layer: Math.floor(Math.random() * 3), // 0, 1, 2 for parallax depth
        });
      }
      setStars(newStars);
    };

    generateStars();
    window.addEventListener("resize", generateStars);
    return () => window.removeEventListener("resize", generateStars);
  }, []);

  // Track mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  }, []);

  // Track touch movement for mobile
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!containerRef.current || !e.touches[0]) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
    const y = (e.touches[0].clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove);
    
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  // Calculate parallax offset based on layer
  const getParallaxOffset = (layer: number) => {
    const multiplier = (layer + 1) * 15;
    return {
      x: mousePosition.x * multiplier,
      y: mousePosition.y * multiplier,
    };
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-auto"
      style={{
        background: "linear-gradient(180deg, hsl(230, 25%, 5%) 0%, hsl(230, 30%, 8%) 50%, hsl(250, 25%, 10%) 100%)",
      }}
    >
      {/* Nebula layers */}
      {nebulas.map((nebula, index) => {
        const offset = getParallaxOffset(index % 3);
        return (
          <div
            key={index}
            className="absolute rounded-full blur-3xl transition-transform duration-300 ease-out"
            style={{
              left: `${nebula.x}%`,
              top: `${nebula.y}%`,
              width: nebula.size,
              height: nebula.size,
              background: `radial-gradient(circle, ${nebula.color} 0%, transparent 70%)`,
              opacity: nebula.opacity,
              transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
            }}
          />
        );
      })}

      {/* Star layers */}
      {[0, 1, 2].map((layer) => {
        const offset = getParallaxOffset(layer);
        return (
          <div
            key={layer}
            className="absolute inset-0 transition-transform duration-150 ease-out"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
            }}
          >
            {stars
              .filter((star) => star.layer === layer)
              .map((star) => (
                <div
                  key={star.id}
                  className="absolute rounded-full"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: star.size,
                    height: star.size,
                    backgroundColor: star.size > 1.5 ? "hsl(185, 80%, 80%)" : "white",
                    opacity: star.opacity,
                    boxShadow: star.size > 1.5 
                      ? `0 0 ${star.size * 3}px hsl(185, 80%, 70%)` 
                      : `0 0 ${star.size * 2}px white`,
                    animation: `twinkle ${star.twinkleSpeed}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * star.twinkleSpeed}s`,
                  }}
                />
              ))}
          </div>
        );
      })}

      {/* Central glow */}
      <div
        className="absolute transition-all duration-500 ease-out"
        style={{
          left: "50%",
          top: "30%",
          width: 600,
          height: 600,
          transform: `translate(-50%, -50%) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          background: "radial-gradient(circle, hsl(185, 80%, 50%, 0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, transparent 0%, hsl(230, 25%, 5%, 0.5) 100%)",
        }}
      />
    </div>
  );
}