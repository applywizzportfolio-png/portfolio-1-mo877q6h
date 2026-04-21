import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

const DataFlowBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number; y: number; speed: number; size: number; opacity: number; color: string;
    }

    const darkColors = ["#00A8A8", "#007BFF", "#7FE7DC", "#1E2A78"];
    const lightColors = ["#00888870", "#007BFF60", "#00A8A860", "#1E2A7850"];
    const colors = theme === "dark" ? darkColors : lightColors;

    const particles: Particle[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 1.2,
        size: 1 + Math.random() * 2,
        opacity: theme === "dark" ? 0.1 + Math.random() * 0.5 : 0.05 + Math.random() * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const gridOpacity = theme === "dark" ? "0.08" : "0.04";
    const lineOpacity = theme === "dark" ? "15" : "10";

    const drawGrid = () => {
      ctx.strokeStyle = `rgba(30, 42, 120, ${gridOpacity})`;
      ctx.lineWidth = 0.5;
      const spacing = 60;
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
    };

    let flowOffset = 0;
    const drawPipelineLines = () => {
      const lines = [
        { y: canvas.height * 0.2, color: "#00A8A8" },
        { y: canvas.height * 0.5, color: "#007BFF" },
        { y: canvas.height * 0.8, color: "#1E2A78" },
      ];
      lines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color + lineOpacity;
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 2) {
          const y = line.y + Math.sin((x + flowOffset) * 0.008) * 30;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();

        for (let i = 0; i < 5; i++) {
          const dotX = ((flowOffset * 2 + i * (canvas.width / 5)) % (canvas.width + 100)) - 50;
          const dotY = line.y + Math.sin((dotX + flowOffset) * 0.008) * 30;
          ctx.beginPath();
          ctx.fillStyle = line.color + (theme === "dark" ? "60" : "40");
          ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const connOpacity = theme === "dark" ? 0.05 : 0.025;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      drawPipelineLines();
      flowOffset += 0.8;

      particles.forEach((p) => {
        p.y += p.speed;
        if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 168, 168, ${connOpacity * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default DataFlowBackground;
