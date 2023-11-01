from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@cross_origin
@app.route('/', methods=['POST'])
def main():
    test = request.json['curr_state']
    print(test)
    return test

if __name__ == '__main__':
    app.run(debug=True)