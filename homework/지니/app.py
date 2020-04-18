import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://www.genie.co.kr/chart/top200?ditc=D&rtm=N&ymd=20200309', headers=headers)

soup = BeautifulSoup(data.text, 'html.parser')
musics = soup.select('div.newest-list > div.music-list-wrap > table > tbody > tr')

musicss = MongoClient('localhost', 27017)
db = musicss.dbsparta
#print(musics)

#############################
# (입맛에 맞게 코딩)
###########f##################
rank = 1
for music in musics:
    # movie 안에 a 가 있으면,
    title_tag= music.select_one('td.info >  a.title')
    artist_tag= music.select_one('td.info >  a.artist')


    if title_tag is not None and artist_tag is not None:
      title = title_tag.text.strip()
      artist =artist_tag.text.strip()

      doc={
          'rank':rank,
          'title':title,
          'artist':artist
      }
      db.musicss.insert_one(doc)
      rank += 1