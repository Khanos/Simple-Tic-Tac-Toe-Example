<template>
  <div id="app">
    <Header/>
    <Board
      v-bind:winningConditions="winningConditions"
      v-bind:gameState="gameState"
      v-bind:gameStatus="gameStatus"
      v-bind:currentPlayer="currentPlayer"
    />
    <Footer
      v-bind:currentPlayer="currentPlayer"
      v-bind:gameStatus="gameStatus"
      v-bind:gameState="gameState"
    />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Board from './components/Board.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  data: () => ({
    gameStatus: {
      value: 'playing'
    },
    currentPlayer: {
      value: 'X'
    },
    gameState: ["", "", "", "", "", "", "", "", ""],
    winningConditions: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ],
  }),
  components: {
    Header,
    Board,
    Footer,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
section {
    text-align: center;
}
</style>
