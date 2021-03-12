let API_KEY = 'f428d0d3bfbf4ae8963015631405d2bf'

export function getData(lookFor) {
    let promise = new Promise((resolve, reject) => {
        fetch(`https://api.weatherbit.io/v2.0/current?&city=${lookFor}&key=${API_KEY}&include=minutely`)
            .then(res => res.json())
            .then(data => {
                let current = data.data[0]
                resolve({
                    sunrise: current.sunrise,
                    sunset: current.sunset,
                    city_name: current.city_name,
                    wind_dir: current.wind_dir,
                    wind_spd: current.wind_spd * 3.6,
                    wind_cdir_full: current.wind_cdir_full,
                    temp: current.temp,
                    weatherDesc: current.weather.description,
                    precip: current.precip
                })
            }).catch(err => {
                reject(err)
            })
    })
    return promise
}

