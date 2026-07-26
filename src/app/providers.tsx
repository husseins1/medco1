// Providers wrapper (used by root layout for any global client providers)
"use client"

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}