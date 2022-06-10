import { GeneAnnotation } from "src/app/annotation/models/gene-annotation";

export class Gene {
    hgnc_gene_id: number;
    api_key: string;
    accession_numbers: string;
    alias_names: string;
    alias_symbols: string;
    approved_name: string;
    approved_symbol: string;
    ccds_ids: string;
    chromosome: string;
    gene_group_name: string;
    gene_group_id: string;
    date_approved: string;
    enzyme_ids: string;
    locus_group: string;
    locus_type: string;
    ensembl_gene_id: string;
    locus_specific_gene_id: string;
    ncbi_gene_id: string;
    previous_name: string;
    previous_symbols: string;
    pubmed_ids: string;
    refseq_ids: string;
    status: string;
    uniprot_id: string;
    vega_ids: string;
    omim_id: string;
    ucsc_id: string;

    annotations: GeneAnnotation[];
}
