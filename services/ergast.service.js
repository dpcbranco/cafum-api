/* eslint-disable */
const got = require('got');

/**
 * Este método captura todas as seasons disponíveis pela API, retroativamente pelo parâmetro {int}.
 * 
 * @param {int} seasonRetroNumber 
 * @returns {Dict} Retorna a lista de seasons
 */
const getSeasonsData = async(seasonRetroNumber) => {
    const seasonList = {};

    return new Promise((resolve) => {
        const uri = 'https://ergast.com/api/f1/seasons.json';
        
        got.get(uri, { responseType: 'json' })
            .then(res => {
                let seasonsData = JSON.parse(res.body) ['MRData'];
                const totalSeasons = seasonsData['total'];
                const seasonsRetroactive = totalSeasons - seasonRetroNumber;

                const uri = `${uri}?limit=${seasonRetroNumber}&offset=${seasonsRetroactive}`;
                got.get(uri, { responseType: 'json' })

                    .then(res => {
                        seasonsData = JSON.parse(res.body) ['MRData'];
                        const seasonsInfo = seasonsData['SeasonTable']['Seasons'];
                
                        for (let i = 0; i <= seasonRetroNumber - 1; i++) {
                            seasonList[seasonsInfo[i]['Seasons']] = seasonsInfo[i]['url'];
                        }
                        resolve(seasonList);
                    });
            });            
    });
};

/**
 * Captura as corridas do calendário de uma season específica.
 * 
 * @param {String} season 
 * @returns {Dict} Retorna a lista com todas corridas do calendário.
 */
const getScheduleData = async(season='current') => {

    return new Promise((resolve) => {
        const uri = `https://ergast.com/api/f1/${season}.json`;

        got.get(uri, { responseType: 'json' })
            .then(res => {
                resolve(JSON.parse(res.body) ['MRData']['RaceTable']['Races']);
            });
    });
};

/**
 * Retorna dados de todos os pilotos por season ou limitado por season e driverId.
 * 
 * @param {String} season 
 * @param {String} driver 
 * @returns {Dict} Retorna a lista com todos os pilotos da season.
 */
const getDriversData = async(season='current', driver='-1') => {   
    let driversData = {};

    return new Promise((resolve) => {
        const uri = `http://ergast.com/api/f1/${season}/drivers.json`;

        got.get(uri, { responseType: 'json' })
            .then(res => {
                if (driver == '-1'){
                    driversData = JSON.parse(res.body) ['MRData']['DriverTable']['Drivers'];
                } else {
                    for (let i = 0; i < JSON.parse(res.body) ['MRData']['total']; i++) {
                        const driverId = JSON.parse(res.body) ['MRData']['DriverTable']['Drivers'][i]['driverId'];
                        if (driverId == driver){
                            driversData = JSON.parse(res.body) ['MRData']['DriverTable']['Drivers'][i];
                            break;
                        }
                    }
                }   
                resolve(driversData);
            });
    });
};

/**
 * Retorna dados de todos os construtores por season ou limitado por season e constructorId.
 * 
 * @param {String} season 
 * @returns {Dict} Retorna a lista de construtores
 */
const getConstructorsData = async(season='current', constructor='-1') => {   
    let constructorsData = {};

    return new Promise((resolve) => {
        const uri = `http://ergast.com/api/f1/${season}/constructors.json`;

        got.get(uri, { responseType: 'json' })
            .then(res => {
                if (constructor == '-1'){
                    constructorsData = JSON.parse(res.body) ['MRData']['ConstructorTable']['Constructors'];
                } else {
                    for (let i = 0; i < JSON.parse(res.body) ['MRData']['total']; i++) {
                        const constructorId = JSON.parse(res.body) ['MRData']['ConstructorTable']['Constructors'][i]['constructorId'];
                        if (constructorId == constructor){
                            constructorsData = JSON.parse(res.body) ['MRData']['ConstructorTable']['Constructors'][i];
                            break;
                        }
                    }
                }
                resolve(constructorsData);
            });
    });
};

/**
 * Retorna a classificação de todos os pilotos.
 * 
 * @param {String} season 
 * @returns {Dict} Retorna a lista com classificação de pilotos
 */
const getDriverStandingsData = async(season='current') => {
    return new Promise((resolve) => {
        const uri = `https://ergast.com/api/f1/${season}/driverStandings.json`;
        
        got.get(uri, { responseType: 'json' })
            .then(res => {
                resolve(JSON.parse(res.body) ['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']);
            });
    });
};

/**
 * Retorna a classificação de todos os construtores.
 * 
 * @param {String} season 
 * @returns {Dict} Retorna a lista da classificação de construtores
 */
const getConstructorStandingsData = async(season='current') => {
    let constructorStandingsData = {};

    return new Promise((resolve) => {
        const uri = `https://ergast.com/api/f1/${season}/constructorStandings.json`;
        
        got.get(uri, { responseType: 'json' })
            .then(res => {
                constructorStandingsData = JSON.parse(res.body) ['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings'];
                resolve(constructorStandingsData);
            });
    });
}; 

/**
 * Retorna da API o resultado da última quali
 * 
 * @returns {Array} Array de lista de pilotos na ordem da quali
 */
const getLastQualiResult = async () => {
    const uri = `http://ergast.com/api/f1/current/last/qualifying.json`;
    return got.get(uri, {responseType: 'application/json'})
    .then((res) => {
        const responseBody = JSON.parse(res.body);
        if (!responseBody) return null;

        if (responseBody.MRData.RaceTable.Races.length > 0)
            return responseBody.MRData.RaceTable.Races[0].QualifyingResults;
        
        return null;

    })
}

const getLastRaceResult = async () => {
    const uri = `http://ergast.com/api/f1/current/last/results.json`;
    return got.get(uri, {responseType: 'application/json'})
    .then((res) => {
        const responseBody = JSON.parse(res.body);
        if (!responseBody) return null;

        if (responseBody.MRData.RaceTable.Races.length > 0)
            return responseBody.MRData.RaceTable.Races[0].Results;
        
        return null;

    })
}

const getLastGp = async () => {
    const uri = `http://ergast.com/api/f1/current/last.json`
    return got.get(uri, {responseType: 'application/json'})
    .then((res) => {
        const responseBody = JSON.parse(res.body);
        if (!responseBody) return null;

        if (responseBody.MRData.RaceTable)
            return responseBody.MRData.RaceTable.round;
        
        return null;

    })
}

module.exports = {
    SeasonsData              : getSeasonsData                ,
    DriversData              : getDriversData                ,
    ConstructorsData         : getConstructorsData           ,
    ScheduleData             : getScheduleData               ,
    DriverStandingsData      : getDriverStandingsData        ,
    ConstructorStandingsData : getConstructorStandingsData   ,
    getLastQualiResult                                       ,
    getLastRaceResult                                        ,
    getLastGp
};
