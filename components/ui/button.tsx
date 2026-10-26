import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trust/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-trust text-white hover:bg-trust-deep",
        amber: "bg-bus text-ink hover:bg-amber-400",
        dark: "bg-ink text-white hover:bg-panel",
        outline: "border border-white/20 bg-white/5 text-white hover:bg-white/10",
        surface: "border border-slate-200 bg-white text-ink hover:bg-slate-50",
        ghost: "text-slate-300 hover:bg-white/10 hover:text-white",
        ghostDark: "text-slate-600 hover:bg-slate-100",
        danger: "bg-rose-600 text-white hover:bg-rose-500",
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
  };

export function Button({ className, variant, size, href, type, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={classes} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
