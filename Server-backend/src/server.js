import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/index.js';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to the database
connectDB();

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});