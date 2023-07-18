function List({ items }) {
    return (
        <ul>
            {
                items.map(item => 
                    (<li key={item.id}>
                        {item.contents}
                    </li>)
                )
            }
        </ul>
    )
}

export default List;