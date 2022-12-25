const controller = {};

controller.list =  (req, res) => {
    req.getConnection((error, conn) =>{
        conn.query('SELECT * FROM usuario', (err, rows) =>{
            if (err) {
                res.json(err);
            } else {
                //console.log(rows);
                res.render('users', {
                    data: rows
                })
            }
        })
    })
};

controller.save = (req, res) => {
    const data = req.body;
    //console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO usuario set ?', [data], (err, rows) =>{
            //console.log(rows);
            res.redirect('/');
        })
    })
}

// controller.add = (req, res) =>{
//     req.getConnection((err, conn) =>{
//         conn.query('SELECT * FROM usuario', (err, rows) =>{
//             if(err){
//                 console.log(err);
//             }
//         });
//     });
// }

controller.edit = (req, res) =>{
    const {id} = req.params;
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM usuario WHERE id_Usuario = ?', [id], (err, rows) =>{
            
            res.render('users_edit', {
                data: rows[0]
            });
        });
    });
}

controller.update = (req, res) =>{
    const {id} = req.params;
    const newData = req.body;
    req.getConnection((err, conn) =>{
        conn.query('UPDATE usuario set ? WHERE id_Usuario = ?', [newData, id], (err, rows) =>{
            res.redirect('/');
        })
    });
}

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        const {id} = req.params;
        conn.query('DELETE FROM usuario WHERE id_Usuario = ?', [id], (err, rows) =>{
            res.redirect('/');
        })
    })
}

module.exports = controller;