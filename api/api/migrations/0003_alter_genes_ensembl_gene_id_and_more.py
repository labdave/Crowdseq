# Generated by Django 4.0.3 on 2022-04-02 01:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_transcripts_aa_change_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='genes',
            name='ensembl_gene_id',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='genes',
            name='locus_specific_gene_id',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='genes',
            name='omim_id',
            field=models.TextField(blank=True, null=True),
        ),
    ]
