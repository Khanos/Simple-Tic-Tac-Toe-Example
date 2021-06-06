<template>
  <div class="board">
    <div class="game--container">
        <div v-for="n in 9" :key="n" v-on:click="handleCellClick" :data-cell-index="n-1" class="cell" v-bind:style="handleCellStyle(n)">
          <span :data-value-index="n-1" class="cell-value"></span>
        </div>
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
    handleCellStyle: function(n){
      return {
        'border-top-color': [1,2,3].includes(n) ? 'transparent': 'var(--neon-yellow-font-color)',
        'border-top-style': [1,2,3].includes(n) ? 'none': 'solid',
        'border-top-width': [1,2,3].includes(n) ? '0px' : '1px',
        'border-right-color': [3,6,9].includes(n) ? 'transparent': 'var(--neon-yellow-font-color)',
        'border-right-style': [3,6,9].includes(n) ? 'none': 'solid',
        'border-right-width': [3,6,9].includes(n) ? '0px' : '1px',
        'border-bottom-color': [7,8,9].includes(n) ? 'transparent': 'var(--neon-yellow-font-color)',
        'border-bottom-style': [7,8,9].includes(n) ? 'none': 'solid',
        'border-bottom-width': [7,8,9].includes(n) ? '0px' : '1px',
        'border-left-color': [1,4,7].includes(n) ? 'transparent': 'var(--neon-yellow-font-color)',
        'border-left-style': [1,4,7].includes(n) ? 'none': 'solid',
        'border-left-width': [1,4,7].includes(n) ? '0px' : '1px',
      }
    },
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
      // Adding the value and style to the dom
      let span = clickedCell.firstElementChild;
      span.classList.add(`player-${this.currentPlayer.value}`)
      span.innerHTML = this.currentPlayer.value;
    },
    handleResultValidation: function () {
      // Comparing the current positions with the @winningConditions Array to check for @roundWon
      let roundWon = false;
      let winCondition;
      for (let i = 0; i <= 7; i++) {
        winCondition = this.winningConditions[i];
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
        this.handlePayerWin(winCondition);
        return;
      }

      const roundDraw = !this.gameState.includes("");
      if (roundDraw) {
        this.gameStatus.value = 'draw';
        return;
      }
      this.handlePlayerChange();
    },
    handlePayerWin: function (winCondition) {
      const winner = winCondition;
      document.querySelectorAll('.cell-value').forEach(cell => {
        cell.classList.add(winner.includes(Number(cell.getAttribute('data-value-index'))) ? 'winner' : 'looser');
      });
      document.querySelector('.game--status').classList.add(`player-${this.currentPlayer.value}`);
      this.gameStatus.value = 'finish';
    },
    handlePlayerChange: function() {
      this.currentPlayer.value = this.currentPlayer.value === "X" ? "O" : "X";
    }
  },
}
</script>

<style>
@keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
@-webkit-keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
.game--container {
    display: grid;
    grid-template-columns: repeat(3, auto);
    width: 18rem;
    margin: 1rem auto;
}
.cell {
    font-family: "Permanent Marker", cursive;
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    line-height: 100px;
    font-size: 5rem;
}
.winner {
  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;
}
.looser {
  opacity: 0.3;
}
</style>