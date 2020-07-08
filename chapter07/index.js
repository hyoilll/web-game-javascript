//result-cnt
let Win = 0;
let Loss = 0;
let Draw = 0;

//dictionary
const obj = {
  가위: "0",
  바위: "-170px",
  보: "-357px",
};

let computer_select = "0";
let interval;
let intervalFleg = false;

function makeInterval() {
  interval = setInterval(function () {
    if (computer_select === obj.가위) {
      computer_select = obj.바위;
    } else if (computer_select === obj.바위) {
      computer_select = obj.보;
    } else {
      computer_select = obj.가위;
    }

    document.querySelector(".computer").style.background =
      "url(image.jpg)" + computer_select + " 0";
  }, 50);
}
makeInterval();

function maping(hand) {
  if (hand === "가위") {
    return 0;
  } else if (hand === "바위") {
    return -1;
  } else {
    return 1;
  }
}

function calculateResult(user_select, computer_select) {
  const user = maping(user_select);
  const com = maping(computer_select);

  const result = user - com;
  if (result === -1 || result === 2) {
    Win++;
    return "이겼습니다";
  } else if (result === 1 || result === -2) {
    Loss++;
    return "졌습니다";
  } else {
    Draw++;
    return "비겼습니다.";
  }
}

function selectComputer(point) {
  return Object.entries(obj).find(function (v) {
    return v[1] === point;
  })[0];
}

//event
//반환값은 NodeList
const hands = document.querySelectorAll(".btn");
const result = document.querySelector(".result");

hands.forEach(function (item) {
  item.addEventListener("click", function (event) {
    if (intervalFleg === false) {
      result.textContent = calculateResult(
        item.textContent,
        selectComputer(computer_select)
      );

      const resultCnt = document.querySelector(".result_cnt");
      resultCnt.textContent = `Win : ${Win}, Loss : ${Loss}, Draw : ${Draw}`;

      clearInterval(interval);
      intervalFleg = true;
    }
  });
});

const restart = document.querySelector(".restart");
restart.addEventListener("click", function () {
  if (intervalFleg === true) {
    makeInterval();
    intervalFleg = false;
    result.textContent = "";
  }
});

// //result-cnt
// let Win = 0;
// let Loss = 0;
// let Draw = 0;

// //dictionary
// const obj = {
//   가위: "0",
//   바위: "-170px",
//   보: "-357px",
// };

// let computer_select = "0";
// let interval;

// function makeInterval() {
//   interval = setInterval(function () {
//     if (computer_select === obj.가위) {
//       computer_select = obj.바위;
//     } else if (computer_select === obj.바위) {
//       computer_select = obj.보;
//     } else {
//       computer_select = obj.가위;
//     }

//     document.querySelector(".computer").style.background =
//       "url(image.jpg)" + computer_select + " 0";
//   }, 50);
// }
// makeInterval();

// function maping(hand) {
//   if (hand === "가위") {
//     return 0;
//   } else if (hand === "바위") {
//     return -1;
//   } else {
//     return 1;
//   }
// }

// function calculateResult(user_select, computer_select) {
//   const user = maping(user_select);
//   const com = maping(computer_select);

//   const result = user - com;
//   if (result === -1 || result === 2) {
//     Win++;
//     return "이겼습니다";
//   } else if (result === 1 || result === -2) {
//     Loss++;
//     return "졌습니다";
//   } else {
//     Draw++;
//     return "비겼습니다.";
//   }
// }

// function selectComputer(point) {
//   return Object.entries(obj).find(function (v) {
//     return v[1] === point;
//   })[0];
// }

// //event
// //반환값은 NodeList
// const hands = document.querySelectorAll(".btn");

// hands.forEach(function (item) {
//   item.addEventListener("click", function (event) {
//     const result = document.querySelector(".result");
//     result.textContent = calculateResult(
//       item.textContent,
//       selectComputer(computer_select)
//     );

//     const resultCnt = document.querySelector(".result_cnt");
//     resultCnt.textContent = `Win : ${Win}, Loss : ${Loss}, Draw : ${Draw}`;

//     //setInterver을 멈춤
//     clearInterval(interval);
//     //1초 멈추고 다시 시작
//     setTimeout(function () {
//       makeInterval();
//     }, 1000);
//   });
// });
