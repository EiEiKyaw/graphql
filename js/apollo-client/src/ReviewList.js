import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_REVIEWS = gql`
  query GetReviews {
    reviews {
      id
      rating
      content
      game {
        title
      }
    }
  }
`;

export default function ReviewList() {
  const { loading, error, data } = useQuery(GET_REVIEWS);

  if (loading) return <p>Loading.......</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Reviews</h1>
      <table border={3}>
        {data.reviews.map((review) => {
          return (
            <tr>
              <td width={150}>{review.content}</td>
              <td width={30}>{review.rating}</td>
              <td width={250}>{review.game.title}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
