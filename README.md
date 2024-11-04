# Reproduction -- Demo project with SL preload.js

## How to Build and run with SL

Steps to build project and add SL (LOCAL reproduction, assumes you have node + docker installed)

1. Add your token to the root of the project.

2. Build App

```
npm install
npm run build
```

3. Configure with slnodejs

```bash
npx slnodejs config --tokenfile ./sltoken.txt --appname "testing-insights/tryout-node-docker" --branch "SLDEMO" --build "001"
```

4. Scan with slnodejs

```bash
npx slnodejs scan --tokenfile "sltoken.txt" --buildsessionidfile "buildSessionId" --workspacepath "./dist" --scm "none" --excludedpaths "" --es6Modules --babylonPlugins "decorators-legacy"
```

5. Build Docker Image

*NOTE: Give the docker image the same version tag as the build number you assigned in the sl config command. This will allow you to keep the images you build aligned to the ones you scan*

```bash
docker build -t try-node-dock:001 .
```

6. Run Docker Container

```bash
docker run -d -p 8080:8080 try-node-dock:001
```

*NOTE: If you don't want to watch logs in Docker desktop, remove the `-d` from the command so you can watch the container logs in your terminal*

7. Start test execution

```bash
npx slnodejs start --tokenfile sltoken.txt --buildsessionidfile buildSessionId --labid local-testing --teststage functional
```

8. Run healthcheck

Make GET request to localhost:8080/node/health

```bash
curl http://localhost:8080/node/health
```

9. End Test Execution

*NOTE: watch docker container logs, don't end the test execution until after you see "Footprint packet submitted successfully"*

```bash
npx slnodejs end --tokenfile sltoken.txt --buildsessionidfile buildSessionId --labid local-testing  
```




## How to use this repo
<!-- 
@TODO: Fill out to describe different branches demonstrating different reproductions -->

The main branch on this repo should not be used to share reproduction info. If you have a reproduction to share with the team, create a new branch (include your ticket number in the branch name!). In the new branch, edit the `README_reproductions.md` to explain the reproduction case you have created. See the branch [`projectRoot-requirement--SLDEV-19446`](https://github.com/svg-sl/reproduction_preloadjs/blob/projectRoot-requirement--SLDEV-19446/README_reproduction.md) for an example of this. 