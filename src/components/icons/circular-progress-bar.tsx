interface Props {
  percent: number
  size?: number
  strokeWidth?: number
  className?: string
}

export default function CircularProgressBar({ percent, className, size = 3, strokeWidth = 0.25 }: Props) {
  const radius = size / 2 - strokeWidth
  const pirameter = 2 * Math.PI * radius

  return (
    <svg width={`${size}vw`} height={`${size}vw`} className={className}>
      <circle
        r={`${radius}vw`}
        cx={`${size / 2}vw`}
        cy={`${size / 2}vw`}
        stroke="white"
        strokeWidth={`${strokeWidth}vw`}
      />
      <circle
        r={`${radius}vw`}
        cx={`${size / 2}vw`}
        cy={`${size / 2}vw`}
        stroke="green"
        fill="none"
        strokeWidth={`${strokeWidth}vw`}
        strokeDasharray={`${pirameter}vw`}
        strokeDashoffset={`${pirameter - (pirameter * percent) / 100}vw`}
        transform="rotate(-90)"
        className="origin-center"
        strokeLinecap="round"
      />
      <text
        x={`${size / 2}vw`}
        y={`${size / 2}vw`}
        fill="white"
        fontSize="16"
        alignmentBaseline="middle"
        textAnchor="middle"
      >
        {percent}
      </text>
    </svg>
  )
}
