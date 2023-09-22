class CustomExceptionJson(Exception):
    def __init__(self, message, **kwargs) -> None:
        super().__init__(**kwargs)
        self._message = message

    @property
    def message(self):
        return self._message

    @message.setter
    def message(self, message):
        self._message = message

    def json(self) -> dict:
        return {"message": self.message}

    def __repr__(self) -> str:
        return f"{self.json()}"
