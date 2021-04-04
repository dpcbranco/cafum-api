const got = require('got');


const getSeasonsData = async(seasonRetroNumber) => {
    seasonList = {};
    

    return new Promise((resolve, reject) => {

        uri = "https://ergast.com/api/f1/seasons.json"
        seasonsRetroactive = 0

        got.get(uri, {responseType: 'json'})
            .then(res => {
                seasonsData = JSON.parse(res.body) ['MRData']
                totalSeasons = seasonsData ['total']
                seasonsRetroactive = totalSeasons - seasonRetroNumber

            })

        got.get(uri + '?limit=' + seasonRetroNumber + '&offset=' + seasonsRetroactive, {responseType: 'json'})
            .then(res => {
                seasonsData = JSON.parse(res.body) ['MRData']
                seasonsInfo = seasonsData2 ['SeasonTable'] ['Seasons']
        
                for (i = 0; i <= seasonRetroNumber - 1; i++) {
                    seasonList[seasonsInfo[i] ['season']] = seasonsInfo[i] ['url']
                }
                resolve(seasonList)
            })
            
    })
}


const getScheduleData = async(date="current") => {
    scheduleData = {}

    return new Promise((resolve, reject) => {
        uri = "https://ergast.com/api/f1/" + date + ".json"

        got.get(uri, {responseType: 'json'})
            .then(res => {
                scheduleData = JSON.parse(res.body) ['MRData']['RaceTable']['Races']
                resolve(scheduleData)
            })

    })
}


const getDriversData = async(date="current") => {   
    driversData = {}

    return new Promise((resolve, reject) => {
        uri = "http://ergast.com/api/f1/" + date + "/drivers.json"

        got.get(uri, {responseType: 'json'})
            .then(res => {
                driversData = JSON.parse(res.body) ['MRData']['DriverTable']['Drivers']
                resolve(driversData)
            })
    })
}


const getConstructorsData = async(date="current") => {   
    constructorsData = {}

    return new Promise((resolve, reject) => {
        uri = "http://ergast.com/api/f1/" + date + "/constructors.json"

        got.get(uri, {responseType: 'json'})
            .then(res => {
                constructorsData = JSON.parse(res.body) ['MRData']['ConstructorTable']['Constructors']
                resolve(constructorsData)
            })
    })
}


const getDriverStandingsData = async(date="current") => {
    driverStandingsData = {}

    return new Promise((resolve, reject) => {
        uri = "https://ergast.com/api/f1/" + date + "/driverStandings.json"
        
        got.get(uri, {responseType: 'json'})
            .then(res => {
                driverStandingsData = JSON.parse(res.body) ['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']
                resolve(driverStandingsData)
            })
    })
}


const getConstructorStandingsData = async(date="current") => {
    constructorStandingsData = {}

    return new Promise((resolve, reject) => {
        uri = "https://ergast.com/api/f1/" + date + "/constructorStandings.json"
        
        got.get(uri, {responseType: 'json'})
            .then(res => {
                constructorStandingsData = JSON.parse(res.body) ['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings']
                resolve(constructorStandingsData)
            })
    })
}


const getQualifyingData = async(date="current") => {
    qualifyingData = {}
    gpIndexesData = {}
    totalDrivers = 0

    scheduleData = await getScheduleData()
    //console.log(scheduleData[0])

    for (i = 0; i < scheduleData.length; i++) {
        gpIndexesData[i+1] = scheduleData[i]['raceName'];
    }

    return new Promise((resolve, reject) => {

        for(var key in gpIndexesData) {
            uri = "http://ergast.com/api/f1/current/" + key + "/qualifying.json"

            got.get(uri, {responseType: 'json'})
                .then(res => {

                    totalDrivers = JSON.parse(res.body) ['MRData']['total']
                        
                    if (totalDrivers > 0) {
                        //console.log(totalDrivers)

                        for (i = 0; i <= totalDrivers - 1; i++) {
                            qualifyingData[JSON.parse(res.body) ['MRData']['RaceTable']['Races'][0]['QualifyingResults'][i]['Driver']['driverId']] = JSON.parse(res.body) ['MRData']['RaceTable']['Races'][0]['QualifyingResults'][i]
                        }
                        resolve(qualifyingData)
                    }
                        
                }) 
        }
    })
}

//console.log(await getScheduleData())
//console.log(await getSeasonsData(5))
//console.log(await getDriversData())
//console.log(await getConstructorsData())
//console.log(await getDriverStandingsData())
//console.log(await getConstructorStandingsData())

getQualifyingData()

module.exports = {
    SeasonsData              : getSeasonsData                ,
    DriversData              : getDriversData                ,
    ConstructorsData         : getConstructorsData           ,
    ScheduleData             : getScheduleData               ,
    DriverStandingsData      : getDriverStandingsData        ,
    ConstructorStandingsData : getConstructorStandingsData   ,
    QualifyingData           : getQualifyingData
}