# Continuous Integration / Deployment

Messaging appears in: #alerts-my-brandwatch

Any commits that contain the string [ci skip] will be ignored. This allows us to commit without triggering a new version.

## Prerequisites
If you want to make changes to the pipeline file you will need to set up the following. Changes to existing tasks will be picked automatically.

- Fly cli, download from the [Brandwatch concourse](https://concourse.bwcom.io) instance to get the correct version. Ensure fly is set on your path.

- Download [StackExchange blackbox](https://github.com/StackExchange/blackbox), and follow the instructions to [indoctrinate yourself on the system](https://github.com/StackExchange/blackbox#how-to-indoctrinate-a-new-user-into-the-system).

## Making Changes
Once you have made the changes to the pipeline.yml file simply run `./ci/deploy.sh`, approve the changes if you are happy and the pipeline will up date.
