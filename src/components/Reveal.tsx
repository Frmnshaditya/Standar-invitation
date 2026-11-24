import { ReactNode, useEffect, useRef, useState } from 'react';

export type ElementorAnimation =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'zoomIn'
  | 'bounceIn';

interface RevealProps {
  children: ReactNode;
  animation: ElementorAnimation;
  slow?: boolean;
  delay?: number;
  className?: string;
  triggerImmediately?: boolean;
}

export default function Reveal({
  children,
  animation,
  slow = false,
  delay = 0,
  className = '',
  triggerImmediately = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(triggerImmediately);

  useEffect(() => {
    if (triggerImmediately) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [triggerImmediately]);

  const speedClass = slow ? 'el-animated-slow' : 'el-animated';
  const animClass = visible ? `${speedClass} el-${animation}` : 'opacity-0';

  return (
    <div
      ref={ref}
      className={`${animClass} ${className}`}
      style={visible && delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
