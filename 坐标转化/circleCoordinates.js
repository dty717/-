var p={x:1.2,y:-3,z:3};//watching_point
function setWatchingPoint(x,y,z){
    p.x=x;
    p.y=y;
    p.z=z;
}

var l={x:-1,y:1,z:-1};//watching_direction

var k={x:0,y:0,z:1};//watching_angle

var scale=3;

function circleCoordinates(x,y,z){
    var l_2=(l.x*l.x+l.y*l.y+l.z*l.z);
    var k_2=(k.x*k.x+k.y*k.y+k.z*k.z);
    var pm_2=(x-p.x)*(x-p.x)+(y-p.y)*(y-p.y)+(z-p.z)*(z-p.z);
    var cosB_2=((x-p.x)*l.x+(y-p.y)*l.y+(z-p.z)*l.z);
    cosB_2*=cosB_2;
    cosB_2/=(pm_2)*l_2;
    var _p_2=scale*(1/cosB_2-1);
    if(_p_2==0){
        return {x:0,y:0};
    }
    var tem_pm_cosB_l=Math.sqrt(cosB_2*pm_2/l_2);
    var cos_c=(x-p.x-tem_pm_cosB_l*l.x)*k.x+(y-p.y-tem_pm_cosB_l*l.y)*k.y+(z-p.z-tem_pm_cosB_l*l.z)*k.z;
    cos_c/=Math.sqrt(k_2*((x-p.x-tem_pm_cosB_l*l.x)*(x-p.x-tem_pm_cosB_l*l.x)+
            (y-p.y-tem_pm_cosB_l*l.y)*(y-p.y-tem_pm_cosB_l*l.y)+(z-p.z-tem_pm_cosB_l*l.z)*(z-p.z-tem_pm_cosB_l*l.z)));
    var _tem=l.x*((y-p.y-tem_pm_cosB_l*l.y)*k.z-(z-p.z-tem_pm_cosB_l*l.z)*k.y)-
        l.y*((x-p.x-tem_pm_cosB_l*l.x)*k.z-(z-p.z-tem_pm_cosB_l*l.z)*k.x)+
        l.z*((x-p.x-tem_pm_cosB_l*l.x)*k.y-(y-p.y-tem_pm_cosB_l*l.y)*k.x);
    if(_tem<0){
        return {x:Math.sqrt(_p_2)*cos_c,y:Math.sqrt(_p_2*(1-cos_c*cos_c))};    
    }else{
        return {x:Math.sqrt(_p_2)*cos_c,y:-Math.sqrt(_p_2*(1-cos_c*cos_c))};    
    }
}
console.log(circleCoordinates(2,0,0));
console.log(getString(circleCoordinates(0,10,0))+"\n"+getString(circleCoordinates(0,0,0))
    +"\n"+getString(circleCoordinates(4,0,0))+"\n\n"+getString(circleCoordinates(0,0,0))
    +"\n"+getString(circleCoordinates(0,0,4)));
function getString(obj){
    return (obj.x+10)+" "+(obj.y+10);
}
