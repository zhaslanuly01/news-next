import { LocalFile } from "@/entities/file";

type WebLocalFile = LocalFile & {
  file: File;
};

export async function pickFile(): Promise<WebLocalFile | null> {
  if (typeof window === "undefined") {
    return null;
  }

  return new Promise((resolve, reject) => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json,.json";
      input.multiple = false;

      input.onchange = () => {
        const selected = input.files?.[0];

        if (!selected) {
          resolve(null);
          return;
        }

        resolve({
          uri: URL.createObjectURL(selected),
          name: selected.name || "file.json",
          mimeType: selected.type || "application/json",
          size: selected.size || 0,
          file: selected,
        });
      };

      input.onerror = () => {
        const err = new Error("Не удалось выбрать файл");
        (err as any).code = "PICKER_ERROR";
        reject(err);
      };

      input.click();
    } catch (e) {
      const err = new Error("Не удалось выбрать файл");
      (err as any).code = "PICKER_ERROR";
      reject(err);
    }
  });
}
