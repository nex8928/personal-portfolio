import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagnetProps {
  children: React.ReactNode;
  magnitude?: number;
  maxDistance?: number;
  damping?: number;
  stiffness?: number;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  magnitude = 0.3,
  maxDistance = 150,
  damping = 25,
  stiffness = 200,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);

  const xVal = useMotionValue(0);
  const yVal = useMotionValue(0);

  const x = useSpring(xVal, { damping, stiffness });
  const y = useSpring(yVal, { damping, stiffness });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < maxDistance) {
        setIsHovered(true);
        xVal.set(distanceX * magnitude);
        yVal.set(distanceY * magnitude);
      } else {
        setIsHovered(false);
        xVal.set(0);
        yVal.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [magnitude, maxDistance, xVal, yVal, damping, stiffness]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Magnet;
