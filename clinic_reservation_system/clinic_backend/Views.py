from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError

from clinic_backend.Models import Doctor, Patient, Slot
from clinic_backend.Serializers import DoctorSerializer, PatientSerializer, SlotSerializer


@api_view(['POST'])
def sign_up(request):  # -- SIGN UP USER -------------------------------------------------------------------------------
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        role = request.data.get('role')
        if Doctor.objects.filter(username=username).first() or \
                Patient.objects.filter(username=username).first():
            return JsonResponse({'status': False, 'message': 'Username already in use.'})
        if role == "Doctor":
            doctor = Doctor(username=username, password=password, role=role)
            doctor.save()
            user = DoctorSerializer(data=doctor.__dict__)
            if user.is_valid(raise_exception=True):
                return JsonResponse(
                    {'status': True, 'message': 'User signed up successfully.', "object": user.validated_data})
        elif role == "Patient":
            patient = Patient(username=username, password=password, role=role)
            patient.save()
            user = DoctorSerializer(data=patient.__dict__)
            if user.is_valid(raise_exception=True):
                return JsonResponse(
                    {'status': True, 'message': 'User signed up successfully.', "object": user.validated_data})
    except ValidationError:
        return JsonResponse({'status': False, 'message': 'Not Applicable format'})
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)})


@api_view(['GET'])
def sign_in(request):  # -- SIGN IN USER -------------------------------------------------------------------------------
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        if Doctor.objects.filter(username=username).first():
            doctor = Doctor.objects.get(username=username)
            if doctor.password == password:
                user = DoctorSerializer(data=doctor.__dict__)
                if user.is_valid(raise_exception=True):
                    return JsonResponse(
                        {'status': True, 'message': 'User signed in successfully.', "object": user.validated_data})
            else:
                return JsonResponse({'status': False, 'message': 'Password is not correct.'})
        elif Patient.objects.filter(username=username).first():
            patient = Patient.objects.get(username=username)
            if patient.password == password:
                user = PatientSerializer(data=patient.__dict__)
                if user.is_valid(raise_exception=True):
                    return JsonResponse(
                        {'status': True, 'message': 'User signed in successfully.', "object": user.validated_data})
            else:
                return JsonResponse({'status': False, 'message': 'Password is not correct.'})
        return JsonResponse({'status': False, 'message': 'Username not found.'})
    except ValidationError:
        return JsonResponse({'status': False, 'message': 'Not Applicable format'})
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)})


@api_view(['POST'])
def doctor_insert_slot(request):  # -- DOCTOR INSERT SLOT --------------------------------------------------------------
    try:
        username = request.data.get('username')
        date = request.data.get('date')
        time = request.data.get('time')
        doctor = Doctor.objects.get(username=username)
        if Slot.objects.filter(doctor=doctor.username, date=date, time=time).first():
            return JsonResponse({'status': False, 'message': 'Slot already occupied'})
        new_slot = Slot(doctor=doctor.username, date=date, time=time)
        new_slot.save()
        slot = SlotSerializer(data=new_slot.__dict__)
        if slot.is_valid(raise_exception=True):
            return JsonResponse(
                {'status': True, 'message': 'Slot successfully reserved.', "object": slot.validated_data})
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)})


@api_view(['POST'])
def patient_choose_slot(request):  # -- PATIENT CHOOSE SLOT ------------------------------------------------------------
    try:
        username = request.data.get('username')
        doctor = request.data.get('doctor')
        date = request.data.get('date')
        time = request.data.get('time')
        patient = Patient.objects.get(username=username)
        doctor = Doctor.objects.get(username=doctor)
        if Slot.objects.filter(doctor=doctor.username, date=date, time=time).first():
            return JsonResponse({'status': False, 'message': 'Slot already occupied'})
        new_slot = Slot(patient=patient.username, doctor=doctor.username, date=date, time=time)
        new_slot.save()
        slot = SlotSerializer(data=new_slot.__dict__)
        if slot.is_valid(raise_exception=True):
            return JsonResponse(
                {'status': True, 'message': 'Slot successfully reserved.', "object": slot.validated_data})
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)})


@api_view(['PUT'])
def patient_update_slot(request):  # -- PATIENT UPDATE SLOT ------------------------------------------------------------
    try:
        username = request.data.get('username')
        doctor = request.data.get('doctor')
        date = request.data.get('date')
        time = request.data.get('time')
        patient = Patient.objects.get(username=username)
        doctor = Doctor.objects.get(username=doctor)
        if Slot.objects.filter(doctor=doctor.username, date=date, time=time).first():
            return JsonResponse({'status': False, 'message': 'Slot already occupied'})
        Slot.objects.filter(patient=patient.username).delete()
        new_slot = Slot(patient=patient.username, doctor=doctor.username, date=date, time=time)
        new_slot.save()
        slot = SlotSerializer(data=new_slot.__dict__)
        if slot.is_valid(raise_exception=True):
            return JsonResponse(
                {'status': True, 'message': 'Slot successfully edited.', "object": slot.validated_data})
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)})


@api_view(['DELETE'])
def patient_delete_slot(request):  # -- PATIENT DELETE SLOT ------------------------------------------------------------
    try:
        username = request.data.get('username')
        Slot.objects.filter(patient=username).delete()
        return JsonResponse(
            {'status': True, 'message': 'Slot successfully deleted.'})
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)})


@api_view(['GET'])
def patient_view_slots(request):  # -- PATIENT VIEW SLOTS --------------------------------------------------------------
    try:
        username = request.data.get('username')
        slot = Slot.objects.get(patient=username)
        serializer = SlotSerializer(data=slot.__dict__)
        if serializer.is_valid(raise_exception=True):
            return JsonResponse(
                {'status': True, 'message': 'Slots successfully retrieved.', "object": serializer.validated_data})
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)})
