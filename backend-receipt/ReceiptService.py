from ArticleService import *
from ReceiptDTO import *
from Repo import Repo


def create_receipt(receipt: ReceiptDTO):
    if is_valid_receipt(receipt):
        saved_receipt: ReceiptDTO = Repo.create_receipt(receipt)
        if receipt.articles is not None:
            saved_receipt.articles = create_articles(receipt.articles, saved_receipt.id)

        return saved_receipt
    return 'not-saved', 400


def update_receipt(receipt):
    print(receipt)


def get_all_receipts():
    receipts = Repo.get_all_receipts()
    for receipt in receipts:
        receipt.articles = Repo.get_articles_for_receipt(receipt.id)

    return receipts
