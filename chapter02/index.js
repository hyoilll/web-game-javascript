while (true) {
  let num1 = Math.ceil(Math.random() * 9);
  let num2 = Math.ceil(Math.random() * 9);

  let result = num1 * num2;
  let anwer;

  while (true) {
    anwer = prompt(String(num1) + " * " + String(num2) + " = ?");

    if (anwer === null) {
      break;
    }

    if (result === Number(anwer)) {
      alert("정답");
      break;
    } else {
      alert("오답");
    }
  }
  if (anwer === null) {
    break;
  }
}
