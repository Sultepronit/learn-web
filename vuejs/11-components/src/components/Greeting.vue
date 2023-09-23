<template>
    <p v-if="age > 25">{{ msg }}</p>
    <p v-else>You're too young!</p>
</template>

<script>
    export default {
        name: 'Greeting',
        props: ['age'],
        data() {
            return {
                msg: 'Hello there'
            }
        }
    }
</script>

<style>
p {
    font-style: italic;
}
</style>

<style scoped lang="scss">
p:hover {
    color: darken(red, 15%);
}
</style>