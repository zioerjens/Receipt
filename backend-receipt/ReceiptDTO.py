from ArticleDTO import map_json_to_articleDTO


class ReceiptDTO:
    def __init__(self, id, name, user, articles):
        self.id = id
        self.name = name
        self.user = user
        self.articles = articles

    def toString(self):
        return '{{id: {}, name: {}, user: {}}}'.format(self.id, self.name, self.user)


def map_json_to_receiptDTO(request_value):
    receipt_id = None
    if ('id' in request_value):
        receipt_id = request_value['id']

    user = None
    if ('user' in request_value):
        user = request_value['user']

    articles = None
    if ('articles' in request_value):
        articles = []
        articlesJson = request_value['articles']
        for article in articlesJson:
            articles.append(map_json_to_articleDTO(article))

    return ReceiptDTO(receipt_id, request_value['name'], user, articles)


def is_valid_receipt(receipt: ReceiptDTO):
    return receipt.name is not None
