function TableRow({ item }) {
    const columns = Object.keys(item);
    return (
        <tr key={item.id}>
            {columns.map(cell => 
                (<td>{JSON.stringify(item[cell])}</td>)
            )}
        </tr>
    );
}

export default TableRow;