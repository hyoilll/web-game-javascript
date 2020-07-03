const body = document.body;
const div = document.createElement("div");
div.innerText = "제로초";
body.appendChild(div);

const form = document.createElement("form");
body.appendChild(form);

const input = document.createElement("input");
form.appendChild(input);

const btn = document.createElement("button");
btn.innerText = "button";
form.appendChild(btn);

const result = document.createElement("div");
result.innerText = "";
body.appendChild(result);

//event
//callback function
form.addEventListener("submit", function (event) {
  //enter를 하면 기본적으로 다른 페이지로 넘어감
  //form의 기본동작을 막는 것
  event.preventDefault();

  const word = div.textContent;
  word_len = word.length - 1;

  if (word[word_len] === input.value[0]) {
    div.innerText = input.value;
    result.innerText = "success";
  } else {
    result.innerText = "fail";
  }
  input.value = null;
  input.focus();
});
