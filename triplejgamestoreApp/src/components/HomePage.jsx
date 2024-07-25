import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState, useEffect } from "react";

export default function MasonryImageList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchGameImages() {
      try {
        const response = await fetch(
          "https://triplej-gamestore-2bf9fca17274.herokuapp.com/api/games"
        );
        const result = await response.json();
        setImages(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGameImages();
  }, []);

  return (
    <Box
      sx={{ width: "100vw", height: "100vh", overflowY: "scroll", opacity: 0.125}}
    >
      <ImageList variant="masonry" cols={4} gap={8}>
        {images.map((item) => (
          <ImageListItem key={item.id}>
            <img
              srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
