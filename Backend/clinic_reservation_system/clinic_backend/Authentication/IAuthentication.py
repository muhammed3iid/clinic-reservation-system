from abc import ABC, abstractmethod


class IAuthentication(ABC):
    @abstractmethod
    def user_sign_in(self, username, password):
        pass

    @abstractmethod
    def user_sign_up(self, username, password, role):
        pass
