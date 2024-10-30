<!-- Reproduction instructions and notes here -->


## PROBLEM BEING REPRODUCED:

When using preload.js, if SL_projectRoot is not set, the container starts and quickly dies. 
SL_projectRoot should be an optional param that defaults to the cwd if not set.


## REPRODUCTION STEPS & TS NOTES:

### build 001 -- SL_projectRoot is defined

In the Dockerfile, `ENV SL_projectRoot=''` is commented out. 

```
<!-- config -->
npx slnodejs config --tokenfile ./sltoken.txt --appname "testing-insights/tryout-node-docker" --branch "DEMO-19446" --build "001"
```

```
<!-- scan -->
npx slnodejs scan --tokenfile "sltoken.txt" --buildsessionidfile "buildSessionId" --workspacepath "./dist" --scm "none" --excludedpaths "" --es6Modules --babylonPlugins "decorators-legacy"
```

```
<!-- build -->
docker build -t try-node-dock:001 .
```

```
<!-- run -->
docker run -d -p 8080:8080 try-node-dock:001
```

*RESULTS: container starts and dies very quickly*



### build 002 -- SL_projectRoot is set to ''

In the Dockerfile, uncomment `ENV SL_projectRoot=''` . 

```
<!-- config -->
npx slnodejs config --tokenfile ./sltoken.txt --appname "testing-insights/tryout-node-docker" --branch "DEMO-19446" --build "002"
```

```
<!-- scan -->
npx slnodejs scan --tokenfile "sltoken.txt" --buildsessionidfile "buildSessionId" --workspacepath "./dist" --scm "none" --excludedpaths "" --es6Modules --babylonPlugins "decorators-legacy"
```

```
<!-- build -->
docker build -t try-node-dock:002 .
```

```
<!-- run -->
docker run -d -p 8080:8080 try-node-dock:002
```

*RESULTS: container starts and dies very quickly*


---

Testing fix released in canary version (slnodejs@6.1.936)

### build 003 -- Do not set `SL_projectRoot`

In the Dockerfile, comment out `ENV SL_projectRoot=''` 

```
<!-- Cleanup and build the project -->
npm install
npm run build
```


```
<!-- config -->
npx slnodejs config --tokenfile ./sltoken.txt --appname "testing-insights/tryout-node-docker" --branch "DEMO-19446" --build "003"
```

```
<!-- scan -->
npx slnodejs scan --tokenfile "sltoken.txt" --buildsessionidfile "buildSessionId" --workspacepath "./dist" --scm "none" --excludedpaths "" --es6Modules --babylonPlugins "decorators-legacy"
```

```
<!-- build -->
docker build -t try-node-dock:003 .
```

```
<!-- run -->
docker run -d -p 8080:8080 try-node-dock:003
```

*RESULTS: SUCCESS - container runs as expected!*

