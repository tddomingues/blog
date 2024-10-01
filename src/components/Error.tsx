import { CircleAlert } from "lucide-react";

const Error = ({ message }: { message: string }) => {
  return (
    <span className="mt-1 text-xs font-medium text-destructive flex items-center gap-1">
      <CircleAlert size={12} />
      {message}
    </span>
  );
};

export default Error;
