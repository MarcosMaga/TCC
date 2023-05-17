from dao.dispositivos_dao import DispositivosDao
from models.dispositivo import Dispositivo
from flask import jsonify

class DispositivosController:
    def cadastrar_dispositivo(data):
        result = DispositivosDao.insert_dispositivo(data.get('macId'))
        if result == None:
            return jsonify({"res": "Falha ao cadastrar dispositivo."}), 400
        
        return jsonify({'res' :'Dispositivo cadastrado.'}), 200

    def select_dispositivo(id):
        result = DispositivosDao.select_dispositivo_id(id)

        if result == None:
            return jsonify({"res": "Falha ao encontrar dispositivo."}), 404
        dispositivo = Dispositivo(result[0], result[1])

        return jsonify(dispositivo.__dict__), 200
