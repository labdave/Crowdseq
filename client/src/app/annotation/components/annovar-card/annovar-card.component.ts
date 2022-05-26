import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-annovar-card',
  templateUrl: './annovar-card.component.html',
  styleUrls: ['./annovar-card.component.scss']
})
export class AnnovarCardComponent implements OnInit {
  @Input() data: any;
  @ViewChild(MatSort) sort: MatSort;

  readonly ANNOVAR_METRIC_MAP = {
    'func_ref_gene': 'Func.refGene',
    'gene_ref_gene': 'Gene.refGene',
    'gene_detail_ref_gene': 'GeneDetail.refGene',
    'exonic_func_ref_gene': 'ExonicFunc.refGene',
    'aa_change_ref_gene': 'AAChange.refGene',
    'genomic_super_dups': 'genomicSuperDups',
    'ex_ac_all': 'ExAC_ALL',
    'gnomad_exome_af_popmax': 'gnomad_exome_AF_popmax',
    'gnomad_genome_af': 'gnomad_genome_AF',
    'avsnp_150': 'avsnp150',
    'cosmic_91_coding': 'cosmic91_coding',
    'cosmic_91_noncoding': 'cosmic91_noncoding',
    'sift_score': 'SIFT_score',
    'sift_converted_rankscore': 'SIFT_converted_rankscore',
    'sift_pred': 'SIFT_pred',
    'polyphen_2_hdiv_score': 'Polyphen2_HDIV_score',
    'polyphen_2_hdiv_rankscore': 'Polyphen2_HDIV_rankscore',
    'polyphen_2_hdiv_pred': 'Polyphen2_HDIV_pred',
    'polyphen_2_hvar_score': 'Polyphen2_HVAR_score',
    'polyphen_2_hvar_rankscore': 'Polyphen2_HVAR_rankscore',
    'polyphen_2_hvar_pred': 'Polyphen2_HVAR_pred',
    'lrt_score': 'LRT_score',
    'lrt_converted_rankscore': 'LRT_converted_rankscore',
    'lrt_pred': 'LRT_pred',
    'mutation_taster_score': 'MutationTaster_score',
    'mutation_taster_converted_rankscore': 'MutationTaster_converted_rankscore',
    'mutation_taster_pred': 'MutationTaster_pred',
    'mutation_assessor_score': 'MutationAssessor_score',
    'mutation_assessor_score_rankscore': 'MutationAssessor_score_rankscore',
    'mutation_assessor_pred': 'MutationAssessor_pred',
    'fathmm_score': 'FATHMM_score',
    'fathmm_converted_rankscore': 'FATHMM_converted_rankscore',
    'fathmm_pred': 'FATHMM_pred',
    'provean_score': 'PROVEAN_score',
    'provean_converted_rankscore': 'PROVEAN_converted_rankscore',
    'provean_pred': 'PROVEAN_pred',
    'vest_3_score': 'VEST3_score',
    'vest_3_rankscore': 'VEST3_rankscore',
    'meta_svm_score': 'MetaSVM_score',
    'meta_svm_rankscore': 'MetaSVM_rankscore',
    'meta_svm_pred': 'MetaSVM_pred',
    'meta_lr_score': 'MetaLR_score',
    'meta_lr_rankscore': 'MetaLR_rankscore',
    'meta_lr_pred': 'MetaLR_pred',
    'm_cap_score': 'M.CAP_score',
    'm_cap_rankscore': 'M.CAP_rankscore',
    'm_cap_pred': 'M.CAP_pred',
    'revel_score': 'REVEL_score',
    'revel_rankscore': 'REVEL_rankscore',
    'mut_pred_score': 'MutPred_score',
    'mut_pred_rankscore': 'MutPred_rankscore',
    'cadd_raw': 'CADD_raw',
    'cadd_raw_rankscore': 'CADD_raw_rankscore',
    'cadd_phred': 'CADD_phred',
    'dann_score': 'DANN_score',
    'dann_rankscore': 'DANN_rankscore',
    'fathmm_mkl_coding_score': 'fathmm.MKL_coding_score',
    'fathmm_mkl_coding_rankscore': 'fathmm.MKL_coding_rankscore',
    'fathmm_mkl_coding_pred': 'fathmm.MKL_coding_pred',
    'eigen_coding_or_noncoding': 'Eigen_coding_or_noncoding',
    'eigen_raw': 'Eigen.raw',
    'eigen_pc_raw': 'Eigen.PC.raw',
    'geno_canyon_score': 'GenoCanyon_score',
    'geno_canyon_score_rankscore': 'GenoCanyon_score_rankscore',
    'integrated_fit_cons_score': 'integrated_fitCons_score',
    'integrated_fit_cons_score_rankscore': 'integrated_fitCons_score_rankscore',
    'integrated_confidence_value': 'integrated_confidence_value',
    'gerp_rs': 'GERP.._RS',
    'gerp_rs_rankscore': 'GERP.._RS_rankscore',
    'phylo_p_100_way_vertebrate': 'phyloP100way_vertebrate',
    'phylo_p_100_way_vertebrate_rankscore': 'phyloP100way_vertebrate_rankscore',
    'phylo_p_20_way_mammalian': 'phyloP20way_mammalian',
    'phylo_p_20_way_mammalian_rankscore': 'phyloP20way_mammalian_rankscore',
    'phast_cons_100_way_vertebrate': 'phastCons100way_vertebrate',
    'phast_cons_100_way_vertebrate_rankscore': 'phastCons100way_vertebrate_rankscore',
    'phast_cons_20_way_mammalian': 'phastCons20way_mammalian',
    'phast_cons_20_way_mammalian_rankscore': 'phastCons20way_mammalian_rankscore',
    'si_phy_29_way_log_odds': 'SiPhy_29way_logOdds',
    'si_phy_29_way_log_odds_rankscore': 'SiPhy_29way_logOdds_rankscore',
    'interpro_domain': 'Interpro_domain',
    'gt_ex_v_6_p_gene': 'GTEx_V6p_gene',
    'gt_ex_v_6_p_tissue': 'GTEx_V6p_tissue',
    'cadd_16_gt_10': 'cadd16gt10',
    'nci_60': 'nci60',
    'clnalleleid': 'CLNALLELEID',
    'clndn': 'CLNDN',
    'clndisdb': 'CLNDISDB',
    'clnrevstat': 'CLNREVSTAT',
    'clnsig': 'CLNSIG'
  };

  unformattedData: any;
  annovarData: any = [];
  displayedColumns: string[] = ['key', 'value'];
  dataSource: MatTableDataSource<any>;

  constructor() {}

  ngOnInit() {
    this.unformattedData = this.data;

    const keys = Object.keys(this.unformattedData);
    for ( let i = 0; i < keys.length; i++ ) {
      const key = this.ANNOVAR_METRIC_MAP[keys[i]];
      this.annovarData.push({'key': key, 'value': this.unformattedData[keys[i]]});
    }
    this.dataSource = new MatTableDataSource(this.annovarData);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
