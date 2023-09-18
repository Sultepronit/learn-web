'use strict';
const vm = Vue.createApp({ // this one is using a compiler, so need it to be included
	data() {
		return {
			message: 'Hello there!'
		}
	},
	template: '<h2>{{ message }}</h2>'
}).mount('#app');

const vm2 = Vue.createApp({ // in this we create the element by ourseves
	data() {
		return {
			message: 'Hello there!'
		}
	},
	render() {
		return Vue.h(
			'h2',
			this.message
		)
	}
}).mount('#app2');