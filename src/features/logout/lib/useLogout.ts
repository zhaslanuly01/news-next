import type { AppDispatch } from "@/app/providers/store";
import { logoutSession, sessionStorageService } from "@/entities/session";
import { useDispatch } from "react-redux";

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>();

  const logout = async () => {
    try {
      await sessionStorageService.clearSession();
      dispatch(logoutSession());
    } catch (e) {
      console.log("logout error", e);
    }
  };

  return { logout };
}
