<template>
    <p>The user is {{ age }} years old</p>
    <!-- will update age only inside the component!!! -->
    <button @click="age++">Update Age?</button>
    <button @click="onClickAge">Update Age!</button>
    <button @click="onClickAge3">Update Age 3!</button>
    
</template>

<script>
export default {
    name: 'User',
    //props: ['age'],
    props: {
        age: {
            //type: [Number, String]
            type: Number,
            //required: true
            //default: 20
            validator(value) {
                return value < 130;
            }
        }
    },
    emits: ['age-increment', 'age-increment-args'],
    methods: {
        onClickAge() {
            this.$emit('age-increment');
        },
        onClickAge3() {
            this.$emit('age-increment-args', 3);
        }
    }
}
</script>