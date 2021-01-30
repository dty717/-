var A,B,C,D;
var bridges=["b0","b1","b2","b3","b4","b5","b6"];

desNow="B";
bridgesPassed=[];
desPassed=[];

index=0;
b=getBridges(desNow)[index];
desNext=getDesFrom(b,desNow);
desPassed.push(desNow);
bridgesPassed.push(b);

while(checkBridgesPassed()){
    desPassed.length=desPassed.length-1;
    bridgesPassed.length=bridgesPassed.length-1;
    index++;
    b=getBridges(desNow)[index];
    if(b==undefined){
        alert("end");
        break;
    }
    desNext=getDesFrom(b,desNow);
    desPassed.push(desNow);
    bridgesPassed.push(b);
}
desNow=desNext;
undefined;

function checkBridgesPassed(){
    for (var i = 0; i < bridges.length; i++) {
        var des=getDesFrom(bridges[i],"E");
        var nextDes=getDesFrom(bridges[i],des);
        var getSimilarConditions=[];
        for (var j = 0; j < bridgesPassed.length; j++) {
            if((bridgesPassed[j]==bridges[i])&&(desPassed[j]==des)){
                getSimilarConditions.push(j);
            }
        }
        if(getSimilarConditions.length>=2){
            getSimilarConditions.push(bridgesPassed.length);
            for (var m = 0; m < getSimilarConditions.length-1; m++) {
                for (var n = m+1; n < getSimilarConditions.length-1; n++) {
                    if((getSimilarConditions[m+1]-getSimilarConditions[m])==(getSimilarConditions[n+1]-
                      getSimilarConditions[n])){
                        var len= getSimilarConditions[m+1]-getSimilarConditions[m];
                        var allTheSame=true;
                        var x=getSimilarConditions[m];
                        var y=getSimilarConditions[n]
                        for (var k = 0; k < len; k++) {
                            if((bridgesPassed[x+k]!=bridgesPassed[y+k])||(desPassed[x+k]!=desPassed[y+k])){
                                allTheSame=false;
                                break;
                            }
                        }
                        if(allTheSame){
                            console.log("allTheSame")
                            return true
                        }
                    }
                }
            }
        }
        var getSimilarConditions2=[];
        for (var j = 0; j < bridgesPassed.length; j++) {
            if((bridgesPassed[j]==bridges[i])&&(desPassed[j]==nextDes)){
                getSimilarConditions2.push(j);
            }
        }
        
        if(getSimilarConditions2.length>=2){
            getSimilarConditions2.push(bridgesPassed.length);
            for (var m = 0; m < getSimilarConditions2.length-1; m++) {
                for (var n = m+1; n < getSimilarConditions2.length-1; n++) {
                    if((getSimilarConditions2[m+1]-getSimilarConditions2[m])==(getSimilarConditions2[n+1]-
                      getSimilarConditions2[n])){
                        var len= getSimilarConditions2[m+1]-getSimilarConditions2[m];
                        var allTheSame=true;
                        var x=getSimilarConditions2[m];
                        var y=getSimilarConditions2[n]
                        for (var k = 0; k < len; k++) {
                            if((bridgesPassed[x+k]!=bridgesPassed[y+k])||(desPassed[x+k]!=desPassed[y+k])){
                                allTheSame=false;
                                break;
                            }
                        }
                        if(allTheSame){
                            console.log("allTheSame 2")
                            return true
                        }
                    }
                }
            }
        }
        return false;

    }
}


function getBridges(des){
    switch (des) {
        case 'A':
            return ["b0","b1","b2"];
        case 'B':
            return ["b0","b1","b3","b4","b5"];
        case 'C':
            return ["b2","b3","b6"];
        case 'D':
            return ["b4","b5","b6"]
    }
}
function getDesFrom(bridge,des){
    switch (bridge) {
        case 'b0':
            if(des=="A"){
                return "B";
            }else{
                return "A";
            }
        case 'b1':
            if(des=="A"){
                return "B";
            }else{
                return "A";
            }
        case 'b2':
            if(des=="A"){
                return "C";
            }else{
                return "A";
            }
        case 'b3':
            if(des=="B"){
                return "C";
            }else{
                return "B";
            }
        case 'b4':
            if(des=="B"){
                return "D";
            }else{
                return "B";
            }
        case 'b5':
            if(des=="B"){
                return "D";
            }else{
                return "B";
            }
        case 'b6':
            if(des=="C"){
                return "D";
            }else{
                return "C";
            }
    }
        
    
}

// write code by ai
//code to condition

int faf=new p(args);

faf.==>code library
list=[1,2,3];
a+=num();
a-=num();

a+=num();

var vals=[];
var operations=[];
var numbers=[];

var a=1;

num=1;
operation="plus";

aNext=mathCal(num,operation);
numbers.push(num);
operations.push(operation);
vals.push(a);

while(checkValCaled()){
    numbers.length=numbers.length-1;
    operations.length=operations.length-1;
    vals.length=vals.length-1;
    num++;
    if(operation=="plus"){
        operation="minus";
    }else{
        operation="plus";
    }
    if(num>100){
        alert("end");
        break;
    }
    aNext=mathCal(num,operation);
    numbers.push(num);
    operations.push(operation);
    vals.push(a);
}
undefined;


function checkValCaled(){
    if(a>10||a<-10){
        return true;
    }
    if(new Set(vals).size!=vals.length){
        return true;
    }
    return false;
}


function mathCal(num,operation){
    switch(operation){
        case "plus":
            a+=num;
            break;
        case "minus":
            a-=num;
            break;
    }
}

 


