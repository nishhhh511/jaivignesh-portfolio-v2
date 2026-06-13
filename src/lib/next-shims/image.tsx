import * as React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string | { src: string };
  alt?: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  sizes?: string;
  unoptimized?: boolean;
  loader?: any;
  onLoadingComplete?: any;
};

const Image = React.forwardRef<HTMLImageElement, Props>(function Image(
  { src, alt = "", fill, priority, quality, placeholder, blurDataURL, loader, onLoadingComplete, unoptimized, style, ...rest },
  ref
) {
  const realSrc = typeof src === "string" ? src : (src as any)?.src;
  const fillStyle: React.CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: (rest as any).objectFit || "cover", ...style }
    : (style as any);
  return <img ref={ref} src={realSrc} alt={alt} loading={priority ? "eager" : "lazy"} style={fillStyle} {...rest} />;
});

export default Image;
