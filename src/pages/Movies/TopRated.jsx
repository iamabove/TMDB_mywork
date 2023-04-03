import React from "react";
import { Col, Row } from "react-bootstrap";
import { MediaCard, PageLayout } from "../../components";
import useFetchData from "../../hooks/useFetchData";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Spinner from "../../utils/Spinner";

const TopRatedMovies = () => {
  const { error, data, setPage, newData } =
    useFetchData("movie/top_rated");

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMore);

  function fetchMore() {
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsFetching(false);
    }, 5000);
  }
  if (!data) return <Spinner />;
  return (
    <PageLayout heading="Top Rated" error={error}>
      <Row className="d-flex flex-wrap gap-3">
        {[...newData, ...data].map((movie) => (
          <Col xs={6} md={3} xl={2} key={movie.id}>
            <MediaCard {...movie} />
          </Col>
        ))}
      </Row>
      {isFetching && <Spinner />}
    </PageLayout>
  );
};

export default TopRatedMovies;
