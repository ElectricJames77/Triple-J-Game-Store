import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState, useEffect } from "react";
import { autocompleteClasses } from "@mui/material";
import "./HomePage.css";
import { Link } from "react-router-dom";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
// import Gamestore from "../store";

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
      <div id="header-TripleJ">
        <h1>Triple J</h1>
      </div>
      <div className="container">
        <Box
          sx={{
            // width: "500px",
            // height: "100vh",
            // overflowY: "hidden",
            opacity: 0.15,
          }}
        >
          <div className="sliding-background">
            <ImageList
              // sx={{ maxWidth: 1500, maxHeight: 500 }}
              // variant="woven"
              cols={3}
              gap={15}
            >
              {images.map((item) => (
                <ImageListItem className="image" key={item.id}>
                  <img
                    srcSet={`${item.imageUrl}`}
                    src={`${item.imageUrl}`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Box>
      </div>
      <div id="message">
        <Link to="/account/register">
          <h3 className="message-words">Sign up</h3>
        </Link>
        <Link to="/account/login">
          <h3 className="message-words">Already have an account? Sign in!</h3>
        </Link>
        <Link to="/store">
          <h6 className="message-words">Sign up Later</h6>
        </Link>
        {/* <Switch>
          <Route path="/account/register" component={Register} />
          <Route path="/account/login" component={Login} />
          <Route path="/store" component={Store} />
          <Route path="/" component={Home} />
        </Switch> */}
      </div>
    </>
  );
}
