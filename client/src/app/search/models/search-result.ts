import { GeneSuggestion } from "./gene-suggestion";
import { VariantSuggestion } from "./variant-suggestion";
import { AASuggestion } from "./aa-suggestion";

export class SearchResult {
    genes: GeneSuggestion[] = [];
    variants: VariantSuggestion[] = [];
    aa_changes: AASuggestion[] = [];
}
