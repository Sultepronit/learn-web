'use strict';

const vm = Vue.createApp({
	data() {
		return {
			isPurple: false,
			selectedColor: ''
		}
	},
	computed: {
		block_classes() {
			return { purple: this.isPurple };
		}
	}
}).mount('#app');