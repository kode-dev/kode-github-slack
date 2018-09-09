const app = require('./app.js');
const dotenv = require('dotenv');
dotenv.load();

// https://github.com/pksunkara/octonode
// Rate limited to 5000 calls per hour
const github = require('octonode');
const organization = 'kode-dev';
const client = github.client(process.env.GITHUB_ACCESS_TOKEN);
const ghOrg = client.org(organization);

// client.get('/user', {}, function (err, status, body, headers) {
//   console.log(body); //json object
// });

// var ghme           = client.me();
// var ghuser         = client.user('pksunkara');
// var ghrepo         = client.repo('pksunkara/hub');
// var ghorg          = client.org('flatiron');
// var ghissue        = client.issue('pksunkara/hub', 37);
// var ghmilestone    = client.milestone('pksunkara/hub', 37);
// var ghlabel        = client.label('pksunkara/hub', 'todo');
// var ghpr           = client.pr('pksunkara/hub', 37);
// var ghrelease      = client.release('pksunkara/hub', 37);
// var ghgist         = client.gist();
// var ghteam         = client.team(37);
// var ghproject      = client.project('pksunkara/hub', 37);
// var ghnotification = client.notification(37);
// var ghsearch = client.search();

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
    throw new Error('An error occurred while create a repo.\n', e);
  }
  return repo[0];
};

app.get('/generate_assessment', function (req, res) {
  const name        = 'NEW TEST REPO',
        description = 'This is a test repository.',
        private     = false;

  // Create new repo
  const repo = createRepo({
    name,
    description,
    private,
  });

  // Add contents
  // Add collaborators
  // Return link

  res.send('Hello, world!');
});
