import uuid

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class DiagnosisCategory(models.Model):
    """Model for managing the universe of diagnosis categories"""
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)


class Diagnosis(models.Model):
    """Model for managing the universe of diagnoses ( Diagnosis List )"""
    name = models.CharField(max_length=255, unique=True)
    display_name = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(DiagnosisCategory, blank=True, null=True, on_delete=models.SET_NULL)


class Genes(models.Model):
    hgnc_gene_id = models.IntegerField(unique=True)
    api_key = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    accession_numbers = models.TextField(blank=True, null=True)
    alias_names = models.TextField(blank=True, null=True)
    alias_symbols = models.TextField(blank=True, null=True)
    approved_name = models.TextField(blank=True, null=True)
    approved_symbol = models.TextField(blank=True, null=True)
    ccds_ids = models.TextField(blank=True, null=True)
    chromosome = models.TextField()
    gene_group_name = models.TextField(blank=True, null=True)
    gene_group_id = models.TextField(blank=True, null=True)
    date_approved = models.DateField(blank=True, null=True)
    enzyme_ids = models.TextField(blank=True, null=True)
    locus_group = models.TextField()
    locus_type = models.TextField()
    ensembl_gene_id = models.TextField(blank=True, null=True)
    locus_specific_gene_id = models.TextField(blank=True, null=True)
    ncbi_gene_id = models.IntegerField(blank=True, null=True)
    previous_name = models.TextField(blank=True, null=True)
    previous_symbols = models.TextField(blank=True, null=True)
    pubmed_ids = models.TextField(blank=True, null=True)
    refseq_ids = models.TextField(blank=True, null=True)
    status = models.TextField()
    uniprot_id = models.TextField(blank=True, null=True)
    vega_ids = models.TextField(blank=True, null=True)
    omim_id = models.TextField(blank=True, null=True)
    ucsc_id = models.TextField(blank=True, null=True)


class GeneAnnotation(models.Model):
    gene = models.ForeignKey(Genes, related_name="annotations", on_delete=models.CASCADE)
    annotation = models.TextField(blank=False, null=False)
    priority = models.IntegerField(blank=False, null=False)
    user = models.ForeignKey(User, db_column="user", null=True, blank=True, on_delete=models.CASCADE)
    creation_timestamp = models.DateTimeField(db_column='creation_timestamp', auto_now_add=True)
    diagnosis = models.ForeignKey(DiagnosisCategory, blank=True, null=True, on_delete=models.CASCADE, related_name='gene_annotations')


class Transcript(models.Model):
    ensembl_transcript_id = models.TextField(blank=False, null=False, unique=True)
    transcript_support_level = models.TextField(blank=True, null=True)
    transcript_length = models.IntegerField(blank=True, null=True)
    refseq_match = models.TextField(blank=True, null=True)


class EnsemblPeptide(models.Model):
    transcript = models.ForeignKey(Transcript, on_delete=models.CASCADE, related_name='peptides')
    peptide_id = models.TextField(blank=False, null=False, unique=True)
    hgvsp_id = models.TextField(blank=True, null=True)
    canonical = models.BooleanField(blank=False, null=False, default=False)


class EnsemblHGVSC(models.Model):
    transcript = models.ForeignKey(Transcript, on_delete=models.CASCADE, related_name='hgvsc')
    hgvsc_id = models.TextField(blank=False, null=False, unique=True)


class RefSeqTranscript(models.Model):
    transcript = models.ForeignKey(Transcript, on_delete=models.CASCADE, related_name='refseq_transcripts')
    refseq_transcript_id = models.TextField(blank=False, null=False, unique=True)
    transcript_type = models.TextField(blank=False, null=False)


class RefSeqHGVSC(models.Model):
    transcript = models.ForeignKey(RefSeqTranscript, on_delete=models.CASCADE, related_name='hgvsc')
    hgvsc_id = models.TextField(blank=False, null=False, unique=True)
    transcript_type = models.TextField(blank=False, null=False)


class RefSeqPeptide(models.Model):
    transcript = models.ForeignKey(RefSeqTranscript, on_delete=models.CASCADE, related_name='peptides')
    peptide_id = models.TextField(blank=False, null=False, unique=True)
    hgvsp_id = models.TextField(blank=True, null=True)


class LRGTranscript(models.Model):
    transcript = models.ForeignKey(Transcript, on_delete=models.CASCADE, related_name='lrg_transcripts')
    lrg_transcript_id = models.TextField(blank=False, null=False, unique=True)


class LRGHGVSC(models.Model):
    transcript = models.ForeignKey(LRGTranscript, on_delete=models.CASCADE, related_name='hgvsc')
    hgvsc_id = models.TextField(blank=False, null=False, unique=True)


