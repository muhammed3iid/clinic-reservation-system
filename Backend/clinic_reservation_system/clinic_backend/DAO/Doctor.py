class Doctor:
    def __init__(self, username, password, role):
        self.username = username
        self.password = password
        self.role = role

    def get_username(self):
        return self.username

    def get_password(self):
        return self.password
        
    
