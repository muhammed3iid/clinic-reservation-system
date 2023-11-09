from rest_framework import serializers

from clinic_backend.Models import Doctor, Patient, Slot


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ["username", "password", "role"]


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ["username", "password", "role"]


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ["date", "time", "doctor", "patient"]
