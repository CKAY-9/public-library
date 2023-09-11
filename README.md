# Public Library

Public Library was built with the purpose of sharing resources like PDFs and text files easily.

## Project Layout
`pl-client`: The default NextJS client. If you want to make your own client, go ahead :)
<br />
`pl-library`: The default ExpressJS server for libraries. Again, make your own if you want

## Usage

### Client
pl-client uses NextJS and Prisma with PostgreSQL. Create an enviornment variable named DATABASE_URL and set the value to your Postgres host.

Once that is done, you can use it in docker or node.

### Library
pl-library uses ExpressJS and Prisma with PostgreSQL. Create an enviornment variable named DATABASE_URL and set the value to your Postgres host.

Once that is done, you can use it in docker or node.

**Currently, uploaded files with be saved where the library instance is running**