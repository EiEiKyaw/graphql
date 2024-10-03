import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  // resolver
  Query: {
    games() {
      return db.games;
    },
    // (parent, args, context)
    // (_, args)
    game(_, args) {
      return db.games.find((data) => args.id === data.id);
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      return db.authors.find((data) => args.id === data.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((data) => args.id === data.id);
    },
  },
  // resolver
  Game: {
    reviews(parent) {
      return db.reviews.filter((data) => data.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((data) => data.game_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((data) => data.id == parent.author_id);
    },
    game(parent) {
      return db.games.find((data) => data.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((data) => data.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };

      db.games.push(game);
      return game;
    },
    updateGame(_, args) {
      db.games = db.games.map((data) => {
        if (data.id === args.id) {
          return { ...data, ...args.edits };
        }
        return data;
      });
      return db.games.find((data) => data.id === args.id);
    },
  },
};

// server setup
const server = new ApolloServer({
  // typeDefs >> definitions of types of data
  typeDefs,
  // resolvers >> function
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log("Server ready at port", 4000);
