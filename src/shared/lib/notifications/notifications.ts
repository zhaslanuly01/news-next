function isBrowser() {
  return typeof window !== "undefined";
}

export async function requestNotificationsPermission() {
  if (!isBrowser()) return false;

  if (!("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission === "denied") {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === "granted";
}

import { toast } from "react-hot-toast";

export async function sendLocalNewsNotification(params: {
  title: string;
  body: string;
}) {
  if (typeof window === "undefined") return;

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(params.title, { body: params.body });
    return;
  }

  toast(`${params.title}: ${params.body}`);
}
export async function sendFavoriteAddedNotification(articleTitle: string) {
  await sendLocalNewsNotification({
    title: "Добавлено в избранное",
    body: articleTitle,
  });
}
