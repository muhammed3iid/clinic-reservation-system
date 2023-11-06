from django.db import DatabaseError
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError

from clinic_backend.Authentication.Guest import Guest
from clinic_backend.Serializers.DoctorSerializer import DoctorSerializer
from clinic_backend.Serializers.PatientSerializer import PatientSerializer


@api_view(['POST'])
def doctor_sign_up(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        role = request.data.get('role')
        print(username, password, role)
        guest = Guest(username, password, role)
        doctor = guest.guest_sign_up()
        if doctor is not None:
            doctor_serializer = DoctorSerializer(data=doctor.__dict__)
            if doctor_serializer.is_valid(raise_exception=True):
                doctor_serializer.save()
                return JsonResponse(
                    {'status': True, 'message': 'User signed up successfully.', "object": doctor_serializer.data})
    except DatabaseError:
        return JsonResponse({'status': False, 'message': 'User signing up failed.'})
    except ValidationError:
        return JsonResponse({'status': False, 'message': 'Not Applicable format'})
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)})


@api_view(['POST'])
def patient_sign_up(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        role = request.data.get('role')
        guest = Guest(username, password, role)
        patient = guest.guest_sign_up()
        if patient is not None:
            patient_serializer = PatientSerializer(data=patient.__dict__)
            if patient_serializer.is_valid(raise_exception=True):
                patient_serializer.save()
                return JsonResponse(
                    {'status': True, 'message': 'User signed up successfully.', "object": patient_serializer.data})
    except DatabaseError:
        return JsonResponse({'status': False, 'message': 'User signing up failed.'})
    except ValidationError:
        return JsonResponse({'status': False, 'message': 'Not Applicable format'})
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)})


@api_view(['GET'])
def sign_in(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        guest = Guest(username, password)
        user = guest.guest_sign_in()
        if user is not None:
            user_serializer = DoctorSerializer(data=user.__dict__)
            if user_serializer.is_valid(raise_exception=True):
                return JsonResponse(
                    {'status': True, 'message': 'User signed in successfully.', "object": user_serializer.data})
        else:
            return JsonResponse({'status': False, 'message': 'User signing in failed.'})
    except DatabaseError:
        return JsonResponse({'status': False, 'message': 'Database error.'})
    except ValidationError:
        return JsonResponse({'status': False, 'message': 'Not Applicable format'})
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)})
