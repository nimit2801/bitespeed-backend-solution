# bitespeed-backend-solution

bitespeed backend solution

### Step taken into developing this solution

- Starting with connecting to mariabdb(running on docker) database using typeorm

- Setup the schema for the Contact in database and create demo /request/response from express server

- Last bit was writing the actual logic and so took some more time. Also listing all the resources I used below.

### References

- Wanted to use IN operator with typeorm
- https://github.com/typeorm/typeorm/issues/1239
- https://stackoverflow.com/questions/50705276/typeorm-postgres-where-any-or-in-with-querybuilder-or-find
- https://www.dofactory.com/sql/where-in
- research on having clause to understand if that was needed for this problem
- https://www.tutorialspoint.com/sql/sql-having-clause.htm
- query builer docs typeorm
- https://typeorm.io/select-query-builder#adding-having-expression
