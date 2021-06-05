<template>
  <div class="footer">
    <h2 class="game--status">It's {{ currentPlayer }}'s turn</h2>
    <button class="game--restart" v-on:click="handleRestartGame">Restart Game</button>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    currentPlayer: String,
    handleRestartGame: Function
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