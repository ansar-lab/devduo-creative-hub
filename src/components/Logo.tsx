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
        {/* Circle shape */}
        <circle
          cx="35"
          cy="50"
          r="25"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          fill="none"
          className={animated ? 'animate-[draw_2s_ease-in-out_forwards]' : ''}
          style={{
            strokeDasharray: animated ? '157' : 'none',
            strokeDashoffset: animated ? '157' : '0'
          }}
        />
        
        {/* Rectangle shape */}
        <rect
          x="45"
          y="25"
          width="35"
          height="35"
          stroke="hsl(var(--primary-glow))"
          strokeWidth="3"
          fill="none"
          rx="4"
          className={animated ? 'animate-[draw_2s_ease-in-out_0.5s_forwards]' : ''}
          style={{
            strokeDasharray: animated ? '140' : 'none',
            strokeDashoffset: animated ? '140' : '0'
          }}
        />
        
        {/* Intersection glow effect */}
        <circle
          cx="55"
          cy="40"
          r="8"
          fill="hsl(var(--primary-glow) / 0.3)"
          className={animated ? 'animate-[fadeIn_1s_ease-in-out_1.5s_forwards]' : ''}
          style={{ opacity: animated ? '0' : '1' }}
        />
      </svg>
    </div>
  );
};