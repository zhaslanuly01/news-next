function ensureBrowser() {
  if (typeof window === "undefined") {
    throw new Error("Функция доступна только в браузере");
  }
}

export async function saveTextFile(
  fileName: string,
  content: string,
  mimeType = "text/plain;charset=utf-8"
) {
  try {
    ensureBrowser();

    const blob = new Blob([content], { type: mimeType });
    const objectUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(objectUrl);

    return fileName;
  } catch (e: any) {
    throw new Error(e?.message || "Не удалось сохранить файл");
  }
}
