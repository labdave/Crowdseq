import { GeneSuggestion } from "./gene-suggestion";
import { VariantSuggestion } from "./variant-suggestion";

export class SearchResult {
    genes: GeneSuggestion[] = [];
    variants: VariantSuggestion[] = [];
}
