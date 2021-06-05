<template>
  <div class="board">
    <div class="game--container">
        <div v-for="n in 9" :key="n" v-on:click="handleCellClick" :data-cell-index="n" class="cell"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: {
    gameState: Array,
    gameActive: Boolean,
    currentPlayer: String
  },
  methods: {
    handleCellClick: function(clickedCellEvent) {
      // Getting the clicked cell element
      const clickedCell = clickedCellEvent.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

      // Checking if is not already played or the game is finish
      if (this.gameState[clickedCellIndex] !== "" || !this.gameActive) {
          return;
      }

      this.handleCellPlayed(clickedCell, clickedCellIndex);
      //handleResultValidation();
    },
    handleCellPlayed: function(clickedCell, clickedCellIndex) {
      this.gameState[clickedCellIndex] = this.currentPlayer;
      clickedCell.innerHTML = this.currentPlayer;
    },
    handleResultValidation: function () {
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
      const roundDraw = !this.gameState.includes("");

      if (roundWon) {
        this.gameActive = false;
        if (roundDraw) {
          // TODO statusDisplay.innerHTML = drawMessage();
          this.gameActive = false;
          return;
        }
        return;
      }



      this.handlePlayerChange();
    },
    handlePlayerChange: function() {
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
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