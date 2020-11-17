const body = document.body;
const tetris = body.querySelector(".tetris");

// ---fleg ---
let moveFleg = true;

//색, 움직일 수 있는지, 블록 모양
const blockDict = {
  0: ["white", false, []],
  1: [
    "red",
    true,
    [
      [1, 1],
      [1, 1],
    ],
  ],
  2: [
    "blue",
    true,
    [
      [0, 2, 0],
      [2, 2, 2],
    ],
  ],
  3: [
    "orange",
    true,
    [
      [3, 3, 0],
      [0, 3, 3],
    ],
  ],
  4: [
    "skyblue",
    true,
    [
      [0, 4, 4],
      [4, 4, 0],
    ],
  ],
  5: [
    "yellowgreen",
    true,
    [
      [5, 5, 5],
      [5, 0, 0],
    ],
  ],
  6: [
    "pink",
    true,
    [
      [6, 6, 6],
      [0, 0, 6],
    ],
  ],
  7: ["yellow", true, [[7, 7, 7, 7]]],
  10: ["red", false, []],
  20: ["blue", false, []],
  30: ["orange", false, []],
  40: ["skyblue", false, []],
  50: ["yellowgreen", false, []],
  60: ["pink", false, []],
  70: ["yellow", false, []],
};
let tetrisDatas = [];

function createTetris() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 20; ++i) {
    const tr = document.createElement("tr");

    let blockDatas = [];

    for (let j = 0; j < 10; ++j) {
      const td = document.createElement("td");
      tr.appendChild(td);

      blockDatas.push(0);
    }

    tetrisDatas.push(blockDatas);

    fragment.appendChild(tr);
  }

  tetris.appendChild(fragment);
}

function paintScreen() {
  tetrisDatas.forEach(function (row, i) {
    row.forEach(function (col, j) {
      tetris.children[i].children[j].className = blockDict[col][0];
      console.log(col);
    });
  });
}

function createBlock() {
  moveFleg = true;

  const block = blockDict[Math.ceil(Math.random() * 7)][2];
  console.log(block);

  block.forEach(function (row, i) {
    row.forEach(function (col, j) {
      // TODO: 블록 생성할 때 이미 차있으면 게임끝
      tetrisDatas[i][j + 3] = col;
    });
  });

  console.log(tetrisDatas);
  paintScreen();
}

function blockDown() {
  for (let i = tetrisDatas.length - 1; i >= 0; --i) {
    tetrisDatas[i].forEach(function (col, j) {
      if (col > 0 && 8 > col) {
        // i + 1이 tetris row 범위 안일 경우 => 한칸 밑으로 내려 갈 수 있음
        if (i + 1 < tetrisDatas.length && moveFleg === true) {
          tetrisDatas[i + 1][j] = col;
          tetrisDatas[i][j] = 0;
        } else {
          tetrisDatas[i][j] *= 10;
          moveFleg = false;
        }
      }
    });
  }

  //앞의 블록이 가장 밑으로 도달했기에 다음 블록 생성
  if (moveFleg === false) {
    createBlock();
  }

  paintScreen();
}

window.addEventListener("keydown", function (e) {
  console.log(e.code);

  switch (e.code) {
    case "Space": //한방에 내리기
      console.log("Space");
      break;
    case "ArrowRight": //오른쪽 이동
      console.log("Right");
      break;
    case "ArrowLeft": //왼쪽 이동
      console.log("Left");
      break;
    case "ArrowUp": //방향 전환
      console.log("Up");
      break;
    case "ArrowDown": //아래쪽 이동
      console.log("Down");
      break;
    default:
      console.log("etc...");
      break;
  }
});

createTetris();
createBlock();
setInterval(blockDown, 100);
