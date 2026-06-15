"use client"

import React, { useEffect, useRef, useState } from "react"
import { InertiaOptions, motion, useDragControls } from "motion/react"

type DragElementsProps = {
  children: React.ReactNode
  dragElastic?:
    | number
    | { top?: number; left?: number; right?: number; bottom?: number }
    | boolean
  dragConstraints?:
    | { top?: number; left?: number; right?: number; bottom?: number }
    | React.RefObject<Element | null>
  dragMomentum?: boolean
  dragTransition?: InertiaOptions
  dragPropagation?: boolean
  selectedOnTop?: boolean
  dragOnLongPress?: boolean
  className?: string
}

interface DragWrapperProps {
  child: React.ReactNode
  dragElastic: DragElementsProps["dragElastic"]
  dragConstraints: DragElementsProps["dragConstraints"]
  dragMomentum: boolean
  dragTransition: DragElementsProps["dragTransition"]
  dragPropagation: boolean
  zIndex: number
  onDragStart: () => void
  onDragEnd: () => void
  dragOnLongPress?: boolean
}

const DragWrapper = ({
  child,
  dragElastic,
  dragConstraints,
  dragMomentum,
  dragTransition,
  dragPropagation,
  zIndex,
  onDragStart,
  onDragEnd,
  dragOnLongPress = false,
}: DragWrapperProps) => {
  const dragControls = useDragControls()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isCurrentlyDragging, setIsCurrentlyDragging] = useState(false)
  const startPosRef = useRef({ x: 0, y: 0 })

  const handlePointerDown = (event: React.PointerEvent) => {
    if (!dragOnLongPress) return
    setIsCurrentlyDragging(false)
    startPosRef.current = { x: event.clientX, y: event.clientY }

    // Start a timer for long press
    timeoutRef.current = setTimeout(() => {
      setIsCurrentlyDragging(true)
      onDragStart()
      dragControls.start(event.nativeEvent)
    }, 250) // 250ms delay for long press
  }

  const handlePointerUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const handlePointerMove = (event: React.PointerEvent) => {
    if (timeoutRef.current && !isCurrentlyDragging) {
      const dx = event.clientX - startPosRef.current.x
      const dy = event.clientY - startPosRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // If the user moves their mouse/finger by more than 15px before the long press triggers,
      // cancel the long press.
      if (distance > 15) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <motion.div
      drag
      dragElastic={dragElastic}
      dragConstraints={dragConstraints}
      dragMomentum={dragMomentum}
      dragTransition={dragTransition}
      dragPropagation={dragPropagation}
      dragControls={dragControls}
      dragListener={!dragOnLongPress}
      style={{
        zIndex,
        cursor: isCurrentlyDragging ? "grabbing" : "grab",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onDragStart={() => {
        if (!dragOnLongPress) {
          setIsCurrentlyDragging(true)
          onDragStart()
        }
      }}
      onDragEnd={() => {
        setIsCurrentlyDragging(false)
        onDragEnd()
      }}
      whileDrag={{ cursor: "grabbing" }}
      className="absolute pointer-events-auto"
    >
      {child}
    </motion.div>
  )
}

const DragElements: React.FC<DragElementsProps> = ({
  children,
  dragElastic = 0.5,
  dragConstraints,
  dragMomentum = true,
  dragTransition = { bounceStiffness: 200, bounceDamping: 300 },
  dragPropagation = true,
  selectedOnTop = true,
  dragOnLongPress = false,
  className,
}) => {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [zIndices, setZIndices] = useState<number[]>([])

  useEffect(() => {
    setZIndices(
      Array.from({ length: React.Children.count(children) }, (_, i) => i)
    )
  }, [children])

  const bringToFront = (index: number) => {
    if (selectedOnTop) {
      setZIndices((prevIndices) => {
        const newIndices = [...prevIndices]
        const currentIndex = newIndices.indexOf(index)
        newIndices.splice(currentIndex, 1)
        newIndices.push(index)
        return newIndices
      })
    }
  }

  return (
    <div ref={constraintsRef} className={`${className}`}>
      {React.Children.map(children, (child, index) => (
        <DragWrapper
          key={index}
          child={child}
          dragElastic={dragElastic}
          dragConstraints={dragConstraints || constraintsRef}
          dragMomentum={dragMomentum}
          dragTransition={dragTransition}
          dragPropagation={dragPropagation}
          zIndex={zIndices.indexOf(index)}
          onDragStart={() => {
            bringToFront(index)
          }}
          onDragEnd={() => undefined}
          dragOnLongPress={dragOnLongPress}
        />
      ))}
    </div>
  )
}

export default DragElements
