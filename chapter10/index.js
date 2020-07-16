const body = document.body;
const table = document.createElement("table");

const COL = 3;
const ROW = 3;

let arr = [];
let trs = [];
let turn = "X";

let max_chance = COL * ROW;
let stopTimer;

//3x3 초기화
function init() {
  max_chance = COL * ROW;

  arr.forEach(function (row) {
    row.forEach(function (col) {
      col.innerText = "";
    });
  });
  turn = "X";
  clearTimeout(stopTimer);
}

const callBackFun = function (event) {
  if (turn === "O") {
    //컴퓨터 턴일때는 작동하면 안됨
    return;
  }
  console.log(event.target); //td
  console.log(event.target.parentNode); //tr
  console.log(event.target.parentNode.parentNode); //table

  const row_line = trs.indexOf(event.target.parentNode);
  console.log(row_line);

  const col_line = arr[row_line].indexOf(event.target);
  console.log(col_line);

  if (arr[row_line][col_line].innerText === "") {
    //칸이 채워져 있는가?
    console.log("빈칸 입니다");

    arr[row_line][col_line].innerText = turn;
    max_chance--;
    console.log("찍고");

    //3줄 누가 이겼나 체크
    let result = checkResult(row_line, col_line);
    if (result === 1) {
      //X승리 끝
      return;
    }
    //row * col 꽉찼으면 다시 초기화
    if (max_chance === 0) {
      alert("놓을 수 있는 곳이 없으므로 초기화 합니다.");
      init();
      return;
    }

    //공수 교대
    if (turn === "X") {
      //X is user
      turn = "O";
      //O is computer
    }

    // computer turn
    stopTimer = setTimeout(function () {
      console.log("컴퓨터의 턴입니다.");
      //빈 칸 중 하나를 고름
      let candidateAreas = [];
      arr.forEach(function (trs) {
        trs.forEach(function (tds) {
          candidateAreas.push(tds);
        });
      });
      candidateAreas = candidateAreas.filter(function (tds) {
        return !tds.innerText;
      });

      const cmpTurn = Math.floor(Math.random() * candidateAreas.length);
      const tempRow = trs.indexOf(candidateAreas[cmpTurn].parentNode);
      const tempCol = arr[tempRow].indexOf(candidateAreas[cmpTurn]);

      arr[tempRow][tempCol].innerText = turn;
      max_chance--;

      //컴퓨터가 승리했는지 체크
      result = checkResult(tempRow, tempCol);
      if (result === 1) {
        //승리 끝
        return;
      }
      //턴을 나한테 넘김
      turn = "X";
    }, 1000);
  } else {
    console.log("빈칸 아닙니다");
  }
};

function checkResult(row_line, col_line) {
  //세칸 다 채워졌나?
  let end = false;
  console.log("check Result");
  //가로줄 검사
  if (
    arr[row_line][0].innerText === turn &&
    arr[row_line][1].innerText === turn &&
    arr[row_line][2].innerText === turn
  ) {
    end = true;
  }
  //세로줄 검사
  if (
    arr[0][col_line].innerText === turn &&
    arr[1][col_line].innerText === turn &&
    arr[2][col_line].innerText === turn
  ) {
    end = true;
  }
  //대각선 검사
  if (row_line === col_line || Math.abs(row_line - col_line) === 2) {
    //대각선 검사가 필요할 경우 (0,0) (1,1) (2,2) (0,2) (2,0)
    if (
      arr[0][0].innerText === turn &&
      arr[1][1].innerText === turn &&
      arr[2][2].innerText === turn
    ) {
      end = true;
    }
    if (
      arr[0][2].innerText === turn &&
      arr[1][1].innerText === turn &&
      arr[2][0].innerText === turn
    ) {
      end = true;
    }
  }
  // 다 찼으면
  if (end === true) {
    alert(turn + "의 승리");
    init();
    return 1;
  } else {
    return 0;
  }
}

for (let i = 0; i < ROW; ++i) {
  const tr = document.createElement("tr");

  arr.push([]);
  trs.push(tr);

  for (let j = 0; j < COL; ++j) {
    const td = document.createElement("td");
    tr.appendChild(td);

    td.addEventListener("click", callBackFun);

    arr[i].push(td);
  }

  table.appendChild(tr);
}
body.appendChild(table);
