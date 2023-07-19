function Buttons({ clicked, selected }) {
    const names = ['users', 'posts', 'comments'];
    return (
        names.map(name =>
            <button
                key={name}
                className={name == selected ? 'selected' : null}
                onClick={() => clicked(name)}
            >
                {name}
            </button>
        )
    );
}

export default Buttons;