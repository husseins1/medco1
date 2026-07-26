"use client"

import { QueryProvider } from "@/providers/QueryProvider"

export function DashboardQueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <QueryProvider>{children}</QueryProvider>
}
