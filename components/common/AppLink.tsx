import { forwardRef, type AnchorHTMLAttributes } from "react";

interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const Link = forwardRef<HTMLAnchorElement, AppLinkProps>(function Link(
  { href, ...props },
  ref
) {
  return <a ref={ref} href={href} {...props} />;
});
