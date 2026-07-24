"use client";

import { useEffect, useRef, useState } from "react";

export interface CarouselItem {
  icon: string;
  title: string;
  text: string;
  chip: string;
}

/**
 * A 3D rotating carousel — cards arranged in a ring in 3D space, draggable
 * with mouse/touch, navigable with arrow buttons or keyboard. The rotation
 * math (theta, translateZ ring positioning, drag-to-rotate) is ported from
 * a vanilla-JS reference the user provided; restyled here to match the
 * site's navy/gold theme instead of the reference's neon cyberpunk look.
 */
export default function WhyUsCarousel({ items }: { items: CarouselItem[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const thetaRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const [dims, setDims] = useState({ radius: 340, cardW: 300, cardH: 320 });

  const angleStep = 360 / items.length;

  useEffect(() => {
    function updateDims() {
      const w = window.innerWidth;
      if (w <= 576) setDims({ radius: 190, cardW: 220, cardH: 300 });
      else if (w <= 768) setDims({ radius: 240, cardW: 250, cardH: 300 });
      else setDims({ radius: 340, cardW: 300, cardH: 320 });
    }
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  function applyRotation(withTransition: boolean) {
    const el = carouselRef.current;
    if (!el) return;
    el.style.transition = withTransition
      ? "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
      : "none";
    el.style.transform = `translate(-50%, -50%) rotateY(${thetaRef.current}deg)`;
    const idx = Math.round(((-thetaRef.current % 360) + 360) % 360 / angleStep) % items.length;
    setCurrent(idx);
  }

  function next() {
    thetaRef.current -= angleStep;
    applyRotation(true);
  }
  function prev() {
    thetaRef.current += angleStep;
    applyRotation(true);
  }

  function handleDown(clientX: number) {
    draggingRef.current = true;
    startXRef.current = clientX;
  }
  function handleMove(clientX: number) {
    if (!draggingRef.current || !carouselRef.current) return;
    const diff = clientX - startXRef.current;
    carouselRef.current.style.transition = "none";
    carouselRef.current.style.transform = `translate(-50%, -50%) rotateY(${thetaRef.current + diff * 0.4}deg)`;
  }
  function handleUp(clientX: number) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const diff = clientX - startXRef.current;
    if (Math.abs(diff) > 20) {
      if (diff > 0) prev();
      else next();
    } else {
      thetaRef.current = Math.round(thetaRef.current / angleStep) * angleStep;
      applyRotation(true);
    }
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = (e: MouseEvent) => handleUp(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (draggingRef.current) e.preventDefault();
      handleMove(e.touches[0].clientX);
    };
    const onTouchEnd = (e: TouchEvent) => handleUp(e.changedTouches[0].clientX);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dims]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") next();
    else if (e.key === "ArrowRight") prev();
  }

  return (
    <div className="select-none">
      <div
        className="relative mx-auto"
        style={{ height: dims.cardH + 60, perspective: "1400px" }}
      >
        <div
          ref={carouselRef}
          role="group"
          tabIndex={0}
          aria-label="কেন আমাদের বেছে নেবেন — কার্ডসমূহ"
          onKeyDown={handleKeyDown}
          onMouseDown={(e) => handleDown(e.clientX)}
          onTouchStart={(e) => handleDown(e.touches[0].clientX)}
          className="absolute left-1/2 top-1/2 cursor-grab outline-none active:cursor-grabbing"
          style={{
            width: dims.cardW,
            height: dims.cardH,
            transformStyle: "preserve-3d",
            transform: "translate(-50%, -50%) rotateY(0deg)",
          }}
        >
          {items.map((item, i) => {
            const cardAngle = angleStep * i;
            const isActive = i === current;
            return (
              <div
                key={item.title}
                className={`absolute left-0 top-0 rounded-2xl border p-8 text-center shadow-premium transition-colors duration-500 ${
                  isActive ? "border-primary/30 bg-surface" : "border-white/10 bg-surface/80"
                }`}
                style={{
                  width: dims.cardW,
                  height: dims.cardH,
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${cardAngle}deg) translateZ(${dims.radius}px)`,
                  backfaceVisibility: "hidden",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div
                  className={`mx-auto mb-6 flex h-[75px] w-[75px] items-center justify-center rounded-full text-3xl transition ${item.chip}`}
                >
                  <i className={item.icon} />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={prev}
          aria-label="পূর্ববর্তী"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-surface text-primary shadow-gold-glow transition hover:-translate-y-0.5 hover:bg-primary hover:text-dark"
        >
          <i className="fa-solid fa-chevron-left" />
        </button>
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-label={item.title}
              onClick={() => {
                thetaRef.current = -angleStep * i;
                applyRotation(true);
              }}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="পরবর্তী"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-surface text-primary shadow-gold-glow transition hover:-translate-y-0.5 hover:bg-primary hover:text-dark"
        >
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>
    </div>
  );
}
