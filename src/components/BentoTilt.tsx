'use client'
import React, { useState, ReactNode, useRef } from 'react';

type BentoTiltProps = {
  children: ReactNode;
  className?: string;
}

const BentoTilt = ({ children, className = '' }: BentoTiltProps) => {
  const [transformStyle, setTransformStyle] = useState<string>('');
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent): void => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX: number = (event.clientX - left) / width;
    const relativeY: number = (event.clientY - top) / height;

    const tiltX: number = (relativeY - 0.5) * 5;
    const tiltY: number = (relativeX - 0.5) * -5;

    const newTransform: string = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = (): void => {
    setTransformStyle('');
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export default BentoTilt;