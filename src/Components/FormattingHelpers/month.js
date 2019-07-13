    
function dateModifier(created){
    var date=created.substring(8, 10);
    var month=created.substring(5,7);
    switch(month){
        case "01":
        month="JANUARY";break;
        case "02":
            month="FEBRUARY";break;
        case "03":
            month="MARCH";break;
        case "04":
            month="APRIL";break;
        case "05":
            month="MAY";break;
        case "06":
            month="JUNE";break;
        case "07":
            month="JULY";break;
        case "08":
            month="AUGUST";break;
        case "09":
            month="SEPTEMBER";break;
        case "10":
        month="OCTOBER";break; 
        case "11":
        month="NOVEMBER";break;
        case "12":
        default:
        month="DECEMBER";break;
    }
    return {date,month}
}

export default dateModifier;