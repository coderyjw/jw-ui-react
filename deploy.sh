rm -rf storybook-static &&
npm run build-storybook &&
cd storybook-static &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M master &&
git remote add origin git@github.com:coderyjw/jw-ui-react-website.git &&
git push -f -u origin master 