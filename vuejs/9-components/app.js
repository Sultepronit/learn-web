'use strict';
const vm = Vue.createApp({ 

});

vm.component('hello', {
	data() {
		return {
			message: 'Hello There'
		}
	},
	template: '<h2>{{ message }}</h2>'
});

const mounted = vm.mount('#app');

