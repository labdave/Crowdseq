# Generated by Django 4.0.3 on 2022-05-11 15:42

from django.db import migrations

import uuid


def gen_uuid(apps, schema_editor):
    geneModel = apps.get_model('api', 'genes')
    for row in geneModel.objects.all():
        row.api_key = uuid.uuid4()
        row.save(update_fields=['api_key'])


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_genes_api_key'),
    ]

    operations = [
        # omit reverse_code=... if you don't want the migration to be reversible.
        migrations.RunPython(gen_uuid, reverse_code=migrations.RunPython.noop),
    ]
