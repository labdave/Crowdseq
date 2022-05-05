import logging
import re
import time

from django.db.models import Q
from django.db import connection
from django.db.models.query import Prefetch
from rest_framework import viewsets, filters, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action, api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from pymongo import MongoClient


from api import models, serializers
from database.MongoHelper import MongoHelper

# Get an instance of a logger
logger = logging.getLogger(__name__)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000


class VariantViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing/editing Variants.
    """
    pagination_class = StandardResultsSetPagination
    queryset = models.Variants.objects.all().order_by('chrom_pos_ref_alt')
    serializer_class = serializers.VariantSerializer
    filter_backends = (filters.SearchFilter, )
    search_fields = ('chrom_pos_ref_alt', 'refseq_hgvsg_id', 'alt_hgvsg_id', 'hgvsg_id', 'lrg_hgvsg_id', 'transcripts__aa_change_name', 'transcripts__ensembl_transcript_id')


@api_view(['GET'])
@permission_classes((permissions.AllowAny, ))
@authentication_classes([])
@permission_classes([])
def search(request):
    """
    API endpoint that allows user to search for Genes and Variants
    """

    start = time.time()
    search_term = request.query_params.get('query', '')
    if search_term:
        gene_fields = ['alias_symbols__icontains', 'approved_name__icontains', 'approved_symbol__icontains']
        or_condition = Q()
        for key in gene_fields:
            or_condition.add(Q(**{key: search_term}), Q.OR)
        gene_queryset = models.Genes.objects.filter(or_condition).order_by('approved_symbol')
        transcript_fields = ['aa_change_name__icontains', 'ensembl_transcript_id__icontains']
        or_condition = Q()
        for key in transcript_fields:
            or_condition.add(Q(**{key: search_term}), Q.OR)
        trans_matches = models.Transcripts.objects.filter(or_condition)
        trans_var_matches = []
        for transcript in trans_matches:
            for v in transcript.variants.all():
                trans_var_matches.append(v.id)
        trans_var_matches = list(set(trans_var_matches))
        variant_fields = ['chrom_pos_ref_alt__icontains', 'alt_chrom_pos_ref_alt__icontains', 'refseq_hgvsg_id__icontains', 'alt_hgvsg_id__icontains', 'hgvsg_id__icontains', 'lrg_hgvsg_id__icontains']
        or_condition = Q()
        if len(trans_var_matches) > 0:
            or_condition.add(Q(id__in=trans_var_matches), Q.OR)
        for key in variant_fields:
            or_condition.add(Q(**{key: search_term}), Q.OR)
        variant_queryset = models.Variants.objects.filter(or_condition).order_by('chrom_pos_ref_alt')
    else:
        variant_queryset = models.Variants.objects.order_by('chrom_pos_ref_alt')

    time_diff = time.time() - start
    print(f"Full queryset time: {time_diff}")
    print(f"Number of queries pre-serialization: {len(connection.queries)}")

    results = {'search_genes': gene_queryset, 'search_variants': variant_queryset}

    serializer = serializers.SearchSerializer(results, context={'request': request})

    time_diff = time.time() - start
    print(f"Full endpoint time: {time_diff}")
    print(f"Number of queries post-serialization: {len(connection.queries)}")

    return Response(serializer.data)
