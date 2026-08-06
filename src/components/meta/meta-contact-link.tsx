"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { trackMetaBrowserEvent } from "@/components/meta/meta-pixel";

interface MetaContactLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> {
  children: ReactNode;
}

export function MetaContactLink({
  children,
  ...props
}: MetaContactLinkProps): React.ReactElement {
  return (
    <a {...props} onClick={() => trackMetaBrowserEvent("Contact")}>
      {children}
    </a>
  );
}
