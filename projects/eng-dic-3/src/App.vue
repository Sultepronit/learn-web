<script setup>
import { ref } from 'vue';
import getArticle from '@/services/getArticle.js'

const query = ref('apple');
const e2uArticle = ref('');
const glosbeArticle = ref('');
const selectedArticle = ref('e2u');

async function request(input) {
    query.value = input;
    console.log(query);
    
    selectedArticle.value = 'e2u';
    // const art = await getArticle('e2u', query.value);
    // const art = await getArticle('glosbe', query.value);
    // console.log(art);
    await getArticle('e2u', query.value).then(article => {
        e2uArticle.value = article;
    });
    await getArticle('glosbe', query.value).then(article => {
        glosbeArticle.value = article;
    });
}

function selected(dic) {
    console.log(dic);
    selectedArticle.value = dic;
}
request(query.value);
</script>

<template>
    <header>
        <input
            type="text"
            class="the-input"
            :value="query"
            @change="request($event.target.value)"
        >
    </header>

    <main>
        <div
            class="e2u"
            :class="selectedArticle === 'e2u' ? 'selected' : 'unselected'"
            v-html="e2uArticle"
            @click="selected('e2u')"
        />
        <div
            class="glosbe"
            :class="selectedArticle === 'glosbe' ? 'selected' : 'unselected'"
            v-html="glosbeArticle"
            @click="selected('glosbe')"
        />
    </main>
</template>

<style>
.the-input {
    font-size: 2rem;
}
.selected {
    max-height: 70vh;
}
.unselected {
    max-height: calc(30vh - 4rem - 5px);
}
.e2u {
    /* max-height: 80vh; */
    overflow: auto;
    margin-bottom: 1rem;
}

table {
    width: 100%;
}

table.other {
    border-left: 3px solid red;
}

td {
    border-bottom: 2px solid;
}

.glosbe {
    overflow: auto;
}

.glosbe-source {
    text-align: right;
}
</style>
