<template>
    <h1>Home Page</h1>
</template>

<script>
export default {
    unmounted() {
        // with keep-alive wouldn't appear
        console.log('Home component unmounted');
    },
    activated() {
        console.log('Home component activated');
    },
    deactivated() {
        console.log('Home component deactivated');
    }
}
</script>