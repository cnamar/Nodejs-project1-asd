function frame1()
{
    document.getElementById("frame1").style["display"]="block";
    document.getElementById("frame2").style["display"]="none";
    document.getElementById("frame3").style["display"]="none";
}

function frame2()
{
    document.getElementById("frame1").style["display"]="none";
    document.getElementById("frame2").style["display"]="block";
    document.getElementById("frame3").style["display"]="none";
}
function frame3()
{
    document.getElementById("frame1").style["display"]="none";
    document.getElementById("frame2").style["display"]="none";
    document.getElementById("frame3").style["display"]="block";
}
