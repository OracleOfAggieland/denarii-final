@echo off
echo Building Next.js application...
call npm run build
echo Checking if out directory exists...
if not exist out (
  echo ERROR: out directory was not created by the build process.
  exit /b 1
)
echo Deploying to Firebase hosting...
call firebase deploy --only hosting
echo Deployment complete!