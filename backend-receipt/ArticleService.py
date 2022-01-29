from ArticleDTO import *
from Repo import Repo


def create_articles(articles):
    for article in articles:
        Repo.create_article(map_frontend_to_backend_articleDTO(article))
