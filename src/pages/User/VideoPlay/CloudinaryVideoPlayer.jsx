import React from 'react'

const CloudinaryVideoPlayer = ({publicId, cloudName}) => {
  return <iframe
    src={`https://player.cloudinary.com/embed/?public_id=${publicId}&cloud_name=${cloudName}&player[muted]=false&player[fontFace]=Merienda&player[aiHighlightsGraph]=true&player[floatingWhenNotVisible]=right&player[hideContextMenu]=true&player[showJumpControls]=true&player[pictureInPictureToggle]=true&player[logoImageUrl]=https%3A%2F%2Fres.cloudinary.com%2Fdemo%2Fimage%2Ffetch%2Fh_25%2Fhttps%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F8%2F89%2FHD_transparent_picture.png%2F1200px-HD_transparent_picture.png&player[autoplayMode]=on-scroll&player[autoplay]=true&source[sourceTypes][0]=hls`}
    width="640"
    height="360" 
    style={{height: "auto", width: "100%", aspectRatio: "640 / 360"}}
    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
    allowfullscreen
    frameborder="0"
  ></iframe>
}

export default CloudinaryVideoPlayer