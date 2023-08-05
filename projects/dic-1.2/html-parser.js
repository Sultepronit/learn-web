'use strict';
console.log('hello there!');
const parseHTML = (htmlString) => {
    const tags0 = htmlString.split('<');
    //console.log(tags0);
    const tags1 = tags0.map(tag => {
        const splitted = tag.split('>');
        const details = splitted[0].split(' ');
        //const tagName = 
        const contents = splitted[1];
        return {details, contents};
    });
    console.log(tags1);
    return tags1;
}

const getBlock = (tags, tagName, tagAttribute = null, getAll = false, stopTag = null) => {
    let result = [];
    const allResults = [];
    let addingContent = false;
    let nested = 0;
    for(let tag of tags) {
        if(tag.details[0] === stopTag) break;

        if(tag.details[0] === tagName) {
            if(!addingContent) {
                if(tagAttribute === tag.details[1] || !tagAttribute) {
                    addingContent = true;
                    nested++;
                }
            } else {
                nested++;
                //console.log(nested);
            }
        }

        if(addingContent) {
            result.push(tag);
            if(tag.details[0] === '/' + tagName) {
                nested--;
                //console.log(nested);
                //if(nested === 0) break;
                if(nested === 0) {
                    if(getAll) {
                        //console.log(result);
                        allResults.push(result);
                        result = [];
                    } else {
                        break;
                    }
                }
            }
        }
    }
    return getAll ? allResults : result;
}

const getTextContent = (tags, splitter = '') => {
    let result = '';
    for(let tag of tags) {
        if(tag.contents) result += splitter + tag.contents;
    }
    return result;
}

const stringifyTags = (tags) => {
    let result = '';
    for(let tag of tags) {
        result += '<' + tag.details.join(' ') + '>';
        result += tag.contents;
    }
    return result;
}

/* const parsedPage = parseHTML(html);
const examplesOuter = getBlock(parsedPage, 'div', 'id="tmem_first_examples"');
console.log(examplesOuter);
const examples = getBlock(examplesOuter, 'div', 'class="px-1');
console.log(examples);
const results = stringifyTags(examples)
console.log(results);

const div = document.querySelector('div');
div.innerHTML = results; */

/* const parsedPage = parseHTML(lingvoPage);
const article = getBlock(parsedPage, 'div', 'class="_1mexQ');
//const article = getBlock(parsedPage, 'div');
console.log(article);

const results = stringifyTags(article)
console.log(results);

const div = document.querySelector('div');
div.innerHTML = results; */