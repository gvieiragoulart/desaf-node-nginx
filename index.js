const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')


app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)

    const sql = `INSERT INTO people(name) values('Gabriel')`
    connection.query(sql)

    connection.query('SELECT * FROM people', function (error, results, fields) {
        if (error) {
          console.log(error);
          connection.end();
          return res.status(500).send('Erro ao executar a consulta.');
        }

        connection.end();
        res.send('<h1>Full Cycle Rocks!</h1> <br> <h2>Lista de nomes cadastrados no banco de dados:</h2> <br>' + results.map((item) => item.name).join('<br>'));
    });
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})