import React from "react";
import { transformImage } from "../../libs/features";

function RenderAttatchment({ file, url, disableLink }) {
  switch (file) {
    case "image":
      return (
        <img
          src={transformImage(url)}
          alt="attachment"
          style={{
            maxWidth: "100%",
            maxHeight: "180px",
            borderRadius: "8px",
            objectFit: "cover",
            display: "block",
            margin: "0 auto",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        />
      );

    case "video":
      return (
        <video
          controls
          style={{
            maxWidth: "100%",
            maxHeight: "180px",
            borderRadius: "8px",
          }}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );

    case "audio":
      return (
        <audio controls style={{ maxWidth: "100%" }}>
          <source src={url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    case "document":
      if (disableLink) {
        return (
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Download Document</span>
          </div>
        );
      }
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          download
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Download Document</span>
          </div>
        </a>
      );
    default:
      if (disableLink) {
        return (
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Download File</span>
          </div>
        );
      }
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          download
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Download File</span>
          </div>
        </a>
      );
  }
}

export default RenderAttatchment;
