<template>
  <div class="footer">

    <h2 v-if="gameStatus.value === 'playing'" class="game--status">It's {{ currentPlayer.value }}'s turn</h2>
    <h2 v-if="gameStatus.value === 'finish'" class="game--status">Player {{ currentPlayer.value }} has won!</h2>
    <h2 v-if="gameStatus.value === 'draw'" class="game--status">Game ended in a draw!</h2>
    <button class="game--restart neon-button" v-on:click="handleRestartGame">Restart</button>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    currentPlayer: Object,
    gameStatus: Object,
    gameState: Array,
  },
  methods: {
    handleRestartGame: function() {
        this.currentPlayer.value = "X";
        this.gameStatus.value = 'playing';
        Object.assign(this.gameState, ["", "", "", "", "", "", "", "", ""]);
        document.querySelectorAll('.cell-value').forEach(cell => {
          cell.innerHTML = "";
          cell.className = "cell-value";
        });
        document.querySelector('.game--status').className = 'game--status';
    },
  }
}
</script>

<style>
.neon-button {
  text-align: center;
  font-weight: 400;
  font-size: 1.5rem;
  background: transparent;
  animation: pulsate-green 1.5s infinite alternate;
  border: 0.2rem solid #fff;
  border-radius: 0.5rem;
  padding: 0.4em;
  color: #fff;
  text-shadow:
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #22ff00,
    0 0 82px #22ff00,
    0 0 92px #22ff00,
    0 0 102px #22ff00,
    0 0 151px #22ff00;
  box-shadow: 0 0 .1rem #fff,
              0 0 .1rem #fff,
              0 0 1rem #22ff00,
              0 0 0.4rem #22ff00,
              0 0 1.4rem #22ff00,
              inset 0 0 .8rem #22ff00;
}
.neon-button:hover {
    background-color: #22ff00;
    color: #FFFFFF;
    cursor: pointer;
    border-color: transparent;
}
@keyframes pulsate-green {
  100% {
    text-shadow:
      0 0 4px #fff,
      0 0 11px #fff,
      0 0 19px #fff,
      0 0 40px #22ff00,
      0 0 80px #22ff00,
      0 0 90px #22ff00,
      0 0 100px #22ff00,
      0 0 150px #22ff00;
  }
  0% {
    text-shadow:
      0 0 2px #fff,
      0 0 4px #fff,
      0 0 6px #fff,
      0 0 10px #22ff00,
      0 0 45px #22ff00,
      0 0 55px #22ff00,
      0 0 70px #22ff00,
      0 0 80px #22ff00;
  }
}
</style>