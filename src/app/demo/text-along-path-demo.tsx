import AnimatedPathText from "@/components/fancy/text/text-along-path"

export default function TextAlongPathDemo() {
    // Rounded rectangle path
    const rectPath =
        "M 16,20 L 180,20 A 20,20 0 0,1 200,40 L 200,160 A 20,20 0 0,1 180,180 L 20,180 A 20,20 0 0,1 0,160 L 0,40 A 20,20 0 0,1 20,20"

    return (
        <div className="w-dvw h-dvh flex justify-center items-center text-blue-400 absolute ">
            <AnimatedPathText
                path={rectPath}
                svgClassName="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-2 sm:py-8"
                viewBox="-20 10 240 180"
                text="FREEDOM | LOYALTY | INCLUSION"
                textClassName="text-[10.6px] uppercase font-azeret-mono text-blue-400 z-index-1"
                duration={20}
                preserveAspectRatio="none"
                textAnchor="start"
            />
        </div>
    )
}
