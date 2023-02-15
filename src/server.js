import express from "express";
import morgan from "morgan";
import path from "path";

const __dirname = path.resolve();
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extends: false }));
app.use(express.static(path.join(__dirname, "src/public")));
console.log(path.join(__dirname, "src/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/jugar", (req, res) => {
  const numerosUsuario = req.query.numeros.split(",");
  const numerosGanadores = [];

  while (numerosGanadores.length < 3) {
    const numero = Math.round(Math.random() * 100) + 1;
    if (!numerosGanadores.includes(numero)) {
      numerosGanadores.push(numero);
    }
  }

  const aciertos = numerosUsuario.filter((numero) =>
    numerosGanadores.includes(parseInt(numero))
  ).length;

  res.send(
    `<h1>Final</h1> <h2>Los números ganadores son: ${numerosGanadores.join(
      ","
    )}</h2><h2>Tu resultado es: ${aciertos} aciertos ${aciertos !== 1 ? " " : ""
    } de 3 numeros</h2>`
  );
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
