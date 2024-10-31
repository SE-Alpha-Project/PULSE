import requests
url = ('https://newsapi.org/v2/everything?'
       'q=fitness OR health&'
       'apiKey=077f18ffe60042bb908e3d88640165e1')
response = requests.get(url)
articles = response.json()
articles_list = res = dict(list(articles.items())[0: 10])
print(articles_list)

