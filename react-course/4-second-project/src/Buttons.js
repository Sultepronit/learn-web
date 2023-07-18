function Buttons({ clicked }) {
    const names = ['users', 'posts', 'comments'];
    let i = 0;
    return (
        names.map(name =>
            <button
            key={i++}
            onClick={() => clicked(name)}
            >
                {name}
            </button>
        )
    );
}

export default Buttons;