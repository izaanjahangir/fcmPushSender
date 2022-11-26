const admin = require("firebase-admin");

const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseAdmin = {};

// const notificationPayload = {
//   title: ``,
//   body: "",
//   data: {
//
//   },
//   token: "",
// };
firebaseAdmin.sendNotification = async function (payload) {
  try {
    const message = {
      android: {
        notification: {
          sound: "default",
        },
      },
      apns: {
        payload: {
          aps: {
            sound: "default",
          },
        },
      },
      notification: {
        title: payload.title,
        body: payload.body,
      },
      token: payload.token,
      data: payload.data || {},
    };

    const response = await admin.messaging().send(message);
    console.log("Notification success ==>", response);
    return { success: true, response };
  } catch (e) {
    console.log("Notification error ==>", e);
    return { success: false, error: e };
  }
};

firebaseAdmin.sendMulticastNotification = function (payload) {
  const message = {
    notification: {
      title: payload.title,
      body: payload.body,
    },
    tokens: payload.tokens,
    data: payload.data || {},
  };

  return admin.messaging().sendMulticast(message);
};

module.exports = firebaseAdmin;
