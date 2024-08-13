import { parse, formatISO, parseISO, format } from 'date-fns'
import es from 'date-fns/locale/es'

export function convertToISO(strDate){
    const newDate = parse(strDate, 'dd/MM/yyyy', new Date())
    // console.log(newDate)
    // console.log(formatISO(newDate))
    return formatISO(newDate)
}

export function displayDate(date){
    const newDate = parseISO(date)
    const formatedDate = format(newDate,'PPPP',{locale:es})
    return formatedDate
}


export function converToDDMMYYYY(isoDate){
    const newDate = new Date(isoDate)
    const formatedDate = format(newDate, 'dd/MM/yyyy')
    return formatedDate
}