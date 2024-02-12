<script setup>
import { ref } from 'vue';
import getArticle from '@/services/getArticle.js'

const query = ref('');
const e2uArticle = ref('');
const glosbeArticle = ref('');
const selectedArticle = ref('e2u');
let history = [];

const theInput = ref(null);

function getHistory() {
    const json = localStorage.getItem('EngDicHistory');
    if(json) {
        history = JSON.parse(json);
        query.value = history[history.length - 1];
        request(query.value);
    }
}
getHistory();

function updateHistory() {
    if(history[history.length - 1] !== query.value) {
        history.push(query.value);
        console.log(history);
        localStorage.setItem('EngDicHistory', JSON.stringify(history));
    }
}

async function request(input) {
    query.value = input;
    // console.log(query);

    e2uArticle.value = '';
    glosbeArticle.value = '---';
    selectedArticle.value = 'e2u';

    e2uArticle.value = await getArticle('e2u', query.value);

    theInput.value.select();

    updateHistory();
}

async function getGlosbe() {
    glosbeArticle.value = await getArticle('glosbe', query.value);
}

function select(dic) {
    console.log(dic);
    selectedArticle.value = dic;

    if(dic === 'glosbe' && glosbeArticle.value === '---') {
        getGlosbe();
    }
}

</script>

<template>
    <header>
        <input
            type="text"
            ref="theInput"
            class="the-input"
            :value="query"
            @change="request($event.target.value)"
        >
        <div class="tabs">
            <p
                class="tab"
                :class="selectedArticle === 'e2u' ? 'selectedTab' : ''"
                @click="select('e2u')"
            >
                e2u
            </p>
            <p
                class="tab"
                :class="selectedArticle === 'glosbe' ? 'selectedTab' : ''"
                @click="select('glosbe')"
            >
                glosbe
            </p>
        </div>
    </header>

    <main>
        <div
            class="e2u"
            v-show="selectedArticle === 'e2u'"
            v-html="e2uArticle"
        />
        <div
            class="glosbe"
            v-show="selectedArticle === 'glosbe'"
            v-html="glosbeArticle"
        />
    </main>
</template>

<style>
.the-input {
    font-size: 2rem;
    max-width: 100%;
}
.tabs {
   display: flex; 
}
.tab {
    width: 4em;
    border: 3px solid gray;
    /* background: #dadada; */
    margin: 0.2rem;
    text-align: center;
}
.selectedTab {
    border-color: blue;
}

/* .e2u {
    overflow: auto;
    margin-bottom: 1rem;
} */

table {
    width: 100%;
}

table.other {
    border-left: 4px solid orange;
}

table.context {
    border-left: 4px solid red;
}

td {
    border-bottom: 2px solid;
}

.result_row .found {
    color: blue;
}

/* .glosbe {
    overflow: auto;
} */

.glosbe-eng {
    background: #fdfdab;
}

.glosbe-source {
    text-align: right;
    font-size: 0.7em;
    border-bottom: 2px solid;
    margin-bottom: 0.2rem;
}
</style>
