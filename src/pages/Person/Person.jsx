import React from "react";
import { Col, Row } from "react-bootstrap";
import { PageLayout, PersonCard } from "../../components";
import useFetchData from "../../hooks/useFetchData";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Spinner from "../../utils/Spinner";

const Person = () => {
  const { error, data, setPage, newData } =
    useFetchData("person/popular");

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMore);

  function fetchMore() {
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsFetching(false);
    }, 5000);
  }
  if (!data) return <Spinner />;
  return (
    <PageLayout heading="Trending People" error={error}>
      <Row className="gy-2">
        {[...newData, ...data].map((person) => (
          <Col xs={6} md={3} xl={2} key={person.id}>
            <PersonCard {...person} />
          </Col>
        ))}
      </Row>
      {isFetching && <Spinner/>}
    </PageLayout>
  );
};

export default Person;
