"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type ContactTrackedLinkProps = ComponentProps<typeof Link> & {
  source: string;
};

export default function ContactTrackedLink({
  source,
  onClick,
  ...props
}: ContactTrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent("contact_cta_click", { source });
    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} />;
}
