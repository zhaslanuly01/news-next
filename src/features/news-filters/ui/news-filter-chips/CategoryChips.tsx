import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

import {
  ALL_CATEGORIES_LABEL,
  CATEGORY_LABELS,
  NEWS_CATEGORIES,
} from "../../model/news-filters.constants";
import { Category } from "../../model/news-filters.types";

type Props = {
  value: Category | undefined;
  onChange: (value: Category | undefined) => void;
};

const ALL_VALUE = "all";

export function CategoryChips({ value, onChange }: Props) {
  const selectedValue = value ?? ALL_VALUE;

  return (
    <div className="overflow-x-auto">
      <ToggleGroup
        type="single"
        value={selectedValue}
        onValueChange={(next) => {
          if (!next) return;
          if (next === ALL_VALUE) {
            onChange(undefined);
            return;
          }
          onChange(next as Category);
        }}
        className="flex w-max justify-start gap-2 pr-3"
      >
        <ToggleGroupItem
          value={ALL_VALUE}
          aria-label={ALL_CATEGORIES_LABEL}
          className="h-8 rounded-full px-3 text-xs font-semibold
                     data-[state=on]:bg-foreground data-[state=on]:text-background"
        >
          {ALL_CATEGORIES_LABEL}
        </ToggleGroupItem>

        {NEWS_CATEGORIES.map((item) => (
          <ToggleGroupItem
            key={item}
            value={item}
            aria-label={CATEGORY_LABELS[item]}
            className="h-8 rounded-full px-3 text-xs font-semibold
                       data-[state=on]:bg-foreground data-[state=on]:text-background"
          >
            {CATEGORY_LABELS[item]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
