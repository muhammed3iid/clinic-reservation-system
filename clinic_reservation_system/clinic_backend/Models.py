from django.db import models


class Doctor(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    role = models.CharField(max_length=20)
    objects = models.Manager()

    class Meta:
        db_table = 'Doctors'


class Patient(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    role = models.CharField(max_length=20)
    objects = models.Manager()

    class Meta:
        db_table = 'Patients'


class Slot(models.Model):
    doctor = models.CharField(max_length=20)
    patient = models.CharField(max_length=20, null=True)
    date = models.DateField()
    time = models.TimeField()
    objects = models.Manager()

    class Meta:
        db_table = 'Slots'
