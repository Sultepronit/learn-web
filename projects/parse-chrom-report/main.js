"use strict";

let theInput = null;
document.addEventListener('DOMContentLoaded', () => {
    theInput = document.querySelector("#the-input");
    // theInput.value = '';
    setTimeout(() => {
        theInput.value = '';
    }, 10);
});

function processLast() {
    getData();
    theInput.readOnly = true;
}

function process(text) {
    text = text.replace('Диоксид углерода', 'Диоксид-углерода');
    //text = text.replaceAll('Объемная теплота сгорания высшая', 'higher');
    text = text.replace('Объемная теплота сгорания высшая', 'higher');
    text = text.replace('Объемная теплота сгорания высшая', 'higher');
    //text = text.replaceAll('Объемная теплота сгорания низшая', 'lower');
    text = text.replace('Объемная теплота сгорания низшая', 'lower');
    text = text.replace('Объемная теплота сгорания низшая', 'lower');
    //text = text.replaceAll('Число Воббе высшее', 'wobbe');
    text = text.replace('Число Воббе высшее', 'wobbe');
    text = text.replace('Число Воббе высшее', 'wobbe');

    const lines = text.split('\n');
    //console.log(lines);

    function commDot(inp) {
        return inp.replace(',', '.');
    }

    function formEr(inp) {
        return commDot(inp).replace('±', '');
    }

    function valForm(nums, r1 = 3, r2 = 3) {
        return [
            (Number( commDot(nums[1]) )).toFixed(r1),
            (Number( formEr(nums[2]) )).toFixed(r2),
        ];
    }

    function valForm2(nums, r1 = 0, r2 = 0) {
        return [
            (Number( commDot(nums[2]) )).toFixed(r1),
            (Number( formEr(nums[4]) )).toFixed(r2),
        ];
    }

    const results = [];

    let properTable = true;
    for(const line of lines) {
        const words = line.split(' ');
        //console.log(words);
        if(words[0] === 'Метан' && properTable) {
            results[0] = ['Метан', ...(valForm(words, 3 , 2))];
            continue;
        }
        if(words[0] === 'Этан' && properTable) {
            results[1] = ['Етан', ...(valForm(words, 3 , 2))];
            continue;
        }
        if(words[0] === 'Пропан' && properTable) {
            results[2] = ['Пропан', ...(valForm(words, 3 , 2))];
            continue;
        }
        if(words[0] === 'н-Бутан' && properTable) {
            results[3] = ['н-Бутан', ...(valForm(words))];
            continue;
        }
        if(words[0] === '2-Метилпропан' && properTable) {
            results[4] = ['ізо-Бутан (2-метилпропан)', ...(valForm(words))];
            continue;
        }
        if(words[0] === 'н-Пентан' && properTable) {
            results[5] = ['н-Пентан', ...(valForm(words))];
            continue;
        }
        if(words[0] === '2-Метилбутан' && properTable) {
            results[6] = ['ізо-Пентан (2-метилбутан)', ...(valForm(words))];
            continue;
        }
        if(words[0] === '2,2-Диметилпропан' && properTable) {
            results[7] = ['нео-Пентан (2,2-диметилпропан)', ...(valForm(words, 4, 4))];
            continue;
        }
        if(words[0] === 'Азот' && properTable) {
            results[9] = ['Азот', ...(valForm(words, 3, 2))];
            continue;
        }
        if(words[0] === 'Диоксид-углерода' && properTable) {
            results[10] = ['Діоксид вуглецю', ...(valForm(words, 3, 2))];
            continue;
        }
        if(words[0] === 'Кислород' && properTable) {
            results[11] = ['Кисень', ...(valForm(words, 4, 4))];
            continue;
        }
        if(words[0] === 'н-Гексан' && properTable) {
            properTable = false;
            results[8] = ['н-Гексан', ...(valForm(words))];
            continue;
        }
        if(words[0] === 'Плотность') {
            results[12] = ['Відносна густина', ...(valForm2(words, 4, 4))];
            continue;
        }
        if(words[0] === 'Плотность,') {
            results[13] = ['Абсолютна густина', ...(valForm2(words, 4, 4))];
            continue;
        }
        if(words[0] === 'lower,' && words[1] === 'ккал/м3') {
            results[14] = ['Теплота згоряння нижча', ...(valForm2(words))];
            continue;
        }
        if(words[0] === 'lower,' && words[1] === 'МДж/м3') {
            results[15] = ['--', ...(valForm2(words, 2, 3))];
            continue;
        }
        if(words[0] === 'higher,' && words[1] === 'ккал/м3') {
            results[16] = ['Теплота згоряння вища', ...(valForm2(words))];
            continue;
        }
        if(words[0] === 'higher,' && words[1] === 'МДж/м3') {
            results[17] = ['--', ...(valForm2(words, 2, 3))];
            continue;
        }
        if(words[0] === 'wobbe,' && words[1] === 'ккал/м3') {
            results[18] = ['Число Воббе, вище', ...(valForm2(words))];
            continue;
        }
        if(words[0] === 'wobbe,' && words[1] === 'МДж/м3') {
            // results[19] = ['!!!', ...(valForm2(words, 2, 2))];
            results[19] = ['--', ...(valForm2(words, 2, 2))];
            continue;
        }
    }

    let nameColumns = '<table><tbody>';
    let mainColumns = '<table><tbody>';
    for(const line of results) {
        nameColumns += `<tr><td>${line[0]}</td></tr>`;
        // if(line[0] === '!!!') {
        //     document.querySelector('.lastRow').innerHTML
        //         = `<span>${line[1]}</span><span>${line[2]}</span>`;
        //     break;
        // }
        mainColumns += `<tr><td>${line[1]}</td><td>${line[2]}</td></tr>`;
    }
    nameColumns += '</tbody></table>';
    mainColumns += '</tbody></table>';
    document.querySelector('.nameTable').innerHTML = nameColumns;
    document.querySelector('.editTable').innerHTML = mainColumns;

    const archList = [];
    for(let i = 0; i < 18; i++) {
        console.log(i);
        console.log(results[i]);
        if(i === 14) {
            archList.push( String(results[19][1]).replace('.', ',') );
            continue;
        }
        if(i === 16) continue;
        archList.push( String(results[i][1]).replace('.', ',') );
    }

    let archive = '';
    for(const item of archList) {
        archive += `<tr><td>${item}</td></tr>`;
    }
    document.querySelector('#archive-tbody').innerHTML = archive;
}
