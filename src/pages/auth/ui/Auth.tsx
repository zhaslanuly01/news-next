"use client";

import { Page } from "@/shared/ui/Page";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui/card";
import { Loader2 } from "lucide-react";
import { useBiometricLogin } from "@/features/biometric-login";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const { loading, error, loginWithBiometrics } = useBiometricLogin();

  const handleLogin = async () => {
    const ok = await loginWithBiometrics();
    if (ok) {
      router.replace("/news-list");
    }
  };

  return (
    <Page contentClassName="flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Добро пожаловать</CardTitle>
            <CardDescription className="text-sm">
              Вход в веб-версию
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              type="button"
              className="h-11 w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Вход...
                </span>
              ) : (
                "Войти"
              )}
            </Button>

            {!!error && (
              <p className="pt-1 text-center text-sm text-destructive">
                {error}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
