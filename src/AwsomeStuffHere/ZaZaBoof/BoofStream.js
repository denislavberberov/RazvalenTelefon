import React, { useEffect, useRef, useState } from "react";
import boof from "../../assets/boof.png";
import rat from "../../assets/rat.jpg";
import arrow from "../../assets/up-arrow.svg";

const width = 895;

export default function BoofStream() {
  const [streaming, setStreaming] = useState(false);
  const [canBoof, setCanBoof] = useState(false);
  const [offering, setOffering] = useState(true);
  const [boofVideoReady, setBoofVideoReady] = useState(false);

  const boofVideo = useRef(null);
  const offerVideo = useRef(null);

  useEffect(() => {
    const currentBoofVideo = boofVideo.current;
    if (currentBoofVideo) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "user" }, audio: false })
        .then((stream) => {
          currentBoofVideo.srcObject = stream;
          setCanBoof(true);
          console.log("setting can boof");
        })
        .catch((err) => {
          console.error(`An error occurred: ${err}`);
        });
    }
    return () => {
      if (currentBoofVideo && currentBoofVideo.srcObject) {
        currentBoofVideo.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [boofVideo]);

  useEffect(() => {
    const currentSteam = boofVideo.current;
    if (canBoof && !offering && boofVideoReady) {
      if (!streaming) {
        let height =
          (currentSteam.videoHeight / currentSteam.videoWidth) * width;

        if (isNaN(height)) {
          height = width / (4 / 3);
        }

        currentSteam.setAttribute("width", `${width}`);
        currentSteam.setAttribute("height", `${height}`);
        setStreaming(true);

        console.log("playing stream");
        currentSteam.play().catch((err) => {
          console.error(`An error occurred: ${err}`);
        });
      }
    }

    return () => {
      if (streaming) {
        currentSteam.pause();
      }
    };
  }, [canBoof, offering, boofVideoReady]);

  return (
    <div>
      <div>
        {
          <video
            id="boofvideo"
            ref={boofVideo}
            muted
            onCanPlay={() => {
              if (!boofVideoReady) {
                console.log("boof video is ready");
                setBoofVideoReady(true);
                boofVideo.current.setAttribute("width", `0`);
                boofVideo.current.setAttribute("height", `0`);
              }
            }}
          >
            Camera not available.
          </video>
        }
        {offering && (
          <video
            width="1200px"
            height="675px"
            id="offervideo"
            ref={offerVideo}
            onEnded={() => {
              setOffering(false);
            }}
            onCanPlay={() => {
              offerVideo.current.play();
            }}
          >
            <source src="Offer.mp4" type="video/mp4"></source>
          </video>
        )}
        {streaming && !offering && canBoof && (
          <>
            <img src={rat} alt="rat" style={{ width: width }} />
            <img
              src={boof}
              alt="boof"
              style={{
                position: "absolute",
                top: "60%",
                left: "320px",
                transform: "translate(-50%, -50%)",
              }}
            />
          </>
        )}
        {!canBoof && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              top: "45%",
              left: "15%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={arrow}
              alt="arrow up"
              style={{ height: "200px" }}
            />
            <h1>Accept boof</h1>
          </div>
        )}
      </div>
    </div>
  );
}