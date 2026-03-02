import React from "react";

import {
  Category,
  CategoryChips,
  DateFilter,
  DateFilterChips,
  NewsSearchInput,
} from "@/features/news-filters";

type Props = {
  searchQuery: string;
  onChangeSearchQuery: (value: string) => void;
  category: Category | undefined;
  onChangeCategory: (value: Category | undefined) => void;
  dateFilter: DateFilter;
  onChangeDateFilter: (value: DateFilter) => void;
};

export function NewsFiltersPanel({
  searchQuery,
  onChangeSearchQuery,
  category,
  onChangeCategory,
  dateFilter,
  onChangeDateFilter,
}: Props) {
  return (
    <div className="px-3 pb-3 space-y-2.5">
      <NewsSearchInput value={searchQuery} onChange={onChangeSearchQuery} />
      <CategoryChips value={category} onChange={onChangeCategory} />
      <DateFilterChips value={dateFilter} onChange={onChangeDateFilter} />
    </div>
  );
}
