const createColoredFurigana = (block) => {
    //console.log(block);
    let re = '<div class="furi-block">';
        let kanaBlock = '';
        for(let char of block.furi) {
            //console.log(char);
            if(char.type != 'kana') continue;
            const kana = char.hiragana ? char.h : char.k;
            if(char.rule) {
                kanaBlock += `<span class="rule">${kana}</span>`;
                continue;
            }
            if(char.reduct) {
                kanaBlock += `<span class="reduct">${kana}</span>`;
                continue;
            }
            if(char.exept) {
                kanaBlock += `<span class="exept">${kana}</span>`;
                continue;
            }
            kanaBlock += kana;
        }
        //console.log(kanaBlock);
    if(block.kanjiBlock) {
        re += `<div class="furig">${kanaBlock}</div>`;
        re += `<div class="char-block">${block.word}</div>`;
    } else {
        if(kanaBlock) {
            re += `<div class="char-block">${kanaBlock}</div>`;
        } else {
            re += `<div class="char-block">${block.word}</div>`;
        }
        
    }
    /* if(block.furi[0].exept) {
        re += `<div class="char-block exept">${block.word[0]}</div>`;
    } else {
        re += `<div class="char-block">${block.word}</div>`;
    } */
    
    /* for(let char of word) {
    
    } */
    re += '</div>';
    return re;
}