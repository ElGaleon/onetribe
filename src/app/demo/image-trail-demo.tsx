import ImageTrail, {
    ImageTrailItem,
} from "@/components/fancy/image/image-trail"
import Image from "next/image"

const images = [
    "https://scontent-mxp1-1.xx.fbcdn.net/v/t39.30808-6/503501873_122169871664370701_5167135847518893970_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=_eaUzmTV2kwQ7kNvwEQqfZF&_nc_oc=AdkLlj7QBzpd1VvgfntktgEV_dG2jFGZ87QqGh9X_J36he0ohk3LMiVcaIemvTGPJAmG7WxgTHS-g_oRHTiCqBJj&_nc_zt=23&_nc_ht=scontent-mxp1-1.xx&_nc_gid=MS_p1BLtjX0WKOQ0FIVfKQ&oh=00_AfaWDT9dwtSc5iRfMoIdknX7paalGmGLVt2YbtjLduNcZg&oe=68E4A556",
    "https://scontent-mxp1-1.xx.fbcdn.net/v/t39.30808-6/503494607_122169872480370701_5788408804077537020_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=kdjv7ofdYDUQ7kNvwGnlvSP&_nc_oc=Adlq5W1J_73b4zB9lWffL1rtJLs6laQ3jzNt5H1PvuIp2XY3xOT5FY_l-3D5pbIG6LPkoyoPP8AHIaOZlrB7Sj_A&_nc_zt=23&_nc_ht=scontent-mxp1-1.xx&_nc_gid=b-ohCWcvJK2wC9Bz24ObMg&oh=00_AfZvEf_slbPQJFtXVRMEktGC5SL5vB7RzjiYRH9CPbux6A&oe=68E4CADC",
    "https://scontent-mxp2-1.xx.fbcdn.net/v/t39.30808-6/550715512_122185191476370701_2047576833887843535_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=TxPke_eHQpkQ7kNvwE9JARI&_nc_oc=AdknjV7SgoxCNYmKpDYRmHIv8SDGS7Kzl5v5nbVt_zwc_RzCHxfWPSJyvRw0U912IGuClau0vum-JkjawuT3FmEj&_nc_zt=23&_nc_ht=scontent-mxp2-1.xx&_nc_gid=OxLnuzw0aDfNYkFCNemc9g&oh=00_AfZJCN03Tw3_PGh7P9quzPpNMRi27LKysKto2IWCjqvRUw&oe=68E4C803",
    "https://scontent-mxp2-1.xx.fbcdn.net/v/t39.30808-6/492801349_122163819626370701_270316533883798912_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=4PG1RMmbLt8Q7kNvwFvW9Bs&_nc_oc=AdmLEYagEjHk4w-9D2EK1M_uJm-8VxL7xCQ2vnnL4aUJBVgixBsB5pooosNVIIz2SepAEpxQ7uEWr2AgI5gVy8tm&_nc_zt=23&_nc_ht=scontent-mxp2-1.xx&_nc_gid=noC0ujyOgSnBDtzWDOUkfg&oh=00_AfbimMLSjghAWzy2jcnom5zMNQ0dYBdAC47hPH7AADfmTQ&oe=68E49EF8",
]

const ImageTrailDemo = () => {
    return (
        <div className="w-dvw h-dvh bg-white relative text-foreground dark:text-muted">
            <ImageTrail
                threshold={100}
                intensity={1}
                keyframes={{scale: [1, 1]}}
                keyframesOptions={{
                    scale: {duration: 1, times: [1, 1]},
                }}
                repeatChildren={1}
            >
                {images.map((url, index) => (
                    <ImageTrailItem key={index}>
                        <div className="w-48 sm:w-28 h-full relative overflow-hidden">
                            <Image src={url} alt="image" fill sizes="12rem" className="object-cover"/>
                        </div>
                    </ImageTrailItem>
                ))}
            </ImageTrail>
            <p className="text sm:text-lg absolute top-4 left-6 font-medium pointer-events-none z-100">
                move your cursor
            </p>
        </div>
    )
}

export default ImageTrailDemo
