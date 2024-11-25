import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;
const __dirname = import.meta.dirname;
let spotifyAccessToken = "";

app.use(express.static(__dirname + "public"));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  async (req, res) => {
    let clientId = req.body.client_id;
    let secret = req.body.secret;

    try {
      let result = await axios.post(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: secret,
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );
      spotifyAccessToken = result.data.access_token;
      res.send(spotifyAccessToken);
    } catch (error) {
      res.send("Error");
      console.error(error);
    }
  },
);

app.get("/get_accesskey", (req, res) => {
  res.json({ access_token: spotifyAccessToken });
});

app.listen(port, () => {
  console.log("server is running");
});
