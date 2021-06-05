<template>
  <div class="footer">

    <h2 v-if="gameStatus.value === 'playing'" class="game--status">It's {{ currentPlayer.value }}'s turn</h2>
    <h2 v-if="gameStatus.value === 'finish'" class="game--status">Player {{ currentPlayer.value }} has won!</h2>
    <h2 v-if="gameStatus.value === 'draw'" class="game--status">Game ended in a draw!</h2>
    <button class="game--restart" v-on:click="handleRestartGame">Restart Game</button>
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
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    },
  }
}
</script>

<style>

</style>