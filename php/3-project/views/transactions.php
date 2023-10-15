<!DOCTYPE html>
<html>
    <head>
        <title>formatted</title>
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
                text-align: center;
            }

            table tr th, table tr td {
                padding: 5px;
                border: 1px #eee solid;
            }

            tfoot tr th, tfoot tr td {
                font-size: 20px;
            }

            tfoot tr th {
                text-align: right;
            }

            .green {
                color: green;
            }

            .red {
                color: red;
            }
        </style>
    </head>
    <body>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Check #</th>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <!-- YOUR CODE -->
                <?php foreach($parsedTransactions as $row):?>
                    <tr>
                        <td>
                            <?= formatDate($row['time']) ?>
                        </td>
                        <td>
                            <?= $row['check'] ?>
                        </td>
                        <td>
                            <?= $row['description'] ?>
                        </td>
                        <td>
                            <?= formatAndStyleAmount($row['amount']) ?>
                        </td>
                    </tr>
                <?php endforeach ?>
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="3">Total Income:</th>
                    <td><?= formatAmount($total['income']) ?></td>
                </tr>
                <tr>
                    <th colspan="3">Total Expense:</th>
                    <td><?= formatAmount($total['expense']) ?></td>
                </tr>
                <tr>
                    <th colspan="3">Net Total:</th>
                    <td><?= formatAmount($total['net']) ?></td>
                </tr>
            </tfoot>
        </table>
    </body>
</html>
