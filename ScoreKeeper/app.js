const p1 = {
  button: document.getElementById("player1"),
  display: document.getElementById("p1Display"),
  score: 0,
};

const p2 = {
  button: document.getElementById("player2"),
  display: document.getElementById("p2Display"),
  score: 0,
};

const resetButton = document.getElementById("reset");
const winningScoreSelect = document.getElementById("winningScore");

let p1Score = 0; // not constant varibale
let p2Score = 0; // not constant varibale
let winningScore = 5;
let isGameOver = false;

function updateScores(player, opponent) {
  if (!isGameOver) {
    player.score += 1;
    player.display.textContent = player.score;

    if (player.score === winningScore) {
      isGameOver = true;
      player.display.classList.add("has-text-success");
      opponent.display.classList.add("has-text-danger");
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
  }
}

p1.button.addEventListener("click", function () {
  updateScores(p1, p2);
});

p2.button.addEventListener("click", function () {
  updateScores(p2, p1);
});

winningScoreSelect.addEventListener("change", function () {
  winningScore = parseInt(this.value); // this.value is string by default
  reset();
});

resetButton.addEventListener("click", reset);

function reset() {
  isGameOver = false;
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.textContent = p.score;
    p.display.classList.remove("has-text-success", "has-text-danger");
    p.button.disabled = false;
  }
}
