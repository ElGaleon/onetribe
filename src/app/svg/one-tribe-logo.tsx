import * as React from "react";

const OneTribeLogo = (props: React.SVGAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={80}
        height={60}
        viewBox="130 0 126 104"
        {...props}
    >
        <defs>
            <clipPath id="a">
                <path d="M0 0h386.045v164.991H0Z" />
            </clipPath>
        </defs>
        <path
            fill="#232C51"
            d="M136.315 62.942 174.427 6l37.217.001 38.113 56.942-23.54 32.741-66.364-.001Z"
        />
        <g clipPath="url(#a)">
            <path
                fill="none"
                stroke="#232C51"
                strokeMiterlimit={10}
                strokeWidth={12}
                d="M136.315 62.942 174.427 6l37.217.001 38.113 56.942-23.54 32.741-66.364-.001-23.538-32.741Z"
            />
        </g>
        <path
            fill="#92172E"
            d="m208.406 6.001-18.86 26.252 12.081 16.811 20.117-27.98-10.1-15.083Zm-17.894 68.72 11.386 15.861 34.37-47.788-10.983-16.422Zm15.064 20.963h20.641l23.54-32.74-9.949-14.864Z"
        />
        <path
            fill="#70A5ED"
            d="m174.428 6-15.556 23.252h25.487L201.086 6Zm-19.556 29.234-18.556 27.709 23.538 32.74h38.385l-29.572-41.13h7.338l10.829 15.068 11.134-15.457-13.61-18.93Z"
        />
    </svg>
)
export default OneTribeLogo
