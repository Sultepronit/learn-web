<script>
import getData from '@/getdb.js';
export default {
  name: 'App',
  data() {
    return {
      db: [],
      index: 0,
      kanji: ''
    }
  },
  created() {
    getData('kanji', 'A', 'F').then(response => {
      this.db = response;
      this.kanji2();
    });
  },
  methods: {
    kanji2() {
      this.kanji = this.db[this.index++][0];
    }
  }
}
  
</script>

<template>
  <button @click="kanji2">next</button>
  <!-- <h1>{{ db[index][0] }}</h1> -->
  <h1>{{ kanji }}</h1>
  <p v-for="card in db">{{ card }}</p>
</template>

<style scoped>

</style>
