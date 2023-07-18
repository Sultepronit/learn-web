function Buttons({ clicked }) {
    const names = ['users', 'posts', 'comments'];
    return (
        names.map(name =>
            <button
            key={name}
            onClick={() => clicked(name)}
            >
                {name}
            </button>
        )
    );
}

export default Buttons;