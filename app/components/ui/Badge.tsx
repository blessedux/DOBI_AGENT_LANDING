import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "destructive" | "secondary";
}

export const Badge: React.FC<BadgeProps> = ({ variant = "default", children, ...props }) => {
  const variantClasses = {
    default: "bg-blue-500 text-white",
    outline: "border border-blue-500 text-blue-500",
    destructive: "bg-red-500 text-white",
    secondary: "bg-gray-500 text-white",
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </span>
  );
};