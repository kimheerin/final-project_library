const mainPics = document.querySelectorAll(".main_pic");
let currentIdx = 0;
let slideInterval;
let remainingTime = 0; // 남은 시간 저장

function showSlideImg() {
  mainPics[currentIdx].classList.remove("active");
  currentIdx = (currentIdx + 1) % mainPics.length;
  mainPics[currentIdx].classList.add("active");
}

function togglePicture() {
  let circle = document.querySelector(".main_timer");
  if (slideInterval) {
    clearInterval(slideInterval);
    remainingTime = 0; // 초기화
    const computedStyle = getComputedStyle(circle);
    const animationDuration =
      parseFloat(computedStyle.animationDuration) * 1000;
    const animationDelay = parseFloat(computedStyle.animationDelay) * 1000;
    remainingTime =
      animationDuration -
      ((performance.now() - animationDelay) % animationDuration); // 남은 시간 계산
    circle.style.animationPlayState = "paused";
    mainPics[currentIdx].style.animationPlayState = "paused";
  } else {
    slideInterval = setInterval(() => {
      showSlideImg();
      remainingTime = 0; // 초기화
    }, 5000);
    circle.style.animationPlayState = "running";
    mainPics[currentIdx].style.animationPlayState = "running";
    if (remainingTime > 0) {
      setTimeout(() => {
        showSlideImg();
        slideInterval = setInterval(showSlideImg, 5000);
        circle.style.animationPlayState = "running";
        mainPics[currentIdx].style.animationPlayState = "running";
      }, remainingTime);
    }
  }
}
