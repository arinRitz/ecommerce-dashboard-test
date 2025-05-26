// components/ui/theme-provider.tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent mismatch by rendering null on server, only render children after client mount
  if (!mounted) return null;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
