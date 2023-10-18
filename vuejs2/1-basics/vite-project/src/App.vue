<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';

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

const count = ref(0);

const countWrapper = { count: 0 };
const state = reactive(countWrapper);
console.log(state); // Proxy(Object) {count: 0}
// this way we made previously created countWrapper object reactive

const item1 = { id: ref(17) };
const { id: item1Id } = item1;

const item2 = ref({ id: 22 });

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

  <p>{{ count }}</p>
  <button @click="count++">increment!</button>

  <p>{{ state.count }}</p>
  <button @click="state.count++">increment!</button>

  <p>{{ item1.id }}</p> <!-- 17 -->
  <p>{{ item1.id + 1 }}</p> <!-- [object Object]1 -->
  <p>{{ item1Id + 1 }}</p> <!-- 18 -->

  <p>{{ item2.id }}</p> <!-- 22 -->
  <p>{{ item2.id + 1 }}</p> <!-- 23 -->
  
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
