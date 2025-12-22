'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'motion/react';
import { useState, useEffect, useMemo, Children } from 'react';
import useMeasure from 'react-use-measure';

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  // keep desktop behavior unchanged, but tweak spacing and logo sizing on small screens
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const m = window.matchMedia('(max-width: 639px)');
    const update = () => {
      setIsMobile(m.matches);
      setViewportWidth(window.innerWidth);
    };
    update();
    m.addEventListener?.('change', update);
    window.addEventListener('resize', update);
    return () => {
      m.removeEventListener?.('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const usedGap = isMobile ? Math.max(8, Math.floor(gap / 2)) : gap;

  // prepare wrapped children so we can apply mobile-friendly constraints (logo max heights, padding)
  const items = useMemo(() => {
    return Children.toArray(children).map((child, i) => {
      const mobileStyle = isMobile
        ? { flex: `0 0 calc(50% - ${Math.max(4, Math.floor(usedGap / 2))}px)` }
        : undefined;

      return (
        <div
          key={i}
          style={mobileStyle}
          className="mx-2 md:mx-6 flex items-center justify-center [&>img]:max-h-5 md:[&>img]:max-h-7"
          // prevent images from being larger on mobile; we rely on child img resizing
        >
          {child}
        </div>
      );
    });
  }, [children, isMobile, usedGap]);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? (isMobile && viewportWidth ? viewportWidth * 2 : width) : height;
    const contentSize = size + usedGap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    const distanceToTravel = Math.abs(to - from);
    const duration = distanceToTravel / currentSpeed;

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to);
      const transitionDuration = remainingDistance / currentSpeed;

      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentSpeed,
    width,
    height,
    usedGap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  // pointer handlers for touch devices: pause/fade speed while touching and resume on release
  const pointerProps = {
    onPointerDown: () => {
      setIsTransitioning(true);
      // slow down so user can interact without breaking the loop
      setCurrentSpeed(Math.max(20, Math.floor(speed / 4)));
    },
    onPointerUp: () => {
      setIsTransitioning(true);
      setCurrentSpeed(speed);
    },
  };

  return (
    <div
      className={cn('overflow-hidden', className)}
      style={{
        touchAction: 'pan-y',
        ...(isMobile ? { width: '100vw', marginLeft: 'calc(50% - 50vw)' } : {}),
      }}
    >
      <motion.div
        className={`flex ${isMobile ? 'w-full' : 'w-max'} items-center`}
        style={{
          ...(direction === 'horizontal' ? { x: translation } : { y: translation }),
          gap: `${usedGap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          width: isMobile ? '200vw' : undefined,
        }}
        ref={ref}
        {...hoverProps}
        {...pointerProps}
      >
        {items}
        {items}
      </motion.div>
    </div>
  );
}
