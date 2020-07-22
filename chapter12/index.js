const body = document.body;

const rival = {
  //dom
  hero: document.querySelector(".rival-hero"),
  deck: document.querySelector(".rival-deck"),
  field: document.querySelector(".rival-cards"),
  cost: document.querySelector(".rival-cost"),
  //data
  deck_datas: [],
  hero_data: null,
  field_datas: [],
  //attack-card
  attackCard: [],
};

const my = {
  //dom
  hero: document.querySelector(".my-hero"),
  deck: document.querySelector(".my-deck"),
  field: document.querySelector(".my-cards"),
  cost: document.querySelector(".my-cost"),
  //data
  deck_datas: [],
  hero_data: null,
  field_datas: [],
  //attack-card
  attackCard: [],
};

const turnBtn = document.querySelector(".turn");

//turn
//true : my
//false : rival
let turn = true;

//btn - click event => 턴 넘기기
turnBtn.addEventListener("click", function (e) {
  //턴을 넘길 때 마다 코스트를 채워주고, 공격했던 카드들 초기화해줌
  if (turn) {
    //내 코스트 채움
    my.cost.textContent = 10;
    my.attackCard.forEach(function (card) {
      card.classList.remove("card-turnover", "card-selected");
    });
    my.attackCard = [];
  } else {
    //상대 코스트 채움
    rival.cost.textContent = 10;
    rival.attackCard.forEach(function (card) {
      card.classList.remove("card-turnover", "card-selected");
    });
    rival.attackCard = [];
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

// selected card counting
function conutingSelectedCard(obj) {
  const fieldSelectLen =
    obj.field.querySelectorAll(".card-selected").length +
    obj.hero.querySelectorAll(".card-selected").length;

  return fieldSelectLen;
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
        // 내 턴인데 이번에 선택한 카드가 적 카드 일 경우 => 공격의 의미
        // but 내 필드에서 선택한 카드가 없으면 return
        if (!data.isTurn) {
          const fieldSelectLen = conutingSelectedCard(my);

          if (fieldSelectLen === 0) {
            return;
          }
        }
      } else {
        // 상대 턴인데 이번에 선택한 카드가 내 카드 일 경우 => 공격의 의미
        // but 상대 필드에서 선택한 카드가 없으면 return
        if (data.isTurn) {
          const fieldSelectLen = conutingSelectedCard(rival);
          if (fieldSelectLen === 0) {
            return;
          }
        }
      }

      //이미 공격했던 카드 다시 선택하려고 하면 return
      if (card.classList.contains("card-turnover")) {
        return;
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

        //공격카드 추가
        const attObj = turn === true ? my : rival;
        const attPower = Number(
          attObj.attackCard[attObj.attackCard.length - 1].querySelector(
            ".card-att"
          ).textContent
        );
        data.hp = Number(data.hp) - attPower;

        //공격 턴에 맞춰서 상태 object 할당
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
            init();
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
        //turnBtn.click();

        //공격했으니 카드 선택해제하고, 회색으로 칠해 줌 중복공격 못하게
        attObj.attackCard[attObj.attackCard.length - 1].classList.add(
          "card-turnover"
        );
        attObj.attackCard[attObj.attackCard.length - 1].classList.toggle(
          "card-selected"
        );
        card.classList.toggle("card-selected");

        return;
      }

      if (turn) {
        //my 카드에 attack카드 추가
        my.attackCard.push(card);
      } else {
        //rival 카드에 attack카드 추가
        rival.attackCard.push(card);
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

//my-rival 정보 초기화
function dataInit() {
  my.hero.innerHTML = "";
  my.field.innerHTML = "";
  my.deck.innerHTML = "";

  my.deck_datas = [];
  my.hero_data = null;
  my.field_datas = [];
  my.attackCard = [];

  rival.hero.innerHTML = "";
  rival.field.innerHTML = "";
  rival.deck.innerHTML = "";

  rival.deck_datas = [];
  rival.hero_data = null;
  rival.field_datas = [];
  rival.attackCard = [];
}

//초기세팅
function init() {
  dataInit();

  createRivalDeck(5);
  createRivalHero();
  createMyDeck(5);
  createMyHero();
}

//main
init();
