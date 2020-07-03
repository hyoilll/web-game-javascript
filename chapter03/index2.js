const body = document.body;

let num1 = Math.ceil(Math.random() * 9);
let num2 = Math.ceil(Math.random() * 9);

const question = document.createElement("span");
question.innerText = String(num1) + " * " + String(num2) + " = ?";
body.appendChild(question);

const form = document.createElement("form");
body.appendChild(form);

const input_text = document.createElement("input");
input_text.type = "text";
form.appendChild(input_text);

const input_submit = document.createElement("input");
input_submit.type = "submit";
form.appendChild(input_submit);

const result = document.createElement("span");
body.appendChild(result);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const mul_result = num1 * num2;

  //string to integer
  const anwer = Number(input_text.value);

  if (mul_result === anwer) {
    //정답
    result.innerText = "success";
    num1 = Math.ceil(Math.random() * 9);
    num2 = Math.ceil(Math.random() * 9);

    question.innerText = String(num1) + " * " + String(num2) + " = ?";
  } else {
    //오답
    result.innerText = "fail";
  }

  input_text.value = null;
});
