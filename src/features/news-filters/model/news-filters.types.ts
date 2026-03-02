import { DATE_FILTERS, NEWS_CATEGORIES } from "./news-filters.constants";

export type Category = (typeof NEWS_CATEGORIES)[number];
export type DateFilter = (typeof DATE_FILTERS)[number];
