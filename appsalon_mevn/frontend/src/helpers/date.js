import { parse, formatISO } from 'date-fns'


export function convertToISO(strDate){
    const newDate = parse(strDate, 'dd/MM/yyyy', new Date())
    // console.log(newDate)
    // console.log(formatISO(newDate))
    return formatISO(newDate)
}