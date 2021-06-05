<template>
  <div class="footer">

    <h2 v-if="gameActive" class="game--status">It's {{ currentPlayer }}'s turn</h2>
    <h2 v-else class="game--status">Player {{currentPlayer}} has won!</h2>
    <button class="game--restart" v-on:click="handleRestartGame">Restart Game</button>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    currentPlayer: String,
    handleRestartGame: Function,
    gameActive: Boolean,
  },
  computed: {
    gameStatus: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
}
</script>

<style>

</style>