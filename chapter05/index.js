const body = document.body;
const table = document.createElement("table");

const COL = 3;
const ROW = 3;

let arr = [];
let trs = [];
let turn = "X";

let max_chance = COL * ROW;

//3x3 초기화
function init() {
  //   for (let i = 0; i < ROW; ++i) {
  //     for (let j = 0; j < COL; ++j) {
  //       arr[i][j].innerText = "";
  //     }
  //   }
  max_chance = COL * ROW;

  arr.forEach(function (row) {
    row.forEach(function (col) {
      col.innerText = "";
    });
  });
}

const callBackFun = function (event) {
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

    //3줄 누가 이겼나 체크
    checkResult(row_line, col_line);

    //row * col 꽉찼으면 다시 초기화
    if (max_chance === 0) {
      alert("놓을 수 있는 곳이 없으므로 초기화 합니다.");
      init();
    }

    //공수 교대
    if (turn === "X") {
      turn = "O";
    } else {
      turn = "X";
    }
  } else {
    console.log("빈칸 아닙니다");
  }
};

function checkResult(row_line, col_line) {
  //세칸 다 채워졌나?
  let end = false;
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

    // td.addEventListener("click", function (event) {
    //   console.log("[ " + String(i) + ", " + String(j) + " ]");
    //   arr[i][j].innerText = "x";
    // });

    arr[i].push(td);
  }

  table.appendChild(tr);
}
body.appendChild(table);
