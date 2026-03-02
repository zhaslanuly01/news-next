"use client";

import * as React from "react";
import { FileUp, Loader2, Upload, X } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Progress } from "@/shared/ui/progress";
import { useFileUpload } from "../model/useFileUpload";

export function FileUploadCard() {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const {
    selectedFile,
    progress,
    isUploading,
    error,
    isSuccess,
    handlePickFile,
    handleUpload,
    handleCancel,
  } = useFileUpload();

  return (
    <Card className="rounded-xl border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Отправить файл</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={(e) => {
            handlePickFile(e.target.files?.[0] ?? null);
            e.currentTarget.value = "";
          }}
        />

        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          className="w-full justify-start"
          disabled={isUploading}
        >
          <FileUp className="mr-2 h-4 w-4" />
          {selectedFile ? "Выбрать другой файл" : "Выбрать файл"}
        </Button>

        {selectedFile && (
          <div className="space-y-1 rounded-lg border bg-muted/30 p-3 text-sm">
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Имя:</span>{" "}
              {selectedFile.name}
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Размер:</span>{" "}
              {selectedFile.size} bytes
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Тип:</span>{" "}
              {selectedFile.type || "unknown"}
            </p>
          </div>
        )}

        <Button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="w-full"
        >
          {isUploading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Загрузка... {progress}%
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Отправить файл
            </span>
          )}
        </Button>

        {isUploading && (
          <>
            <Progress value={progress} className="h-2" />

            <Button
              type="button"
              variant="destructive"
              onClick={handleCancel}
              className="w-full"
            >
              <X className="mr-2 h-4 w-4" />
              Отменить
            </Button>
          </>
        )}

        {isSuccess && (
          <p className="text-sm font-medium text-green-600 dark:text-green-500">
            ✅ Файл успешно отправлен
          </p>
        )}

        {error && (
          <p className="text-sm font-medium text-destructive">
            ❌ {error.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
