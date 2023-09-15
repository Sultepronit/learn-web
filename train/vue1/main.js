'use strict';
const vm = Vue.createApp({
    data() {
        return {
            msg: 'Hello there!',
            cards: [
                {   
                    id: 1,
                    title: 'first',
                    body: 'Our first something...',
                    accessed: 0
                },
                {   
                    id: 2,
                    title: 'second',
                    body: 'Our second something...',
                    accessed: 0
                },
                {   
                    id: 3,
                    title: 'third',
                    body: 'Our third something...',
                    accessed: 0
                },
                {   
                    id: 4,
                    title: 'fourth',
                    body: 'Our fourth something...',
                    accessed: 0
                }
            ]
        }
    },
    methods: {
        clicked(index) {
            console.log('clicked!');
            console.log(index);
            this.cards[index].accessed++;
        },
        deleteMe(index) {
            console.log('delete', index);
            this.cards.splice(index, 1);
        }
    }
}).mount('#app');