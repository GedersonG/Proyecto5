const controllerSales = {};

controllerSales.list =  (req, res) => {
    req.getConnection((error, conn) =>{
        conn.query('SELECT * FROM venta', (err, rows) =>{
            if (err) {
                res.json(err);
            } else {
                //console.log(rows);
                res.render('sales', {
                    data: rows
                })
            }
        })
    })
};

controllerSales.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO venta set ?', [data], (err, rows) =>{
            res.redirect('/sales');
        })
    })
}

controllerSales.edit = (req, res) =>{
    const {id} = req.params;
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM venta WHERE id_Venta = ?', [id], (err, rows) =>{
            
            res.render('sales_edit', {
                data: rows[0]
            });
        });
    });
}

controllerSales.update = (req, res) =>{
    const {id} = req.params;
    const newData = req.body;
    req.getConnection((err, conn) =>{
        conn.query('UPDATE venta set ? WHERE id_Venta = ?', [newData, id], (err, rows) =>{
            res.redirect('/sales');
        })
    });
}

controllerSales.delete = (req, res) => {
    req.getConnection((err, conn) => {
        const {id} = req.params;
        conn.query('DELETE FROM venta WHERE id_Venta = ?', [id], (err, rows) =>{
            res.redirect('/sales');
        })
    })
}

module.exports = controllerSales;