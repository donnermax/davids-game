$(document).ready(() => {
  $(".start-game-button").on("click", () => {
    $(".start-game-button").addClass("hidden");
    $(".restart-game-top").removeClass("hidden");
  });

  $(".icon").on("mouseenter", () => {
    $(".menu-close").addClass("hidden");
    $(".menu-open").removeClass("hidden");
  });
  $(".icon").on("mouseleave", () => {
    $(".menu-close").removeClass("hidden");
    $(".menu-open").addClass("hidden");
  });

  // Get references to elements
  const $playerNamesInput = $(".input-names");
  const $playerScoresTable = $(".player-scores");
  const $loserList = $(".loser-list");

  let players = [];

  // Start Game function using
  function startGame() {
    const numPlayers = parseInt;

    $(".current-game").removeClass("hidden");

    $playerNamesInput.val().split(",").length;
    const playerNames = $playerNamesInput
      .val()
      .split(",")
      .map((name) => name.trim());

    players = playerNames.map((name, index) => {
      const player = {
        name: name,
        score: 0,
        row: $("<tr>").appendTo($playerScoresTable),
      };

      $("<td>").text(name).appendTo(player.row);
      player.scoreCell = $("<td>").text("0").appendTo(player.row);
      player.input = $("<td>")
        .html(`<input type="number" id="score-${index}">`)
        .appendTo(player.row);

      return player;
    });
  }

  //////game-reset////
  function restartGame() {
    players = [];
    $playerScoresTable.empty();
    $loserList.empty();
    $(".current-game").addClass("hidden");

    startGame();
  }

  function createPlayer(name) {
    const player = {
      name,
      score: 0,
      row: $("<tr>").appendTo($playerScoresTable),
      scoreInput: $(`<input type="number" class="score-input">`).appendTo(
        player.row
      ),
    };

    $("<td>").text(name).appendTo(player.row);
    player.scoreCell = $("<td>").text("0").appendTo(player.row);

    return player;
  }

  ////////////NEW////////
  function submitScores() {
    $.each(players, (index, player) => {
      // Get the new score from the correct input element using player.row.index()
      const newScore = parseInt($("#score-" + player.row.index()).val()) || 0;

      // Add newScore to player's existing score
      player.score += newScore;

      // Apply special rules after addition
      if (newScore !== 0) {
        if (player.score === 50) {
          player.score = 30;
        } else if (player.score === 100) {
          player.score = 50;
        } else if (player.score > 100) {
          player.score = 101; // Set to 101 if over 100
        }
      }

      // Update score display
      player.scoreCell.text(player.score);

      // Check for loser
      if (player.score >= 101) {
        removePlayer(player);
      }
    });
  }

  // Remove Player function using
  function removePlayer(player) {
    const $loserItem = $("<li>").text(player.name).appendTo($loserList);
    player.row.hide();
    players = players.filter((p) => p !== player);
  }

  // Event listeners using
  $(".start-game-button").click(startGame);
  // $(".reset-game-button").click(resetGame);
  $(".submit-scores-button").click(submitScores);
  $(".restart-game").click(restartGame);
});
