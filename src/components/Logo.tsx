import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

export const Logo = ({ className, size = 'md', animated = false }: LogoProps) => {
  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <svg
        viewBox="0 0 100 100"
        className={cn(
          'w-full h-full',
          animated && 'animate-pulse'
        )}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* First D */}
        <path
          d="M 20 25 L 20 75 L 45 75 C 55 75 65 65 65 50 C 65 35 55 25 45 25 Z"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'animate-[draw_2s_ease-in-out_forwards]' : ''}
          style={{
            strokeDasharray: animated ? '140' : 'none',
            strokeDashoffset: animated ? '140' : '0'
          }}
        />
        
        {/* Second D (rotated/flipped) */}
        <path
          d="M 80 25 L 80 75 L 55 75 C 45 75 35 65 35 50 C 35 35 45 25 55 25 Z"
          stroke="hsl(var(--primary-glow))"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'animate-[draw_2s_ease-in-out_0.5s_forwards]' : ''}
          style={{
            strokeDasharray: animated ? '140' : 'none',
            strokeDashoffset: animated ? '140' : '0'
          }}
        />
        
        {/* Intersection glow effect where D's meet */}
        <ellipse
          cx="50"
          cy="50"
          rx="6"
          ry="12"
          fill="hsl(var(--primary-glow) / 0.3)"
          className={animated ? 'animate-[fadeIn_1s_ease-in-out_1.5s_forwards]' : ''}
          style={{ opacity: animated ? '0' : '1' }}
        />
      </svg>
    </div>
  );
};