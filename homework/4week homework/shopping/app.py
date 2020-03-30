from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient  # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)

client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db = client.dbsparta  # 'dbsparta'라는 이름의 db를 만듭니다.


## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')


## API 역할을 하는 부분
@app.route('/buying', methods=['POST'])
def write_order():
    name_receive = request.form['name_give']
    type_receive = request.form['type_give']
    count_receive = request.form['count_give']
    address_receive = request.form['address_give']
    number_receive = request.form['number_give']

    ordering = {
        'name': name_receive,
        'type': type_receive,
        'count': count_receive,
        'address': address_receive,
        'number': number_receive
    }

    db.buying.insert_one(ordering)
    return jsonify({'result': 'success', 'msg': '주문이 완료되었습니다.'})


@app.route('/buying', methods=['GET'])
def read_buying():
    buying = list(db.buying.find({}, {'_id': 0}))
    return jsonify({'result': 'success', 'buying': buying})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)