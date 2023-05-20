# brill_apps

Applications files for use with the Brill CMS.

global - contains the site.json file which specifies the default applicaiton.
brill_cms - the Brill CMS Applications.
MediaLirbary - a space for keeping images etc.
Storybook - examples of various components.

## Forking the Repository

Create a fork of brill_apps to hold the base apps plus your own apps called say brill_apps_fork.

### Making changes to the brill_cms and Storybook apps

To make changes to any of the base apps (brill_cms and the Storybook) first create a new branch off of develop brill_apps
called upstream_develop.

#### Add a second remote called upstream

See if a remote called upstream already exists: 

```
% git remote -v
origin	git@bitbucket.org:brill-software/brill_apps_fork.git (fetch)
origin	git@bitbucket.org:brill-software/brill_apps_fork.git (push)
upstream	git@bitbucket.org:brill-software/brill_apps.git (fetch)
upstream	git@bitbucket.org:brill-software/brill_apps.git (push)
```
If upstream doesn't exist, add it.

```
% git add remote upstream git@bitbucket.org:brill-software/brill_apps.git
```

#### Checkout the upstream_changes branch

```
git checkout -b upstream_changes upstream/upstream_changes
```

Not that the local bracnh name must be the same as the branch name on the remote.

#### Commit the changes

Make the change in the branch upstream_changes.

Commit the changes. They will be pushed to the remote called **upstream**.

#### Merge the changes into the develop branch of remote <b>origin</b>.

Switch to the develop branch and merge in branch upstream_changes.

If there are merge conflicts, first close and re-open the files that are conflicted.
