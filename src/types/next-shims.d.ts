declare module "next/image" {
  import * as React from "react";
  const Image: React.ForwardRefExoticComponent<any>;
  export default Image;
}
declare module "next/link" {
  import * as React from "react";
  const Link: React.ForwardRefExoticComponent<any>;
  export default Link;
}
declare module "next/dynamic" {
  import * as React from "react";
  function dynamic<P = any>(loader: () => Promise<any>, opts?: any): React.ComponentType<P>;
  export default dynamic;
}
declare module "next/font/google" {
  export function Inter(opts?: any): { className: string; variable: string; style: any };
  export function Geist_Mono(opts?: any): { className: string; variable: string; style: any };
}
declare module "next-themes" {
  import * as React from "react";
  export const ThemeProvider: React.FC<any>;
  export function useTheme(): { theme: string; setTheme: (t: string) => void; resolvedTheme?: string };
}
declare module "@vercel/analytics/next" {
  import * as React from "react";
  export const Analytics: React.FC<any>;
  const _default: React.FC<any>;
  export default _default;
}
declare namespace JSX {
  interface IntrinsicAttributes {
    jsx?: boolean;
    global?: boolean;
  }
}
