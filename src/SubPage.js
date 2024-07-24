import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import subjectData from "./data/subjectData";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const SubjectHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: "2rem", // Increased font size
}));

const DescriptionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const ArtistName = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

const ArtistCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
  },
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const ArtistCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
}));

const getYouTubeEmbedUrl = (url) => {
  const videoId = url.split("v=")[1];
  const ampersandPosition = videoId.indexOf("&");
  return ampersandPosition !== -1
    ? videoId.substring(0, ampersandPosition)
    : videoId;
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

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
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
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const SubPage = () => {
  const { id } = useParams();
  const subject = subjectData[id];
  // const { area } = useParams();
  // const subject = subjectData.find((i) => i.area === area);

  const navigate = useNavigate();

  const handleArtistClick = (artist) => {
    console.log("Artist clicked:");
  };

  const hasVideos =
    subject.areaLinks.video &&
    subject.areaLinks.video.youtube1 &&
    subject.areaLinks.video.youtube2;

  return (
    <StyledContainer>
      <SubjectHeader variant="h2">{subject.area}</SubjectHeader>
      <DescriptionCard>
        <CardContent>
          <Typography variant="body1" paragraph>
            {subject.description}
          </Typography>
          <StyledButton
            variant="contained"
            href={subject.areaLinks.wiki}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more on Wikipedia
          </StyledButton>
        </CardContent>
      </DescriptionCard>
      <Typography variant="h5" gutterBottom>
        Artists
      </Typography>
      <Grid container spacing={3} style={{ marginBottom: "40px" }}>
        {subject.network.artists.map((artist, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ArtistCard onClick={() => handleArtistClick(artist)}>
              <ArtistCardMedia
                component="img"
                image={artist.img}
                alt={artist.name}
              />
              <CardContent>
                <ArtistName variant="h6">{artist.name}</ArtistName>
                <Typography variant="subtitle1">{artist.instrument}</Typography>
                <Typography variant="body2">{artist.bio}</Typography>
              </CardContent>
            </ArtistCard>
          </Grid>
        ))}
      </Grid>
      {hasVideos && (
        <>
          <SubjectHeader variant="h2">Preview This Area!</SubjectHeader>
          <VideoContainer>
            <IframeWrapper>
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeEmbedUrl(
                  subject.areaLinks.video.youtube1
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
                  subject.areaLinks.video.youtube2
                )}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video 2"
              ></iframe>
            </IframeWrapper>
          </VideoContainer>
        </>
      )}
      <ButtonContainer>
        <StyledButton variant="contained" onClick={() => navigate("/")}>
          Back to Landing Page
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={() => navigate("/learn-more")}
        >
          Learn More
        </StyledButton>
      </ButtonContainer>
    </StyledContainer>
  );
};

export default SubPage;
