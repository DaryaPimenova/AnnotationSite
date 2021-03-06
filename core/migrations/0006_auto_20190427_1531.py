# Generated by Django 2.1.7 on 2019-04-27 12:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0005_auto_20190411_0834'),
    ]

    operations = [
        migrations.CreateModel(
            name='Classification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'verbose_name_plural': 'Классификации',
                'verbose_name': 'Классификация',
            },
        ),
        migrations.CreateModel(
            name='Detection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x1', models.PositiveSmallIntegerField()),
                ('y1', models.PositiveSmallIntegerField()),
                ('x2', models.PositiveSmallIntegerField()),
                ('y2', models.PositiveSmallIntegerField()),
            ],
            options={
                'verbose_name_plural': 'Детекции',
                'verbose_name': 'Детекция',
            },
        ),
        migrations.CreateModel(
            name='Technique',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=64, verbose_name='Техника')),
            ],
            options={
                'verbose_name_plural': 'Техники рисования',
                'verbose_name': 'Техника рисования',
            },
        ),
        migrations.RemoveField(
            model_name='annotation',
            name='image',
        ),
        migrations.RemoveField(
            model_name='annotation',
            name='image_class',
        ),
        migrations.RemoveField(
            model_name='annotation',
            name='user',
        ),
        migrations.AlterUniqueTogether(
            name='imagetoclass',
            unique_together=set(),
        ),
        migrations.RemoveField(
            model_name='imagetoclass',
            name='image',
        ),
        migrations.RemoveField(
            model_name='imagetoclass',
            name='image_class',
        ),
        migrations.RemoveField(
            model_name='image',
            name='classes',
        ),
        migrations.RemoveField(
            model_name='image',
            name='style',
        ),
        migrations.DeleteModel(
            name='Annotation',
        ),
        migrations.DeleteModel(
            name='ImageToClass',
        ),
        migrations.AddField(
            model_name='detection',
            name='image',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Image'),
        ),
        migrations.AddField(
            model_name='detection',
            name='image_class',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.ImageClass'),
        ),
        migrations.AddField(
            model_name='detection',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='classification',
            name='image',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Image'),
        ),
        migrations.AddField(
            model_name='classification',
            name='image_class',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.ImageClass'),
        ),
        migrations.AddField(
            model_name='classification',
            name='style',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.Style'),
        ),
        migrations.AddField(
            model_name='classification',
            name='technique',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.Technique'),
        ),
        migrations.AddField(
            model_name='classification',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
