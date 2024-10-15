import { CircleAlert } from "lucide-react";
import { cn } from "../lib/utils";
import { forwardRef } from "react";

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
}

const Error = forwardRef<HTMLDivElement, MessageProps>(
  ({ className, message, ...props }, ref) => (
    <span
      className={cn(
        "mt-1 text-xs font-medium text-destructive flex items-center gap-1",
        className
      )}
      ref={ref}
      {...props}
    >
      <CircleAlert size={12} />
      {message}
    </span>
  )
);
Error.displayName = "Error";

export { Error };
