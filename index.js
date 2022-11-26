const express = require("express");
const app = express();
const PORT = 5001;

app.use(express.json());

app.post("/send", (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      body: req.body.body,
      token: req.body.token,
    };

    if (req.body.data) {
      payload.data = {
        data: JSON.stringify(req.body.data),
      };
    }
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT ", PORT);
});
