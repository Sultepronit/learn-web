<script setup>
import { ref } from 'vue';

const text1 = ref('some text!');
const text2 = ref('This text is <u><i>formatted</u></i>');
const p1class = ref('red');
const p2class = 'blue'; // at this point don't know what the ref() does

console.log(p1class); // RefImpl {__v_isShallow: false, dep: undefined, __v_isRef: true, _rawValue: 'red', _value: 'red'}
console.log(p1class.value); // red
console.log(p2class); // blue

const p3classId = {
  id: 'third-p',
  class: 'green'
}
const show = true;
const url = 'https://google.com';
const hrefPlaceholder = 'href';
const clickPlaceholder = 'click';

function clicked() {
  console.log('Here we go!');
}

const buttonColor = ref('green');
function changeColor() {
  console.log('change!');
  if(buttonColor.value === 'green') {
    buttonColor.value = 'red';
  } else {
    buttonColor.value = 'green';
  }
}

const count0 = 0;
const count1 = ref(0);

</script>

<template>
  <h1>Hello there!</h1>
  <p v-bind:class="p1class">{{ text1 }}</p>
  <p :class="p2class" v-html="text2" />
  <p v-bind="p3classId">Another text</p>
  <p v-if="show">This message is shown</p>
  <p v-if="!show">And this one - no</p>
  <a v-bind:href="url" target="_blank">google</a>
  <p>
    <a :[hrefPlaceholder]="url">more google!</a>
  </p>
  <button v-on:[clickPlaceholder]="clicked()">
    Click me!
  </button>

  <button @click="changeColor()" :class="buttonColor">
    Change me!
  </button>

  <p>{{ count0 }}</p>
  <button @click="count0++">increment?</button>

  <p>{{ count1 }}</p>
  <button @click="count1++">increment!</button>
  
</template>

<style scoped>
  button {
    font-size: 1.5rem;
  }
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
