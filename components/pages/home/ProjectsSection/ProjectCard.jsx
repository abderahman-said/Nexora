"use client";

import { useRef } from 'react';
import Card from '@/components/ui/Card';
import gsap from 'gsap';

export default function ProjectCard({ p }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3,
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.5,
      overwrite: "auto"
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="proj-3d-card group/3d relative h-full w-full will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Card className="w-full h-full min-h-[300px] mx-auto transition-all duration-300 group-hover/3d:shadow-[0_20px_50px_rgba(37,99,235,0.15)] dark:group-hover/3d:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <Card.Image
          src={p.image}
          alt={p.name}
          href={p.link}
          id={p.id}
          category={p.category}
          accent={p.accent}
        />
        <Card.Body>
          <div suppressHydrationWarning>
            <Card.Title>{p.name}</Card.Title>
            <Card.Category>{p.category}</Card.Category>
            <Card.Divider />
            <Card.Tags tags={p.skills} />
          </div>
          <Card.Action href={p.link} accent={p.accent} name={p.name} />
        </Card.Body>
      </Card>
    </div>
  );
}


