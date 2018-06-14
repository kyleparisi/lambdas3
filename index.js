const AWS = require("aws-sdk");
const aws4 = require("aws4");
const git = require("isomorphic-git");
const fs = require("fs");
const path = require("path");

const chain = new AWS.CredentialProviderChain();

chain.resolve(async function(err, credentials) {
  if (err) throw err;

  const { AWS_REGION, REPO_NAME } = process.env;

  //https://git-codecommit.us-east-1.amazonaws.com/v1/repos/myappcode
  const signer = new aws4.RequestSigner(
    {
      service: "codecommit",
      host: `git-codecommit.${AWS_REGION}.amazonaws.com`,
      method: "GIT",
      path: `v1/repos/${REPO_NAME}`
    },
    credentials
  );
  const username = credentials.accessKeyId;
  const password = signer.getDateTime() + "Z" + signer.signature();
  const url = `https://${username}:${password}@git-codecommit.${AWS_REGION}.amazonaws.com/v1/repos/${REPO_NAME}`;
  // const url = `https://git-codecommit.${AWS_REGION}.amazonaws.com/v1/repos/${REPO_NAME}`;
  // let auth = git.utils.auth(username, password);
  // console.log(auth);
  // const url = `https://cors-buster-jfpactjnem.now.sh/github.com/isomorphic-git/isomorphic-git`;
  console.log(url);


  try {
    await git.clone({
      fs,
      dir: path.join(__dirname, "tmp"),
      url,
      ref: 'master',
      singleBranch: true,
      depth: 1,
      noGitSuffix: true
    });
  } catch (e) {
    console.log(e);
  }

});
