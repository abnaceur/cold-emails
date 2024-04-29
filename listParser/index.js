const fs = require("fs");

// Read the file
fs.readFile("list-1.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the data by lines
  const lines = data.split("\n").filter((line) => line.trim() !== "");

  console.log("lines", lines);
  // Initialize an array to store full names and emails
  const contacts = [];

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
      // Add full name and email to the contacts array
      contacts.push({ fullName, email: potentialEmail });
      fullnameCount = i + 1;
    }
  }

  // Print the contacts array
  console.log(contacts);

  // Optionally, you can do further processing here, like saving the array to a file or database
});
