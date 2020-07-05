const body = document.body;

const result = document.createElement("h1");
body.appendChild(result);

const form = document.createElement("form");
body.appendChild(form);

const input_text = document.createElement("input");
input_text.type = "text";
input_text.maxLength = 4; //최대 4자리 칠 수 있음
form.appendChild(input_text);

const input_submit = document.createElement("input");
input_submit.type = "submit";
form.appendChild(input_submit);

let chance = 10;

const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let question_arr = [];

function createQuestion() {
  question_arr = [];
  for (let i = 0; i < 4; ++i) {
    const temp = arr1.splice(Math.floor(Math.random() * arr1.length), 1)[0];

    question_arr.push(temp);
  }
}
createQuestion();
console.log(question_arr.join(""));

form.addEventListener("submit", function (event) {
  event.preventDefault();
  input_text.focus();

  const anwer = input_text.value;
  console.log(anwer);

  chance--;
  let strike = 0;
  let ball = 0;

  if (anwer === question_arr.join("")) {
    result.innerText = "홈런";
    createQuestion();
    console.log(question_arr.join(""));
  } else {
    //답이 틀리면

    const anwer_arr = anwer.split("");

    for (let i = 0; i < 4; ++i) {
      if (question_arr[i] === Number(anwer_arr[i])) {
        strike++;
      } else if (question_arr.indexOf(Number(anwer_arr[i])) > -1) {
        ball++;
      }
    }
    input_text.value = "";
    result.innerText = strike + " strike, " + ball + " ball";

    if (chance === 0) {
      alert("10번의 기회동안 실패했음 답 : " + question_arr.join(""));
      result.innerText = "";
      input_text.value = "";
    }
  }
});

// const body = document.body;

// const question = document.createElement("span");

// const MAX_LENGTH = 4;
// const arr = [];
// let cnt = 0;
// let randomNum = 0;
// let overlapFlag = false; //중복인지 아닌지 확인

// alert("10번의 기회입니다.");

// //중복없는 4자리 생성
// while (true) {
//   if (cnt === 0) {
//     randomNum = Math.ceil(Math.random() * 9);
//   } else {
//     randomNum = Math.floor(Math.random() * 10);

//     for (let i = 0; i < arr.length; ++i) {
//       if (arr[i] === randomNum) {
//         //중복된 숫자가 있으니 다시 랜덤숫자 생성
//         overlapFlag = true;
//         break;
//       }
//     }
//   }

//   if (overlapFlag === false) {
//     //배열안에 중복된 숫자가 없는 것
//     arr[cnt] = randomNum;
//     cnt++;
//   }

//   if (cnt === MAX_LENGTH) {
//     break;
//   }
//   overlapFlag = false;
// }

// let stringRandomNum = "";
// for (let i = 0; i < arr.length; ++i) {
//   stringRandomNum = stringRandomNum + String(arr[i]);
// }

// question.innerText = "xxxx";
// body.appendChild(question);

// const form = document.createElement("form");
// body.appendChild(form);

// const input_text = document.createElement("input");
// input_text.type = "text";
// form.appendChild(input_text);

// const input_submit = document.createElement("input");
// input_submit.type = "submit";
// form.appendChild(input_submit);

// const result = document.createElement("span");
// result.innerText = "result";
// body.appendChild(result);

// let chance = 10;

// form.addEventListener("submit", function (event) {
//   event.preventDefault();

//   let strike = 0;
//   let ball = 0;

//   const input_value = input_text.value;

//   for (let i = 0; i < MAX_LENGTH; ++i) {
//     for (let j = 0; j < MAX_LENGTH; ++j) {
//       if (input_value[i] === stringRandomNum[j]) {
//         if (i === j) {
//           strike++;
//           break;
//         } else {
//           ball++;
//           break;
//         }
//       }
//     }
//   }
//   if (strike === 0 && ball === 0) {
//     result.innerText = "out";
//   } else {
//     result.innerText = "strike : " + strike + ", ball : " + ball;
//   }

//   chance--;
//   if (chance === 1) {
//     alert("10번의 기회가 끝났습니다. ㅅㄱ");
//   }
//   console.log(chance);
//   input_text.value = null;
// });
