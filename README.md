# Refdata
Generic reference data service

## Introduction

Reference data is required where multiple systems are required to work together and automation or reporting is required. E.g. System A needs to send System B a request for services and expects a price in return. System B's API has a specific set of services available but unless System A can access the list through the API, it cannot request anything. Additionally System A may have it's own list representing these services and may request them from multiple APIs depending on which is cheapest. Mapping all the different lists together is pointless effort for the developer or System A. 

Object Orientated design leads to a situation where different systems usually model the same things over and again. It would be much simpler to use a central repository that all systems can agree to use. We have a traditional name for this, they are called Standards. The process of agreeing on and maintaining standards is needed, but until that open system is available we have create a few services that allow datasets to be shared between systems and persisted in git. 

Why Git for storage? Reference Data will change over time and multiple systems will have slight differences in their datasets. Git is the only tool able to provide the features required to manage the data between systems while still allowing the systems to evolve over time.


## Runnig as a docker container
1. Clone this repository:
```
git clone git@github.com:Navarik/refdata.git
```
2. Clone your reference data repository or get the reference data objects from some other location on the file system:
```
git clone https://github.com/TICitHub/reference-data-objects.git
or
cp -r /mnt/shared/reference-data-objects reference-data
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
git clone https://github.com/TICitHub/refdata.git
```
2. Clone your reference data repository or get the reference data objects from some other location on the file system:
```
git clone https://github.com/TICitHub/reference-data-objects.git
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



