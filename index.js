const express = require("express");
const firebaseAdmin = require("./firebaseAdmin");
const app = express();
const PORT = 5001;

app.use(express.json());

app.post("/send", async (req, res) => {
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

    const response = await firebaseAdmin.sendNotification(payload);

    res.status(200).json({
      message: "success",
      success: true,
      data: {
        fcmResponse: response,
      },
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT ", PORT);
});
