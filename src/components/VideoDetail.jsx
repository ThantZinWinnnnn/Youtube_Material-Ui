import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Videos from "./Videos";
import { fetchFromApi } from "../utils/fetchFromApi";
import Loader from "./Loader";

const VideoDetail = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [videos, setVideos] = useState(null);
  console.log("videos", videos);
  //console.log(videoDetails.snippet.title);
  const { id } = useParams();
  //console.log(id)

  useEffect(() => {
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetails(data.items[0])
    );

    fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetails?.snippet) return <Loader/>;
  //if (!videos) return "Loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetails;
  //console.log("titile",title)

  return (
    <Box minHeight={"95vh"}>
      <Stack direction={{ sx: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color={"#fff"} fontWeight={"bold"} variant="h5" p={2}>
              {title}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              fontWeight={"bold"}
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${id}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color={"white"}
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>

              <Stack direction={"row"} gap="20px">
                <Typography>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>

                <Typography>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
        px={2}
        py={{ md: 1, xs: 5 }}
        justifyContent="center"
        alignItems={"center"}
      >
        <Videos videos={videos} direction={"column"} />
      </Box>
      </Stack>

      
    </Box>
  );
};

export default VideoDetail;
