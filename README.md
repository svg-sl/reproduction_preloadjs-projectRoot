# Reproduction -- Demo project with SL preload.js

Steps to recreate
1. Build app
npm install
npm run build
2. Config & Scan

npx slnodejs scan --tokenfile "sltoken.txt" --buildsessionidfile "buildSessionId" --workspacepath "./dist" --scm "none" --excludedpaths "" --es6Modules --proxy $HTTP_PROXY --babylonPlugins "decorators-legacy"


3. Build and run image
docker build -t try-node-dock .
docker run -d -p 8080:8080 try-node-dock

4. Start test execution
npx slnodejs start --tokenfile sltoken.txt --buildsessionidfile buildSessionId --labid local-testing --teststage "<STAGE-NAME>"
5. Hit service
Make GET request to localhost:8080/node/health
6. Wait for "Footprint packet submitted successfully" log to appear in console
7. End test execution
npx slnodejs end --tokenfile sltoken.txt --buildsessionidfile buildSessionId --labid local-testing
8. Wait for results, coverage should be 0%
9. In the docker file, uncomment fields under "Using slnodejs run" comment, repeat steps 3-8 with new stage name
10. Wait for results, coverage should be ~50%

