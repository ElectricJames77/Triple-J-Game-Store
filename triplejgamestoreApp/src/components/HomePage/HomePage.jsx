import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState, useEffect } from "react";
import { autocompleteClasses } from "@mui/material";
import "./HomePage.css";

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
    <>
      <div id="header">
        <h1>Triple J</h1>
      </div>
      <div className="container">
        <Box
          sx={{
            width: "500px",
            // height: "100vh",
            // overflowY: "hidden",
            opacity: 0.15,
          }}
        >
          <div className="sliding-background">
            <ImageList variant="woven" cols={3} gap={15}>
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
          </div>
        </Box>
        <div id="message">
          <h2>Sign up</h2>
          <h2>Sign in</h2>
          <h6>Sign up Later</h6>
        </div>
      </div>
    </>
  );
}
