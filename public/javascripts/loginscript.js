function showconfirm(id1,id2,id3)
{
    document.getElementById("deleteconfirm").style["display"]="block";
    document.confirm.action="/login/"+id1+"/"+id2+"/"+id3;
}
function unshow(){
    document.getElementById("deleteconfrim").style["display"]="none";
}