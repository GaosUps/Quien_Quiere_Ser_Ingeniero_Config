from flask import Flask
from database import connection
from routes import routesqqi
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

app.register_blueprint(routesqqi.routes)
if __name__ == '__main__':
    connection.connect_db()
    app.run(host='0.0.0.0')
