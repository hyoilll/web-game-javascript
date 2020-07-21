const body = document.body;

const rival = {
  //dom
  hero: document.querySelector(".rival-hero"),
  deck: document.querySelector(".rival-deck"),
  field: document.querySelector(".rival-cards"),
  cost: document.querySelector(".rival-cost"),
  //data
  deck_datas: [],
  hero_data: [],
  field_datas: [],
  //attack-card
  attackCard: null,
};

const my = {
  //dom
  hero: document.querySelector(".my-hero"),
  deck: document.querySelector(".my-deck"),
  field: document.querySelector(".my-cards"),
  cost: document.querySelector(".my-cost"),
  //data
  deck_datas: [],
  hero_data: [],
  field_datas: [],
  //attack-card
  attackCard: null,
};

const turnBtn = document.querySelector(".turn");

//turn
//true : my
//false : rival
let turn = true;

//btn - click event => 턴 넘기기
turnBtn.addEventListener("click", function (e) {
  //턴을 넘길 때 마다 코스트를 채워줌
  if (turn) {
    //내 코스트 채움
    my.cost.textContent = 10;
  } else {
    //상대 코스트 채움
    rival.cost.textContent = 10;
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

//deck -> field
function moveDectToField(card, data, cost, obj) {
  //data에 맞는 index를 찾아서 datas[]에서 삭제
  const idx = obj.deck_datas.indexOf(data);
  obj.deck_datas.splice(idx, 1);

  //화면에서 deck 카드 삭제
  disconnetionCardToDom(card, obj.deck);

  //field에 추가
  obj.field_datas.push(card);
  connectCardToDom(data, obj.field, false);

  //obj is my = true / obj is rival = false
  const isTurn = obj === my ? true : false;

  //deck에서 감소된 만큼 다시 deck 카드 충원해줌
  const newCard = createCard(false, isTurn);
  obj.deck_datas.push(newCard);
  connectCardToDom(newCard, obj.deck, false);

  //cost 감소
  obj.cost.textContent = String(cost - Number(data.cost));
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
      let cost = 0;
      if (turn) {
        cost = Number(my.cost.textContent);
        //내 턴인데 상대 카드를 누르면 그대로 종료
        //현재 cost가 카드의 cost보다 적으면 소환 불가
        if (!data.isTurn || cost < data.cost) {
          return;
        }

        moveDectToField(card, data, cost, my);
      } else {
        cost = Number(rival.cost.textContent);
        //상대 턴인데 내 카드를 누르면 그대로 종료
        //현재 cost가 카드의 cost보다 적으면 소환 불가
        if (data.isTurn || cost < data.cost) {
          return;
        }

        moveDectToField(card, data, cost, rival);
      }
    } else {
      if (turn) {
        //내 턴이여서 공격카드를 먼저 선택해야 하는데
        //내 공격카드 선택안하고 상대방카드 먼저 선택하면 return
        if (my.attackCard === null && !data.isTurn) {
          return;
        }
      } else {
        if (rival.attackCard === null && data.isTurn) {
          return;
        }
      }

      //field, hero 영역의 카드를 선택하면 공격할 수 있도록 표시해줌
      const grandCard = card.parentNode.parentNode;
      grandCard.querySelectorAll(".card").forEach(function (c) {
        c.classList.remove("card-selected");
      });
      card.classList.toggle("card-selected");

      //turn : true = my / false = rival
      //data.isTurn : true = my / false = rival
      if (turn !== data.isTurn) {
        //공격
        console.log("attack");

        const attObj = turn === true ? my : rival;
        const attPower = Number(
          attObj.attackCard.querySelector(".card-att").textContent
        );

        data.hp = Number(data.hp) - attPower;

        const hitObj = attObj === my ? rival : my;

        //if hp가 1보다 작아지면 카드 없어짐
        if (data.hp < 1) {
          if (data.hero) {
            //영웅이 죽었으면 게임 끝
            if (turn) {
              alert("my팀이 이겼습니다.");
            } else {
              alert("rival팀이 이겼습니다");
            }
            return;
          } else {
            //data에 맞는 index를 찾아서 datas[]에서 삭제
            const idx = hitObj.field_datas.indexOf(data);
            hitObj.field_datas.splice(idx, 1);
            //dom 해제
            disconnetionCardToDom(card, hitObj.field);
          }
        }

        card.querySelector(".card-hp").textContent = String(data.hp);

        //공격 했으니 턴 넘겨주고
        turnBtn.click();

        //카드 선택해제
        attObj.attackCard.classList.toggle("card-selected");
        card.classList.toggle("card-selected");

        //attack 카드 초기화
        rival.attackCard = null;
        my.attackCard = null;
        return;
      }

      if (turn) {
        //my 카드에 attack카드 추가
        my.attackCard = card;
        console.log("true");
      } else {
        //rival 카드에 attack카드 추가
        rival.attackCard = card;
        console.log("false");
      }
    }
  });

  dom.appendChild(card);
}

//상대덱생성
function createRivalDeck(cnt) {
  for (let i = 0; i < cnt; ++i) {
    const deck = createCard(false, false);
    rival.deck_datas.push(deck);
  }

  rival.deck_datas.forEach(function (data) {
    connectCardToDom(data, rival.deck, false);
  });
}

//상대영웅생성
function createRivalHero() {
  const hero = createCard(true, false);
  rival.hero_data = hero;

  connectCardToDom(rival.hero_data, rival.hero, true);
}

//내덱생성
function createMyDeck(cnt) {
  for (let i = 0; i < cnt; ++i) {
    const deck = createCard(false, true);
    my.deck_datas.push(deck);
  }

  my.deck_datas.forEach(function (data) {
    connectCardToDom(data, my.deck, false);
  });
}

//내영웅 생성
function createMyHero() {
  const hero = createCard(true, true);
  my.hero_data = hero;

  connectCardToDom(my.hero_data, my.hero, true);
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
