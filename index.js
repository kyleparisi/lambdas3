const AWS = require("aws-sdk");
const Git = require("nodegit");
const aws4 = require("aws4");

const chain = new AWS.CredentialProviderChain();

chain.resolve(function(err, credentials) {
  if (err) throw err;

  //https://git-codecommit.us-east-1.amazonaws.com/v1/repos/myappcode
  const signer = new aws4.RequestSigner({
    service: "codecommit",
    host: `git-codecommit.${AWS_REGION}.amazonaws.com`,
    method: "GIT",
    path: `v1/repos/${REPO_NAME}`
  }, credentials);
  const username = credentials.accessKeyId;
  const password = signer.getDateTime() + "Z" + signer.signature();

  Git.Clone.clone(
    `https://${username}:${password}@git-codecommit.${AWS_REGION}.amazonaws.com/v1/repos/${REPO_NAME}`,
    "./tmp"
  ).catch(function(err) {
    console.log(err);
  });
});
