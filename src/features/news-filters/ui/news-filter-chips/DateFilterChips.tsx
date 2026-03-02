import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import {
  DATE_FILTERS,
  DATE_FILTER_LABELS,
} from "../../model/news-filters.constants";
import { DateFilter } from "../../model/news-filters.types";

type Props = {
  value: DateFilter;
  onChange: (value: DateFilter) => void;
};

export function DateFilterChips({ value, onChange }: Props) {
  return (
    <div className="overflow-x-auto">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(next) => {
          if (next) onChange(next as DateFilter);
        }}
        className="flex w-max justify-start gap-2 pr-3"
      >
        {DATE_FILTERS.map((item) => (
          <ToggleGroupItem
            key={item}
            value={item}
            aria-label={DATE_FILTER_LABELS[item]}
            className="h-8 rounded-full px-3 text-xs font-semibold
                       data-[state=on]:bg-foreground data-[state=on]:text-background"
          >
            {DATE_FILTER_LABELS[item]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
