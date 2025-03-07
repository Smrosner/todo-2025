import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          // Variants
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500":
            variant === "primary",
          "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500":
            variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
            variant === "danger",
          // Sizes
          "px-2.5 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
