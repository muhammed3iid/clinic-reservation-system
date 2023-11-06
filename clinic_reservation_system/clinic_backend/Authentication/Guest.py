from clinic_backend.Authentication.Proxy import Proxy


class Guest:
    def __init__(self, username, password, role=None):
        self.username = username
        self.password = password
        self.role = role
        self.proxy = Proxy()

    def guest_sign_up(self):
        return self.proxy.user_sign_up(self.username, self.password, self.role)

    def guest_sign_in(self):
        return self.proxy.user_sign_in(self.username, self.password)
