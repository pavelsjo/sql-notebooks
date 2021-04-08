# SQL INTRODUCTION

## Basic Querys

This is the very basic sql querys, from data base chinook.

To start you need kwno about two reserved words `SELECT` to ask about columns and `FROM` to specify a table.

We need almost use this to build a minimal valid query, is simple you only need ask `SELECT` some columns `FROM` a table, and where is this table? in the Data Base of Course.

In this sense, this enviroment is pre-loaded with tables and data, where table is like a template to define an estructure who lives in the data base and data live in  tables.

Finaly, the estructure refers to wha kind of data type is? because you can define `numbers, integers, datetime, etc`.

```sql
/*--------------------------------------
 Te asterisk symbol * means all columns.
---------------------------------------*/
SELECT
    *
FROM
    artist;

/*------------------------------------
But, you can specify some columns too
-------------------------------------*/
SELECT
    artistid, 
    name
FROM
    artist;

/*-------------------------------------------
By default, the query returns all rows, so, 
with Limit you can espicify total rows numbers.
--------------------------------------------*/
SELECT
    artistid, 
    name
FROM
    artist
LIMIT
    10;
```

Practice using this querys over other tables and columns, use DATABASE ICON to see Diagram Entity Relation DER.

You can use DER to map all table and columns in this data base, and their relationships. Te relation define who you can conect tables between, for example, artist and their albumns.

The `ID` is a general convention and mean `Identifier` and must be unique, so, as you can saw in the previous example in artist table the identifier number for `AC/DC` is **one** , and this number only belongs to `AC/DC`, other artist in this table must be other Identifier number, for clarity, ID can be number, letter, combination of letter and numbers, but, must be unique along one entity.

In this way, this `ID` is in **artist table** and **albumn table**, and you need knwo two new reserved words `JOIN`
and `ON`.

```sql
/* EXPLANATION */
-- In this clause name refers to artist table and title refers to album table.
-- With JOIN you can ask for other table.
-- ON express what columns match.
-- dot notation especify table and column.
SELECT
    name,
    title
FROM
    artist
JOIN
    album ON artist.artistid = album.artistid;

-- If the table name is large, you can use ALIAS in queries, with this sintax: <table> <alias>
SELECT
    name,
    title
FROM
    artist ar
JOIN
    album al ON ar.artistid = al.artistid;
```

Notation is important to write beautiful queries, almost, you need check upper case, lower case and indentation (4 spaces). As you can see in next example, this 3 querys works but only one is visualy elegant.

```sql

--BAD
SELECT
artistID, 
name
FROM
ARTist
LIMIT 10;

--BETTER
SELECT
ARTIST, NAME
FROM 
ARTIST
LIMIT 
10;

--EXCELENT
SELECT
    artistid, 
    name
FROM
    artist
LIMIT
    10;
```

Exist two types of comments in sql, `--` for single lines and `/**/` for multiple lines, and please, ends every piece of valid query with `;`, for clarity, some editors allow you to run varius pieces of valid queryes secuencialy and you use `;` to define blocks of code.
