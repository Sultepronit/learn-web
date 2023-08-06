'use strict';

const parseHTML = (htmlString) => {
    const tags0 = htmlString.split('<');
    const tags1 = tags0.map(tag => {
        const splitted = tag.split('>');
        const details = splitted[0].split(' ');
        const contents = splitted[1];
        return {details, contents};
    });
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
            }
        }

        if(addingContent) {
            result.push(tag);
            if(tag.details[0] === '/' + tagName) {
                nested--;
                if(nested === 0) {
                    if(getAll) {
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

const getSingle = (tags, tagName, tagAttribute = null, getAll = false) => {
    const allResults = [];
    for(let tag of tags) {
        if(tag.details[0] === tagName) {
            if(tagAttribute === tag.details[1] || !tagAttribute) {
                if(getAll) {
                    allResults.push(tag);
                } else {
                    return tag;
                }
            } 
        }
    }
    return allResults;
}

const getTextContent = (tags, splitter = '') => {
    let result = '';
    for(let tag of tags) {
        if(tag.contents) result += splitter + tag.contents;
    }
    return result;
}

const stringify = (tags) => {
    let result = '';
    for(let tag of tags) {
        result += '<' + tag.details.join(' ') + '>';
        result += tag.contents;
    }
    return result;
}

module.exports = { parseHTML, getBlock, getSingle, getTextContent, stringify };