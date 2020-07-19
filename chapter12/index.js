const body = document.body;
const rival_hero = document.querySelector(".rival-hero");
const rival_deck = document.querySelector(".rival-deck");
const my_hero = document.querySelector(".my-hero");
const my_deck = document.querySelector(".my-deck");

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
let turn = true;

//카드 - 돔 연결
function connectCardToDom(data, dom, IsHero) {
  let card;

  if (IsHero) {
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

  card.addEventListener("click", function () {});

  dom.appendChild(card);
}

//상대덱생성
function createRivalDeck(cnt) {
  for (let i = 0; i < cnt; ++i) {
    const deck = createCard();
    rival_deck_datas.push(deck);
  }

  rival_deck_datas.forEach(function (data) {
    connectCardToDom(data, rival_deck, false);
  });
}

//상대영웅생성
function createRivalHero() {
  const hero = createCard(true);
  rival_hero_data = hero;

  connectCardToDom(rival_hero_data, rival_hero, true);
}

//내덱생성
function createMyDeck(cnt) {
  for (let i = 0; i < cnt; ++i) {
    const deck = createCard();
    my_deck_datas.push(deck);
  }

  my_deck_datas.forEach(function (data) {
    connectCardToDom(data, my_deck, false);
  });
}

//내영웅 생성
function createMyHero() {
  const hero = createCard(true);
  my_hero_data = hero;

  connectCardToDom(my_hero_data, my_hero, true);
}

//생성자 패턴
function Card(hero) {
  if (hero) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
  } else {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);
  }
}

//팩토리 패턴
//카드공장
//호출하는 곳에서 매개변수를 넘기지 않으면 undefined가 넘어오므로 자동으로 false
function createCard(hero) {
  return new Card(hero);
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
