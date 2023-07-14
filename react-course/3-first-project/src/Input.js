import colorNames from 'colornames';

function Input({ colorName, setColorName, setHexValue }) {
    return (
        <input
            autoFocus    
            id="input"  
            type="text"
            placeholder="Add color name"
            value={colorName}
            onChange={e => {
                //console.log(e.target.value);
                setColorName(e.target.value);
                setHexValue(colorNames(e.target.value));
            }}
        />

    )
}

export default Input;