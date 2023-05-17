class Dispositivo:
    def __init__(self, mac, data_ativacao):
        self.macId = mac
        self.dataAtivacao = data_ativacao

    def get_macId(self):
        return self.macId

    def get_dataAtivacao(self):
        return self.dataAtivacao