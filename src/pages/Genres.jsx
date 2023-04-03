import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY, BASE_URL } from "../api/config";
import { MediaCard, PageLayout } from "../components";
import Spinner from "../utils/Spinner";
import useFetchData from "../hooks/useFetchData";
import { Col, Row } from "react-bootstrap";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const Genres = () => {
  const { id } = useParams();
  const [genreList, setGenreList] = useState([]);
  const [newGenreList, setNewGenreList] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const { genres } = useFetchData("genre/movie/list");
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMore);
  console.log(genres);

  function fetchMore() {
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsFetching(false);
    }, 5000);
  }

  // eslint-disable-next-line eqeqeq
  const filterGenreTitle = genres.filter((genre) => genre.id == id);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_video=false&page=${page}&with_genres=${id}`
        );
        const movieList = response.data.results;
        setGenreList(movieList);
        setNewGenreList([...newGenreList, ...genreList]);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  useEffect(() => {
    window.scroll({ top: "0" });
  }, []);

  if (!genreList) return <Spinner />;
  return (
    <PageLayout
      error={error}
      heading={`${filterGenreTitle.map((title) => title.name)} Movies`}
    >
      <Row className="gy-2">
        {[...newGenreList, ...genreList].map((movie, index) => (
          <Col xs={6} md={3} xl={2} key={index}>
            <MediaCard {...movie} />
          </Col>
        ))}
      </Row>
      {isFetching && <Spinner />}
    </PageLayout>
  );
};

export default Genres;
