import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils/utils";

type LoaderProps = {
  className?: string;
  fullScreen?: boolean;
  text?: string;
};

export function Loader({ className, fullScreen = true, text }: LoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullScreen ? "min-h-[60vh]" : "py-6",
        className
      )}
    >
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
        {text ? <span className="text-sm">{text}</span> : null}
      </div>
    </div>
  );
}
