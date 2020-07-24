const table = document.querySelector(".table");
const score = document.querySelector(".score");
let datas = [];

function init() {
  datas = [];
  score.textContent = 0;
  const fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function () {
    let colDatas = [];
    datas.push(colDatas);

    const tr = document.createElement("tr");
    [1, 2, 3, 4].forEach(function () {
      colDatas.push(0);
      const td = document.createElement("td");
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  table.appendChild(fragment);

  craeteRandomNumber();
}

function craeteRandomNumber() {
  const spaceAreas = [];
  datas.forEach(function (row, i) {
    row.forEach(function (col, j) {
      if (!col) {
        spaceAreas.push([i, j]);
      }
    });
  });

  if (spaceAreas.length === 0) {
    alert("game over : " + score.textContent + "점");
    table.innerHTML = "";
    init();
  } else {
    const spaceArea = spaceAreas[Math.floor(Math.random() * spaceAreas.length)];
    datas[spaceArea[0]][spaceArea[1]] = 2;

    paintTable();
  }
}

function paintTable() {
  datas.forEach(function (row, i) {
    row.forEach(function (col, j) {
      if (col > 0) {
        table.children[i].children[j].textContent = col;
      } else {
        table.children[i].children[j].textContent = "";
      }
    });
  });
}

init();

//mouseDown : fleg -> true
//mouseUp   : fleg -> false
let dragStart = false;

//drag      : fleg -> true;
//nonDrag   : fleg -> false;
let dragMove = false;

let startPoint;
let endPoint;

window.addEventListener("mousedown", function (e) {
  dragStart = true;
  startPoint = [e.clientX, e.clientY];
});
window.addEventListener("mousemove", function (e) {
  if (dragStart) {
    dragMove = true;
  }
});
window.addEventListener("mouseup", function (e) {
  endPoint = [e.clientX, e.clientY];

  if (dragMove) {
    let direction;
    const subX = endPoint[0] - startPoint[0];
    const subY = endPoint[1] - startPoint[1];

    if (subX < 0 && Math.abs(subX) / Math.abs(subY) > 1) {
      direction = "left";
    } else if (subX > 0 && Math.abs(subX) / Math.abs(subY) > 1) {
      direction = "right";
    } else if (subY > 0 && Math.abs(subX) / Math.abs(subY) < 1) {
      direction = "down";
    } else if (subY < 0 && Math.abs(subX) / Math.abs(subY) < 1) {
      direction = "up";
    }

    let newDatas = [[], [], [], []];
    switch (direction) {
      case "left":
        datas.forEach(function (row, i) {
          row.forEach(function (col, j) {
            if (col) {
              if (
                newDatas[i][newDatas[i].length - 1] &&
                newDatas[i][newDatas[i].length - 1] === col
              ) {
                newDatas[i][newDatas[i].length - 1] *= 2;

                const currentScore = parseInt(score.textContent, 10);
                score.textContent =
                  currentScore + newDatas[i][newDatas[i].length - 1];
              } else {
                newDatas[i].push(col);
              }
            }
          });
        });

        console.log(newDatas);

        [1, 2, 3, 4].forEach(function (row, i) {
          [1, 2, 3, 4].forEach(function (col, j) {
            datas[i][j] = newDatas[i][j] || 0;
          });
        });
        break;
      case "right":
        datas.forEach(function (row, i) {
          row.forEach(function (col, j) {
            if (col) {
              if (
                newDatas[i][newDatas[i].length - 1] &&
                newDatas[i][newDatas[i].length - 1] === col
              ) {
                newDatas[i][newDatas[i].length - 1] *= 2;

                const currentScore = parseInt(score.textContent, 10);
                score.textContent = currentScore + newDatas[i][0];
              } else {
                newDatas[i].unshift(col);
              }
            }
          });
        });

        console.log(newDatas);

        [1, 2, 3, 4].forEach(function (row, i) {
          [1, 2, 3, 4].forEach(function (col, j) {
            datas[i][3 - j] = newDatas[i][j] || 0;
          });
        });
        break;
      case "up":
        datas.forEach(function (row, i) {
          row.forEach(function (col, j) {
            if (col) {
              if (
                newDatas[j][newDatas[j].length - 1] &&
                newDatas[j][newDatas[j].length - 1] === col
              ) {
                newDatas[j][newDatas[j].length - 1] *= 2;

                const currentScore = parseInt(score.textContent, 10);
                score.textContent =
                  currentScore + newDatas[j][newDatas[j].length - 1];
              } else {
                newDatas[j].push(col);
              }
            }
          });
        });

        console.log(newDatas);

        [1, 2, 3, 4].forEach(function (row, i) {
          [1, 2, 3, 4].forEach(function (col, j) {
            datas[j][i] = newDatas[i][j] || 0;
          });
        });

        break;
      case "down":
        datas.forEach(function (row, i) {
          row.forEach(function (col, j) {
            if (col) {
              if (
                newDatas[j][newDatas[j].length - 1] &&
                newDatas[j][newDatas[j].length - 1] === col
              ) {
                newDatas[j][newDatas[j].length - 1] *= 2;

                const currentScore = parseInt(score.textContent, 10);
                score.textContent = currentScore + newDatas[j][0];
              } else {
                newDatas[j].unshift(col);
              }
            }
          });
        });

        console.log(newDatas);

        [1, 2, 3, 4].forEach(function (row, i) {
          [1, 2, 3, 4].forEach(function (col, j) {
            datas[3 - j][i] = newDatas[i][j] || 0;
          });
        });
        break;
    }
  }

  dragStart = false;
  dragMove = false;

  craeteRandomNumber();
});
