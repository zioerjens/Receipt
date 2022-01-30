from ArticleDTO import ArticleDTO
from Repo import Repo


def create_articles(articles, receipt_id):
    saved_articles = []
    for article in articles:
        saved_article = Repo.create_article(article, receipt_id)
        saved_articles.append(saved_article)

    return saved_articles


def update_article(article: ArticleDTO):
    return Repo.update_article(article)
