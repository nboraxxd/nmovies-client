import { cn } from '@/utils'

interface Props {
  percent: number
  size?: number
  strokeWidth?: number
  className?: string
  strokeColor?: 'red' | 'orange' | 'green'
}

export default function CircularProgressBar(props: Props) {
  const { percent, className, size = 40, strokeWidth = 4, strokeColor = 'green' } = props

  const radius = size / 2 - strokeWidth
  const pirameter = 2 * Math.PI * radius

  return (
    <div className={cn('relative', className)}>
      <svg width={`${size}px`} height={`${size}px`}>
        <circle
          r={`${radius}px`}
          cx={`${size / 2}px`}
          cy={`${size / 2}px`}
          stroke="white"
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          r={`${radius}px`}
          cx={`${size / 2}px`}
          cy={`${size / 2}px`}
          stroke={strokeColor}
          fill="none"
          strokeWidth={`${strokeWidth}px`}
          strokeDasharray={`${pirameter}px`}
          strokeDashoffset={`${pirameter - (pirameter * percent) / 100}px`}
          transform="rotate(-90)"
          className="origin-center"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs">{percent}</span>
    </div>
  )
}
