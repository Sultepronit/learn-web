"use strict";

const theInput = document.querySelector("#the-input");

const temp = `
NetChromGas 1.2.2.7 17.10.2023 14:47:44 1/2
Расчет компонентного состава и параметров природного газа
по ГОСТ 31371.7-2008 , 31369-2008
Путь: C:\Program Files\NetChromWin\Chroms\Chrom1\Копия Копия Калорийность - ПИД-2ДТП новий\
№ Хроматограммы Дата Время
1 109.chr3 17.10.2023 13:24:10
2 110.chr 17.10.2023 14:09:17
Проба Проба 3
Место отбора вул. Дяченка, 21 ШРП-652 (ГРС-ТЕЦ-5)
Расчёт по ГОСТ 31371.7-2008
Результаты расчета
Название Молярная доля, %
Расширенная абс.
неопределенность.,
абс. %
Расхождение,
абс.%
Норматив
расхождения, абс.%
Кислород 0,0116 - 0,0043 0,0025
Азот 1,86 ±0,08 0,0089 0,042
Диоксид углерода 2,41 ±0,15 0,013 0,13
Метан 88,51 ±0,22 0,13 0,19
Этан 5,38 ±0,22 0,041 0,16
Пропан 1,29 ±0,08 0,062 0,052
2-Метилпропан 0,137 ±0,008 0,006 0,0062
н-Бутан 0,219 ±0,013 0,011 0,0087
2,2-Диметилпропан 0,0068 ±0,0006 0,00024 0,00052
2-Метилбутан 0,061 ±0,004 0,0043 0,0026
н-Пентан 0,054 ±0,003 0,0028 0,002
н-Гексан 0,057 ±0,004 0,0013 0,0026
Замечания:
Не удовлетворяют требованиям относительного отклонения градуировочного газа и пробы: Азот, Этан, Пропан
Расчёт по ГОСТ 31369-2008
Компоненты природного газа
Название Мольные % Объемные % Массовые %
Кислород 0,0116 0,0116 0,020
Азот 1,86 1,87 2,85
Диоксид углерода 2,41 2,40 5,8
Метан 88,51 88,58 77,52
Этан 5,38 5,35 8,8
Пропан 1,29 1,28 3,11
2-Метилпропан 0,137 0,133 0,435
н-Бутан 0,219 0,212 0,69
2,2-Диметилпропан 0,0068 0,0065 0,0268
2-Метилбутан 0,061 0,058 0,238
н-Пентан 0,054 0,051 0,213
н-Гексан 0,057 0,052 0,267
Параметр Значение
Рассчитанные параметры газа
Сходимость,
абс. ед.
Неопред.,
абс. ед.
Прилож. N
Неопред,
абс. ед.
Прилож. М
Молярная масса, г/моль 18,31712 0,02 ±0,057 -
Коэффициент сжимаемости 0,9976767 - - -
Реальный газ
Молярная теплота сгорания высшая, кДж/моль 917,81 0,92 ±2,5 ±2,0
Молярная теплота сгорания низшая, кДж/моль 829,24 0,86 ±2,3 ±1,9
Массовая теплота сгорания высшая, МДж/кг 50,11 0,05 ±0,13 -
Массовая теплота сгорания низшая, МДж/кг 45,27 0,047 ±0,12 -
Объемная теплота сгорания высшая, МДж/м3 38,24 0,038 ±0,1 ±0,085
Объемная теплота сгорания низшая, МДж/м3 34,55 0,036 ±0,094 ±0,077
Плотность относительная 0,6337 0,00068 ±0,002 -
Плотность, кг/м3 0,7632 0,00082 ±0,0023 ±0,0047
Число Воббе высшее, МДж/м3 48,04 0,055 ±0,15 -
Число Воббе низшее, МДж/м3 43,41 0,051 ±0,14 -
Объемная теплота сгорания высшая, ккал/м3 9134,23 9,2 ±25 -
NetChromGas 1.2.2.7 17.10.2023 14:47:44 2/2
Объемная теплота сгорания низшая, ккал/м3 8252,75 8,5 ±23 -
Число Воббе высшее, ккал/м3 11474,59 13 ±35 -
Число Воббе низшее, ккал/м3 10367,26 12 ±32 -
Оператор: Муціківський С. Я.
`

function process() {
    console.log('Do it!');
    let text = theInput.value;
    //text = temp;
    //console.log(text);
    text = text.replace('Диоксид углерода', 'Диоксид-углерода');
    text = text.replaceAll('Объемная теплота сгорания высшая', 'higher');
    text = text.replaceAll('Объемная теплота сгорания низшая', 'lower');
    text = text.replaceAll('Число Воббе высшее', 'wobbe');

    const lines = text.split('\n');
    console.log(lines);

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
            results[19] = ['!!!', ...(valForm2(words, 2, 2))];
            continue;
        }
    }

    let nameColumns = '<table><tbody>';
    let mainColumns = '<table><tbody>';
    for(let line of results) {
        console.log(line);
        nameColumns += `<tr><td>${line[0]}</td></tr>`;
        if(line[0] === '!!!') {
            document.querySelector('.lastRow').innerHTML
                = `<span>${line[1]}</span><span>${line[2]}</span>`;
            break;
        }
        mainColumns += `<tr><td>${line[1]}</td><td>${line[2]}</td></tr>`;
    }
    nameColumns += '</tbody></table>';
    mainColumns += '</tbody></table>';
    document.querySelector('.nameTable').innerHTML = nameColumns;
    document.querySelector('.editTable').innerHTML = mainColumns;
}
process();