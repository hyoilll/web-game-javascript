let word = "구글";

while (true) {
  let newWord = prompt("제시어 : " + word);

  let word_length = word.length;

  if (word[word_length - 1] === newWord[0]) {
    alert("성공");
    word = newWord;
  } else {
    alert("실패");
  }
}
