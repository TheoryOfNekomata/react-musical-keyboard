for branch in $(cat package.json | jq .publishing | jq -r keys[]) ; do
  git checkout $branch

  rawRepository=$(cat package.json | jq -r .publishing.$branch.repository)
  repository=$(cat package.json | jq -r .publishing.$branch.repository)
  currentRepository=$(cat package.json | jq -r .repository)

  if [ $repository = $currentRepository ]; then
    echo "$( jq --arg repository "$repository" '.repository = $repository' package.json )" > package.json
    echo "Publishing to primary repository: $repository"
    git push
  elif [ $rawRepository = 'null' ]; then
    echo "$branch has no repository"
  else
    echo "$branch is a mirror"
    echo "$( jq --arg repository "$repository" '.repository = $repository' package.json )" > package.json
    echo "Publishing to mirror repository: $repository"
    git commit -am "Publish to $branch"
    git push --mirror $repository
  fi

  registry=$(cat package.json | jq -r .publishing.$branch.publishConfig.registry)
  echo $registry
  npm publish --registry=$registry
done
