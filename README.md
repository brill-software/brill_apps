# brill_apps

Change on upstream changes branch.

Applications files for use with the Brill CMS.

global - contains the site.json file which specifies the default applicaiton.
brill_cms - the Brill CMS Applications.
MediaLirbary - a space for keeping images etc.
Storybook - examples of various components.

## Forking the Repository

Create a fork of brill_apps to hold the base apps plus your own apps called say brill_apps_fork.

### Making changes to the brill_cms and Storybook apps

To make changes to any of the base apps (brill_cms and the Storybook) first create a new branch off of develop in your 
brill_apps_fork repository called upstream_changes.

Make the change in the branch.


#### Find the commit Id to cherry pick

Look at the log (Right click on the Workspace folder and select Commit Log).
Copy the Commit Id of the change. e.g. 80cf5d0

**OR**

Get a command line window and change directory to the workspace directory.

```
%cd Projects/brill_workspace/<username>
%git log

commit 80cf5d0e15e24528e84e984b4dba37e11cdb0bd3 (HEAD -> upstream_changes, origin/upstream_changes)
    brill_apps README update.
```

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

You can call the remote something else other than upstream.

#### Create a new branch off of upstream/develop

See if the branch upstream_dev already exists and switch to it.

```
% git branch
*  develop
  master
  upstream_changes
% git checkout upstream_changes
```

If the branch upstream_changes doesn't exist, create it.

```
% create branch upstream_dev upstream/develop
Branch 'upstream_dev' set up to track remote branch 'develop' from 'upstream'.
```

#### Cherry pick changes into branch

```
git cherry-pick <commit id>
```

DONT'USE CHERRYPICK

#### Push change to upstream/develop

```
git push upstream upstream_dev:develop
```

```
git checkout -b upstream_develop upstream/develop
Branch 'upstream_develop' set up to track remote branch 'develop' from 'upstream'.
Switched to a new branch 'upstream_develop'
```