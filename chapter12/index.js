const body = document.body;

const rival_hero = document.querySelector(".rival-hero");
const rival_deck = document.querySelector(".rival-deck");
const rival_field = document.querySelector(".rival-cards");
const rival_cost = document.querySelector(".rival-cost");

const my_hero = document.querySelector(".my-hero");
const my_deck = document.querySelector(".my-deck");
const my_field = document.querySelector(".my-cards");
const my_cost = document.querySelector(".my-cost");

const turnBtn = document.querySelector(".turn");

//deck data 저장
let rival_deck_datas = [];
let my_deck_datas = [];

//hero data 저장
let rival_hero_data;
let my_hero_data;

//field data 저장
let rival_field_datas = [];
let my_field_datas = [];

//turn
//true : my
//false : rival
let turn = true;

//btn - click event => 턴 넘기가
turnBtn.addEventListener("click", function (e) {
  //턴을 넘길 때 마다 코스트를 채워줌
  if (turn) {
    //내 코스트 채움
    my_cost.textContent = 10;
  } else {
    //상대 코스트 채움
    rival_cost.textContent = 10;
  }

  //공수교대
  turn = !turn;

  if (turn) {
    //내 턴이면 버튼 text가 my-turn
    turnBtn.textContent = "MyTurn";
  } else {
    turnBtn.textContent = "RivalTurn";
  }
});

//카드 - 돔 연결 해제
function disconnetionCardToDom(card, dom) {
  dom.querySelectorAll(".card").forEach(function (e) {
    if (e === card) {
      e.remove();
    }
  });
}

//카드 - 돔 연결
function connectCardToDom(data, dom, isHero) {
  let card;

  if (isHero) {
    card = document.querySelector(".hero .card").cloneNode(true);

    const hero_name = document.createElement("div");
    hero_name.textContent = "hero";

    card.appendChild(hero_name);

    card.querySelector(".card-att").textContent = data.att;
    card.querySelector(".card-hp").textContent = data.hp;
  } else {
    card = document.querySelector(".deck .card").cloneNode(true);

    card.querySelector(".card-cost").textContent = data.cost;
    card.querySelector(".card-att").textContent = data.att;
    card.querySelector(".card-hp").textContent = data.hp;
  }

  card.addEventListener("click", function (e) {
    const parentNodeName = card.parentNode.className;
    //deck에 있는 카드만 필드에 올라갈 수 있도록해줌
    if (parentNodeName === "my-deck" || parentNodeName === "rival-deck") {
      let idx = 0;
      let cost = 0;
      if (turn) {
        cost = Number(my_cost.textContent);
        //내 턴인데 상대 카드를 누르면 그대로 종료
        //현재 cost가 카드의 cost보다 적으면 소환 불가
        if (!data.isTurn || cost < data.cost || data.field) {
          return;
        }

        //data에 맞는 index를 찾아서 datas[]에서 삭제
        idx = my_deck_datas.indexOf(data);
        my_deck_datas.splice(idx, 1);

        //화면에서 deck 카드 삭제
        disconnetionCardToDom(card, my_deck);

        //field에 추가
        my_field_datas.push(card);
        connectCardToDom(data, my_field, false);

        //deck에서 감소된 만큼 다시 deck 카드 충원해줌
        const newCard = createCard(false, true);
        my_deck_datas.push(newCard);
        connectCardToDom(newCard, my_deck, false);

        //cost 감소
        my_cost.textContent = String(cost - Number(data.cost));
      } else {
        cost = Number(rival_cost.textContent);
        //상대 턴인데 내 카드를 누르면 그대로 종료
        //현재 cost가 카드의 cost보다 적으면 소환 불가
        if (data.isTurn || cost < data.cost) {
          return;
        }

        //data에 맞는 index를 찾아서 datas[]에서 삭제
        idx = rival_deck_datas.indexOf(data);
        rival_deck_datas.splice(idx, 1);

        //화면에서 deck 카드 삭제
        disconnetionCardToDom(card, rival_deck);

        //field에 추가
        rival_field_datas.push(card);
        connectCardToDom(data, rival_field, false);

        //deck에서 감소된 만큼 다시 deck 카드 충원해줌
        const newCard = createCard(false, false);
        rival_deck_datas.push(newCard);
        connectCardToDom(newCard, rival_deck, false);

        //cost 감소
        rival_cost.textContent = String(cost - Number(data.cost));
      }
    }
  });

  dom.appendChild(card);
}

//상대덱생성
function createRivalDeck(cnt) {
  for (let i = 0; i < cnt; ++i) {
    const deck = createCard(false, false);
    rival_deck_datas.push(deck);
  }

  rival_deck_datas.forEach(function (data) {
    connectCardToDom(data, rival_deck, false);
  });
}

//상대영웅생성
function createRivalHero() {
  const hero = createCard(true, false);
  rival_hero_data = hero;

  connectCardToDom(rival_hero_data, rival_hero, true);
}

//내덱생성
function createMyDeck(cnt) {
  for (let i = 0; i < cnt; ++i) {
    const deck = createCard(false, true);
    my_deck_datas.push(deck);
  }

  my_deck_datas.forEach(function (data) {
    connectCardToDom(data, my_deck, false);
  });
}

//내영웅 생성
function createMyHero() {
  const hero = createCard(true, true);
  my_hero_data = hero;

  connectCardToDom(my_hero_data, my_hero, true);
}

//생성자 패턴
function Card(isHero, isTurn) {
  if (isHero) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
  } else {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);
  }

  if (isTurn === true) {
    this.isTurn = true;
  } else {
    this.isTurn = false;
  }
}

//팩토리 패턴
//카드공장
//호출하는 곳에서 매개변수를 넘기지 않으면 undefined가 넘어오므로 자동으로 false
function createCard(isHero, isTurn) {
  return new Card(isHero, isTurn);
}

//초기세팅
function init() {
  createRivalDeck(5);
  createRivalHero();
  createMyDeck(5);
  createMyHero();
}

//main
init();
