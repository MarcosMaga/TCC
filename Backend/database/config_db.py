import mysql.connector

host = 'localhost'
user = 'root'
password = ''
database = 'smartwater'

def initDb():
    cnx = mysql.connector.connect(host=host, user=user, password=password, database=database)
    return cnx