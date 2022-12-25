const controllerDebts = {};

controllerDebts.list =  (req, res) => {
    req.getConnection((error, conn) =>{
        conn.query('SELECT * FROM deuda', (err, rows) =>{
            if (err) {
                res.json(err);
            } else {
                //console.log(rows);
                res.render('debts', {
                    data: rows
                })
            }
        })
    })
};

controllerDebts.save = (req, res) => {
    const data = req.body;
    console.log(data);
    const fecha = req.params.fecha_Venta;
    const idU = req.params.id_Usuario;
    console.log(fecha, idU);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO deuda set ?', [data], (err, rows) =>{
            if (err) {
                console.log(err);
            } else {
                console.log(rows);
            }
            res.redirect('/debts');
        })
        //conn.query('INSERT INTO venta set ?', [data])
    })
}

controllerDebts.edit = (req, res) =>{
    const {id} = req.params;
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM deuda WHERE id_Deuda = ?', [id], (err, rows) =>{
            
            res.render('debts_edit', {
                data: rows[0]
            });
        });
    });
}

controllerDebts.update = (req, res) =>{
    const {id} = req.params;
    const newData = req.body;
    req.getConnection((err, conn) =>{
        conn.query('UPDATE deuda set ? WHERE id_Deuda = ?', [newData, id], (err, rows) =>{
            res.redirect('/debts');
        })
    });
}

controllerDebts.delete = (req, res) => {
    req.getConnection((err, conn) => {
        const {id} = req.params;
        conn.query('DELETE FROM deuda WHERE id_Deuda = ?', [id], (err, rows) =>{
            res.redirect('/debts');
        })
    })
}

module.exports = controllerDebts;