const screen = document.querySelector(".screen");

let times = [];

let startTime;
let cancleTime;
let endTime;

function init() {
  cancleTime = 0;
  startTime = 0;
  endTime = 0;
  console.log("init");
}

screen.addEventListener("click", function (e) {
  if (screen.classList.contains("waiting")) {
    screen.classList.remove("waiting");
    screen.classList.add("ready");
    screen.textContent = "초록색이 되면 클릭";

    cancleTime = setTimeout(function () {
      startTime = new Date();
      screen.click();
    }, Math.floor(Math.random()) * 1000 + 2000);
  } else if (screen.classList.contains("ready")) {
    if (!startTime) {
      //너무 빨리 누름
      clearTimeout(cancleTime);
      screen.classList.remove("ready");
      screen.classList.add("waiting");
      screen.textContent = "너무 빨리 클릭함 다시 시도";
      init();
    } else {
      screen.classList.remove("ready");
      screen.classList.add("now");
      screen.textContent = "클릭";
    }
  } else if (screen.classList.contains("now")) {
    screen.classList.remove("now");
    screen.classList.add("waiting");
    screen.textContent = "클릭해서 시작";

    endTime = new Date();
    const result = endTime - startTime;
    times.push(result);
    console.log(result / 1000);
    init();
  }
});
