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
:root {
  --main-bg-color: black;
  --main-font-color: white;
  --neon-off-center-color: #FFF;
  --neon-blue-font-color: #0073e6;
  --neon-red-font-color: #e62e00;
  --neon-yellow-font-color: #e6d300;
  --neon-purple-font-color: #bc13fe;
  --neon-green-font-color: #22ff00;
  --neon-blue-shadow:
    0 0 5px var(--neon-off-center-color),
    0 0 10px var(--neon-off-center-color),
    0 0 15px var(--neon-blue-font-color),
    0 0 20px var(--neon-blue-font-color),
    0 0 25px var(--neon-blue-font-color),
    0 0 30px var(--neon-blue-font-color),
    0 0 35px var(--neon-blue-font-color);
  --neon-red-shadow:
    0 0 5px var(--neon-off-center-color),
    0 0 10px var(--neon-off-center-color),
    0 0 15px var(--neon-red-font-color),
    0 0 20px var(--neon-red-font-color),
    0 0 25px var(--neon-red-font-color),
    0 0 30px var(--neon-red-font-color),
    0 0 35px var(--neon-red-font-color);
  --neon-yellow-shadow:
    0 0 5px var(--neon-off-center-color),
    0 0 10px var(--neon-off-center-color),
    0 0 15px var(--neon-yellow-font-color),
    0 0 20px var(--neon-yellow-font-color),
    0 0 25px var(--neon-yellow-font-color),
    0 0 30px var(--neon-yellow-font-color),
    0 0 35px var(--neon-yellow-font-color);
  --neon-purple-text-shadow:
    0 0 7px var(--neon-off-center-color),
    0 0 10px var(--neon-off-center-color),
    0 0 21px var(--neon-off-center-color),
    0 0 42px var(--neon-purple-font-color),
    0 0 82px var(--neon-purple-font-color),
    0 0 92px var(--neon-purple-font-color),
    0 0 102px var(--neon-purple-font-color),
    0 0 151px var(--neon-purple-font-color);
  --neon-purple-box-shadow:
    0 0 .2rem var(--neon-off-center-color),
    0 0 .2rem var(--neon-off-center-color),
    0 0 2rem var(--neon-purple-font-color),
    0 0 0.8rem var(--neon-purple-font-color),
    0 0 2.8rem var(--neon-purple-font-color),
    inset 0 0 1.3rem var(--neon-purple-font-color);
}
html{
  background: var(--main-bg-color);
}
.player-X {
  color: var(--neon-blue-font-color);
  text-shadow: var(--neon-blue-shadow);
}
.player-O {
  color: var(--neon-red-font-color);
  text-shadow: var(--neon-red-shadow);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--main-font-color);
  margin-top: 2rem;
}
section {
    text-align: center;
}
</style>
