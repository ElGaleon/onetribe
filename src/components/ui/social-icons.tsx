import * as React from "react"

import { cn } from "@/lib/utils"

type SocialIconProps = React.SVGProps<SVGSVGElement>

const SocialIcon = ({
  className,
  children,
  viewBox = "0 0 24 24",
  ...props
}: SocialIconProps) => (
  <svg
    aria-hidden="true"
    className={cn("size-4 fill-current", className)}
    focusable="false"
    role="img"
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {children}
  </svg>
)

export const FacebookIcon = (props: SocialIconProps) => (
  <SocialIcon {...props}>
    <path d="M13.5 8.5V6.9c0-.8.3-1.2 1.3-1.2h1.8V2.4c-.9-.1-1.8-.2-2.7-.2-2.8 0-4.7 1.7-4.7 4.8v1.5H6.1v3.7h3.1v9.6h4.3v-9.6h3.1l.5-3.7h-3.6Z" />
  </SocialIcon>
)

export const InstagramIcon = (props: SocialIconProps) => (
  <SocialIcon {...props}>
    <path d="M7.7 2.2h8.6c3 0 5.5 2.5 5.5 5.5v8.6c0 3-2.5 5.5-5.5 5.5H7.7c-3 0-5.5-2.5-5.5-5.5V7.7c0-3 2.5-5.5 5.5-5.5Zm0 2A3.5 3.5 0 0 0 4.2 7.7v8.6a3.5 3.5 0 0 0 3.5 3.5h8.6a3.5 3.5 0 0 0 3.5-3.5V7.7a3.5 3.5 0 0 0-3.5-3.5H7.7Zm4.3 3.2a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 2a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Zm4.9-2.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
  </SocialIcon>
)

export const XIcon = (props: SocialIconProps) => (
  <SocialIcon {...props}>
    <path d="M13.8 10.5 21.1 2h-1.7l-6.3 7.3L8 2H2.2l7.7 11-7.7 9h1.7l6.8-7.9 5.5 7.9H22l-8.2-11.5Zm-2.4 2.8-.8-1.1L4.4 3.3h2.8l5 7.1.8 1.1 6.5 9.2h-2.8l-5.3-7.4Z" />
  </SocialIcon>
)

export const WhatsappIcon = (props: SocialIconProps) => (
  <SocialIcon {...props}>
    <path d="M12 2.2a9.6 9.6 0 0 0-8.3 14.4L2.6 21.8l5.3-1.4A9.6 9.6 0 1 0 12 2.2Zm0 17.4c-1.4 0-2.8-.4-4-1.1l-.3-.2-3.1.8.8-3-.2-.3a7.8 7.8 0 1 1 6.8 3.8Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.6-1.2-1.4-1.4-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.5 3.9.6.3 1.1.4 1.5.5.6.2 1.2.1 1.6.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.2-.3-.2-.5-.3Z" />
  </SocialIcon>
)
