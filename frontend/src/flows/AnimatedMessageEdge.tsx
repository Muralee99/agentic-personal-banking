import { BaseEdge, getSmoothStepPath, type EdgeProps } from "@xyflow/react"

export function AnimatedMessageEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 12,
  })

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ stroke: "var(--color-border)", strokeWidth: 1.5 }} />
      <circle r="4" fill="var(--color-primary)">
        <animateMotion dur="2.2s" repeatCount="indefinite" path={edgePath} />
      </circle>
    </>
  )
}
