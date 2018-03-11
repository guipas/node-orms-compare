*A small benchmark of some node ORMs.*

⚠️ This small benchmark is not meant to be exhaustive. Actualy it's quite the oposite : I'm just comparing those three ORMs on one point : a simple select query with a one-to-many relation.

A project I was working on was using waterline as an ORM and for some queries I felt that It was really slow so I just wanted to check how where things compared to other node ORMs. Turns out Waterline is so slow compared to Sequelize and Bookshelf that I'm still wondering if I did something wrong when declaring my models 🤔. I'm still investigating, but when I asked people around me who were using waterline they didn't seem to be surprised by the results.

Here is the result on my laptop (I also included results using the knex query builder and directly querying db with a raw SQL query with the pg node adapter) :

ORM | Average time to execute query
------------ | -------------
Waterline (with pg adapter) | ~2000ms (!!!😱)
Sequelize | <250ms
Bookshelf | < 300ms
Query built and executed whith Knex | <200ms
Raw SQL query with pg | <150ms

Those results do not play in favor of waterline 😂 (at least with the postgre adapter). It really convinced me to use another ORM, especially when you know that Sequelize and Bookshelf have more features than waterline (nested relations querying, migrations etc...). 

**Do not hesitate to contact me if you think I'm wrong or if you think I made a mistake somewhere, I'd like to know your opinion on the subject 😉**

The sample dataset I used can be found here :
http://www.postgresqltutorial.com/postgresql-sample-database/
