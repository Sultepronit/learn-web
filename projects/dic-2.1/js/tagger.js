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
                    //console.log(tag.details[0], tag.details[1]);
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
                //console.log(tag.details[0]);
                nested--;
                if(nested === 0) {
                    if(getAll) {
                        allResults.push(result);
                        //console.log(result);
                        result = [];
                        addingContent = false;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    return getAll ? allResults : result;
}

const getDifferentBlocks = (tags, wantedTags = {name: 'div', attribute: null}) => {
    let result = [];
    const allResults = [];
    let addingContent = false;
    let nested = 0;
    let tagName = '';
    //let tagAttribute = '';
    for(let tag of tags) {
        //if(tag.details[0] === stopTag) break;

        /* if(tag.details[0] === tagName) {
            if(!addingContent) {
                if(tagAttribute === tag.details[1] || !tagAttribute) {
                    //console.log(tag.details[0], tag.details[1]);
                    addingContent = true;
                    nested++;
                }
            } else {
                nested++;
            }
        } */

        if(!addingContent) {
            for(const wantedTag of wantedTags) {
                if(wantedTag.name === tag.details[0]) {
                    if(wantedTag.attribute === tag.details[1] || !wantedTag.attribute) {
                        // we found one of the wanted tags!
                        tagName = wantedTag.name;
                        //tagAttribute = wantedTag.attribute;
                        addingContent = true;
                        //nested++;
                        // console.log(nested);
                        // console.log(tag.details);
                        break;
                    }
                }
            }
        }

        if(addingContent) {
            result.push(tag);

            // open tag
            if(tagName === tag.details[0]) {
                nested++;
                // console.log(tag.details[0], nested);
                // console.log(tag.details);
            }
            // close tag
            if('/' + tagName === tag.details[0]) {
                //console.log(tag.details[0]);
                nested--;
                // console.log(tag.details[0], nested);
                if(nested === 0) {
                    allResults.push(result);
                    result = [];
                    addingContent = false;
                }
            }
        }
    }
    return allResults;
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
        //console.log(tag);
        try {
            result += '<' + tag.details.join(' ') + '>';
        } catch (error) {
            //console.log(tag);
            console.error('Maybe you are trying to stringify array of blocks! Do it with each one!');
        }
        
        result += tag.contents;
    }
    return result;
}

export default { parseHTML, getBlock, getDifferentBlocks, getSingle, getTextContent, stringify };