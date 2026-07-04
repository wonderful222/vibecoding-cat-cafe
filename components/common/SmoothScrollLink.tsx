"use client";

import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";

interface SmoothScrollLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

function easeOutQuint(progress: number) {
  return 1 - Math.pow(1 - progress, 5);
}

export const SmoothScrollLink = forwardRef<HTMLAnchorElement, SmoothScrollLinkProps>(
  function SmoothScrollLink({ href, onClick, ...props }, ref) {
    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      onClick?.(event);

      if (event.defaultPrevented || !href.startsWith("#")) {
        return;
      }

      const target = document.querySelector<HTMLElement>(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      const start = window.scrollY;
      const topOffset = 16;
      const end = target.getBoundingClientRect().top + window.scrollY - topOffset;
      const distance = end - start;
      const duration = 760;
      const startTime = performance.now();

      function step(now: number) {
        const progress = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, start + distance * easeOutQuint(progress));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          history.replaceState(null, "", href);
        }
      }

      requestAnimationFrame(step);
    }

    return <a ref={ref} href={href} onClick={handleClick} {...props} />;
  }
);
