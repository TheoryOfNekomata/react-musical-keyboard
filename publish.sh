defaultBranch=master

for branch in $(cat package.json | jq .publishing | jq -r keys[]) ; do
  git checkout $branch

  rawRepository=$(cat package.json | jq -r .publishing.$branch.repository)
  repository=$(cat package.json | jq -r .publishing.$branch.repository)
  defaultRepository=$(cat package.json | jq -r .publishing.$defaultBranch.repository)

  if [ $repository = $defaultRepository ]; then
    echo "$( jq --arg repository "$repository" '.repository = $repository' package.json )" > package.json
    echo "Publishing to primary repository: $repository"
    git push
  elif [ $rawRepository != 'null' ]; then
    echo "$branch is a mirror"
    echo "$( jq --arg repository "$repository" '.repository = $repository' package.json )" > package.json
    echo "Publishing to mirror repository: $repository"
    git commit -am "Publish to $branch"
    git push --mirror $repository
  fi

  rawName=$(cat package.json | jq .publishing.$branch.name)
  if [ $rawName != 'null' ]; then
    name=$(cat package.json | jq -r .publishing.$branch.name)
    echo "$( jq --arg name "$name" '.name = $name' package.json )" > package.json
  fi
  registry=$(cat package.json | jq -r .publishing.$branch.publishConfig.registry)
  echo $registry
  npm publish --registry=$registry
done