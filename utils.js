const shellExec = command => {
  if (shell.exec(command).code !== 0) {
    shell.echo('Error: Git commit failed');
    shell.exit(1);
  }
};

module.exports = function({ ghOrg }) {
  return {
    pushTestAssessmentToGit(url) {
      if (!shell.which('git')) {
        shell.echo('please install git.');
        shell.exit(1);
        throw new error('please install git.');
      }

      shell.cd('assessment-test');

      shellExec('git add .');
      shellExec('git commit -m "Add test assessment"');
      shellExec(`git remote add origin ${url}`);
      shellExec('git push -u origin master');

      shell.rm('-rf', '.git');
    },

    async createRepo({ name, description, private=true }) {
      try {
        return await ghOrg.repoAsync({
          name,
          description,
          private,
        });
      }
      catch(e) {
        throw new Error('An error occurred while creating a repo.');
      }
    },

    async forkRepo(repo) {
      const owner   = process.env.GITHUB_ORGANIZATION,
            path    = `/repos/${owner}/${repo}/forks`,
            options = {
              organization: process.env.GITHUB_ORGANIZATION,
            };

      try {
        return await client.postAsync(path, options);
      }
      catch(e) {
        throw new Error(`An error occurred while forking ${repo}`);
      }
    },
  };
};
