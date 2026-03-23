import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full rounded-md border border-black/15 bg-background px-3 py-1 text-sm text-foreground shadow-xs transition-colors outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground/50 focus-visible:ring-1 focus-visible:ring-black/30 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:focus-visible:ring-white/30",
        className
      )}
      {...props}
    />
  );
}

export { Input };