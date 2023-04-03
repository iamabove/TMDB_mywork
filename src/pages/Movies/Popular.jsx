import React from "react";
import { Row } from "react-bootstrap";
import { MediaCard, PageLayout } from "../../components";
import useFetchData from "../../hooks/useFetchData";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Spinner from "../../utils/Spinner";

const Popular = () => {
  const { error, data, setPage, newData } = useFetchData("movie/popular");

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMore);

  function fetchMore() {
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsFetching(false);
    }, 5000);
  }
  if (!data) return <Spinner />;
  return (
    <PageLayout heading="Popular" error={error}>
      <Row className="d-flex flex-wrap gap-3">
        {[...newData, ...data].map((movie) => (
          <MediaCard {...movie} key={movie.id} />
        ))}
      </Row>
      {isFetching && <Spinner/>}
    </PageLayout>
  );
};

export default Popular;
