function makeLine(x,y,r,ctx){
    var paintX=[];
    var paintY=[];
	var mark=12;
    for(var i=x-r;i<x+r;i++){
        var start=-1;
		for(var j=y-r;j<y+r;j++){
			var pixelData = ctx.getImageData(i, j, 1, 1).data;
			if(pixelData[0]!=255){
				if(start==-1){
					start=j;
				}
			}else{
				if(start!=-1){
					if(j-start>mark){
						paintX.push(i);
						paintY.push((start+j)/2)
					}
					start=-1;					
				}		
			}
        }
    }
    for(var j=y-r;j<y+r;j++){
        var start=-1;
		for(var i=x-r;i<x+r;i++){
			var pixelData = ctx.getImageData(i, j, 1, 1).data;
			if(pixelData[0]!=255){
				if(start==-1){
					start=i;
				}
			}else{
				if(start!=-1){
					if(i-start>mark){
						paintX.push((start+i)/2);
						paintY.push(j);
					}
					start=-1;
				}		
			}
            
        }
    }
	ctx.fillStyle='white';
	ctx.fillRect(x-r,y-r, 2*r, 2*r);
	ctx.fillStyle='red';
	for(var i=0;i<paintX.length;i++){
        ctx.fillRect(paintX[i], paintY[i], 1, 1);
    }	
	
	
}
