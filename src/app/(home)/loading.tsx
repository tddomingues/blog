import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="absolute w-screen h-screen bg-primary/40">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loading;
