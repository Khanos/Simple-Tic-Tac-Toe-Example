<template>
  <div class="board">
    <div class="game--container">
        <div v-for="n in 9" :key="n" v-on:click="handleCellClick" class="cell" v-bind:style="handleCellStyle(n)">
          <span :id="n-1" class="cell-value"></span>
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
    currentPlayer: Object,
    huPlayer: Object,
    aiPlayer: Object
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
      if(this.currentPlayer.value === this.aiPlayer.value || this.gameStatus.value !== 'playing'){
        return;
      }
      const currentSpan = clickedCellEvent.target.firstElementChild;
      const currentSpanId = Number(currentSpan.getAttribute('id'));
      if (typeof this.gameState[currentSpanId] == 'number') {
        this.handlePlay(currentSpanId, this.huPlayer.value)
        if (!this.handleResultValidation(this.gameState, this.huPlayer.value) && !this.checkDraw()) {
          setTimeout(()=> {
            const aiGeneratedMove = this.getAIBestMove(this.gameState, this.aiPlayer.value);
            this.handlePlay(aiGeneratedMove.index, this.aiPlayer.value);
          }, 300);
        }
      }
    },
    handlePlay: function(cellId, player) {
      // Adding the played Value to the gameState
      this.gameState[cellId] = this.currentPlayer.value;
      document.getElementById(cellId).classList.add(`player-${this.currentPlayer.value}`)
      document.getElementById(cellId).innerText = player;
      // Changing the current player
      let gameWon = this.handleResultValidation(this.gameState, player)
      if (gameWon) {
        this.handlePayerWin(gameWon)
        return
      }
      this.currentPlayer.value = this.currentPlayer.value === "X" ? "O" : "X";
    },
    handleResultValidation: function (board, player) {
      let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
      let gameWon = null;
      for (let [index, win] of this.winningConditions.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
          gameWon = {index: index, player: player};
          break;
        }
      }
      return gameWon;
    },
    handlePayerWin: function (gameWon) {
      const winCondition = this.winningConditions[gameWon.index];
      const player = gameWon.player;
      document.querySelectorAll('.cell-value').forEach(cell => {
        cell.classList.add(winCondition.includes(Number(cell.getAttribute('id'))) ? 'winner' : 'looser');
      });
      document.querySelector('.game--status').classList.add(`player-${player}`);
      this.gameStatus.value = 'finish';
    },
    checkDraw: function() {
      if (this.getEmptyCells().length == 0) {
        this.gameStatus.value = 'draw';
        return true;
      }
      return false;
    },
    getEmptyCells: function() {
      return this.gameState.filter(s => {if(typeof s == 'number'){return s-1}});
    },
    getAIBestMove: function(newBoard, player) {
      const availSpots = this.getEmptyCells();

      if (this.handleResultValidation(newBoard, this.huPlayer.value)) {
        return {
          score: -10
        };
      } else if (this.handleResultValidation(newBoard, this.aiPlayer.value)) {
        return {
          score: 10
        };
      } else if (availSpots.length === 0) {
        return {
          score: 0
        };
      }
      var moves = [];
      for (let i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = availSpots[i];
        newBoard[availSpots[i]] = player;
        let result;
        if (player == this.aiPlayer.value) {
          result = this.getAIBestMove(newBoard, this.huPlayer.value);
          move.score = result.score;
        } else {
          result = this.getAIBestMove(newBoard, this.aiPlayer.value);
          move.score = result.score;
        }
        newBoard[availSpots[i]] = move.index;
        moves.push(move);
      }
      let bestMove;
      let bestScore;
      if (player === this.aiPlayer.value) {
        bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      } else {
        bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }

      return moves[bestMove];
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