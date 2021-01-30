/*
 init usart
 handleUsart
*/
        var point=new Point();
        var Point=function(x,y,z){
            if(isNaN(x)){
                this.x=parseInt(Math.random()*10);
            }else{
                this.x=x;
            }
            if(isNaN(y)){
                this.y=parseInt(Math.random()*10);
            }else{
                this.y=y;
            }
            if(isNaN(z)){
                this.z=parseInt(Math.random()*10);
            }else{
                this.z=z;
            }
            this.relation_fun=function(obj){
                return obj
            }
        }
        
        Point.prototype.getLength=function(){
            return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
        }
        
        Point.prototype.setRelation=function(point,relation_fun){
            this.relation_fun=relation_fun;
            this.relation_point=point;
        }
        
        Point.prototype.getValue=function(){
            var point=this.relation_fun(this.relation_point);
            if(point)
                this.setPoint(point);
            return this;
        }
        Point.prototype.setPoint=function(point){
            if(point){
               this.x=point.x;
               this.y=point.y;
               this.z=point.z;
            }
        }
        Point.prototype.set=function(x,y,z){
            if(!isNaN(x)){
                this.x=x;
            }
            if(!isNaN(y)){
                this.y=y;
            }
            if(!isNaN(z)){
                this.z=z;
            }
        }
        Point.prototype.dot=function(point){
            var _point=point.getValue();
            return this.x*_point.x+this.y*_point.y+this.z*_point.z;
        }
        Point.prototype.add=function(point){
            var _point=point.getValue();
            return new Point(this.x+_point.x,this.y+_point.y,this.z+_point.z);
        }
        Point.prototype.subtract=function(point){
            var _point=point.getValue();
            return new Point(this.x-_point.x,this.y-_point.y,this.z-_point.z);
        }
        Point.prototype._subtract=function(point){
            var _point=point.getValue();
            return new Point(_point.x-this.x,this.y-_point.y,this.z-_point.z);
        }

        function plusPoint(points){
            var x=y=z=0;
            
            for(var i=0;i<points.length;i++){
                x+=points[i].x;
                y+=points[i].y;
                z+=points[i].z;
            }
            return new Point(x,y,z);
        }
        
        var pointA=new Point(1,2,3);
        var pointB=new Point(2,112,3);
        pointA.set(11,1,1)
        point.setRelation([pointA,pointB],functionList.pointsSubtraction);
        
        point.getValue().getLength();    
        
        var functionList={};
        
        functionList.pointsAddition=function(points){
            var x=y=z=0;
            
            for(var i=0;i<points.length;i++){
                x+=points[i].x;
                y+=points[i].y;
                z+=points[i].z;
            }
            return new Point(x,y,z);
        }
        functionList.pointsSubtraction=function(points){
            return new Point(points[0].x-points[1].x,points[0].y-points[1].y,points[0].z-points[1].z);
        }
        
        
        function getWhiteSpace(){
            var row=editor.getSelectionRange().start.row;
            var line;
            for (var i = row; i>=0;i-- ) {
                line=editor.getSession().getLine(i);
                if(line.trim()!=""){
                    var whiteSpace=line.match(/[\s\t]*/);
                    if(line.trim().endsWith('{')){
                        if(whiteSpace!=undefined){
                            return "\t"+whiteSpace;
                        }else{
                            return "\t";
                        }
                    }else{
                        if(whiteSpace!=undefined){
                            return whiteSpace;
                        }
                    }
                    return "";  
                }
            }
            return "";
        }
        
        
    function insertStr(str){
        var start;
        var range=editor.getSelectionRange()
        if(range.start.row<range.end.row){
            start=range.start
        }else if(range.start.row>range.end.row){
            start=range.end;
        }else if(range.start.column<range.end.column){
            start=range.start
        }else{
            start=range.end;
        }
        if(!editor.getSelectionRange().isEmpty()){
            editor.remove();
        }
        editor.session.insert({row:start.row, column:start.column}, str);
    }
    