"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Slider({ slides }) {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  const n = slides.length;

  useEffect(() => {
    if (pause) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 4500);
    return () => clearInterval(t);
  }, [pause, n]);

  const go = (k) => setI((k + n) % n);

  return (
    <div
      className="slider"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      <div className="slides" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map((s, k) => (
          <div key={k} className={`slide ${s.tone}`} style={{ background: s.bg }}>
            <div className="slide-text">
              <span className="slide-tag">{s.tag}</span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              <Link href={s.link} className="btn btn-yel">{s.cta} →</Link>
            </div>
            <div className="slide-img">
              <img src={s.image} alt={s.title} className={s.frame ? "framed" : ""} />
            </div>
          </div>
        ))}
      </div>

      <button className="arrow left" onClick={() => go(i - 1)} aria-label="আগেরটি">‹</button>
      <button className="arrow right" onClick={() => go(i + 1)} aria-label="পরেরটি">›</button>

      <div className="dots">
        {slides.map((_, k) => (
          <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`স্লাইড ${k + 1}`} />
        ))}
      </div>
    </div>
  );
}
