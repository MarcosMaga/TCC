from database.config_db import initDb
import datetime

class DispositivosDao():
    def insert_dispositivo(macId):
        try:
            bd = initDb()
            cursor = bd.cursor()
            sql = "INSERT INTO dispositivos VALUES ('{}', '{}')".format(macId, datetime.date.today().strftime('%Y-%m-%d'))
            cursor.execute(sql)
            bd.commit()
            cursor.close()
            bd.close()
            return 0
        except mysql.connector.Error:
            bd.rollback()
            return None

    def select_dispositivo_id(macId):
        try:
            bd = initDb()
            cursor = bd.cursor()
            sql = "SELECT * FROM dispositivos WHERE macId = '{}'".format(macId)
            cursor.execute(sql)
            result = cursor.fetchone()
            cursor.close()
            bd.close()
            return result
        except mysql.connector.Error:
            bd.rollback()
            return None