class LRGPeptide(models.Model):
    transcript = models.ForeignKey(LRGTranscript, on_delete=models.CASCADE, related_name='peptides')
    peptide_id = models.TextField(blank=False, null=False, unique=True)
    hgvsp_id = models.TextField(blank=True, null=True)


class AminoAcidChange(models.Model):
    long_name = models.TextField(blank=False, null=False, unique=True)
    short_name = models.TextField(blank=False, null=False)
    transcripts = models.ManyToManyField(Transcript, related_name='aa_changes')
    genes = models.ManyToManyField(Genes, related_name='aa_changes')


class AminoAcidAnnotations(models.Model):
    gene = models.ForeignKey(Genes, on_delete=models.CASCADE, related_name="aa_annotations")
    amino_acid = models.ForeignKey(AminoAcidChange, on_delete=models.CASCADE, related_name="annotations")
    annotation = models.TextField(blank=False, null=False)
    priority = models.IntegerField(blank=False, null=False)
    user = models.ForeignKey(User, db_column="user", null=True, blank=True, on_delete=models.CASCADE)
    creation_timestamp = models.DateTimeField(db_column='creation_timestamp', auto_now_add=True)
    diagnosis = models.ForeignKey(DiagnosisCategory, blank=True, null=True, on_delete=models.CASCADE, related_name='aachange_annotations')


class Variants(models.Model):
    md5sum = models.TextField(unique=True)
    chrom_pos_ref_alt = models.TextField()
    chr = models.TextField()
    start_pos = models.IntegerField()
    end_pos = models.IntegerField()
    ref_allele = models.TextField()
    alt_allele = models.TextField()
    gene = models.ForeignKey(Genes, on_delete=models.CASCADE, related_name='variants', blank=True, null=True)
    hgvsg_id = models.TextField()
    alt_hgvsg_id = models.TextField()
    refseq_hgvsg_id = models.TextField()
    lrg_hgvsg_id = models.TextField(blank=True, null=True)
    alt_chr = models.TextField()
    alt_chrom_pos_ref_alt = models.TextField()
    transcripts = models.ManyToManyField(Transcript, related_name='variants')


