import { memo, useRef, useEffect, useState, useCallback } from "react";
import { Grid, Box, Container, Typography } from "@mui/material";

import * as Api from "../../api";
import Loader from "./Loader";
import LikeSortButton from "./LikeSortButton";
import useUserHook from "../commons/useUserHook";
import LikeCardItem from "./LikeCardItem";

function Likes() {
  // state
  const [cocktails, setCocktails] = useState([]);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const userState = useUserHook();

  const [preventRef, setPreventRef] = useState(true); //중복 실행 방지
  const [endRef, setEndRef] = useState(false); //모든 글 로드 확인

  const obsRef = useRef(null); //observer Element
  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, {
      threshold: 0.5,
      rootMargin: "15%",
    });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const obsHandler = (entries) => {
    const target = entries[0];
    if (!endRef && target.isIntersecting && preventRef) {
      //옵저버 중복 실행 방지
      setPreventRef(false); //옵저버 중복 실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  useEffect(() => {
    if (page !== 0) getPost();
  }, [page]);

  const getPost = useCallback(async () => {
    //글 불러오기
    setLoad(true); //로딩 시작
    // ---- Get Data Code ---
    const res = await Api.getSearch(`cocktails/likeList?offset=${page}`);
    if (res.data) {
      if (res.data.end) {
        //마지막 페이지일 경우
        setEndRef(true);
      }
      setCocktails((prev) => [...prev, ...res.data]);

      setPreventRef(true);
    } else {
      console.log(res);
    }

    setLoad(false); //로딩 종료
  }, [page]);

  return (
    <>
      <Box sx={{ px: 15, pb: 3 }}>
        <LikeSortButton cocktails={cocktails} setCocktails={setCocktails} />
      </Box>
      <Grid container spacing={1} sx={{ px: 15, mx: "auto" }}>
        {cocktails.map((cocktail, i) => {
          return (
            <Grid key={i} item xs>
              <LikeCardItem cocktail={cocktail} />
            </Grid>
          );
        })}
        {load && <Loader />}
        {!userState.user && load && (
          <Container>
            <Typography align="center" sx={{ color: "white", mt: 5 }}>
              로그인이 필요한 서비스입니다.
            </Typography>
          </Container>
        )}
      </Grid>
      <div ref={obsRef}></div>
    </>
  );
}

export default memo(Likes);
