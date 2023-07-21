import TableRow from './TableRow';

function Table({ items }) {
    console.log(items);
    console.log('Table!');
    return (
        <table>
            <tbody>
                {
                    items.map( item => (<TableRow item={item} />) )
                }
            </tbody>
        </table>
    );
}

export default Table;