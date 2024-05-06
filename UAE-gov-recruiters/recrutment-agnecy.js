const fs = require("fs");
const nodemailer = require("nodemailer");

// Read the file
fs.readFile("no-list-1.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the data by lines
  let lines = data.split("\n").filter((line) => line.trim() !== "" && line.trim() !== "1");
//   lines = data.split("\n").filter((line) => line.trim() !== "1");

  console.log("lines", lines);
  // Initialize an array to store full names and emails
  let contacts = [];

  // Iterate through each line
  let fullnameCount = 0;
  for (let i = 0; i < lines.length; i++) {
    // Extract full name
    const fullName = lines[fullnameCount].trim();

    // Check if there are enough lines remaining to read email
    // Ensure email is not empty
    const potentialEmail = lines[i].trim();

    // Ensure email is not empty and meets criteria
    if (potentialEmail && /\S+@\S+\.\S+/.test(potentialEmail)) {
      const existingContact = contacts.find(
        (contact) => contact.fullName === fullName
      );
      if (!existingContact) {
        const companyName = lines[i - 1].trim();
        // Add full name and email to the contacts array
        contacts.push({
          fullName,
          email: potentialEmail,
          company: companyName,
        });
      }
      fullnameCount = i + 1;
    }
  }

  // Print the contacts array
    console.log(contacts);
  //   contacts = [{ email: "hisec4ever@gmail.com", fullName: "Abdeljalil Naceur" }];

  // Create a Nodemailer transporter using SMTP transport
  let transporter = nodemailer.createTransport({
    host: "send.one.com",
    port: 465,
    auth: {
      user: "contact@naceur-abdeljalil.com", // your gmail address
      pass: "1", // your gmail password
    },
  });

  // Function to send email with delay
  const sendEmailWithDelay = (mailOptions, delay, contact) => {
    setTimeout(() => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId + " ------ ", contact);
      });
    }, delay);
  };

  // Construct email message and send with delay
  contacts.forEach((contact, index) => {
    let mailOptions = {
      from: "contact@naceur-abdeljalil.com", // sender address
      to: contact.email, // recipient
      subject:
        "Application for a full-stack web and mobile developer or technical project manager position", // Subject line
      text: `
Hello ${contact.fullName.split(" ")[0]},

I hope this message finds you well and that your day is going smoothly.

I'm reaching out to inquire if you are currently seeking an experienced web or mobile developer. Having recently opened up to opportunities in Abu Dhabi, I am a professional in web and mobile development, holding a master's degree from École 42 Paris.

I would be thrilled to discuss further to explore opportunities and see how I could contribute.

Please don't hesitate to reach out if you would like more details or to schedule a discussion.

Looking forward to your response,

Best regards,

---
Abdeljalil Naceur
Email: contact@naceur-abdeljalil.com
Mobile: +971544110246
Website: naceur-abdeljalil.com`, // plain text body
    };

    const delay = index * 30000; // 30 seconds delay for each email
    sendEmailWithDelay(mailOptions, delay, contact);
  });
});
