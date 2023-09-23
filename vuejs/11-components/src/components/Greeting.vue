<template>
    <p>{{ msg }}</p>
</template>

<script>
    export default {
        name: 'Greeting',
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

<style scoped>
p {
    color: red;
}
</style>