from django.contrib import admin
from django.urls import path

from .Views import GuestView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('sign_up_doctor/', GuestView.doctor_sign_up),
    path('sign_up_patient/', GuestView.patient_sign_up),
    path('sign_in/', GuestView.sign_in)
]
