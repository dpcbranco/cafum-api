const got = require('got');

function getSeasonsData(seasonRetroNumber) {

    (async () => {
        seasonList = {};
        uri = "https://ergast.com/api/f1/seasons"

        await got.get(uri, {responseType: 'json'})
            .then(res => {
                seasonsData = JSON.parse(res.body) ['MRData']
                totalSeasons = seasonsData ['total']
                seasonsRetroactive = totalSeasons - seasonRetroNumber

            })

            got.get(uri + '?limit=' + seasonRetroNumber + '&offset=' + seasonsRetroactive, {responseType: 'json'})
            .then(res => {
                seasonsData2 = JSON.parse(res.body) ['MRData']
                seasonsInfo = seasonsData2 ['SeasonTable'] ['Seasons']
        
                for (i = 0; i <= seasonRetroNumber - 1; i++) {
                    seasonList[seasonsInfo[i] ['season']] = seasonsInfo[i] ['url']
                }
                return seasonList
            })
            .catch(err => {
                console.log('Error: ', err.message);
        });
    })();
}


function getDriversData(date="current") {
    (async () => {        
        uri = "http://ergast.com/api/f1/" + date + "/drivers.json"

        await got.get(uri, {responseType: 'json'})
            .then(res => {
                driversData = JSON.parse(res.body) ['MRData']['DriverTable']['Drivers']

            })
            return driversData
    }) ();
}


function getConstructorsData(date="current") {
    (async () => {        
        uri = "http://ergast.com/api/f1/" + date + "/constructors.json"

        await got.get(uri, {responseType: 'json'})
            .then(res => {
                driversData = JSON.parse(res.body) ['MRData']['ConstructorTable']['Constructors']

            })
            return driversData
    }) ();
}


function getScheduleData(date="current") {
    (async () => {        
        uri = "https://ergast.com/api/f1/" + date + ".json"

        await got.get(uri, {responseType: 'json'})
            .then(res => {
                scheduleData = JSON.parse(res.body) ['MRData']['RaceTable']['Races']

            })
            return scheduleData
    }) ();
}


function getDriverStandingsData(date="current") {
    (async () => {        
        uri = "https://ergast.com/api/f1/" + date + "/driverStandings.json"

        await got.get(uri, {responseType: 'json'})
            .then(res => {
                driverStandingsData = JSON.parse(res.body) ['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']

            })
            return driverStandingsData
    }) ();
}


function getConstructorStandingsData(date="current") {
    (async () => {        
        uri = "https://ergast.com/api/f1/" + date + "/constructorStandings.json"

        await got.get(uri, {responseType: 'json'})
            .then(res => {
                ConstructorStandingsData = JSON.parse(res.body) ['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings']

            })
            return ConstructorStandingsData
    }) ();
}


exports.seasons = function(seasonRetroNumber) {
    getSeasonsData(seasonRetroNumber);
}

exports.drivers = function(date) {
    getDriversData(date)
}

exports.constructors = function(date) {
    getDriversData(date)
}

exports.schedule = function(date) {
    getScheduleData(date)
}

exports.driverStandings = function(date) {
    getDriverStandingsData(date)
}

exports.constructorStandings = function(date) {
    getConstructorStandingsData(date)
}