from clinic_backend.Authentication.IAuthentication import IAuthentication
from clinic_backend.DAO.Doctor import Doctor
from clinic_backend.DAO.Patient import Patient
from clinic_backend.Models.DoctorModel import DoctorModel
from clinic_backend.Models.ERoles import Roles


class RealAuthentication(IAuthentication):

    def user_sign_up(self, username, password, role):
        if role == Roles.DOCTOR.value:
            return Doctor(username, password, role)
        if role == Roles.PATIENT.value:
            return Patient(username, password, role)
        return None

    def user_sign_in(self, username, password):
        # print(username, password)
        return DoctorModel.objects.get(username=username)
