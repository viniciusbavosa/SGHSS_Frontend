import type { ReactNode } from "react";

interface CardProps {
  className: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return <article className={`card__wrapper ${className}`}>{children}</article>;
}
