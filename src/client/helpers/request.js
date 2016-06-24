import querystring from 'querystring'

export function createAnimeSearchURL({ text, cats, filter, sort, order}) {

    const cleanTerm = text.replace(/\((.*)\)/i, '')
                          .replace(/ (1st|2nd|3rd|\d+th)/i, ' ')
                          .replace(/ (Season)/i, ' ')
                          .cleanString()
                          .safeParam()

    const remoteURL = 'http://www.nyaa.se/?' + querystring.stringify({
        page: 'rss',
        term: cleanTerm,
        cats: cats || '1_37', // 1_0=all 1_11=raw 1_37=english
        filter: filter || '0',
        sort: sort || '2',
        order: order || '1'
    })
    console.debug('createAnimeSearchURL:', cleanTerm)
    return remoteURL
}

export function createMovieSearchURL({ text }) {

    const cleanTerm = text.replace(/\((.*)\)/i, '')
                          .replace(/ (1st|2nd|3rd|\d+th)/i, ' ')
                          .replace(/ (Season)/i, ' ')
                          .cleanString()
                          .safeParam()

    const remoteURL = 'https://kat.cr/usearch/' + encodeURIComponent(text) + '/'
    console.debug('createMovieSearchURL:', cleanTerm)
    return remoteURL
}
