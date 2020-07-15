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
    const randomNum = candidateArr.splice(
      Math.floor(Math.random() * candidateArr.length),
      1
    )[0];
    randomArr.push(randomNum);
  }

  return randomArr;
}

let dataSet = [];
let stopFleg = false;
let openArea = 0;

//table, dataSet array 초기화
function init(tbody) {
  const trList = tbody.querySelectorAll("tr");
  trList.forEach(function (item) {
    item.remove();
  });
  openArea = 0;
  stopFleg = false;
  dataSet = [];
}

//버튼 이벤트
document.querySelector(".exec").addEventListener("click", function () {
  const hor = parseInt(document.querySelector(".hor").value);
  const ver = parseInt(document.querySelector(".ver").value);
  const mine = parseInt(document.querySelector(".mine").value);
  if (hor * ver < mine) {
    alert("마인이 너무 많음 알아서 새로고침해서 다시해라");
  }
  console.log(hor, ver, mine);

  //mine갯수를 매개변수로 보내면 mine수 만큼의 랜덤 배열이 나옴
  //지뢰 위치의 배열
  const size = hor * ver;
  const shuffleArr = pickRandomNumber(size, mine);
  console.log(shuffleArr);

  const tbody = document.querySelector(".table tbody");
  //  let dataSet = [];

  //기존에 table이 있으면 삭제
  init(tbody);

  for (let i = 0; i < ver; ++i) {
    const tr = document.createElement("tr");
    dataSet.push([]);
    for (let j = 0; j < hor; ++j) {
      const td = document.createElement("td");
      //right-click event
      td.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        if (stopFleg === true) {
          return;
        }

        const parent_tr = event.currentTarget.parentNode;
        const parent_tbody = event.currentTarget.parentNode.parentNode;

        const row_line = Array.prototype.indexOf.call(
          parent_tbody.children,
          tr
        );
        const col_line = Array.prototype.indexOf.call(parent_tr.children, td);

        //우클릭시 차례대로 '!', '?', ''가 나오게함
        let updateValue = "";
        if (td.textContent === "" || td.textContent === "X") {
          updateValue = "!";
        } else if (td.textContent === "!") {
          updateValue = "?";
        } else if (td.textContent === "?") {
          if (dataSet[row_line][col_line] === "X") {
            updateValue = "X";
          } else {
            updateValue = "";
          }
        }

        td.textContent = updateValue;
      });
      td.addEventListener("click", function (event) {
        if (stopFleg === true) {
          return;
        }
        const parent_tr = event.currentTarget.parentNode;
        const parent_tbody = event.currentTarget.parentNode.parentNode;

        const row_line = Array.prototype.indexOf.call(
          parent_tbody.children,
          tr
        );
        const col_line = Array.prototype.indexOf.call(parent_tr.children, td);

        //주변 지뢰갯수 표시
        let mineCnt = 0;
        if (dataSet[row_line][col_line] === "X") {
          td.textContent = "펑";
          alert("지뢰밟았으니까 알아서 새로고침해서 다시해라");
          stopFleg = true;
        } else {
          td.classList.add("opend");
          if (dataSet[row_line][col_line] === 1) {
            return;
          } else {
            dataSet[row_line][col_line] = 1;
          }
          openArea++;
          console.log(openArea);

          for (let i = row_line - 1; i < row_line - 1 + 3; ++i) {
            if (i < 0 || i >= ver) {
              continue;
            }
            for (let j = col_line - 1; j < col_line - 1 + 3; ++j) {
              if (j < 0 || j >= hor) {
                continue;
              }

              if (dataSet[i][j] === "X") {
                mineCnt++;
              }
            }
          }
          //거짓인 값 : false, '', 0, null, undefined, NaN이 오면 ''넣어라
          //event.currentTarget.textContent = mineCnt || '';
          if (mineCnt !== 0) {
            event.currentTarget.textContent = mineCnt; //지뢰숫자 알려줌
          } else {
            //주변에 지뢰가 한개도 없으면 주변 8칸 동시 오픈 (재귀)
            let aroundArea = [];

            if (tbody.children[row_line - 1]) {
              aroundArea = aroundArea.concat([
                tbody.children[row_line - 1].children[col_line - 1],
                tbody.children[row_line - 1].children[col_line],
                tbody.children[row_line - 1].children[col_line + 1],
              ]);
            }

            aroundArea = aroundArea.concat([
              tbody.children[row_line].children[col_line - 1],
              tbody.children[row_line].children[col_line + 1],
            ]);

            if (tbody.children[row_line + 1]) {
              aroundArea = aroundArea.concat([
                tbody.children[row_line + 1].children[col_line - 1],
                tbody.children[row_line + 1].children[col_line],
                tbody.children[row_line + 1].children[col_line + 1],
              ]);
            }

            aroundArea
              .filter(function (v) {
                return !!v; //undefined, null, 0, '' 을 제거
              })
              .forEach(function (around) {
                const tempTr = around.parentNode;
                const tempTbody = around.parentNode.parentNode;

                const tempRow = Array.prototype.indexOf.call(
                  tempTbody.children,
                  tempTr
                );
                const tempCol = Array.prototype.indexOf.call(
                  tempTr.children,
                  around
                );
                if (dataSet[tempRow][tempCol] !== 1) {
                  around.click();
                }
              });
          }
        }
        if (hor * ver - mine === openArea) {
          alert("승리했습니다");
          stopFleg = true;
        }
      });
      tr.appendChild(td);
      dataSet[i].push(td);
    }

    tbody.appendChild(tr);
  }

  //지뢰 심기 ex)97
  for (let i = 0; i < shuffleArr.length; ++i) {
    // let ver = Math.floor(shuffleArr[i] / 10); // 9
    // let hor = shuffleArr[i] % 10; // 7

    // tbody.children[ver].children[hor].textContent = "X";
    // dataSet[ver][hor] = "X";

    let row_line;
    let col_line;

    for (let j = 0; j < ver; ++j) {
      const a = j * hor;
      const b = a + hor;

      if (a <= shuffleArr[i] && shuffleArr[i] < b) {
        col_line = shuffleArr[i] % hor; //마지막 자리수 - 칸위치
        row_line = j;
        break;
      }
    }

    //tbody.children[row_line].children[col_line].textContent = "X";
    dataSet[row_line][col_line] = "X";
  }

  console.log(dataSet);
});
