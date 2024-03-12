# brill_apps

## Summary

The **brill_apps** repository contains Web Apps that were created using the Brill CMS.

Directories:

- global - contains the site.json file which specifies the default applicaiton.
- brill_cms - the Brill CMS Application.
- MediaLibrary - a place for keeping images etc.
- Storybook - examples of various components.

An application typically has the folllowing sub-directories:

- Pages
- Database
- Icons
- Images
- Resources
- Scripts
- Themes

See the [Brill Software Developer Guide](https://www.brill.software/brill_software/developers_guide "Developers Guide") for more details.

## Configuration

The repository is automatically cloned by the Brill Server when it starts up. The location of the repository
is configured in the Brill Server `application.yml` file.

## Forking the Repository

Rather than clone the **brill_apps** repository, you might want to fork the repository, so that you can add your own applications.

## Licenses

The Brill Software Apps (including the Brill CMS) are distributed under the Brill Software Apps license. By
default, apps that you develop are your copyright with all rights reserved. You might want to add your own 
license file for your apps.

# Making changes to the brill_cms and Storybook apps

==Skip this section if you are only going to be making changes to your own apps.==

This section assumes you have *write access* to the **brill_apps** repository, that you've 
forked the **brill_apps** repository and that you have command line access to the Brill Server 
**workspace** directory.

The process involves creating a branch in your private workspace that is connected to the upstream
repository, rather than the forked repository. Updates are made on the upstream branch and then merged
into the the develop branch on the forked repository.

#### Add new remote called upstream

Use a command line prompt and change directory to to your private workspace directory:

```
% cd /Projects/brill_workspace/<Brill CMS username>
```

See if a remote called upstream already exists: 

```
% git remote -v
origin	git@bitbucket.org:brill-software/brill_apps_fork.git (fetch)
origin	git@bitbucket.org:brill-software/brill_apps_fork.git (push)
upstream	git@bitbucket.org:brill-software/brill_apps.git (fetch)
upstream	git@bitbucket.org:brill-software/brill_apps.git (push)
```
If upstream doesn't exist, add it:

```
% git remote add upstream git@bitbucket.org:brill-software/brill_apps.git
```

#### Checkout the upstream_changes branch

```
git fetch upstream
git checkout -b upstream_changes upstream/upstream_changes
```

Note that the local bracnh name **must** be the same as the branch name on the remote.

If the branch doesn't already exist in the remote, push the local branch to
remote **upstream**:

```
% git push -u upstream upstream_changes
```

#### Commit the changes

Make the change in the branch **upstream_changes** using the Brill CMS.

Commit the changes. They will be pushed to the remote **upstream**.

#### Merge the changes into the develop branch of remote <b>origin</b>.

Switch to the **develop** branch and merge in branch **upstream_changes**. Resolve any
merge conflicts.

#### Merge the changes on the **upstream_changes** branch into the **brill_apps** repository

When finished, merge the changes on the **upstream_changes** branch into the **brill_apps**
repository. You can do this from the command line as follows:

```
% cd
% git clone git@bitbucket.org:brill-software/brill_apps.git brill_apps_temp
% cd brill_apps_temp
% git fetch
% git branch

// Check available branches
% git checkout upstream_branch

// Check changes are there
% git checkout develop
% git merge upstream_changes
% git push
% cd ..
% rm -rf brill_apps_temp
```

# Recovering a deleted branch

The repository tracks and keeps everything. Should a branch be deleted, it can be recoved as follows:

```
% cd <user workspace>

// Check branch doesn't exist.
% git branch

// Find the SHA1 for the tip where you want to checkout the branch from.
% git reflog --no-abbrev
...
7a7de1bf8d8ffc5a33a04f4398186372348c9e91 HEAD@{10}: checkout: moving from my_changes to develop
60f9ab2d562149e34e19c4ca3956710640fc36ae HEAD@{11}: commit: Update field
3ae88d83a9a6b659f4b00b1ebd05675c0949b89e HEAD@{12}: commit: Remove button
...

// Checkout branch using SHA1
 git checkout -b develop 7a7de1bf8d8ffc5a33a04f4398186372348c9e91

 // Push the branch and set the remote tracking branch.
 % git push --set-upstream origin develop 

// Check the restored branch.
```
You can also use the same approach to restore a branch back to a previous commit.
