export const typeDefs = `#graphql
    # schema
    type Game{
        id: ID!,
        title: String!,
        platform: [String!]!,
        reviews: [Review!]
    }
    # schema
    type Author{
        id: ID!,
        name: String!,
        verified: Boolean!,
        reviews: [Review!]
    }
    # schema
    type Review{
        id: ID!,
        rating: Int!,
        content: String!,
        game: Game!,
        author: Author!
    }
    # schema
    type Query{
        reviews: [Review],
        review(id: ID!): Review,
        authors: [Author],
        author(id: ID!): Author,
        games: [Game],
        game(id: ID!): Game
    }
    # schema
    type Mutation{
        addGame(game: AddGameInput!): Game,
        deleteGame(id: ID!): [Game],
        updateGame(id: ID!, edits: EditGameInput!): Game
    }
    input AddGameInput{
        title: String!,
        platform: [String!]!
    }
    input EditGameInput{
        title: String!,
        platform: [String!]
    }
`;

// int, float, string, boolean, ID
