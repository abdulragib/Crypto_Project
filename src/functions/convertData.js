export const convertDate = (date) => {
    var myDate = new Date(date);
    return myDate.getDate()+"/"+(myDate.getMonth()+1);
}