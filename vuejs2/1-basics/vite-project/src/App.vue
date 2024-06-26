<script setup>
import { ref, reactive, computed } from 'vue';
//import {  } from 'vue';

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

// computed properties
const computed1 = computed(() => {
  console.log(item2.value.id);
  return item2.value.id * 10;
});
console.log(computed1.value); // 220

// writable computed property
const firstName = ref('Step');
const lastName = ref('Muts');
const fullname = computed({
  get() {
    return firstName.value + ' ' + lastName.value;
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ');
  }
});
console.log(fullname.value); // Step Muts
fullname.value = 'John Doe';
console.log(firstName.value, lastName.value); // John Doe

// Class & Style Binding
const mouseIsOver = ref(false);
const togleClick = ref(false);
const classesObject = {
  blue: true,
  bigger: true
};

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

  <p>Computed: {{ computed1 }}</p>
  <p>Writable computed: {{ fullname }}</p>

  <p
    @mouseover="mouseIsOver = true"
    @mouseleave="mouseIsOver = false"
    @click="togleClick = !togleClick"
    class="bigger"
    :class="{ 'underline': mouseIsOver, clicked: togleClick }"
  >
    Class & Style Binding
  </p>
  <p :class="classesObject">Classes tumblers can be gathered in an object </p>
  <p :class="['red', 'underline']">Styles can be listed as an array</p>
  <p :class="[{green: true}, 'bigger']">And array can contain object with a tumbler</p>
  
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

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

.bigger {
  font-size: 1.5em;
}
.underline {
  text-decoration: underline;
}
.clicked {
  font-weight: bolder;
}
</style>
