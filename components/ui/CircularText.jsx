import { useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';

const getRotationTransition = (duration, from, loop = true) => ({
  from,
  to: from + 360,
  ease: 'linear',
  duration,
  type: 'tween',
  repeat: loop ? Infinity : 0
});

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring',
    damping: 20,
    stiffness: 300
  }
});

const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '' }) => {
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const isHovering = useRef(false);

  const letters = useMemo(() => Array.from(text), [text]);

  const letterPositions = useMemo(() => {
    return letters.map((_, i) => {
      const rotationDeg = (360 / letters.length) * i;
      const factor = Math.PI / letters.length;
      const x = factor * i;
      const y = factor * i;
      return { rotationDeg, x, y };
    });
  }, [letters]);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = useCallback(() => {
    if (isHovering.current) return;
    isHovering.current = true;

    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 }
        };
        scaleVal = 1;
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig
    });
  }, [onHover, spinDuration, rotation, controls]);

  const handleHoverEnd = useCallback(() => {
    isHovering.current = false;
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, rotation, controls]);

  return (
    <motion.div
      className={`mx-auto rounded-full w-[200px] h-[200px] max-md:w-[120px] max-md:h-[120px] relative font-[900] text-slate-900 text-center cursor-pointer origin-center will-change-transform [contain:layout_style_paint] ${className}`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const { rotationDeg, x, y } = letterPositions[i];
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span
            key={`${letter}-${i}`}
            className="absolute inline-block inset-0 text-[24px] max-md:text-[18px] transition-all duration-500 ease-[cubic-bezier(0,0,0,1)] will-change-transform [backface-visibility:hidden] antialiased"
            style={{
              transform,
              WebkitTransform: transform
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;