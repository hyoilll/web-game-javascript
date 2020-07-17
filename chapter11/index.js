var 가로 = 4;
var 세로 = 3;

var 색깔 = [
  "red",
  "orange",
  "green",
  "blue",
  "black",
  "pink",
  "red",
  "orange",
  "green",
  "blue",
  "black",
  "pink",
];

//기본 카드 가로 * 세로 장
let cards = [];
//random color을 위한 임시 배열?
let colors = [];
//게임 스타트 플래그
let startFleg = false;
//버튼 또 못누르게
let btnFleg = true;
//두장 이상은 못 누르게
let clickFleg = true;

//색 섞기
function suffleColor() {
  while (색깔.length > 0) {
    colors.push(색깔.splice(Math.floor(Math.random() * 색깔.length), 1)[0]);
  }
}

function 색뽑기() {
  const color = colors.pop();
  return color;
}

//모두 뒤집었는지 확인하는 함수
function checkResult() {
  const results = document.querySelectorAll(".end");
  const cardNum = 가로 * 세로;

  if (results.length === cardNum) {
    alert("ゲームに勝ちました");
  }
}

function 카드세팅(가로, 세로) {
  for (var i = 0; i < 가로 * 세로; ++i) {
    var card = document.createElement("div");
    card.classList.add("card");

    var cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    var cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    var cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.style.backgroundColor = 색뽑기();

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    //클로저
    (function (c) {
      c.addEventListener("click", function () {
        //2장이상 누를 경우 || 이미 짝 맞춘 카드를 누를 경우 return
        if (clickFleg === false || c.classList.contains("end") === true) {
          return;
        }
        if (startFleg === true) {
          //startFleg가 true라는건 이미 start버튼으로 카드도 봤으니 시작할 수 있음
          c.classList.toggle("flipped");

          //두개의 클릭된 카드를 배열에 담기
          cards.push(c);
        } else {
          //btn을 먼저 눌러서 색을 확인 하고 시작할 수 있음
          alert(
            "先ずはボタンを押して、カードの色を確認してから始めてください。"
          );
        }

        //배열에 담긴 두개카드의 back 색깔이 같은지?
        if (cards.length === 2) {
          clickFleg = false;

          const firstColor =
            cards[0].childNodes[0].childNodes[1].style.backgroundColor;
          const secondColor =
            cards[1].childNodes[0].childNodes[1].style.backgroundColor;

          setTimeout(function () {
            //같으면 그대로 두고
            if (firstColor === secondColor) {
              cards.forEach(function (card) {
                card.classList.toggle("end");
              });
              checkResult();
            } else {
              //같지 않으면 toggle('flipped') 뒤집어줌
              cards.forEach(function (card) {
                card.classList.toggle("flipped");
              });
            }
            //배열 비워주고
            cards = [];
            //결과를 봤으니 클릭할 수 있게 해줌
            clickFleg = true;
          }, 1000);
        }
      });
    })(card);

    document.body.appendChild(card);
  }

  //버튼 생성
  const startBtn = document.createElement("button");
  startBtn.textContent = "START";
  document.body.appendChild(startBtn);

  //게임 설명 생성
  const gameExplain = document.createElement("div");
  gameExplain.textContent =
    "STARTボタンを押したらカードの色を見られる時間3秒あげられます、よく見て当ててください";
  document.body.appendChild(gameExplain);

  //버튼 클릭시 이벤트
  startBtn.addEventListener("click", function (e) {
    //btnFleg가 true면 카드를 보여줌
    if (btnFleg === true) {
      //이미 버튼이 눌렸으니 false로 바꿔서 또 못누르게 막음
      btnFleg = false;
      //버튼이 눌려서 뒷면을 보여주고 있을 때는 카드를 못뒤집게 false로 막음
      startFleg = false;

      const cards = document.querySelectorAll(".card");

      //샤라락~ 한장씩 뒤집
      // cards.forEach(function (card, idx) {
      //   setTimeout(function () {
      //     card.classList.toggle("flipped");
      //   }, 100 * idx);
      // });

      for (let i = 0; i < cards.length; ++i) {
        setTimeout(function () {
          cards[i].classList.toggle("flipped");
        }, 100 * i);
      }

      //한번에 모든 카드를 뒤집음
      setTimeout(function () {
        cards.forEach(function (card, idx) {
          card.classList.toggle("flipped");
        });

        //카드를 다시 원상태로 돌려놨으니 이제 게임을 시작해도됨
        startFleg = true;
        //카드가 다시 원상태로 돌아왔으니 btn을 다시 누를 수 있음
        btnFleg = true;
      }, 3000);
    }
  });
}
//뒷면 색을 섞어줌
suffleColor();
//카드 생성
카드세팅(가로, 세로);
