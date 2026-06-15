"use client"

import {useEffect} from "react"
import {exampleImages} from "@/utils/demo-images"
import {motion, stagger, useAnimate} from "motion/react"

import Floating, {
    FloatingElement,
} from "@/components/fancy/image/parallax-floating"
import OneTribeText from "@/app/svg/one-tribe-text";
import TextAlongPathDemo from "@/app/demo/text-along-path-demo";
import DragElements from "@/components/fancy/blocks/drag-elements";

const Preview = () => {
    const [scope, animate] = useAnimate()

    useEffect(() => {
        animate("img", {opacity: [0, 1]}, {duration: 0.5, delay: stagger(0.15)})
    }, [animate])

    return (
        <div
            className="flex w-dvw h-dvh justify-center items-center bg-blue-950 overflow-hidden"
            ref={scope}
        >
            <TextAlongPathDemo></TextAlongPathDemo>
            <motion.div
                className="z-50 text-center space-y-4 items-center flex flex-col"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.88, delay: 1.5}}
            >
                <DragElements dragMomentum={false} className="p-40">
                    <OneTribeText className={"w-full scale-300 group-hover:grayscale group-hover:opacity-60"}></OneTribeText>
                </DragElements>
            </motion.div>

            <Floating sensitivity={-1} className="overflow-hidden p-16">
                <FloatingElement depth={0.5} className="top-[12%] left-[11%] group-hover:grayscale group-hover:opacity-60">
                    <motion.img

                        initial={{opacity: 0}}
                        src={exampleImages[0].url}
                        className="w-64 h-64 md:w-64 md:h-48 object-cover hover:scale-110 duration-200 cursor-pointer transition-transform group-hover:grayscale group-hover:opacity-60"
                    />
                </FloatingElement>
                <FloatingElement depth={1} className="top-[10%] left-[32%]">
                    <motion.img
                        initial={{opacity: 0}}
                        src={exampleImages[1].url}
                        className="w-20 h-20 md:w-64 md:h-64 object-cover hover:scale-110 duration-200 cursor-pointer transition-transform group:hover:blur-sm"
                    />
                </FloatingElement>
                <FloatingElement depth={2} className="top-[2%] left-[60%]">
                    <motion.img
                        initial={{opacity: 0}}
                        src={exampleImages[2].url}
                        className="w-36 h-52 md:w-40 md:h-64 object-cover hover:scale-110 duration-200 cursor-pointer transition-transform"
                    />
                </FloatingElement>
                <FloatingElement depth={1} className="top-[8%] right-[10%]">
                    <motion.img
                        initial={{opacity: 0}}
                        src={exampleImages[3].url}
                        className="w-64 h-64 md:w-64 md:h-64 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                    />
                </FloatingElement>

                <FloatingElement depth={1} className="top-[40%] left-[8%]">
                    <motion.img
                        initial={{opacity: 0}}
                        src={exampleImages[4].url}
                        className="w-72 h-auto md:w-64 md:h-auto object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                    />
                </FloatingElement>
                <FloatingElement depth={2} className="top-[70%] left-[77%]">
                    <motion.img
                        initial={{opacity: 0}}
                        src={exampleImages[5].url}
                        className="w-72 h-72 md:w-64 md:h-64 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                    />
                </FloatingElement>

                <FloatingElement depth={4} className="top-[75%] left-[28%]">
                    <motion.img
                        initial={{opacity: 0}}
                        src={exampleImages[6].url}
                        className="w-40 md:w-52 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                    />
                </FloatingElement>
                <FloatingElement depth={1} className="top-[70%] left-[50%]">
                    <motion.img
                        initial={{opacity: 0}}
                        src={exampleImages[7].url}
                        className="w-64 h-64 md:w-48 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
                    />
                </FloatingElement>
            </Floating>
        </div>
    )
}

export default Preview
