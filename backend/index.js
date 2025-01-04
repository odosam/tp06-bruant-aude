const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());

require("./routes/utilisateur.routes")(app);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
