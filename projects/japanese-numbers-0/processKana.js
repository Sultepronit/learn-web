const processKana = (sentence) => {
    const words = sentence.split(' ');
    console.log(words);
    const splittedWords = [];
    for(let word of words) {
        //processWord(word);
        splittedWords.push(word.split(''));
    }
    console.log(splittedWords);

    const sentenceKana = sentence.split('').map(char => {
        //console.log(char);
        if(char === ' ') return { type: 'special', value: 'space' };
        for(let kana of detailedKana) {
            if(kana.h === char) return kana;
            if(kana.k === char) return { ...kana, hiragana: false };
        }
        return { type: 'symbol', value: char };
    });
    console.log(sentenceKana);
    sentenceKana.forEach(e => console.log(e));
    //console.log(detailedKana);
    return sentenceKana;
}