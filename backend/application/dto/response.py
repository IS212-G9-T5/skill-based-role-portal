class ResponseBodyJSON():
    def __init__(self, data) -> None:
        self._data = data
    
    @property
    def data(self):
        return self._data
    
    @data.setter
    def data(self, data):
        self._data = data

    def json(self) -> dict:
        return {
            "data": self.data
        }

    def __repr__(self) -> str:
        return f'{self.json()}'
    
