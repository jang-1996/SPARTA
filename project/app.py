from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient  # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)

client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db = client.dbsparta  # 'dbsparta'라는 이름의 db를 만듭니다.


## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/question')
def question():
    return render_template('question.html')

@app.route('/posting', methods=['POST'])
def write_order():
    title_receive = request.form['title_give']
    text_receive = request.form['text_give']
    type_receive = request.form['type_give']
    username_receive = request.form['username_give']

    submitting = {
        'title': title_receive,
        'text': text_receive,
        'type': type_receive,
        'username': username_receive,
    }

    db.posting.insert_one(submitting)
    return jsonify({'result': 'success', 'msg': '질문이 등록되었습니다.'})


@app.route('/posting', methods=['GET'])
def read_posting():
    posting = list(db.posting.find({}, {'_id': 0}))
    return jsonify({'result': 'success', 'posting': posting})



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)