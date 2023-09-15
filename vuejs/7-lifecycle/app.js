'use strict';
const vm = Vue.createApp({
	data() {
		return {
			message: 'Hello There!'
		};
	},
	beforeCreate() {
		console.log('beforeCreate!', this.message);
	},
	created() {
		console.log('created!', this.message);
	},
	beforeMount() {
		console.log('beforeMount!', this.$el);
	},
	mounted() {
		console.log('mounted!', this.$el);
	},
	beforeUpdate() {
		console.log('beforeUpdate');
	},
	updated() {
		console.log('updated');
	},
	beforeUnmount() {
		console.log('beforeUnmount!');
	},
	unmounted() {
		console.log('unmounted!');
	}
});

let vmounted = null;

setTimeout(() => {
	console.log('start!');
	vmounted = vm.mount('#app');
}, 3 * 1000);