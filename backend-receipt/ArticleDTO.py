class ArticleDTO:
    def __init__(self, id, name, quantity, price, reduced, total, deleted):
        self.id = id
        self.name = name
        self.quantity = quantity
        self.price = price
        self.reduced = reduced
        self.total = total
        self.deleted = deleted

    def toString(self):
      return '{{id: {}, name: {}, quantity: {}, price: {}, reduced: {}, total: {}, deleted: {}}'.format(self.id, self.name, self.quantity, self.price, self.reduced, self.total, self.deleted)

def map_json_to_articleDTO(request_value):
    article_id = None
    if 'id' in request_value:
      article_id = request_value['id']

    reduced = None
    if 'reduced' in request_value:
      reduced = request_value['reduced']

    deleted = None
    if 'deleted' in request_value:
        deleted = request_value['deleted']

    return ArticleDTO(article_id, request_value['name'], request_value['quantity'], request_value['price'], reduced, request_value['total'], deleted)


def is_valid_article(article: ArticleDTO):
    return article.name is not None and article.quantity is not None and article.price is not None and article.total is not None
