import React from "react";
import { gql, useQuery } from "@apollo/client";

const FIND_REVIEW = gql`
  query FindReview($id: ID!) {
    review(id: $id) {
      content
      rating
    }
  }
`;

const reviewId = "2";

export default function Review() {
  const { loading, error, data } = useQuery(FIND_REVIEW, {
    variables: { id: reviewId },
  });

  if (loading) return <p>Loading.......</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>Details of review {reviewId}</p>
      <p>
        <i>
          Content: <u>{data.review.content}</u>
        </i>
      </p>
      <p>
        Rating: <b>{data.review.rating}</b>
      </p>
    </div>
  );
}
