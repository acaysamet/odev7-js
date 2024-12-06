const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // MySQL kullanıcı adınızı buraya yazın
    password: 'sifreniz', // MySQL şifrenizi buraya yazın
    database: 'okul'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.use(express.json());

// CREATE
app.post('/ogrenci', (req, res) => {
    const { ad, Soyad, BolumId } = req.body;
    const sql = 'INSERT INTO Ogrenci (ad, Soyad, BolumId) VALUES (?, ?, ?)';
    db.query(sql, [ad, Soyad, BolumId], (err, result) => {
        if (err) throw err;
        res.send('Öğrenci eklendi');
    });
});

// READ
app.get('/ogrenci/:id', (req, res) => {
    const sql = 'SELECT * FROM Ogrenci WHERE ogrenciID = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// UPDATE
app.put('/ogrenci/:id', (req, res) => {
    const { ad, Soyad, BolumId } = req.body;
    const sql = 'UPDATE Ogrenci SET ad = ?, Soyad = ?, BolumId = ? WHERE ogrenciID = ?';
    db.query(sql, [ad, Soyad, BolumId, req.params.id], (err, result) => {
        if (err) throw err;
        res.send('Öğrenci güncellendi');
    });
});

// DELETE
app.delete('/ogrenci/:id', (req, res) => {
    const sql = 'DELETE FROM Ogrenci WHERE ogrenciID = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send('Öğrenci silindi');
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
