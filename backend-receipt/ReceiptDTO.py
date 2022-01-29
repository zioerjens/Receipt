class ReceiptDTO:
    def __init__(self, id, name, user, articles):
        self.id = id
        self.name = name
        self.user = user
        self.articles = articles


def map_frontend_to_backend_receiptDTO(request_value):
      receipt_id = None
      if (hasattr(request_value, 'id')):
          receipt_id = request_value['id']

      articles = None
      if (hasattr(request_value, 'articles')):
        articles = request_value['articles']

      return ReceiptDTO(receipt_id, request_value['name'], request_value['user'], articles)

def is_valid_receipt(receipt: ReceiptDTO):
    return receipt.name is not None and receipt.user is not None
