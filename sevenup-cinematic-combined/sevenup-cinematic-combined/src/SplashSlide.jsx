

import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
 
/**
 * Third slide: photo background + animated drops, ripples and splash.
 * Image: put the photo at  public/images/7up-splash.png
 */
export default function SplashSlide() {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  const parallaxRef = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const burstRef = useRef(null);
 
  useEffect(() => {
    const scene = sceneRef.current;
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    const R = (a, b) => a + Math.random() * (b - a);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
    let W = 0, H = 0, WL = 0, k = 1;
    let drops = [], bits = [], rip = [], specks = [];
    let t = 0, last = performance.now(), nextDrop = 0;
    let raf = 0, visible = false, fired = false, timer = 0;
 
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = scene.clientWidth;
      H = scene.clientHeight;
      WL = H * 0.875; // waterline inside the photo
      k = W / 800;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      specks = Array.from({ length: 26 }, () => ({
        x: R(0, W), y: R(0, H * 0.85), r: R(1, 3), s: R(8, 22), a: R(0.2, 0.7), p: R(0, 6),
      }));
    };
 
    const ripple = (x, big) => rip.push({ x, t: 0, big: big ? 1.6 : 1 });
 
    const burst = (x = W * R(0.35, 0.7)) => {
      for (let i = 0; i < 60; i++) {
        const a = -Math.PI / 2 + R(-1, 1);
        const s = R(250, 800) * k;
        bits.push({ x: x + R(-25, 25), y: WL, vx: Math.cos(a) * s * 0.6, vy: Math.sin(a) * s, r: R(1.5, 5) * k });
      }
      ripple(x, true);
      setTimeout(() => ripple(x, true), 140);
      setTimeout(() => ripple(x), 300);
    };
    burstRef.current = burst;
 
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      if (!visible) return;
      t += dt;
      ctx.clearRect(0, 0, W, H);
 
      specks.forEach((s) => {
        s.y -= s.s * dt;
        s.x += Math.sin(t + s.p) * 4 * dt;
        if (s.y < -5) { s.y = H * 0.85; s.x = R(0, W); }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * k * 1.6, 0, 7);
        ctx.fillStyle = `rgba(190,255,170,${s.a * 0.35})`;
        ctx.fill();
      });
 
      if (!reduce && (nextDrop -= dt) <= 0) {
        nextDrop = R(0.25, 0.7);
        drops.push({ x: R(W * 0.15, W * 0.85), y: -10, vy: 0 });
      }
      drops = drops.filter((d) => {
        d.vy += 1400 * k * dt;
        d.y += d.vy * dt;
        if (d.y >= WL) {
          ripple(d.x);
          for (let i = 0; i < 4; i++) bits.push({ x: d.x, y: WL, vx: R(-90, 90) * k, vy: R(-260, -120) * k, r: R(1, 2.4) * k });
          return false;
        }
        ctx.beginPath();
        ctx.ellipse(d.x, d.y, 2.4 * k, 6 * k, 0, 0, 7);
        ctx.fillStyle = "rgba(215,255,220,.75)";
        ctx.fill();
        return true;
      });
 
      bits = bits.filter((b) => {
        b.vy += 1500 * k * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.y >= WL && b.vy > 0) return false;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 7);
        ctx.fillStyle = "rgba(225,255,225,.85)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.5)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
        return true;
      });
 
      rip = rip.filter((r) => {
        r.t += dt * 0.75;
        const rx = r.t * W * 0.22 * r.big;
        ctx.beginPath();
        ctx.ellipse(r.x, WL + H * 0.03, rx, rx * 0.16, 0, 0, 7);
        ctx.strokeStyle = `rgba(200,255,210,${Math.max(0, 1 - r.t) * 0.8})`;
        ctx.lineWidth = 1.5 + r.big;
        ctx.stroke();
        return r.t < 1;
      });
    };
 
    // GSAP: entrance, float, mouse parallax
    const g = gsap.context(() => {
      if (reduce) return;
      gsap.fromTo(
        imgRef.current,
        { autoAlpha: 0, y: -70, scale: 1.08 },
        {
          autoAlpha: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: scene, start: "top 75%", once: true },
          onComplete: () =>
            gsap.to(imgRef.current, { y: -8, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        }
      );
    }, sectionRef);
 
    const qx = gsap.quickTo(parallaxRef.current, "x", { duration: 0.8, ease: "power3" });
    const qy = gsap.quickTo(parallaxRef.current, "y", { duration: 0.8, ease: "power3" });
    const onMove = (e) => {
      if (reduce) return;
      qx((e.clientX / window.innerWidth - 0.5) * -14);
      qy((e.clientY / window.innerHeight - 0.5) * -8);
    };
    const onClick = (e) => burst(e.clientX - scene.getBoundingClientRect().left);
 
    // Only animate while on screen; opening splash the first time it appears
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = performance.now();
      if (visible && !fired) {
        fired = true;
        timer = window.setTimeout(() => burst(W * 0.56), 900);
      }
    }, { threshold: 0.35 });
 
    const ro = new ResizeObserver(size);
    ro.observe(scene);
    io.observe(scene);
    sectionRef.current.addEventListener("pointermove", onMove);
    scene.addEventListener("click", onClick);
    size();
    raf = requestAnimationFrame(tick);
 
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      io.disconnect();
      ro.disconnect();
      scene.removeEventListener("click", onClick);
      sectionRef.current?.removeEventListener("pointermove", onMove);
      g.revert();
    };
  }, []);
 
  return (
    <section className="splash-feature section-pad" ref={sectionRef}>
      <div className="splash-copy">
        <p className="section-kicker">A CLASSIC, REIMAGINED</p>
        <h2 className="display-heading">
          CRACK OPEN<br />
          <span>SOMETHING FRESH.</span>
        </h2>
        <p>Meet the citrus-inspired refreshment at the heart of this playful concept. Tap the water to make it move.</p>
        <div className="splash-actions">
          <NavLink className="button button-lime" to="/products">Explore products <span>↗</span></NavLink>
          <button type="button" className="splash-again" onClick={() => burstRef.current?.()}>Splash again</button>
        </div>
      </div>
 
      <div className="splash-scene" ref={sceneRef}>
        <div className="splash-parallax" ref={parallaxRef}>
          <img
            ref={imgRef}
            className="splash-photo"
            src="/images/7up-splash.png"
            alt="7UP can floating above water with ice and lime slices"
          />
        </div>
        <canvas ref={canvasRef} className="splash-canvas" aria-hidden="true" />
      </div>
    </section>
  );
}
 