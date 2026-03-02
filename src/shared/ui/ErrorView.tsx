import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "../lib/utils/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

type ErrorViewProps = {
  message?: string;
  title?: string;
  className?: string;
};

export function ErrorView({
  message = "Something went wrong",
  title = "Ошибка",
  className,
}: ErrorViewProps) {
  return (
    <div
      className={cn("flex items-center justify-center px-4 py-8", className)}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground text-center">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
