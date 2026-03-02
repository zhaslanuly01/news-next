import { LocalFile } from "@/entities/file";

type FakeUploadOptions = {
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fakeUploadFile(
  file: LocalFile,
  options: FakeUploadOptions = {}
) {
  const { onProgress, signal } = options;

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    const err = new Error("Размер файла превышает 10MB");
    (err as any).code = "FILE_TOO_LARGE";
    throw err;
  }

  for (let p = 0; p <= 100; p += 10) {
    if (signal?.aborted) {
      const err = new Error("Загрузка отменена");
      (err as any).code = "USER_CANCELLED";
      throw err;
    }

    await sleep(120);
    onProgress?.(p);
  }

  return {
    success: true,
    fileName: file.name,
    uploadedAt: new Date().toISOString(),
    mockId: `mock_${Date.now()}`,
  };
}
