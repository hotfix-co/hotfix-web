import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const delayClass =
    delay >= 0.24 ? "fade-in-up-delay-3"
      : delay >= 0.16 ? "fade-in-up-delay-2"
      : delay >= 0.08 ? "fade-in-up-delay-1"
      : "";

  return (
    <div className={`fade-in-up ${delayClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
