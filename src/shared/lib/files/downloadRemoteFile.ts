function ensureBrowser() {
  if (typeof window === "undefined") {
    throw new Error("Функция доступна только в браузере");
  }
}

function triggerBrowserDownload(blob: Blob, fileName: string) {
  ensureBrowser();

  const objectUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = objectUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(objectUrl);
}

export async function downloadRemoteFile(url: string, fileName: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const blob = await response.blob();
    triggerBrowserDownload(blob, fileName);

    return {
      success: true,
      fileName,
      size: blob.size,
      type: blob.type,
    };
  } catch (e: any) {
    throw new Error(e?.message || "Ошибка загрузки файла");
  }
}
