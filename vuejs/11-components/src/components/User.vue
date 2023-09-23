<template>
    <p>The user is {{ age }} years old</p>
    <button @click="age++">Update Age?</button>
</template>

<script>
export default {
    name: 'User',
    props: ['age']
}
</script>