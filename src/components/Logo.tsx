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
        {/* First D - Back */}
        <path
          d="M 25 20 L 25 80 L 50 80 C 65 80 75 65 75 50 C 75 35 65 20 50 20 L 25 20 Z"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'animate-[draw_2s_ease-in-out_forwards]' : ''}
          style={{
            strokeDasharray: animated ? '160' : 'none',
            strokeDashoffset: animated ? '160' : '0'
          }}
        />
        
        {/* Second D - Front (overlapping) */}
        <path
          d="M 40 30 L 40 90 L 65 90 C 80 90 90 75 90 60 C 90 45 80 30 65 30 L 40 30 Z"
          stroke="hsl(var(--primary-glow))"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'animate-[draw_2s_ease-in-out_0.5s_forwards]' : ''}
          style={{
            strokeDasharray: animated ? '160' : 'none',
            strokeDashoffset: animated ? '160' : '0'
          }}
        />
        
        {/* Intersection glow effect where D's overlap */}
        <ellipse
          cx="57"
          cy="55"
          rx="8"
          ry="15"
          fill="hsl(var(--primary-glow) / 0.2)"
          className={animated ? 'animate-[fadeIn_1s_ease-in-out_1.5s_forwards]' : ''}
          style={{ opacity: animated ? '0' : '1' }}
        />
      </svg>
    </div>
  );
};