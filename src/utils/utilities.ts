export const camelCaseToString = (s:string):string => {
    if(s===null) return ''

    let string:string = s.split(/(?=[A-Z])/).map(function(p) {
        return p.charAt(0).toUpperCase() + p.slice(1);
    }).join(' ');

    if(string.length===3){
        string = string.toUpperCase();
    }

    return string
}