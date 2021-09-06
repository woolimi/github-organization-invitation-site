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

const getIdByUsername = async (userName) => {
  try {
    // https://docs.github.com/en/rest/reference/users
    const { data } = await octokit.request("GET /users/{username}", {
      accept: "application/vnd.github.v3+json",
      username: userName,
    });
    return data.id;
  } catch (error) {
    throw { status: error.status, message: "Username doesn't exist" };
  }
};

const sendInvitation = async (org, invitee_id) => {
  try {
    // https://docs.github.com/en/rest/reference/users
    const { data } = await octokit.request("POST /orgs/{org}/invitations", {
      accept: "application/vnd.github.v3+json",
      org,
      invitee_id,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw { status: error.status, message: "Fail to send invitation" };
  }
};

app.post("/send-invitation", async (req, res) => {
  const { userName } = req.body;
  try {
    const invitee_id = await getIdByUsername(userName);
    const { id, created_at, role, login } = await sendInvitation(process.env.ORGANIZATION_NAME, invitee_id);
    console.log(`[${created_at}] invitation(${id}) - invitee: ${login} as ${role}`);
    return res.status(201).json("Successfully sent the invitation.");
  } catch (error) {
    return res.status(error.status).json(error.message);
  }

  // https://docs.github.com/en/rest/reference/orgs#create-an-organization-invitation
  //   const { data } = await octokit.request("POST /orgs/{org}/invitations", {
  //     org: process.env.ORGANIZATION_NAME,
  //     userName,
  //   });
  //   return res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Server start to listening at http://localhost:${port}`);
});
