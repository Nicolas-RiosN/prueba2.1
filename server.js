const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Configura CORS
app.use(cors()); // Permite todas las solicitudes de cualquier origen

app.use(bodyParser.json());

// Endpoint para login
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  const dbPath = path.join(__dirname, 'db.json');
  let db;

  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch (err) {
    return res.status(500).json({ error: 'Error al leer la base de datos' });
  }

  const user = db.login.find(u => u.usuario === usuario && u.password === password);

  if (user) {
    res.json({ token: 'mock-token' });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

// Endpoint para obtener alumnos
app.get('/alumnos', (req, res) => {
  const dbPath = path.join(__dirname, 'db.json');
  let db;

  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch (err) {
    return res.status(500).json({ error: 'Error al leer la base de datos' });
  }

  // Supongamos que tienes una sección 'alumnos' en tu archivo db.json
  res.json(db.alumnos || []);
});

// Endpoint para eliminar un alumno
app.delete('/alumnos/:index', (req, res) => {
  const { index } = req.params;
  const dbPath = path.join(__dirname, 'db.json');
  let db;

  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch (err) {
    return res.status(500).json({ error: 'Error al leer la base de datos' });
  }

  if (db.alumnos[index]) {
    db.alumnos.splice(index, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
    res.status(200).json({ message: 'Alumno eliminado con éxito' });
  } else {
    res.status(404).json({ error: 'Alumno no encontrado' });
  }
});

// Endpoint para actualizar un alumno
app.put('/alumnos/:index', (req, res) => {
  const { index } = req.params;
  const updatedAlumno = req.body;
  const dbPath = path.join(__dirname, 'db.json');
  let db;

  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch (err) {
    return res.status(500).json({ error: 'Error al leer la base de datos' });
  }

  if (db.alumnos[index]) {
    db.alumnos[index] = updatedAlumno;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
    res.status(200).json({ message: 'Alumno actualizado con éxito' });
  } else {
    res.status(404).json({ error: 'Alumno no encontrado' });
  }
});

app.put('/alumnos/:index', (req, res) => {
  const { index } = req.params;
  const updatedAlumno = req.body;
  const dbPath = path.join(__dirname, 'db.json');
  let db;

  if (!updatedAlumno || !updatedAlumno.nombre || !updatedAlumno.apellido || !updatedAlumno.curso) {
    return res.status(400).json({ error: 'Datos de alumno incompletos' });
  }

  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch (err) {
    return res.status(500).json({ error: 'Error al leer la base de datos' });
  }

  if (db.alumnos[index]) {
    db.alumnos[index] = updatedAlumno;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
    res.status(200).json({ message: 'Alumno actualizado con éxito' });
  } else {
    res.status(404).json({ error: 'Alumno no encontrado' });
  }
});

// Endpoint para agregar un alumno
app.post('/alumnos', (req, res) => {
  const newAlumno = req.body;
  const dbPath = path.join(__dirname, 'db.json');
  let db;

  if (!newAlumno || !newAlumno.usuario || !newAlumno.nombre || !newAlumno.apellido || !newAlumno.curso) {
    return res.status(400).json({ error: 'Datos de alumno incompletos' });
  }

  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch (err) {
    return res.status(500).json({ error: 'Error al leer la base de datos' });
  }

  db.alumnos.push(newAlumno);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
  res.status(201).json({ message: 'Alumno agregado con éxito' });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});