<template>
  <div class="board">
    <div class="game--container">
        <div v-for="n in 9" :key="n" v-on:click="handleCellClick" :data-cell-index="n-1" class="cell"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: {
    winningConditions: Array,
    gameState: Array,
    gameStatus: Object,
    currentPlayer: Object
  },
  methods: {
    handleCellClick: function(clickedCellEvent) {
      // Getting the clicked cell element
      const clickedCell = clickedCellEvent.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

      // Checking if is not already played or the game is finish
      if (this.gameState[clickedCellIndex] !== "" || this.gameStatus.value !== 'playing') {
          return;
      }

      this.handleCellPlayed(clickedCell, clickedCellIndex);
      this.handleResultValidation();
    },
    handleCellPlayed: function(clickedCell, clickedCellIndex) {
      // Saving the CurrentPlayer into the gameState
      this.gameState[clickedCellIndex] = this.currentPlayer.value;
      // Adding the value to the dom
      clickedCell.innerHTML = this.currentPlayer.value;
    },
    handleResultValidation: function () {
      // Comparing the current positions with the @winningConditions Array to check for @roundWon
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
        const winCondition = this.winningConditions[i];
        const a = this.gameState[winCondition[0]];
        const b = this.gameState[winCondition[1]];
        const c = this.gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
          continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          break
        }
      }

      if (roundWon) {
        this.gameStatus.value = 'finish';
        return;
      }

      const roundDraw = !this.gameState.includes("");
      if (roundDraw) {
        this.gameStatus.value = 'draw';
        return;
      }

      this.handlePlayerChange();
    },
    handlePlayerChange: function() {
      this.currentPlayer.value = this.currentPlayer.value === "X" ? "O" : "X";
    }
  }
}
</script>

<style>
.game--container {
    display: grid;
    grid-template-columns: repeat(3, auto);
    width: 306px;
    margin: 50px auto;
}

.cell {
    font-family: "Permanent Marker", cursive;
    width: 100px;
    height: 100px;
    box-shadow: 0 0 0 1px #333333;
    border: 1px solid #333333;
    cursor: pointer;

    line-height: 100px;
    font-size: 60px;
}
</style>