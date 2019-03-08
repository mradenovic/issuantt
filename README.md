# Issuantt

It's not an ant with an issue! It's an easy to use Gantt chart for GitLab and GithHub (and possibly Bitbucket) issues.

## Project setup

The project was created with [vue-cli 3](https://cli.vuejs.org/guide/) and requires [node 8](https://nodejs.org/en/) or higher. To setup dev environment run the following commands:

```bash
# clone the repository
git clone https://gitlab.com/issuantt/issuantt.git

# cd into repository folder
cd issuantt

# optional if you want to run the dev environment
# in docker container
docker run --name=issuantt -it -p 8080:8080 --rm -w /issuantt -v $(pwd):/issuantt node:10 /bin/bash
```

After this, the following commands are available:

```bash
# Install dependencies
npm install

# Compile and hot-reload for development
npm run serve

# Compile and minifie for production
npm run build

# Run your tests
npm run test

# Lint and fixes files
npm run lint

# Run your end-to-end tests
npm run test:e2e

# Run your unit tests
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
