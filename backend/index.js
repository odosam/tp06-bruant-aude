const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

const users = []; // À remplacer plus tard par une base de données

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = users.find((user) => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'Email déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashedPassword });
    res.json({ message: 'Utilisateur enregistré avec succès.' });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });
    res.json({ message: 'Connexion réussie.', token });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
