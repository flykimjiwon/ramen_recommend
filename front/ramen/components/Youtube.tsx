import axios, { AxiosError } from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";

const Youtube = ({ searchTitle }: { searchTitle: string }) => {
  const id = "youtube_video";
  const [videoUrl, setVideoUrl] = useState("");

  const [iframeDOM, setIframeDOM] = useState({});
  const [videoHeight, setVideoHeight] = useState(320);

  const params = {
    key: "AIzaSyAWQ-_LvKjxxbF8dJVX0tsoaKY1jc-bmiQ",
    part: "snippet",
    q: searchTitle,
    maxResults: 5,
    type: "video",
    videoDuration: "any",
    videoEmbeddable: "true",
  };

  const handleChangeVideoWidth = useCallback(() => {
    return setVideoHeight(
      // 사이즈가 변할 때마다 높이도 같이 바뀜
      Math.floor(
        (window.document.getElementById(id) as HTMLInputElement).offsetWidth *
          0.5625
      )
    );
  }, [id]);

  useEffect(() => {
    const GetYoutube = async () => {
      try {
        const url = `https://www.googleapis.com/youtube/v3/search`;
        const { data: youtubeResponse } = await axios.get(url, { params });
        const resultDataLength = youtubeResponse.items.length;
        const randomNum = Math.floor(Math.random() * resultDataLength);
        setVideoUrl(
          `https://www.youtube.com/embed/${youtubeResponse.items[randomNum].id.videoId}`
        );
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status !== 403) {
          const copyParams = Object.assign({}, params);
          copyParams.q = "라면 먹방";
          const url = `https://www.googleapis.com/youtube/v3/search`;
          const { data: youtubeResponse } = await axios.get(url, { params });
          const resultDataLength = youtubeResponse.items.length;
          const randomNum = Math.floor(Math.random() * resultDataLength);
          setVideoUrl(
            `https://www.youtube.com/embed/${youtubeResponse.items[randomNum].id.videoId}`
          );
        } else {
          console.log("youtube api key 허용량 초과");
        }
      }
    };
    GetYoutube();
  }, []);

  useEffect(() => {
    if (videoUrl) {
      setIframeDOM(window.document.getElementById(id) as object);
    }
  }, [id, iframeDOM]);

  useEffect(() => {
    if (videoUrl) {
      window.addEventListener("resize", handleChangeVideoWidth);
      setVideoHeight(
        // 로딩 후 높이 부분이 비율에 맞춰짐
        Math.floor(
          (window.document.getElementById(id) as HTMLInputElement).offsetWidth *
            0.5625
        )
      );
      return function cleanup() {
        window.removeEventListener("resize", handleChangeVideoWidth);
      };
    }
  }, [id, iframeDOM, videoHeight, handleChangeVideoWidth]);

  return (
    <div>
      <div className="youtube_video_area">
        {videoUrl ? (
          <iframe
            id={id}
            width="100%"
            height={`${videoHeight}px`}
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="exception_img">
            <img src="/youtube.png" width="70%"></img>
          </div>
        )}
        {/* <iframe
          id={id}
          width="100%"
          height={`${videoHeight}px`}
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        /> */}
      </div>
      <style jsx>
        {`
          .youtube_video_area {
            width: 100%;
            margin-top: 0.5rem;
          }
          .exception_img {
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
};

export default memo(Youtube);
