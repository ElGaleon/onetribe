"use client"

import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef, useState,
} from "react"
import {motion, useAnimationFrame} from "motion/react"

import {cn} from "@/lib/utils"
import {useMousePositionRef} from "@/hooks/use-mouse-position-ref"

interface FloatingContextType {
    registerElement: (id: string, element: HTMLDivElement, depth: number) => void
    unregisterElement: (id: string) => void
}

const FloatingContext = createContext<FloatingContextType | null>(null)

interface FloatingProps {
    children: ReactNode
    className?: string
    sensitivity?: number
    easingFactor?: number
}

const Floating = ({
                      children,
                      className,
                      sensitivity = 1,
                      easingFactor = 0.05,
                      ...props
                  }: FloatingProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const elementsMap = useRef(
        new Map<
            string,
            {
                element: HTMLDivElement
                depth: number
                currentPosition: { x: number; y: number }
            }
        >()
    )
    const mousePositionRef = useMousePositionRef(containerRef as React.RefObject<HTMLElement>
    )

    const registerElement = useCallback(
        (id: string, element: HTMLDivElement, depth: number) => {
            elementsMap.current.set(id, {
                element,
                depth,
                currentPosition: {x: 0, y: 0},
            })
        },
        []
    )

    const unregisterElement = useCallback((id: string) => {
        elementsMap.current.delete(id)
    }, [])

    useAnimationFrame(() => {
        if (!containerRef.current) return

        elementsMap.current.forEach((data) => {
            const strength = (data.depth * sensitivity) / 20

            // Calculate new target position
            const newTargetX = mousePositionRef.current.x * strength
            const newTargetY = mousePositionRef.current.y * strength

            // Check if we need to update
            const dx = newTargetX - data.currentPosition.x
            const dy = newTargetY - data.currentPosition.y

            // Update position only if we're still moving
            data.currentPosition.x += dx * easingFactor
            data.currentPosition.y += dy * easingFactor

            data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
        })
    })

    return (
        <FloatingContext.Provider value={{registerElement, unregisterElement}}>
            <div
                ref={containerRef}
                className={cn("absolute top-0 left-0 w-full h-full", className)}
                {...props}
            >
                {children}
            </div>
        </FloatingContext.Provider>
    )
}

export default Floating

interface FloatingElementProps {
    children: ReactNode
    className?: string
    style?: React.CSSProperties
    depth?: number,
    dragElastic?: number
    dragConstraints?: { top?: number; left?: number; right?: number; bottom?: number } | React.RefObject<Element | null>
    dragMomentum?: boolean,
    dragTransition?: { bounceStiffness?: number; bounceDamping?: number },
    dragPropagation?: boolean,
    selectedOnTop?: boolean,
}

export const FloatingElement = ({
                                    children,
                                    className,
                                    style,
                                    depth = 1,
                                    dragElastic = 0.5,
                                    dragConstraints,
                                    dragMomentum = true,
                                    dragTransition = { bounceStiffness: 200, bounceDamping: 300 },
                                    dragPropagation = true,
                                    selectedOnTop = true,
                                }: FloatingElementProps) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const idRef = useRef(Math.random().toString(36).substring(7))
    const context = useContext(FloatingContext)
    const constraintsRef = useRef<HTMLDivElement>(null)
    const [zIndices, setZIndices] = useState<number[]>([])

    const [isDragging, setIsDragging] = useState(false)


    useEffect(() => {
        if (!elementRef.current || !context) return

        const nonNullDepth = depth ?? 0.01

        context.registerElement(idRef.current, elementRef.current, nonNullDepth)

        setZIndices(
            Array.from({length: React.Children.count(children)}, (_, i) => i)
        )

        return () => context.unregisterElement(idRef.current)
    }, [children, context, depth])

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
        <div
            ref={elementRef}
            style={style}
            className={cn("absolute will-change-transform", className)}
        >
            {children}
        </div>
    )
}
