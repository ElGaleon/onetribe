'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import OneTribeLogo from "@/app/svg/one-tribe-logo";

const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// Types
export interface Navbar01NavLink {
  href: string;
  label: string;
  active?: boolean;
}

export interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar01NavLink[];
  signInText?: string;
  signInHref?: string;
  ctaText?: string;
  ctaHref?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
}

// Default navigation links
const defaultNavigationLinks: Navbar01NavLink[] = [
  { href: '/', label: 'Home', active: true },
  { href: '/squadre', label: 'Squadre' },
  { href: '/ultimate', label: 'Ultimate' },
  { href: '/scuole', label: 'Scuole' },
  { href: '/news', label: 'News' },
  { href: '/contatti', label: 'Contatti' },
];

export const Navbar01 = React.forwardRef<HTMLElement, Navbar01Props>(
  (
    {
      className,
      logo = <OneTribeLogo className="py-2"  />,
      logoHref = '/',
      navigationLinks = defaultNavigationLinks,
      signInText = 'Sign In',
      signInHref = '#signin',
      ctaText = 'Contatti',
      ctaHref = '#get-started',
      onSignInClick,
      onCtaClick,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const resolvedNavigationLinks = React.useMemo(() => {
      const links = navigationLinks.some((link) => link.href === '/')
        ? navigationLinks
        : [{ href: '/', label: 'Home' }, ...navigationLinks];

      return links.map((link) => ({
        ...link,
        active: link.active || pathname === link.href,
      }));
    }, [navigationLinks, pathname]);

    const handleSignIn = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onSignInClick) {
        onSignInClick();
        return;
      }
      window.location.href = signInHref;
    };

    const handleCta = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onCtaClick) {
        onCtaClick();
        return;
      }
      window.location.href = ctaHref;
    };

    const handleMobileSignIn = (e: React.MouseEvent) => {
      setIsMenuOpen(false);
      handleSignIn(e);
    };

    const handleMobileCta = (e: React.MouseEvent) => {
      setIsMenuOpen(false);
      handleCta(e);
    };

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 1060);
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    useEffect(() => {
      const updateScrollState = () => {
        setIsScrolled(window.scrollY > 12);
      };

      updateScrollState();
      window.addEventListener('scroll', updateScrollState, { passive: true });

      return () => {
        window.removeEventListener('scroll', updateScrollState);
      };
    }, []);

    const combinedRef = React.useCallback((node: HTMLElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);

    return (
      <header
        ref={combinedRef}
        className={cn(
          'fixed left-0 right-0 top-0 z-50 w-full px-2 pt-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-4 md:pt-4 [&_*]:no-underline',
          className
        )}
        {...props}
      >
        <div className={cn(
          "relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-xl border py-0 pl-2 pr-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:pl-2 md:pr-4",
          isScrolled
            ? "h-14 border-white/[0.12] bg-[#151b31]/[0.72] shadow-[0_18px_70px_rgba(8,12,28,0.30)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#151b31]/[0.62]"
            : "h-16 border-white/[0.08] bg-[#11172c]/[0.16] shadow-none backdrop-blur-[2px]"
        )}>
          <div className="flex min-w-0 items-center gap-2 md:gap-4">
            <Link 
              href={logoHref}
              className="flex shrink-0 items-center space-x-2 rounded-lg text-primary hover:text-primary/90 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/80"
            >
              <div className="[&_svg]:!h-12 [&_svg]:!w-auto [&_svg]:!py-0">
                {logo}
              </div>
            </Link>
            {!isMobile && (
              <NavigationMenu className="flex">
                <NavigationMenuList className="gap-1">
                  {resolvedNavigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <Link
                        href={link.href}
                        className={cn(
                          "group inline-flex h-9 w-max items-center justify-center rounded-lg px-3 py-2 text-[13px] font-semibold tracking-[0.01em] transition-all duration-200 hover:bg-white/[0.07] hover:text-white focus:bg-white/[0.075] focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/75 disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                          link.active
                            ? "bg-white/[0.09] text-white"
                            : "text-foreground/80 hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
          {!isMobile && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 rounded-lg px-3 text-[13px] font-semibold text-white/[0.74] hover:bg-white/[0.07] hover:text-white active:translate-y-px"
              onClick={handleSignIn}
            >
              {signInText}
            </Button>
            <Button
              size="sm"
              className="h-9 rounded-lg px-4 text-[13px] font-semibold bg-brand-red text-white hover:bg-[#B23347] shadow-[0_12px_28px_rgba(162,41,59,0.24)] active:translate-y-px"
              onClick={handleCta}
            >
              {ctaText}
            </Button>
          </div>
          )}

          {isMobile && (
            <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="group h-10 w-10 shrink-0 rounded-lg hover:bg-white/[0.07] hover:text-white"
                  variant="ghost"
                  size="icon"
                  aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
                >
                  <HamburgerIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={12} className="w-[calc(100vw-1.5rem)] max-w-[28rem] overflow-hidden rounded-xl border-white/[0.12] bg-[#151b31]/[0.96] p-0 text-white shadow-[0_28px_90px_rgba(8,12,28,0.46)] backdrop-blur-xl">
                <div className="border-b border-white/10 px-4 py-3">
                  <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                    Navigazione
                  </p>
                </div>
                <NavigationMenu className="max-w-none">
                  <NavigationMenuList className="flex-col items-stretch gap-0 divide-y divide-white/[0.07]">
                    {resolvedNavigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={cn(
                            "flex min-h-12 w-full items-center justify-between px-4 text-sm font-semibold transition-colors hover:bg-white/[0.07] hover:text-white cursor-pointer no-underline",
                            link.active
                              ? "bg-white/[0.08] text-white"
                              : "text-foreground/85 hover:text-foreground"
                          )}
                        >
                          <span>{link.label}</span>
                          {link.active && <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />}
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
                <div className="grid gap-2 border-t border-white/10 bg-[#10172D]/70 p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 justify-center rounded-lg px-3 text-[13px] font-semibold text-white/[0.76] hover:bg-white/[0.07] hover:text-white"
                    onClick={handleMobileSignIn}
                  >
                    {signInText}
                  </Button>
                  <Button
                    size="sm"
                    className="h-11 justify-center rounded-lg px-3 text-[13px] font-semibold bg-brand-red text-white hover:bg-[#B23347] shadow-[0_12px_28px_rgba(162,41,59,0.24)]"
                    onClick={handleMobileCta}
                  >
                    {ctaText}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </header>
    );
  }
);

Navbar01.displayName = 'Navbar01';

export { HamburgerIcon };
