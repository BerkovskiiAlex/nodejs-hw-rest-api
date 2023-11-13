/** @format */

import ElasticEmail from "@elasticemail/elasticemail-client";
import "dotenv/config";

const { ELASTICEMAIL_FROM, ELASTICEMAIL_API_KEY } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTICEMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const sendEmail = async (mailInfo) => {
  const email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(mailInfo.to)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: mailInfo.html,
        }),
      ],
      Subject: mailInfo.subject,
      From: ELASTICEMAIL_FROM,
    },
  });

  try {
    await api.emailsPost(email);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error(error);
  }
};

export default sendEmail;
