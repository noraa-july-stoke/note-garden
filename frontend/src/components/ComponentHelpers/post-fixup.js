import React from "react";

import TextPost from "../Cards/TextPostContent/PostText";

export const organizePost = (contents) => {
  // Create an object to store the contents grouped by contentType
  const organizedContents = {};

  // Loop through each content object and add it to the appropriate group
  contents.forEach((content) => {
    const contentType = content.contentType;

    if (organizedContents[contentType]) {
      // If the group already exists, add the content to it
      organizedContents[contentType].push(content);
    } else {
      // If the group doesn't exist yet, create it and add the content to it
      organizedContents[contentType] = [content];
    }
  });

  // Initialize object to store HTML for each content type
  const postHTML = {};

  // Generate HTML structure for the post contents
  Object.entries(organizedContents).forEach(([contentType, contentArr]) => {
    postHTML[contentType] = contentArr.map((content, index) => {
      switch (contentType) {
        case "TEXT":
          return <TextPost key={`text-${content.id}`} TEXT={content.content} />;
        case "IMAGE":
          return (
            <img
              key={`image-${content.id}-${index}`}
              className="poly-post-image"
              src={content.content}
              alt={content.id}
            />
          );
        case "AUDIO":
          return (
            <audio
              key={`audio-${content.id}-${index}`}
              className="poly-post-audio"
              controls
              src={content.content}
            />
          );
        // Add more cases for additional content types as needed
        default:
          return "";
      }
    });
  });

  // Return the HTML for the post contents
  return postHTML;
};
