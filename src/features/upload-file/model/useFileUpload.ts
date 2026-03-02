"use client";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addFavorite,
  saveFavoritesToStorage,
  selectFavorites,
} from "@/entities/favorite";
import { FileTransferError } from "@/entities/file";
import { parseImportedFavoriteArticle } from "../lib/validateArticleJson";

function mapError(error: any): FileTransferError {
  const code = error?.code;

  if (code === "FILE_TOO_LARGE") {
    return { code, message: "Файл слишком большой. Максимум 10MB." };
  }
  if (code === "USER_CANCELLED") {
    return { code, message: "Загрузка отменена." };
  }
  if (code === "NETWORK") {
    return { code, message: "Сетевая ошибка. Попробуйте ещё раз." };
  }
  if (code === "INVALID_FILE_TYPE") {
    return { code, message: "Разрешены только JSON файлы (.json)." };
  }
  if (code === "INVALID_JSON") {
    return { code, message: "Файл не является корректным JSON." };
  }
  if (code === "INVALID_STRUCTURE") {
    return {
      code,
      message: "JSON не соответствует структуре FavoriteArticle.",
    };
  }
  if (code === "READ_FILE_ERROR") {
    return { code, message: "Не удалось прочитать файл." };
  }

  return {
    code: "UNKNOWN",
    message: error?.message || "Неизвестная ошибка загрузки.",
  };
}

function throwWithCode(message: string, code: string): never {
  const err = new Error(message) as Error & { code?: string };
  err.code = code;
  throw err;
}

export function useFileUpload() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<FileTransferError | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const handlePickFile = (file: File | null) => {
    try {
      setError(null);
      setIsSuccess(false);
      setProgress(0);

      if (!file) return;

      setSelectedFile(file);
    } catch (e) {
      setError(mapError(e));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setError(null);
    setIsSuccess(false);
    setProgress(0);
    setIsUploading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (selectedFile.size > maxSize) {
        throwWithCode("Размер файла превышает 10MB", "FILE_TOO_LARGE");
      }

      const isJsonMime =
        selectedFile.type?.includes("json") ||
        selectedFile.type === "application/json";
      const isJsonExt = selectedFile.name.toLowerCase().endsWith(".json");

      if (!isJsonMime && !isJsonExt) {
        throwWithCode("Только JSON", "INVALID_FILE_TYPE");
      }

      setProgress(10);

      if (controller.signal.aborted) {
        throwWithCode("Загрузка отменена", "USER_CANCELLED");
      }

      let raw: string;
      try {
        raw = await selectedFile.text();
      } catch {
        throwWithCode("Не удалось прочитать файл", "READ_FILE_ERROR");
      }

      setProgress(50);

      if (controller.signal.aborted) {
        throwWithCode("Загрузка отменена", "USER_CANCELLED");
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        throwWithCode("Некорректный JSON", "INVALID_JSON");
      }

      const article = parseImportedFavoriteArticle(parsed);

      if (!article) {
        throwWithCode("Неверная структура JSON", "INVALID_STRUCTURE");
      }

      // Если уже есть — addFavorite может сам обработать, но ниже мы всё равно проверяем
      dispatch(addFavorite(article));

      const exists = favorites.some((item) => item.id === article.id);
      const nextItems = exists ? favorites : [article, ...favorites];
      await saveFavoritesToStorage(nextItems);

      if (controller.signal.aborted) {
        throwWithCode("Загрузка отменена", "USER_CANCELLED");
      }

      setProgress(100);
      setIsSuccess(true);
    } catch (e) {
      const mapped = mapError(e);
      setError(mapped);
    } finally {
      setIsUploading(false);
      abortRef.current = null;
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
  };

  const reset = () => {
    setSelectedFile(null);
    setProgress(0);
    setError(null);
    setIsSuccess(false);
    setIsUploading(false);
    abortRef.current = null;
  };

  return {
    selectedFile,
    progress,
    isUploading,
    error,
    isSuccess,
    handlePickFile, // (file: File | null) => void
    handleUpload,
    handleCancel,
    reset,
  };
}
