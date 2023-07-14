function Display({ colorName, hexValue }) {
    let fontColor = 'black';
    
    if(hexValue && hexValue.length > 1) {
        const num = parseInt(hexValue.slice(1), 16);
        console.log(num);
        const s7 = hexValue.split('');
        console.log(s7);
        const rgb = [s7[1], s7[3], s7[5]]
        console.log(rgb);
        let number = 0;
        for(let s of rgb) {
            number += parseInt(s, 16);
        }
        console.log(number);
        if(number < 17) fontColor = 'white';
        console.log(fontColor);
    }
    
    
    return (
        <div
            className="display"
            style={{
                background: colorName
            }}
        >
            <p style={{color: fontColor}}>{colorName ? colorName : 'Empty Value'}</p>
            <p style={{color: fontColor}}>{hexValue}</p>
        </div>
    )
}

export default Display;