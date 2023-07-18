function Buttons() {
    return (
        <section>
            <button 
                onClick={() => console.log('Users!')}
            >users</button>
            <button>posts</button>
            <button>comments</button>
        </section>
    );
}

export default Buttons;