class AnnovarData(models.Model):
    variant = models.ForeignKey(Variants, blank=False, null=False, on_delete=models.CASCADE, related_name='annovar')
    func_ref_gene = models.CharField(max_length=50)
    gene_ref_gene = models.CharField(max_length=150)
    gene_detail_ref_gene = models.TextField(null=True, blank=True)
    exonic_func_ref_gene = models.CharField(max_length=150)
    aa_change_ref_gene = models.TextField()
    genomic_super_dups = models.TextField(null=True, blank=True)
    ex_ac_all = models.CharField(max_length=150, null=True, blank=True)
    gnomad_exome_af_popmax = models.CharField(max_length=150, null=True, blank=True)
    gnomad_genome_af = models.CharField(max_length=150, null=True, blank=True)
    avsnp_150 = models.CharField(max_length=150, null=True, blank=True)
    cosmic_91_coding = models.TextField(null=True, blank=True)
    cosmic_91_noncoding = models.TextField(null=True, blank=True)
    sift_score = models.TextField(null=True, blank=True)
    sift_converted_rankscore = models.CharField(max_length=150, null=True, blank=True)
    sift_pred = models.CharField(max_length=20, null=True, blank=True)
    polyphen_2_hdiv_score = models.CharField(max_length=150, null=True, blank=True)
    polyphen_2_hdiv_rankscore = models.CharField(max_length=150, null=True, blank=True)
    polyphen_2_hdiv_pred = models.CharField(max_length=20, null=True, blank=True)
    polyphen_2_hvar_score = models.CharField(max_length=150, null=True, blank=True)
    polyphen_2_hvar_rankscore = models.CharField(max_length=150, null=True, blank=True)
    polyphen_2_hvar_pred = models.CharField(max_length=20, null=True, blank=True)
    lrt_score = models.TextField(null=True, blank=True)
    lrt_converted_rankscore = models.CharField(max_length=150, null=True, blank=True)
    lrt_pred = models.CharField(max_length=20, null=True, blank=True)
    mutation_taster_score = models.TextField(null=True, blank=True)
    mutation_taster_converted_rankscore = models.CharField(max_length=150, null=True, blank=True)
    mutation_taster_pred = models.CharField(max_length=20, null=True, blank=True)
    mutation_assessor_score = models.TextField(null=True, blank=True)
    mutation_assessor_score_rankscore = models.CharField(max_length=150, null=True, blank=True)
    mutation_assessor_pred = models.CharField(max_length=20, null=True, blank=True)
    fathmm_score = models.CharField(max_length=150, null=True, blank=True)
    fathmm_converted_rankscore = models.CharField(max_length=150, null=True, blank=True)
    fathmm_pred = models.CharField(max_length=20, null=True, blank=True)
    provean_score = models.CharField(max_length=150, null=True, blank=True)
    provean_converted_rankscore = models.CharField(max_length=150, null=True, blank=True)
    provean_pred = models.CharField(max_length=20, null=True, blank=True)
    vest_3_score = models.CharField(max_length=150, null=True, blank=True)
    vest_3_rankscore = models.CharField(max_length=150, null=True, blank=True)
    meta_svm_score = models.CharField(max_length=150, null=True, blank=True)
    meta_svm_rankscore = models.CharField(max_length=150, null=True, blank=True)
    meta_svm_pred = models.CharField(max_length=20, null=True, blank=True)
    meta_lr_score = models.CharField(max_length=150, null=True, blank=True)
    meta_lr_rankscore = models.CharField(max_length=150, null=True, blank=True)
    meta_lr_pred = models.CharField(max_length=20, null=True, blank=True)
    m_cap_score = models.CharField(max_length=150, null=True, blank=True)
    m_cap_rankscore = models.CharField(max_length=150, null=True, blank=True)
    m_cap_pred = models.CharField(max_length=20, null=True, blank=True)
    revel_score = models.CharField(max_length=150, null=True, blank=True)
    revel_rankscore = models.CharField(max_length=150, null=True, blank=True)
    mut_pred_score = models.CharField(max_length=150, null=True, blank=True)
    mut_pred_rankscore = models.CharField(max_length=150, null=True, blank=True)
    cadd_raw = models.CharField(max_length=150, null=True, blank=True)
    cadd_raw_rankscore = models.CharField(max_length=150, null=True, blank=True)
    cadd_phred = models.CharField(max_length=150, null=True, blank=True)
    dann_score = models.CharField(max_length=150, null=True, blank=True)
    dann_rankscore = models.CharField(max_length=150, null=True, blank=True)
    fathmm_mkl_coding_score = models.CharField(max_length=150, null=True, blank=True)
    fathmm_mkl_coding_rankscore = models.CharField(max_length=150, null=True, blank=True)
    fathmm_mkl_coding_pred = models.CharField(max_length=20, null=True, blank=True)
    eigen_coding_or_noncoding = models.CharField(max_length=20, null=True, blank=True)
    eigen_raw = models.CharField(max_length=150, null=True, blank=True)
    eigen_pc_raw = models.CharField(max_length=150, null=True, blank=True)
    geno_canyon_score = models.CharField(max_length=150, null=True, blank=True)
    geno_canyon_score_rankscore = models.CharField(max_length=150, null=True, blank=True)
    integrated_fit_cons_score = models.CharField(max_length=150, null=True, blank=True)
    integrated_fit_cons_score_rankscore = models.CharField(max_length=150, null=True, blank=True)
    integrated_confidence_value = models.CharField(max_length=150, null=True, blank=True)
    gerp_rs = models.CharField(max_length=150, null=True, blank=True)
    gerp_rs_rankscore = models.CharField(max_length=150, null=True, blank=True)
    phylo_p_100_way_vertebrate = models.CharField(max_length=150, null=True, blank=True)
    phylo_p_100_way_vertebrate_rankscore = models.CharField(max_length=150, null=True, blank=True)
    phylo_p_20_way_mammalian = models.CharField(max_length=150, null=True, blank=True)
    phylo_p_20_way_mammalian_rankscore = models.CharField(max_length=150, null=True, blank=True)
    phast_cons_100_way_vertebrate = models.CharField(max_length=150, null=True, blank=True)
    phast_cons_100_way_vertebrate_rankscore = models.CharField(max_length=150, null=True, blank=True)
    phast_cons_20_way_mammalian = models.CharField(max_length=150, null=True, blank=True)
    phast_cons_20_way_mammalian_rankscore = models.CharField(max_length=150, null=True, blank=True)
    si_phy_29_way_log_odds = models.CharField(max_length=150, null=True, blank=True)
    si_phy_29_way_log_odds_rankscore = models.CharField(max_length=150, null=True, blank=True)
    interpro_domain = models.TextField(null=True, blank=True)
    gt_ex_v_6_p_gene = models.TextField(null=True, blank=True)
    gt_ex_v_6_p_tissue = models.TextField(null=True, blank=True)
    cadd_16_gt_10 = models.CharField(max_length=150, null=True, blank=True)
    nci_60 = models.CharField(max_length=150, null=True, blank=True)
    clnalleleid = models.CharField(max_length=200, null=True, blank=True)
    clndn = models.TextField(null=True, blank=True)
    clndisdb = models.TextField(null=True, blank=True)
    clnrevstat = models.TextField(null=True, blank=True)
    clnsig = models.TextField(null=True, blank=True)
