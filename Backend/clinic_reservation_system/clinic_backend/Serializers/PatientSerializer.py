from rest_framework import serializers

from clinic_backend.Models.PatientModel import PatientModel


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientModel
        fields = ["username", "password", "role"]
