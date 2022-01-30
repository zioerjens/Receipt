class ArticleDTO:
    def __init__(self, id, name, quantity, price, reduced, total):
        self.id = id
        self.name = name
        self.quantity = quantity
        self.price = price
        self.reduced = reduced
        self.total = total

    def toString(self):
      return '{{id: {}, name: {}, quantity: {}, price: {}, reduced: {}, total: {}}}'.format(self.id, self.name, self.quantity, self.price, self.reduced, self.total)

def map_json_to_articleDTO(request_value):
    article_id = None
    if 'id' in request_value:
      article_id = request_value['id']

    reduced = None
    if 'reduced' in request_value:
      reduced = request_value['reduced']

    return ArticleDTO(article_id, request_value['name'], request_value['quantity'], request_value['price'], reduced, request_value['total'])


def is_valid_article(article: ArticleDTO):
    return article.name is not None and article.quantity is not None and article.price is not None and article.total is not None
