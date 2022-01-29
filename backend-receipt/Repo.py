from Api import connection
from ArticleDTO import *
from ReceiptDTO import *

class Repo:

    @staticmethod
    def get_all_receipts():
        cursor = connection.cursor()
        query = "SELECT * FROM receipt"
        cursor.execute(query)
        all_elements = [element for element in cursor]
        return all_elements

    @staticmethod
    def get_receipt(receipt_id):
        cursor = connection.cursor()
        query = "SELECT * FROM receipt WHERE id = " + receipt_id
        cursor.execute(query)
        element = [element for element in cursor]
        return element

    @staticmethod
    def create_article(article: ArticleDTO, receipt_id):
        cursor = connection.cursor()
        query = "INSERT INTO article (fk_receipt, name, quantity, price, reduced, total) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (receipt_id, article.name, article.quantity, article.price, article.reduced, article.total)
        cursor.execute(query, data)
        connection.commit()

    @staticmethod
    def create_receipt(receipt: ReceiptDTO):
        cursor = connection.cursor()
        query = "INSERT INTO receipt (name, user) VALUES (%s, %s)"
        data = (receipt.name, receipt.user)
        cursor.execute(query, data)
        connection.commit()
