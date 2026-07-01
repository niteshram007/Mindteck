"use client";

import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function GalaxyBackground({ className = "", style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const wrapper = canvas.parentElement;
    if (!wrapper) return;

    const prefersReducedMotion = Boolean(
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    );

    let animationFrameId = 0;
    let resizeObserver;

    let width = 1;
    let height = 1;
    let dpr = 1;
    let centerX = 0;
    let centerY = 0;
    let radiusX = 1;
    let radiusY = 1;
    let backgroundGradient = null;

    let stars = [];
    let lastTime = 0;

    function pickStarColor() {
      const r = Math.random();
      if (r < 0.78) return { h: 0, s: 0, l: 100 }; // white
      if (r < 0.9) return { h: 210, s: 100, l: 92 }; // blue
      if (r < 0.98) return { h: 275, s: 100, l: 92 }; // purple
      return { h: 45, s: 100, l: 92 }; // warm
    }

    function createStars() {
      const area = width * height;
      const count = clamp(Math.round(area / 2600), 320, 680);

      stars = Array.from({ length: count }, () => {
        const distance = Math.pow(Math.random(), 1.7); // bias toward center
        const angle = Math.random() * TAU;

        const size = 0.35 + Math.random() * 1.75 * (1 - distance * 0.6);
        const baseAlpha = 0.22 + Math.random() * 0.6;
        const twinkleAmp = 0.1 + Math.random() * 0.25;
        const twinkleSpeed = 0.0009 + Math.random() * 0.0022; // rad/ms
        const spin = (0.00008 + Math.random() * 0.00018) * (1 - distance * 0.6); // rad/ms
        const color = pickStarColor();

        return {
          distance,
          angle,
          size,
          baseAlpha,
          twinkleAmp,
          twinkleSpeed,
          twinklePhase: Math.random() * TAU,
          spin,
          color,
        };
      });
    }

    function resize() {
      const rect = wrapper.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = clamp(window.devicePixelRatio || 1, 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      centerX = width * 0.5;
      centerY = height * 0.55;
      radiusX = width * 0.55;
      radiusY = height * 0.55;

      backgroundGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        Math.min(width, height) * 0.05,
        centerX,
        centerY,
        Math.max(width, height) * 0.85
      );
      backgroundGradient.addColorStop(0, "rgba(120, 100, 255, 0.14)");
      backgroundGradient.addColorStop(0.55, "rgba(80, 180, 255, 0.08)");
      backgroundGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      createStars();
    }

    function draw(time) {
      const dt = lastTime ? clamp(time - lastTime, 0, 40) : 16;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-over";
      if (backgroundGradient) {
        ctx.fillStyle = backgroundGradient;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = "lighter";
      for (const star of stars) {
        star.angle += star.spin * dt;
        star.twinklePhase += star.twinkleSpeed * dt;

        const x = centerX + Math.cos(star.angle) * star.distance * radiusX;
        const y = centerY + Math.sin(star.angle) * star.distance * radiusY;

        const alpha = clamp(
          star.baseAlpha + Math.sin(star.twinklePhase) * star.twinkleAmp,
          0.04,
          1
        );

        ctx.fillStyle = `hsla(${star.color.h}, ${star.color.s}%, ${star.color.l}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, TAU);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    resize();

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => resize());
      resizeObserver.observe(wrapper);
    } else {
      window.addEventListener("resize", resize);
    }

    if (prefersReducedMotion) {
      draw(0);
      return () => {
        if (resizeObserver) resizeObserver.disconnect();
        window.removeEventListener("resize", resize);
      };
    }

    const loop = (time) => {
      draw(time);
      animationFrameId = window.requestAnimationFrame(loop);
    };
    animationFrameId = window.requestAnimationFrame(loop);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={style}
    />
  );
}
