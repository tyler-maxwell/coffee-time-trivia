mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: 'locahost',
        user: 'root',
        password: 'root',
        database: 'gtbc-project-trivia'
    })
}