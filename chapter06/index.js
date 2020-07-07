//map() return -> array
const arr = Array(45)
  .fill()
  .map(function (item, index) {
    return index + 1;
  });

console.log(arr);

let shuffle = [];

while (arr.length > 0) {
  //랜덤한 자리수에서 1개를 뽐음
  const item = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
  shuffle.push(item);
}

console.log(shuffle);

//마지막 item을 보너수 수로 함
const bonus = shuffle[shuffle.length - 1];
//0번째 index에서 6개 추출함
const numbers = shuffle.slice(0, 6);

function conpare(a, b) {
  //0보다 크면 순서를 바꿈
  return a > b ? 0 : -1;
}

console.log("lotto number : " + numbers.sort(conpare) + " bonus : " + bonus);

const result = document.querySelector(".result");

// function colorBall(ball) {
//   //css
//     ball.style.display = "inline-block";
//     ball.style.border = "1px solid black";
//     ball.style.borderRadius = "50%";
//     ball.style.width = "30px";
//     ball.style.height = "30px";
//     ball.style.textAlign = "center";
//     ball.style.marginRight = "10px";
//     ball.style.color = "white";
//     ball.style.fontSize = "20px";

//   let bg_color = "";

//   const lottoNum = Number(ball.innerText);

//   if (lottoNum <= 10) {
//     bg_color = "red";
//   } else if (lottoNum <= 20) {
//     bg_color = "orange";
//   } else if (lottoNum <= 30) {
//     bg_color = "yellow";
//   } else if (lottoNum <= 40) {
//     bg_color = "blue";
//   } else {
//     bg_color = "green";
//   }

//   ball.style.background = bg_color;
// }

function paintBall(ball) {
  const lottoNum = Number(ball.innerText);

  if (lottoNum <= 10) {
    ball.classList.add("red");
  } else if (lottoNum <= 20) {
    ball.classList.add("orange");
  } else if (lottoNum <= 30) {
    ball.classList.add("yellow");
  } else if (lottoNum <= 40) {
    ball.classList.add("blue");
  } else {
    ball.classList.add("green");
  }
}

for (let i = 0; i < numbers.length; ++i) {
  setTimeout(function () {
    const ball = document.createElement("div");
    ball.innerText = numbers[i];
    ball.classList.add("ball");

    //css
    paintBall(ball);

    result.appendChild(ball);
  }, 1000 * (i + 1));
}

setTimeout(function () {
  const div_bonus = document.querySelector(".bonus");
  const div_bonus_ball = document.createElement("div");
  div_bonus_ball.innerText = bonus;

  //css
  paintBall(div_bonus_ball);

  div_bonus_ball.classList.add("ball");

  div_bonus.appendChild(div_bonus_ball);
}, 1000 * 7);
