const express = require('express');
const schema = require('./schema');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to the database
db.connect();

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});