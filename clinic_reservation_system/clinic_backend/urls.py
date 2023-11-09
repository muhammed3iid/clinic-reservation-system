from django.contrib import admin
from django.urls import path

from clinic_backend import Views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('sign_up/', Views.sign_up),
    path('sign_in/', Views.sign_in),
    path('insert_slot/', Views.doctor_insert_slot),
    path('choose_slot/', Views.patient_choose_slot),
    path('update_slot/', Views.patient_update_slot),
    path('delete_slot/', Views.patient_delete_slot)
]
