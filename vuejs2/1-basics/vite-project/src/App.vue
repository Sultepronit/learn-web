<script setup>
import { ref } from 'vue';

const text1 = ref('some text!');
const text2 = ref('This text is <u><i>formatted</u></i>');
const p1class = ref('red');
//const p2class = ref('blue');
const p2class = 'blue'; //at this point don't know what the ref() does
const p3classId = {
  id: 'third-p',
  class: 'green'
}

</script>

<template>
  <h1>Hello there!</h1>
  <p v-bind:class="p1class">{{ text1 }}</p>
  <p :class="p2class" v-html="text2" />
  <p v-bind="p3classId">Another text</p>
</template>

<style scoped>
  .red {
    color: red;
  }
  .blue {
    color: blue;
  }
  .green {
    color: green;
  }
  #third-p {
    font-size: 1.5rem;
  }
</style>
