const app = require('./app.js');
const dotenv = require('dotenv');
dotenv.load();

// https://github.com/pksunkara/octonode
// Rate limit: 5000 calls per hour
const github = require('octonode');
const client = github.client(process.env.GITHUB_ACCESS_TOKEN);
const ghOrg = client.org(process.env.GITHUB_ORGANIZATION);

async function createRepo({ name, description, private=true }) {
  let repo;
  try {
    repo = await ghOrg.repoAsync({
      name,
      description,
      private,
    });
  }
  catch(e) {
    throw new Error('An error occurred while creating a repo.');
  }
  return repo;
};

async function addFiles() {

}

app.get('/generate_assessment', async function (req, res) {
  const name        = 'NEW TEST REPO',
        description = 'This is a test repository.',
        private     = false;

  let repo;
  try {
    repo = await createRepo({
      name,
      description,
      private,
    });
  }
  catch(e) {
    res
      .status(500)
      .send(e.message);
  }

  // Add files
  // Return link

  res.send('Repo was successfully created.');
});

app.put('/repos/:repoId/collaborators/:collaboratorId', async function(req, res) {
  const { repoId, collaboratorId } = req.params;

  const owner    = process.env.GITHUB_ORGANIZATION_OWNER,
        repo     = repoId,
        username = collaboratorId,
        path     = `/repos/${owner}/${repo}/collaborators/${username}`,
        options  = {
          permission: 'push',
        };

  try {
    await client.putAsync(path, options);
  }
  catch(e) {
    res
      .status(500)
      .send(`An error occurred while adding ${collaboratorId} as a collaborator to ${repoId}.`);
  }

  res.send(`${collaboratorId} was successfully added as a collaborator to ${repoId}`)
});

app.delete('/repos/:repoId/collaborators/:collaboratorId', async function(req, res) {
  const { repoId, collaboratorId } = req.params;

  const owner    = process.env.GITHUB_ORGANIZATION_OWNER,
        repo     = repoId,
        username = collaboratorId,
        path     = `/repos/${owner}/${repo}/collaborators/${username}`;

  try {
    await client.delAsync(path, {});
  }
  catch(e) {
    res
      .status(500)
      .send(`An error occurred while removing ${collaboratorId} as a collaborator to ${repoId}.`)
  }

  res.send(`${collaboratorId} was successfully removed as a collaborator to ${repoId}`)
});
