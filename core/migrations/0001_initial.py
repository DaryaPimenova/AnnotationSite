# Generated by Django 2.1.7 on 2019-03-09 07:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Annotation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('remark', models.CharField(default='', max_length=64, verbose_name='Подпись')),
                ('style', models.CharField(default='', max_length=64, verbose_name='Стиль')),
                ('sense', models.CharField(default='', max_length=128, verbose_name='Смысл')),
                ('point_one_x', models.PositiveSmallIntegerField()),
                ('point_one_y', models.PositiveSmallIntegerField()),
                ('point_two_x', models.PositiveSmallIntegerField()),
                ('point_two_y', models.PositiveSmallIntegerField()),
            ],
            options={
                'verbose_name_plural': 'Аннотации',
                'db_table': 'annotation',
                'verbose_name': 'Аннотация',
            },
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_file', models.ImageField(upload_to='annotated_images', verbose_name='Изображение')),
            ],
            options={
                'verbose_name_plural': 'Изображения',
                'verbose_name': 'Изображение',
            },
        ),
        migrations.AddField(
            model_name='annotation',
            name='image',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Image'),
        ),
        migrations.AddField(
            model_name='annotation',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
