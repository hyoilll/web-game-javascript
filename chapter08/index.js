//매개변수 - 필요한 랜덤수의 갯수
//반환값 - 랜덤 배열
function pickRandomNumber(size, cnt) {
  const candidateArr = Array(size)
    .fill()
    .map(function (item, idx) {
      return idx;
    });

  let randomArr = [];
  for (let i = 0; i < cnt; ++i) {
    const randomNum =
      candidateArr[Math.floor(Math.random() * candidateArr.length)];
    randomArr.push(randomNum);
  }

  return randomArr;
}

let dataSet = [];
//버튼 이벤트
document.querySelector(".exec").addEventListener("click", function () {
  const hor = parseInt(document.querySelector(".hor").value);
  const ver = parseInt(document.querySelector(".ver").value);
  const mine = parseInt(document.querySelector(".mine").value);
  console.log(hor, ver, mine);

  //mine갯수를 매개변수로 보내면 mine수 만큼의 랜덤 배열이 나옴
  //지뢰 위치의 배열
  const size = hor * ver;
  const shuffleArr = pickRandomNumber(size, mine);
  console.log(shuffleArr);

  const tbody = document.querySelector(".table tbody");
  //  let dataSet = [];

  for (let i = 0; i < ver; ++i) {
    const tr = document.createElement("tr");
    dataSet.push([]);
    for (let j = 0; j < hor; ++j) {
      const td = document.createElement("td");
      //right-click event
      td.addEventListener("contextmenu", function (event) {
        event.preventDefault();

        const parent_tr = event.currentTarget.parentNode;
        const parent_tbody = event.currentTarget.parentNode.parentNode;

        const row_line = Array.prototype.indexOf.call(
          parent_tbody.children,
          tr
        );
        const col_line = Array.prototype.indexOf.call(parent_tr.children, td);

        td.textContent = "!";
        dataSet[row_line][col_line] = "!";
      });
      tr.appendChild(td);
      dataSet[i].push(td);
    }
    tbody.appendChild(tr);
  }

  //지뢰 심기 ex)97
  for (let i = 0; i < shuffleArr.length; ++i) {
    let ver = Math.floor(shuffleArr[i] / 10); // 9
    let hor = shuffleArr[i] % 10; // 7
    tbody.children[ver].children[hor].textContent = "X";
    dataSet[ver][hor] = "X";
  }

  console.log(dataSet);
});
