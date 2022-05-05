import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

import * as Api from "../../api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

export default function LikeCardItem({ cocktail }) {
  // state
  const [isFront, setIsFront] = useState(true);
  const [isLike, setIsLike] = useState(cocktail.isLiked);
  const [color, setColor] = useState(isLike ? "plum" : "white");
  const [likeNum, setLikeNum] = useState(cocktail.getCocktailId.likes);

  // style
  const buttonStyle = {
    position: "absolute",
    bottom: 5,
    right: 6,
    color: "violet",
  };

  // Card flip event
  const handleOnClick = () => {
    isFront ? setIsFront(false) : setIsFront(true);
  };

  // Like click event
  const handleOnClickLike = async () => {
    if (!isLike) {
      try {
        await Api.post(`like/${cocktail.getCocktailId._id}`);
        setLikeNum((prev) => prev + 1);
        setIsLike(true);
        setColor("plum");
      } catch (e) {
        if (e.message === "Request failed with status code 401") {
          alert("로그인이 필요한 서비스입니다.");
        }
      }
    } else {
      try {
        await Api.delete(`like/${cocktail.getCocktailId._id}`);
        setLikeNum((prev) => prev - 1);
        setIsLike(false);
        setColor("white");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <Box className={` ${isFront ? "cardFront" : "cardBack"}`}>
        <Card className="front">
          <IconButton onClick={handleOnClickLike}>
            <FavoriteIcon sx={{ color: color }} />
          </IconButton>
          {likeNum}
          <CardMedia
            height="180"
            component="img"
            image={cocktail.getCocktailId.imageUrl}
            loading="lazy"
          />
          <CardContent className="cocktailContent">
            <Typography variant="body1">{cocktail.name}</Typography>
          </CardContent>
          <CardContent>
            <Button onClick={handleOnClick} sx={buttonStyle}>
              <CompareArrowsIcon />
            </Button>
          </CardContent>
        </Card>

        <Card className=" back">
          <CardContent className="descriptionBox">
            <Typography
              variant="h6"
              align="center"
              sx={{ mb: 2, borderBottom: "2px solid plum" }}
            >
              {cocktail.name}
            </Typography>
            {cocktail.getCocktailId.ingredient.map((item, i) => (
              <Typography key={i} sx={{ fontSize: "12px" }}>
                재료{i + 1} : {item}
              </Typography>
            ))}
          </CardContent>
          <Button onClick={handleOnClick} sx={buttonStyle}>
            <CompareArrowsIcon />
          </Button>
        </Card>
      </Box>
    </>
  );
}