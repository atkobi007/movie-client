const clickBanner=(item)=>{
  console.error(item)
  localStorage.setItem("currentVideo",encodeURIComponent(JSON.stringify(item)));
  uni.navigateTo({
    url:"/pages/video_detail/index",
  })
}

const clickMovie=(item)=>{
  localStorage.setItem("currentVideo",encodeURIComponent(JSON.stringify(item)));
  uni.navigateTo({
    url:"/pages/video_detail/index",
  })
}


const clickMovieType=(item)=>{
  console.error(item)
}


export {clickBanner,clickMovie,clickMovieType}
