'use strict';

const vm = Vue.createApp({
	data() {
		return {
			isPurple: false,
			selectedColor: '',
			size: 100
		}
	},
	computed: {
		block_classes() {
			return { purple: this.isPurple };
		},
		additionalStyle() {
			return [
				{ width: this.size + 'px', height: this.size + 'px'},
				{ transform: 'rotate(30deg)'}
			];
		}
	}
}).mount('#app');