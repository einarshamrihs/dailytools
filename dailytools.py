from flask import Flask
from flask import render_template, send_from_directory

app = Flask(__name__, static_url_path='/templates')

@app.route("/")
def hello_world():
    return render_template('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('templates/js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('templates/css', path)

@app.route('/views/<path:path>')
def send_views(path):
    return send_from_directory('templates/views', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80)
