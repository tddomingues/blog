import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full grid place-items-center">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );
};

export default Loading;
