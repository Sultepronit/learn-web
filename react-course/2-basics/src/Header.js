// we can use "function Header(props) {"
// in that case to get title use props.title
// but we using here destructuring
function Header({ title }) {
    const h1Style = {
        fontStyle: 'italic',
        fontSize: '1.5em'
    };

    return (
        <header style={{
            backgroundColor: 'blue',
            color: 'white'
        }}>
            <h1 style={h1Style}>{title}</h1>
        </header>
    )
} 

// works in case we don't receive title 
Header.defaultProps = {
    title: 'default!'
}

export default Header;
