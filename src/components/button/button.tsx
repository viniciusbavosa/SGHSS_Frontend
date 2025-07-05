import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}
export function Button({ text, className, ...props }: ButtonProps) {
  return (
    <>
      <button className={className} {...props}>
        {text}
      </button>
    </>
  );
}
