<template>
  <select v-model="componentName">
    <option value="HomeComponent">Home</option>
    <option value="AboutComponent">About</option>
  </select>
  
  <keep-alive>
    <component :is="componentName" />
  </keep-alive>

</template>

<script>
import HomeComponent from './components/HomeComponent.vue';
import AboutComponent from './components/AboutComponent.vue';

export default {
  name: 'App',
  components: {
    HomeComponent,
    AboutComponent
  },
  data() {
    return {
      componentName: 'HomeComponent'
    }
  }
}
</script>