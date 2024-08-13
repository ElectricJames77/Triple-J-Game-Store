import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { autocompleteClasses } from "@mui/material";
import "./HomePage.css";
import { Link } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import GameStore from "../GameStore/GameStore";

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
      <div className="home-container">
        <div className="sliding-background">
          <ImageList
            // sx={{ maxWidth: 1500, maxHeight: 500 }}
            // variant="woven"
            cols={3}
            gap={15}
            // sx={{ opacity: 0.85 }}
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
      </div>
      <div id="message">
        <Link to="/account/register">
          <h3 className="message-words">Sign up</h3>
        </Link>
        <br />
        <Link to="/account/login">
          <h3 className="message-words">Already have an account? Sign in!</h3>
        </Link>
        <br />
        <Link to="/store">
          <h6 className="message-words">Sign up Later, Go To Store</h6>
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
