    
var nameFirstLetter=(item)=>{
    var a=item.firstName.split(" ");
    var firstLetter=""
    for(var arr of a){
        if(arr==="")continue;
        firstLetter=firstLetter+arr[0]
    }
    return firstLetter
}

export default nameFirstLetter;