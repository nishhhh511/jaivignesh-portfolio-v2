import * as React from "react";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string | { pathname?: string };
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
  locale?: string;
};

const Link = React.forwardRef<HTMLAnchorElement, Props>(function Link(
  { href, prefetch, replace, scroll, shallow, passHref, legacyBehavior, locale, children, ...rest },
  ref
) {
  const url = typeof href === "string" ? href : href?.pathname || "#";
  return (
    <a ref={ref} href={url} {...rest}>
      {children}
    </a>
  );
});

export default Link;
