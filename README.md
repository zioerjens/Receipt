Installation Backend:

1. py -m ensurepip --upgrade
2. py -m pip install --upgrade pip
3. py -m pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib
4. py -m pip install --upgrade flask-restful
5. py -m pip install --upgrade flask
5. py -m pip install --upgrade flask-cors
5. py -m pip install --upgrade mysql-connector-python

Set-Up credentials:

1. Go to https://console.cloud.google.com/apis/credentials?project=receipt-338215
2. Download OAuth 2.0 Client IDs as Json
3. Save the Json as credentials.json at project root
4. Login via frontend is possible, the backend saves a token.json when executed the first time

SQL-Code to create the database and insert two rows of dummy data:
```` mysql
drop database if exists receiptDB;

create database if not exists receiptDB;
use receiptDB;
create table if not exists article (
    id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fk_receipt bigint NOT NULL,
    name varchar(300) NOT NULL,
    quantity int NOT NULL,
    price float NOT NULL,
    reduced float,
    total float NOT NULL
);

create table if not exists receipt (
	id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(200),
    user varchar(30) NOT NULL
);

insert into article (
	fk_receipt,
    name,
    quantity,
    price,
    reduced,
    total
) values (
	1,
    "Produkt",
    2,
    5.50,
    1.10,
    4.40
);

insert into receipt ( name, user ) values ("Receipt 01, Coop Sulgenbach", "SVEN");
````
