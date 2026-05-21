import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'characters' | 'words';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  threshold?: number;
  rootMargin?: string;
  stepDuration?: number;
  animationFrom?: Record<string, any>;
  animationTo?: Record<string, any>;
  easing?: string | number[];
  onAnimationComplete?: () => void;
  className?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 30,
  animateBy = 'words',
  direction = 'top',
  threshold = 0.15,
  rootMargin = '0px',
  stepDuration = 0.5,
  animationFrom,
  animationTo,
  easing = 'easeOut',
  onAnimationComplete,
  className = '',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: threshold, margin: rootMargin as any });

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const getOffset = () => {
    switch (direction) {
      case 'top': return { y: -30 };
      case 'bottom': return { y: 30 };
      case 'left': return { x: -30 };
      case 'right': return { x: 30 };
      default: return {};
    }
  };

  const defaultFrom = {
    filter: 'blur(10px)',
    opacity: 0,
    ...getOffset(),
  };

  const defaultTo = {
    filter: 'blur(0px)',
    opacity: 1,
    x: 0,
    y: 0,
  };

  const fromState = animationFrom || defaultFrom;
  const toState = animationTo || defaultTo;

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap ${className}`}
      style={{ display: 'inline-flex', flexWrap: 'wrap' }}
    >
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={fromState}
          animate={isInView ? toState : fromState}
          transition={{
            duration: stepDuration,
            delay: (i * delay) / 1000,
            ease: easing as any,
          }}
          className="inline-block"
          style={{ whiteSpace: 'pre' }}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
        >
          {el}
          {animateBy === 'words' && i < elements.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
