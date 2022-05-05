import logging

from rest_framework import serializers
from api import models

# Get an instance of a logger
logger = logging.getLogger(__name__)


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
        model = models.Transcripts
        fields = serializers.ALL_FIELDS


class VariantSerializer(serializers.ModelSerializer):
    transcripts = TranscriptSerializer(source='filtered_transcripts', many=True, required=False)
    gene = GeneSerializer(source='filtered_genes', many=False, required=False)

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