export const proxy = 'https://blooming-coast-08475.herokuapp.com/'
export const heroku_host = 'https://starbuy-api.herokuapp.com/'
export const railway_host = 'https://starbuy.up.railway.app/'
export var host = heroku_host
export const proxied_host = proxy + host

export function checkBackupHost() {
    fetch(proxy + heroku_host, {
        method: 'GET', headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response => {
        if(response.status == 503) {
            host = railway_host
        }
    })
}

export const default_headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*'
}

export const authorized_headers = (token: string) => {
    return {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token
    }
}