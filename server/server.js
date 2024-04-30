const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({
    apps: [
      { number: 1, application: "facebook", password: "jskdlfjsd" },
      { number: 2, application: "twitter", password: "gdfgh3234sf" },
      { number: 3, application: "tiktok", password: "dsfkg@#34jk" },
      { number: 4, application: "sample", password: "asdgjsafjksd" },
      { number: 5, application: "netsuite", password: "samplepass" },
    ],
  });
});

app.listen(5000, () => console.log("Server started on port 5000"));
