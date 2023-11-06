from django.db import models


class PatientModel(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    role = models.CharField(max_length=20)
    objects = models.Manager()

    class Meta:
        db_table = 'Patients'
