from django.db import models


class Technique(models.Model):
    title = models.CharField('Техника', max_length=64, unique=True)

    class Meta:
        verbose_name = 'Техника рисования'
        verbose_name_plural = 'Техники рисования'

    def __str__(self):
        return self.title
