from flask import Flask
from flask import render_template, send_from_directory, make_response
from settings import Settings

settings = Settings()

app = Flask(__name__, static_url_path='/templates')

@app.route("/")
def hello_world():
    resp = make_response(render_template('index.html'))
    resp.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    resp.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
    return resp
    
@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('templates/js', path)

@app.route('/node_modules/<path:path>')
def send_node_modules(path):
    return send_from_directory('templates/node_modules/', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('templates/css', path)

@app.route('/views/<path:path>')
def send_views(path):
    return send_from_directory('templates/views', path)

@app.route('/icons/<path:path>')
def send_icons(path):
    return send_from_directory('templates/icons', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=settings.http_port,ssl_context=settings.ssl_context)
