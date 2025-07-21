@echo off
echo Creating minimal static site for deployment...

if not exist out (
  mkdir out
)

echo Creating index.html...
echo ^<!DOCTYPE html^>^<html^>^<head^>^<title^>Denarii^</title^>^<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"^>^</script^>^<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"^>^</script^>^</head^>^<body^>^<div id="root"^>Loading...^</div^>^<script^>document.addEventListener('DOMContentLoaded', function() { alert('Site is deployed! Replace with your actual build.'); });^</script^>^</body^>^</html^> > out\index.html

echo Deploying to Firebase hosting...
call firebase deploy --only hosting

echo Manual deployment complete!
echo Now you can replace the placeholder with your actual build when it's ready.