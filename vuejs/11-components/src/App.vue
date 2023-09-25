<template>
  <h3>Konnichiwa!</h3>
  <greeting :age="age"></greeting>
  <user
    :age="age"
    @age-increment="age++"
    @age-increment-args="incrementAgeBy"
  ></user>

  <button @click="age++">Update Age</button>
</template>

<script>
//import Greeting from '@/components/Greeting.vue';
import Greeting from './components/Greeting.vue';
import User from './components/User.vue';

export default {
  name: 'App',
  components: {
    Greeting,
    User
  }, 
  data() {
    return {
      age: 20
    }
  },
  methods: {
    incrementAgeBy(num) {
      this.age += num;
    }
  }
}
</script>

