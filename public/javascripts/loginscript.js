function showconfirm(id1,id2,id3)
{
    document.getElementById("deleteconfirm").style["display"]="block";
    document.confirm.action="/login/"+id1+"/"+id2+"/"+id3;
}
function unshow(){
    document.getElementById("deleteconfirm").style["display"]="none";
}
function showinsert1(id){
    document.getElementById("insertscreen").style["display"]="block";
    document.insertscreenform1.action="/login/insert/screen/id/"+id;
}
function unshowinsert1(){
    document.getElementById("insertscreen").style["display"]="none";
}
function showconfirm2(id1,id2,id3)
{
    document.getElementById("deleteconfirm4").style["display"]="block";
    document.confirm4.action="/login/delete/screen/"+id1+"/"+id2+"/"+id3;
}
function unshow(){
    document.getElementById("deleteconfirm4").style["display"]="none";
}
function showinsert2(id){
    document.getElementById("insertshows").style["display"]="block";
    document.insertshowsform1.action="/login/insert/show/id/"+id;
}
function unshowinsert2(){
    document.getElementById("insertshows").style["display"]="none";
}