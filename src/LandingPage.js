import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import data from "./data/data"
// import subjectData from "./data/subjectData";
// import westernSubjectData from "./data/westernSubjectData";
import logo from "./styles/logo.png";

var youtubeTestimonial = `https://www.youtube.com/watch?v=z7FBLlTt53s&t=1s`;
var youtubeExplainer = `https://www.youtube.com/watch?v=sfsKuEkYjLw`;

const getYouTubeEmbedUrl = (url) => {
  const videoId = url.split('v=')[1];
  const ampersandPosition = videoId.indexOf('&');
  return ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
};

const VideoContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(6),
  display: "flex",
  justifyContent: "space-around",
}));

const IframeWrapper = styled("div")(({ theme }) => ({
  width: "48%",
  position: "relative",
  paddingBottom: "27%", // 16:9 aspect ratio with larger size
  height: 0,
  overflow: "hidden",
  "& iframe": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}));

const RandomColorCard = styled(Card)(({ theme }) => ({
  transition: "background-color 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.2)`,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  padding: "20px",
  margin: "10px",
  // backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: "1.5rem",
  flex: 1, // Make the buttons the same size
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  "& > *": {
    margin: theme.spacing(2), // Space between the buttons
    padding: theme.spacing(4, 8), // Increase the padding to make buttons larger
    textTransform: "none",
    fontSize: "1.2rem",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    flex: 1, // Make the buttons the same size
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const ClientLogos = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  '& img': {
    width: '200px',
    height: '100px',
    objectFit: 'contain',
  },
}));

const CardList = ({ data = [], onCardClick }) => {
  return (
    <Container>
      <Grid container spacing={3}>
        {data.map((i, index) => (
          console.log(i),
          <Grid item xs={12} sm={6} md={4} key={index}>
            <RandomColorCard onClick={() => onCardClick(i.area)}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {i.area}
                </Typography>
              </CardContent>
            </RandomColorCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (area) => {
    console.log(area)
    navigate(`/${area}`);
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <Container>
        <Typography variant="h1" component="h1">
          Culture Connect
        </Typography>
        <Typography variant="h6">
          bringing together musicians and audiences around the world.
        </Typography>
        <img
          src={logo}
          alt="Culture Connect Logo"
          style={{ marginBottom: "5px", width: "200px" }}
        />

        <Typography variant="h3" style={{ marginBottom: "30px" }}>
          Explore the International Artist Network!
        </Typography>
        {data.world && <CardList data={data.world} onCardClick={handleCardClick} />}
        <Typography
          variant="h3"
          style={{ marginBottom: "30px", marginTop: "40px" }}
        >
          Western Traditions
        </Typography>
        {data.western && <CardList data={data.western} onCardClick={handleCardClick} />}
        <Typography
          variant="h3"
          style={{ marginBottom: "30px", marginTop: "40px" }}
        >
          About the Program
        </Typography>
        <VideoContainer>
          <IframeWrapper>
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeEmbedUrl(
                youtubeTestimonial
              )}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video 1"
            ></iframe>
          </IframeWrapper>
          <IframeWrapper>
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeEmbedUrl(
                youtubeExplainer
              )}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video 2"
            ></iframe>
          </IframeWrapper>
        </VideoContainer>
        <Typography
          variant="h3"
          style={{ marginBottom: "30px", marginTop: "40px" }}
        >
          Integrations for Classroom Teachers
        </Typography>
        <ButtonContainer>
          <StyledButton variant="contained" style={{ backgroundColor: "red" }} onClick={() => navigate("/create")}>
            Create
          </StyledButton>
          <StyledButton variant="contained" style={{ backgroundColor: "blue" }} onClick={() => navigate("/perform")}>
            Perform
          </StyledButton>
          <StyledButton variant="contained" style={{ backgroundColor: "green" }} onClick={() => navigate("/respond")}>
            Respond
          </StyledButton>
          <StyledButton variant="contained" style={{ backgroundColor: "gold" }} onClick={() => navigate("/connect")}>
            Connect
          </StyledButton>
        </ButtonContainer>
        <Typography
          variant="h3"
          style={{ marginBottom: "30px", marginTop: "40px" }}
        >
          Participating Schools and Communities
        </Typography>
        <ClientLogos>
          <img src="/img/clients/masco.jpg" alt="masco" />
          <img src="/img/clients/cambridge.jpg" alt="cambridge" />
          <img src="/img/clients/boston.png" alt="boston" />
          <img src="/img/clients/sommerville.png" alt="somerville" />
          <img src="/img/clients/watertown.png" alt="watertown" />
          <img src="/img/clients/hamilton-wenham.png" alt="hamilton-wenham" />
          <img src="/img/clients/bridge.png" alt="bridge boston" />
          <img src="/img/clients/musary.jpg" alt="musary" />
          <img src="/img/clients/el sistema.png" alt="el sistema" />
          <img src="/img/clients/bmp.png" alt="boston music project" />
          <img src="/img/clients/avenidas.png" alt="avenidas" />
          <img src="/img/clients/attic angel.jpg" alt="attic angel" />
          <img src="/img/clients/lincoln commons.png" alt="lincoln commons" />
        </ClientLogos>
      </Container>
    </div>
  );
};

export default LandingPage;

