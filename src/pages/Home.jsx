import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { PageLayout, MediaCard } from "../components";
import useFetchData from "../hooks/useFetchData";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Spinner from "../utils/Spinner";

const Home = () => {
  const { error, data, setPage, newData } = useFetchData("trending/movie/week");
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMore);

  function fetchMore() {
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsFetching(false);
    }, 5000);
  }

  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <PageLayout heading="Trending Movies" error={error}>
      <Row className="gy-2">
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

export default Home;
