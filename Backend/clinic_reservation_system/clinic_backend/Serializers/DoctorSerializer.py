from rest_framework import serializers

from clinic_backend.Models.DoctorModel import DoctorModel


class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = DoctorModel
        fields = ["username", "password", "role"]
