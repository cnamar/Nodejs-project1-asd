function showconfirm2(id)
{
    document.getElementById("deleteconfirm2").style["display"]="block";
    document.confirm2.action="/admin/theatre/"+id;
}
function unshow2(){
    document.getElementById("deleteconfirm2").style["display"]="none";
}
function showconfirm3(id)
{
    document.getElementById("deleteconfirm3").style["display"]="block";
    document.confirm3.action="/admin/movie/"+id;
}
function unshow2(){
    document.getElementById("deleteconfirm3").style["display"]="none";
}
function showinsert1(){
    document.getElementById("inserttheatre").style["display"]="block";
    document.inserttheatreform1.action="/admin/insert/theatre";
}
function unshowinsert1(){
    document.getElementById("inserttheatre").style["display"]="none";
}
function showinsert2(){
    document.getElementById("insertmovie").style["display"]="block";
    document.insertmovieform1.action="/admin/insert/movie";
}
function unshowinsert2(){
    document.getElementById("insertmovie").style["display"]="none";
}