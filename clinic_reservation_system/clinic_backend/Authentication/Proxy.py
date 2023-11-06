from clinic_backend.Authentication.IAuthentication import IAuthentication
from clinic_backend.Authentication.RealAuthentication import RealAuthentication
from clinic_backend.Models.DoctorModel import DoctorModel
from clinic_backend.Models.ERoles import Roles
from clinic_backend.Models.PatientModel import PatientModel


class Proxy(IAuthentication):
    def __init__(self):
        self.authentication = RealAuthentication()

    @staticmethod
    def check_sign_up(username, role):
        if role == Roles.DOCTOR.value:
            if DoctorModel.objects.filter(username=username).exists():
                return False
            else:
                return True
        if role == Roles.PATIENT.value:
            if PatientModel.objects.filter(username=username).exists():
                return False
            else:
                return True

    @staticmethod
    def check_sign_in(username, password):
        # print(username, password)
        user = DoctorModel.objects.get(username=username)
        print(username, password)
        return user.password == password

    def user_sign_up(self, username, password, role):
        if self.check_sign_up(username, role):
            return self.authentication.user_sign_up(username, password, role)
        else:
            return None

    def user_sign_in(self, username, password):
        if self.check_sign_in(username, password):
            # print(username, password)
            return self.authentication.user_sign_in(username, password)
        else:
            return None
