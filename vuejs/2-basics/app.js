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
			age: 20,
			num: 1,
			text: ''
		};
	},
	methods: {
		/* methods called from page directly
			will run at every change on the page */
		fullName() {
			console.log('fullName() is called');
			return this.firstName + ' ' + this.lastName;
		},
		updateLastName(event) {
			this.lastName = event.target.value;
		},
		increment() {
			console.log('incremen() is called');
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
	},
	computed: {
		/* methods will run at change of any of variables in it's body */
		nameAge() {
			console.log('nameAge() is called');
			return this.firstName + ', ' + this.age;
		}
	}
}).mount('#app');