<template>
  <div class="header">
    <h1 class="game--title neonText">Tic Tac Toe</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {},
}
</script>

<style>
.header{
  display: flex;
  justify-content: center;
  align-items: center;
}
.neonText {
  color: var(--main-font-color);
  text-shadow: var(--neon-purple-text-shadow);
}
h1.game--title {
  max-width: 17rem;
  text-align: center;
  font-weight: 400;
  font-size: 3rem;
  animation: pulsate-purple 1.5s infinite alternate;
  border: 0.2rem solid var(--neon-off-center-color);
  border-radius: 2rem;
  padding: 0.4em;
  box-shadow: var(--neon-purple-box-shadow)
}
@keyframes pulsate-purple {
  100% {
    text-shadow:
      0 0 4px #fff,
      0 0 11px #fff,
      0 0 19px #fff,
      0 0 40px #bc13fe,
      0 0 80px #bc13fe,
      0 0 90px #bc13fe,
      0 0 100px #bc13fe,
      0 0 150px #bc13fe;
  }
  0% {
    text-shadow:
      0 0 2px #fff,
      0 0 4px #fff,
      0 0 6px #fff,
      0 0 10px #bc13fe,
      0 0 45px #bc13fe,
      0 0 55px #bc13fe,
      0 0 70px #bc13fe,
      0 0 80px #bc13fe;
  }
}
</style>