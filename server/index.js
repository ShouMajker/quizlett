const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const dbData = {
    host: 'sql7.freesqldatabase.com',
    user: 'sql7586295',
    password: 'HwRVHux94J',
    database: 'sql7586295'
}

const db = mysql.createPool({
    host: dbData.host,
    user: dbData.user,
    password: dbData.password,
    database: dbData.database
})

app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send("Server")
})

// Creating a new table, which is going to contain all words and translates
app.post('/api/createCard', (req, res) => {

    const tableName = req.body.tableName
    const query = `CREATE TABLE card_${tableName} (id int PRIMARY KEY AUTO_INCREMENT, english text, polish text);`
    
    db.query(query, (err, result) => {
        if(err) {
            console.log(err)
            return
        }
    })
})

// Getting all card tables
app.get('/api/getAllCards', (req, res) => {
    const prefix = req.query.prefix;
    const query =
        `SELECT ROW_NUMBER() OVER(PARTITION BY version) as id, TABLE_NAME as tables FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME LIKE CONCAT(?, '%')`
    db.query(query, [prefix], (err, result) => {
        if(err) {
            return
        } else {
            res.send(result);
        }
    })
})

// Delete selected card
app.post('/api/deleteCard', (req, res) => {
    const tableName = req.body.cardName
    const query = `DROP TABLE card_${tableName};`
    
    db.query(query, (err, result) => {
        if(err) {
            return
        }
    })
})

// Adding new phrases to table
app.post('/api/addNewRecord', (req, res) => {
    const tableName = req.body.tableName
    const english = req.body.english
    const polish = req.body.polish
    const favourite = req.body.favourite

    const query = `INSERT INTO ${tableName} (english, polish, favourite) VALUES(?, ?, ?);`
    
    db.query(query, [english, polish, favourite], (err, result) => {
        if(err) {
            return
        }
    })
})


app.get('/api/getAllRecords', (req, res) => {
    const tableName = req.query.selectedTable
    const query = `SELECT * FROM ${tableName};`

    db.query(query, (err, result) => {
        if(err) {
            return
        } else {
            res.send(result)
        }
    })
})


app.post('/api/updateRecord', (req, res) => {
    const tableName = req.body.newValues.tableName
    const id = req.body.newValues.id
    const english = req.body.newValues.english
    const polish = req.body.newValues.polish

    const query =  `UPDATE ${tableName}
                    SET english = ?, polish = ?
                    WHERE id = ?;`

    db.query(query, [english, polish, id], (err, result) => {
        if(err) {
            return
        }
    })
})

app.post('/api/deleteRecord', (req, res) => {
    const tableName = req.body.deleteData.tableName
    const id = req.body.deleteData.id
    const query = `DELETE FROM ${tableName} WHERE id = ?;`
    
    db.query(query, [id], (err, result) => {
        if(err) {
            return
        }
    })
})

app.post('/api/createNewGroup', (req, res) => {
    const tableName = req.body.tableName

    const query = `CREATE TABLE ${tableName} (id int PRIMARY KEY AUTO_INCREMENT, english text, polish text, favourite tinyint);`

    db.query(query, (err, response) => {
        if(err) {
            return
        }
    })
})

app.post('/api/deleteGroup', (req, res) => {
    const tableName = req.body.deletedTable
    const query = `DROP TABLE ${tableName};`

    db.query(query, (err, result) => {
        if(err) {
            return
        }
    })
})

app.post('/api/updateGroupName', (req, res) => {
    const cardName = req.body.data.cardName
    const tableName = req.body.data.tableName
    const newName = req.body.data.newName
    const newTable = `group_${cardName}_${newName}`

    const query = `RENAME TABLE ${tableName} TO ${newTable};`

    db.query(query, (err, result) => {
        if(err) {
            return
        }
    })
})

app.post('/api/changeFavourite', (req, res) => {
    const tableName = req.body.changeData.tableName
    const id = req.body.changeData.id
    const value = req.body.changeData.value

    const query = `UPDATE ${tableName} SET favourite = ? WHERE id = ?`

    db.query(query, [value, id], (err, result) => {
        if(err) {
            return
        }
    })
})


app.get('/api/getRecordsToTest', (req, res) => {
    const query = req.query.data

    db.query(query, (err, result) => {
        if(err) {
            console.log(err)
            return
        }
        else {
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log("server is running")
})