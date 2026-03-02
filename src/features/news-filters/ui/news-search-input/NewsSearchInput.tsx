"use client";

import { Input } from "@/shared/ui/input";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function NewsSearchInput({
  value,
  onChange,
  placeholder = "Поиск...",
}: Props) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-10"
    />
  );
}
