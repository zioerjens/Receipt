class ArticleDTO:
    def __init__(self, id, name, quantity, price, reduced, total):
        self.id = id
        self.name = name
        self.quantity = quantity
        self.price = price
        self.reduced = reduced
        self.total = total


def map_frontend_to_backend_articleDTO(request_value):
    return ArticleDTO(request_value['id'], request_value['name'], request_value['quantity'], request_value['price'], request_value['reduced'], request_value['total'])

def is_valid_article(article: ArticleDTO):
    return article.name is not None and article.quantity is not None and article.price is not None and article.total is not None
