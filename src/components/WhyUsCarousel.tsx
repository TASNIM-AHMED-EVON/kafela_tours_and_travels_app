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
 *
 * IMPORTANT: the drag-tracking listeners (mousemove/touchmove) are only
 * attached to `document` for the duration of an actual drag — attached on
 * pointer-down, removed on pointer-up. Earlier this attached them for the
 * whole time the component was mounted (i.e. the whole time someone was on
 * the home page), which made the touchmove listener non-passive site-wide
 * and caused normal page scrolling to feel laggy even when nowhere near
 * the carousel. See handleDown/handleUp below.
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

  // Kept as refs with a stable identity so the listener actually attached
  // to `document` never needs to change, while always calling through to
  // this render's latest logic (reassigned below on every render).
  const handleMoveRef = useRef<(clientX: number) => void>(() => {});
  const handleUpRef = useRef<(clientX: number) => void>(() => {});

  handleMoveRef.current = (clientX: number) => {
    if (!draggingRef.current || !carouselRef.current) return;
    const diff = clientX - startXRef.current;
    carouselRef.current.style.transition = "none";
    carouselRef.current.style.transform = `translate(-50%, -50%) rotateY(${thetaRef.current + diff * 0.4}deg)`;
  };
  handleUpRef.current = (clientX: number) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    detachDragListeners();
    const diff = clientX - startXRef.current;
    if (Math.abs(diff) > 20) {
      if (diff > 0) prev();
      else next();
    } else {
      thetaRef.current = Math.round(thetaRef.current / angleStep) * angleStep;
      applyRotation(true);
    }
  };

  // Stable (never-recreated) listener functions — required so
  // addEventListener/removeEventListener refer to the exact same function.
  const onMouseMove = useRef((e: MouseEvent) => handleMoveRef.current(e.clientX)).current;
  const onMouseUp = useRef((e: MouseEvent) => handleUpRef.current(e.clientX)).current;
  const onTouchMove = useRef((e: TouchEvent) => {
    if (draggingRef.current) e.preventDefault();
    handleMoveRef.current(e.touches[0].clientX);
  }).current;
  const onTouchEnd = useRef((e: TouchEvent) => handleUpRef.current(e.changedTouches[0].clientX)).current;

  function attachDragListeners() {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
  }
  function detachDragListeners() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }

  function handleDown(clientX: number) {
    draggingRef.current = true;
    startXRef.current = clientX;
    attachDragListeners();
  }

  // Safety net: if the component unmounts mid-drag (e.g. navigating away),
  // make sure the listeners don't leak.
  useEffect(() => {
    return () => detachDragListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                className="carousel-glass absolute left-0 top-0 rounded-2xl border p-8 text-center shadow-premium transition-all duration-500"
                style={{
                  width: dims.cardW,
                  height: dims.cardH,
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${cardAngle}deg) translateZ(${dims.radius}px)`,
                  backfaceVisibility: "hidden",
                  pointerEvents: isActive ? "auto" : "none",
                  borderColor: isActive ? "rgba(232, 205, 122, 0.6)" : "rgba(255, 255, 255, 0.14)",
                  opacity: isActive ? 1 : 0.65,
                  boxShadow: isActive
                    ? "0 20px 60px -15px rgba(0,0,0,0.55), 0 0 45px -6px rgba(203,161,53,0.4)"
                    : undefined,
                }}
              >
                <div
                  className={`relative z-10 mx-auto mb-6 flex h-[75px] w-[75px] items-center justify-center rounded-full text-3xl transition ${item.chip}`}
                >
                  <i className={item.icon} />
                </div>
                <h3 className="relative z-10 mb-3 font-display text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="relative z-10 text-sm leading-relaxed text-white/60">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
