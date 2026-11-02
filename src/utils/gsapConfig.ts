import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Register standard GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

// Check for reduced motion preference
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Global default settings
export const BRAND_EASE = {
  smooth: 'power3.out',
  cinematic: 'power4.out',
  editorial: 'cubic-bezier(0.25, 1, 0.5, 1)',
  softBounce: 'back.out(1.4)',
};

/**
 * Image clip-path mask reveal animation
 */
export const animateMaskReveal = (
  element: HTMLElement | null,
  trigger?: HTMLElement | null,
  options?: {
    duration?: number;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'circle';
    scale?: boolean;
    scrub?: boolean | number;
  }
) => {
  if (!element || prefersReducedMotion()) return;

  const duration = options?.duration ?? 1.4;
  const delay = options?.delay ?? 0;
  const direction = options?.direction ?? 'up';

  let initialClip = 'inset(100% 0% 0% 0%)';
  let targetClip = 'inset(0% 0% 0% 0%)';

  if (direction === 'down') {
    initialClip = 'inset(0% 0% 100% 0%)';
  } else if (direction === 'left') {
    initialClip = 'inset(0% 100% 0% 0%)';
  } else if (direction === 'circle') {
    initialClip = 'circle(0% at 50% 50%)';
    targetClip = 'circle(100% at 50% 50%)';
  }

  gsap.set(element, { clipPath: initialClip });

  const tl = gsap.timeline({
    scrollTrigger: trigger
      ? {
          trigger: trigger,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          scrub: options?.scrub ?? false,
        }
      : undefined,
    delay,
  });

  tl.to(element, {
    clipPath: targetClip,
    duration,
    ease: 'power3.inOut',
  });

  if (options?.scale) {
    const img = element.querySelector('img') || element;
    gsap.fromTo(
      img,
      { scale: 1.16 },
      {
        scale: 1,
        duration: duration + 0.3,
        ease: 'power3.out',
        scrollTrigger: trigger
          ? {
              trigger: trigger,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          : undefined,
      }
    );
  }

  return tl;
};

/**
 * Editorial headline reveal with line masking
 */
export const animateEditorialText = (
  container: HTMLElement | null,
  trigger?: HTMLElement | null,
  options?: { delay?: number; stagger?: number }
) => {
  if (!container || prefersReducedMotion()) return;

  const lines = container.querySelectorAll('.text-line-inner');
  if (lines.length === 0) return;

  gsap.fromTo(
    lines,
    {
      yPercent: 120,
      opacity: 0,
      rotateX: -10,
    },
    {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      stagger: options?.stagger ?? 0.14,
      duration: 1.1,
      ease: BRAND_EASE.cinematic,
      delay: options?.delay ?? 0,
      scrollTrigger: trigger
        ? {
            trigger: trigger,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        : undefined,
    }
  );
};

export { gsap, ScrollTrigger, Flip };

