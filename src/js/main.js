import '../sass/main.scss';
import { getData } from './API-handle.js'

const form = document.querySelector('[data-form]')
const input = document.querySelector('[data-input]')

const currentCity = document.querySelector('[data-current-city]')
const sunrise = document.querySelector('[data-sunrise]')
const sunset = document.querySelector('[data-sunset]')
const weatherDesc = document.querySelector('[data-current-desc]')
const precip = document.querySelector('[data-current-pres]')
const currentTempH = document.querySelector('[data-current-temp]')
const currentWindSpeed = document.querySelector('[data-current-wind-speed]')
const currentWindDirectionA = document.querySelector('[data-wind-direction-arrow]')
const currentWindDirectionT = document.querySelector('[data-wind-direction-text]')

const unitToggle = document.querySelector('[data-unit-toggle]')
const unitMetric = document.querySelector('#cel')
const unitImperial = document.querySelector('#fah')

function formatDate(date) {
    return date.toLocaleDateString(undefined, {
        day: 'numeric', month: 'long'
    })
}

function formateTemp(temp) {
    if (!unitMetric.checked) {
        temp = (temp * 1.8) + 32
    }
    return Math.round(temp)
}

function formateSpeed(speed) {
    if (!unitMetric.checked) {
        speed = speed / 1.6
    }
    return Math.round(speed)
}

function upDateUnits() {
    let tempUnits = document.querySelectorAll('[data-unit-temp]')
    let speedUnits = document.querySelectorAll('[data-unit-speed]')
    tempUnits.forEach(unit => unit.innerText = unitMetric.checked ? 'C' : 'F')
    speedUnits.forEach(unit => unit.innerText = unitMetric.checked ? 'kph' : 'mph')
}

function setData(res) {
    currentCity.innerHTML = res.city_name
    weatherDesc.innerHTML = res.weatherDesc
    sunrise.innerHTML = res.sunrise
    sunset.innerHTML = res.sunset
    precip.innerHTML = res.precip
    currentTempH.innerHTML = formateTemp(res.temp)
    currentWindSpeed.innerHTML = formateSpeed(res.wind_spd)
    currentWindDirectionA.style.setProperty('--direction', `${res.wind_dir}deg`)
    currentWindDirectionT.innerHTML = res.wind_cdir_full

    upDateUnits()
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    let city = input.value
    input.value = ''
    getData(city).then(res => {
        unitToggle.addEventListener('click', () => {
            setData(res)
        })

        setData(res)
    }).catch(err => alert("Sorry, city not found"))
})

getData('rabat').then(res => {
    unitToggle.addEventListener('click', () => {
        setData(res)
    })
    setData(res)
})
unitToggle.addEventListener('click', () => {
    let status = !unitMetric.checked
    unitMetric.checked = status
    unitImperial.checked = !status
})