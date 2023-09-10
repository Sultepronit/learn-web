'use strict';
console.log(Vue.version);

// view model
const vm = Vue.createApp({
	data() {
		return {
			firstName: 'Stefko',
			lastName: 'Muts',
			url: 'https://google.com',
			github: 'https://github.com',
			raw_url: '<a href="https://github.com" target="_blank">GitHub</a>',
			age: 20
		};
	},
	methods: {
		fullName() {
			return this.firstName + ' ' + this.lastName;
		},
		updateLastName(event) {
			this.lastName = event.target.value;
		},
		increment() {
			this.age++;
		},
		updateWithMsg(msg, event) {
			// event.preventDefault(); // @input.prevent is used instead
			console.log(msg);
			console.log(event.target.value);
		},
		keyupEnter(event) {
			console.log(event.target.value);
		},
		ctrlClick() {
			console.log('Clicked with ctrl!');
		}
	}
}).mount('#app');