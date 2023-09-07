# **Northcoders News API**

## Summary

This repo is for a test backend for a news article archiving site and has various ways of interacting with it to access, amend, post and delete various pieces of data.

## Setup

to clone the repo onto your local machine, navigate to the file you wish to save the repo to and type in the following:

```
git clone https://github.com/danny-817/nc-news-api
```

Next, 2 files must be created in the root directory:

1. ".env.test" - add `PGDATABASE=nc_news_test` to this file

2. ".env.development" - add `PGDATABASE=nc_news` to this file.

Ensure both files are saved.

2 .env files need to be added fo the development and test databses

create 1 file called .env.test and in it, set PGDATABASE to be the test database name, found in the setup.sql file

then create another file called .env.development and in it, set PGDATABASE to be the development database name, found in the setup.sql file

```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
