const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
  }

  const uuid = uuidv4 ();
  const utilisateur = [{
    nom: "martin",
    email : "martin.jean@gmail.com",
    password : "toto"
  }];

  exports.login = (req, res) => {
    const { login, password } = req.body;
    let pattern = /^[A-Za-z0-9]{1,20}$/;
    if (pattern.test(login) && pattern.test(password)) {
      const user = utilisateur.find(user => user.login == login && user.password == password);
      if (user) {
        const accessToken = generateAccessToken(user);
        res.status(200).send({ accessToken });
      } else {
        res.status(404).send("Le login ou le mot de passe est incorrect");
      }
    } else {
      res.status(400).send("Le login et le mot de passe doivent être alphanumériques et inférieurs à 20 caractères");
    }

  };


