require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

app.use("/assets", express.static("assets"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const { data } = await octokit.request("GET /orgs/{org}", {
      org: process.env.ORGANIZATION_NAME,
    });

    return res.render("index", data);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

app.post("/send-invitation", async (req, res) => {
  const { userName } = req.body;
  if (!login) res.sendStatus(400);

  try {
    // https://docs.github.com/en/rest/reference/users
    // await octokit.request("GET /users/{username}", {
    //   username: "username",
    // });

    // https://docs.github.com/en/rest/reference/orgs#create-an-organization-invitation
    const { data } = await octokit.request("POST /orgs/{org}/invitations", {
      org: process.env.ORGANIZATION_NAME,
      userName,
    });
    console.log(`[${new Date(Date.now()).toISOString()}]`, "Invite email: ", email);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(error.status).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server start to listening at ${port}`);
});
