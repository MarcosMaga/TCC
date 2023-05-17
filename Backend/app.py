from flask import Flask, request
from controllers.dispositivos_controller import DispositivosController

app = Flask(__name__)

@app.route('/dispositivo', methods=['GET', 'POST'])
def dispositivo():
    if request.method == 'POST':
        return DispositivosController.cadastrar_dispositivo(request.get_json())
    elif request.method == 'GET':
        return DispositivosController.select_dispositivo(request.args.get('mac'))

if __name__ == '__main__':
    app.run()