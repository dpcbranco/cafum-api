const got = require('got');

/**
 * Este método captura todas as seasons disponíveis pela API, retroativamente pelo parâmetro {int}.
 * 
 * @param {int} seasonRetroNumber 
 * @returns {Dict} Retorna a lista de seasons
 */
const getSeasonsData = async(seasonRetroNumber) => {
    seasonList = {};
    seasonsRetroactive = 0
    totalSeasons = 0

    return new Promise((resolve, reject) => {
        uri = "https://ergast.com/api/f1/seasons.json"
        
        got.get(uri, {responseType: 'json'})
            .then(res => {
                seasonsData = JSON.parse(res.body) ['MRData']
                totalSeasons = seasonsData['total']
                seasonsRetroactive = totalSeasons - seasonRetroNumber

                uri = `${uri}?limit=${seasonRetroNumber}&offset=${seasonsRetroactive}`
                got.get(uri, {responseType: 'json'})

                    .then(res => {
                        seasonsData = JSON.parse(res.body) ['MRData']
                        seasonsInfo = seasonsData['SeasonTable']['Seasons']
                
                        for (i = 0; i <= seasonRetroNumber - 1; i++) {
                            seasonList[seasonsInfo[i]['Seasons']] = seasonsInfo[i]['url']
                        }
                        resolve(seasonList)
                    })
            })            
    })
}

/**
 * Captura as corridas do calendário de uma season específica.
 * 
 * @param {String} season 
 * @returns {Dict} Retorna a lista com todas corridas do calendário.
 */
const getScheduleData = async(season="current") => {
    scheduleData = {}

    return new Promise((resolve, reject) => {
        uri = `https://ergast.com/api/f1/${season}.json`

        got.get(uri, {responseType: 'json'})
            .then(res => {
                scheduleData = JSON.parse(res.body) ['MRData']['RaceTable']['Races']
                resolve(scheduleData)
            })
    })
}

/**
 * Retorna dados de todos os pilotos por season ou limitado por season e driverId.
 * 
 * @param {String} season 
 * @param {String} driver 
 * @returns {Dict} Retorna a lista com todos os pilotos da season.
 */
const getDriversData = async(season="current", driver="-1") => {   
    driversData = {}

    return new Promise((resolve, reject) => {
        uri = `http://ergast.com/api/f1/${season}/drivers.json`

        got.get(uri, {responseType: 'json'})
            .then(res => {
                if (driver == "-1"){
                    driversData = JSON.parse(res.body) ['MRData']['DriverTable']['Drivers']
                } else {
                    for (i = 0; i < JSON.parse(res.body) ['MRData']['total']; i++) {
                        driverId = JSON.parse(res.body) ['MRData']['DriverTable']['Drivers'][i]['driverId']
                        if (driverId == driver){
                            driversData = JSON.parse(res.body) ['MRData']['DriverTable']['Drivers'][i]
                            break
                        }
                    }
                }   
                resolve(driversData)
            })
    })
}

/**
 * Retorna dados de todos os construtores por season ou limitado por season e constructorId.
 * 
 * @param {String} season 
 * @returns {Dict} Retorna a lista de construtores
 */
const getConstructorsData = async(season="current", constructor="-1") => {   
    constructorsData = {}

    return new Promise((resolve, reject) => {
        uri = `http://ergast.com/api/f1/${season}/constructors.json`

        got.get(uri, {responseType: 'json'})
            .then(res => {
                if (driver == "-1"){
                    constructorsData = JSON.parse(res.body) ['MRData']['ConstructorTable']['Constructors']
                } else {
                    for (i = 0; i < JSON.parse(res.body) ['MRData']['total']; i++) {
                        constructorId = JSON.parse(res.body) ['MRData']['ConstructorTable']['Constructors'][i]['constructorId']
                        if (constructorId == constructor){
                            constructorsData = JSON.parse(res.body) ['MRData']['ConstructorTable']['Constructors'][i]
                            break
                        }
                    }
                }
                resolve(constructorsData)
            })
    })
}

/**
 * Retorna a classificação de todos os pilotos.
 * 
 * @param {String} season 
 * @returns {Dict} Retorna a lista com classificação de pilotos
 */
const getDriverStandingsData = async(season="current") => {
    driverStandingsData = {}

    return new Promise((resolve, reject) => {
        uri = `https://ergast.com/api/f1/${season}/driverStandings.json`
        
        got.get(uri, {responseType: 'json'})
            .then(res => {
                driverStandingsData = JSON.parse(res.body) ['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']
                resolve(driverStandingsData)
            })
    })
}

/**
 * Retorna a classificação de todos os construtores.
 * 
 * @param {String} season 
 * @returns {Dict} Retorna a lista da classificação de construtores
 */
const getConstructorStandingsData = async(season="current") => {
    constructorStandingsData = {}

    return new Promise((resolve, reject) => {
        uri = `https://ergast.com/api/f1/${season}/constructorStandings.json`
        
        got.get(uri, {responseType: 'json'})
            .then(res => {
                constructorStandingsData = JSON.parse(res.body) ['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings']
                resolve(constructorStandingsData)
            })
    })
}

module.exports = {
    SeasonsData              : getSeasonsData                ,
    DriversData              : getDriversData                ,
    ConstructorsData         : getConstructorsData           ,
    ScheduleData             : getScheduleData               ,
    DriverStandingsData      : getDriverStandingsData        ,
    ConstructorStandingsData : getConstructorStandingsData   
}
