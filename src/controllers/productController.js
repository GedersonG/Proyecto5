const controllerProducts = {};

controllerProducts.list =  (req, res) => {
    req.getConnection((error, conn) =>{
        conn.query('SELECT * FROM producto', (err, rows) =>{
            if (err) {
                res.json(err);
            } else {
                //console.log(rows);
                res.render('products', {
                    data: rows
                })
            }
        })
    })
};

controllerProducts.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO producto set ?', [data], (err, rows) =>{
            res.redirect('/products');
        })
    })
}

controllerProducts.edit = (req, res) =>{
    const {id} = req.params;
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM producto WHERE id_producto = ?', [id], (err, rows) =>{
            
            res.render('products_edit', {
                data: rows[0]
            });
        });
    });
}

controllerProducts.update = (req, res) =>{
    const {id} = req.params;
    const newData = req.body;
    console.log("Neuvo data " + newData);
    req.getConnection((err, conn) =>{
        conn.query('UPDATE producto set ? WHERE id_producto = ?', [newData, id], (err, rows) =>{
            res.redirect('/products');
        })
    });
}

controllerProducts.delete = (req, res) => {
    req.getConnection((err, conn) => {
        const {id} = req.params;
        conn.query('DELETE FROM producto WHERE id_producto = ?', [id], (err, rows) =>{
            res.redirect('/products');
        })
    })
}

module.exports = controllerProducts;