# Refdata
Generic reference data service

## Runnig as a docker container
1. Clone this repository:
```
git clone git@github.com:Navarik/refdata.git
```
2. Clone your reference data repository or get the reference data objects from some other location on the file system:
```
git clone git@github.com:Navarik/reference-data-objects.git
or
cp -r /mnt/shared/reference-data-objects reference-data-objects
```
3. Copy reference data into the working directory:
```
cp -r ./reference-data/schema ./schema
cp -r ./reference-data/data ./data
```
4. Build docker container
```
docker build .
```

## Runnig in development (standalone) mode
1. Clone this repository:
```
git clone git@github.com:Navarik/refdata.git
```
2. Clone your reference data repository or get the reference data objects from some other location on the file system:
```
git clone git@github.com:Navarik/reference-data-objects.git
or
cp -r /mnt/shared/reference-data-objects reference-data-objects
```
3. Setup environment variables (or create a .env file)
```
cd refdata

export SERVICE_PORT=3101
export NODE_ENV=dev
export SCHEMA_LOCATION=../reference-data-objects
export DATA_LOCATION=../reference-data-objects/data
```
4. Install dependencies
```
npm i
```
5. Run service
```
npm run standalone
```



