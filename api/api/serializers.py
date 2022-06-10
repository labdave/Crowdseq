import logging

from rest_framework import serializers
from api import models

# Get an instance of a logger
logger = logging.getLogger(__name__)


class GeneAnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.GeneAnnotation
        fields = serializers.ALL_FIELDS


class GeneWithAnnotationSerializer(serializers.ModelSerializer):
    annotations = GeneAnnotationSerializer(many=True, required=False)

    class Meta:
        model = models.Genes
        fields = serializers.ALL_FIELDS


class GeneSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Genes
        fields = serializers.ALL_FIELDS


class GeneSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Genes
        fields = serializers.ALL_FIELDS


class TranscriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transcript
        fields = serializers.ALL_FIELDS


class TranscriptNoAASerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transcript
        exclude = ('aa_changes',)


class AminoAcidChangeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.AminoAcidChange
        exclude = ('transcripts', 'genes',)


class AminoAcidSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AminoAcidChange
        exclude = ('transcripts', 'genes',)


class AminoAcidAnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AminoAcidAnnotations
        fields = serializers.ALL_FIELDS


class GeneAminoAcidSerializer(serializers.ModelSerializer):
    annotations = AminoAcidAnnotationSerializer(many=True, required=False)

    class Meta:
        model = models.AminoAcidChange
        exclude = ('transcripts', 'genes',)


class AminoAcidWithAnnotationsSerializer(serializers.ModelSerializer):
    annotations = AminoAcidAnnotationSerializer(many=True, required=False)
    genes = GeneWithAnnotationSerializer(many=True, required=False)
    transcripts = TranscriptSerializer(many=True, required=False)

    class Meta:
        model = models.AminoAcidChange
        fields = serializers.ALL_FIELDS


class TranscriptAminoAcidSerializer(serializers.ModelSerializer):
    aa_changes = AminoAcidChangeSerializer(many=True, required=False)

    class Meta:
        model = models.Transcript
        fields = serializers.ALL_FIELDS


class VariantSerializer(serializers.ModelSerializer):
    transcripts = TranscriptAminoAcidSerializer(many=True, required=False)
    gene = GeneWithAnnotationSerializer(many=False, required=False)

    class Meta:
        model = models.Variants
        fields = serializers.ALL_FIELDS


class VariantSearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Variants
        exclude = ('transcripts',)


class SearchSerializer(serializers.Serializer):
    variants = VariantSerializer(source='search_variants', many=True, required=False)
    genes = GeneSearchSerializer(source='search_genes', many=True, required=False)
    aa_changes = AminoAcidSearchSerializer(source='search_aa_changes', many=True, required=False)


class FullAminoAcidSerializer(serializers.ModelSerializer):
    transcripts = TranscriptNoAASerializer(many=True, required=False)
    annotations = AminoAcidAnnotationSerializer(many=True, required=False)

    class Meta:
        model = models.AminoAcidChange
        fields = serializers.ALL_FIELDS


class FullGeneSerializer(serializers.ModelSerializer):
    variants = VariantSearchSerializer(many=True, required=False)
    annotations = GeneAnnotationSerializer(many=True, required=False)

    class Meta:
        model = models.Genes
        fields = serializers.ALL_FIELDS