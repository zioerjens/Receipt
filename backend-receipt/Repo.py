from Api import connection
from ArticleDTO import ArticleDTO
from ReceiptDTO import ReceiptDTO


class Repo:

    @staticmethod
    def get_all_receipts():
        cursor = connection.cursor()
        query = "SELECT * FROM receipt"
        cursor.execute(query)
        all_receipts = []
        for element in cursor:
            all_receipts.append(ReceiptDTO(element[0], element[1], element[2], []))
        cursor.close()
        return all_receipts

    @staticmethod
    def get_articles_for_receipt(receipt_id):
        cursor = connection.cursor()
        query = "SELECT * FROM article WHERE fk_receipt = " + str(receipt_id)
        cursor.execute(query)
        all_articles = []
        for element in cursor:
            all_articles.append(ArticleDTO(element[1], element[2], element[3], element[4], element[5], element[6]))
        cursor.close()
        return all_articles

    @staticmethod
    def create_article(article: ArticleDTO, receipt_id):
        cursor = connection.cursor()
        query = "INSERT INTO article (fk_receipt, name, quantity, price, reduced, total) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (receipt_id, article.name, article.quantity, article.price, article.reduced, article.total)
        cursor.execute(query, data)
        connection.commit()
        article.id = cursor.lastrowid
        cursor.close()
        print('saved article: ' + article.toString())
        return article

    @staticmethod
    def create_receipt(receipt: ReceiptDTO):
        cursor = connection.cursor()
        query = "INSERT INTO receipt (name, user) VALUES (%s, %s)"
        data = (receipt.name, receipt.user)
        cursor.execute(query, data)
        connection.commit()
        receipt.id = cursor.lastrowid
        cursor.close()
        print('saved receipt: ' + receipt.toString())
        return receipt

