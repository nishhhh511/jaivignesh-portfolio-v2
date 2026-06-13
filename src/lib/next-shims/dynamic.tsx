import * as React from "react";

type Loader<P = any> = () => Promise<{ default: React.ComponentType<P> } | React.ComponentType<P>>;

export default function dynamic<P = any>(loader: Loader<P>, opts?: { ssr?: boolean; loading?: () => React.ReactNode }) {
  const Lazy = React.lazy(async () => {
    const mod: any = await loader();
    return { default: mod.default ?? mod };
  });
  const Fallback = opts?.loading ?? (() => null);
  const Wrapped: React.FC<P> = (props: any) => (
    <React.Suspense fallback={<Fallback />}>
      <Lazy {...props} />
    </React.Suspense>
  );
  return Wrapped;
}
