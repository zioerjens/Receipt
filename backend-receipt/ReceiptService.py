from ArticleService import *
from ReceiptDTO import *
from Repo import Repo


def create_receipt(receipt: ReceiptDTO):
    if is_valid_receipt(receipt):
        Repo.create_receipt(receipt)
        if receipt.articles is not None:
            create_articles(receipt.articles)


def update_receipt(receipt):
    print(receipt)


def get_all_receipts():
    return Repo.get_all_receipts()
