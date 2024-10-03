import { CircleAlert } from "lucide-react";
import { cn } from "../lib/utils";
import React from "react";

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
}

const Error = React.forwardRef<HTMLDivElement, MessageProps>(
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

// const Error = ({ className, ...props }) => {
//   return (
//     <span
//       className={cn(
//         "mt-1 text-xs font-medium text-destructive flex items-center gap-1",
//         className
//       )}
//     >
//       <CircleAlert size={12} />
//       {message}
//     </span>
//   );
// };

// export default Error;

export { Error };
