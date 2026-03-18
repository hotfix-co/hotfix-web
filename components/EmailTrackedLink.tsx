"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { trackEvent } from "@/lib/analytics";

type EmailTrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  source: string;
};

export default function EmailTrackedLink({
  source,
  onClick,
  ...props
}: EmailTrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent("email_click", { source, link_type: "mailto" });
    onClick?.(event);
  };

  return <a {...props} onClick={handleClick} />;
}
