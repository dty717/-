        var Polygon=function(){
        }
        Polygon.prototype.getTriangle=function(){
            this.triangle={}
            this.triangle.random=function(){
                this.Xa=20*Math.random();
                this.Xb=20*Math.random();
                this.Xc=20*Math.random();
                this.Ya=20*Math.random();
                this.Yb=20*Math.random();
                this.Yc=20*Math.random();
                this.pointA={X:this.Xa,Y:this.Ya};
                this.pointB={X:this.Xb,Y:this.Yb};
                this.pointC={X:this.Xc,Y:this.Yc};
            }
            this.triangle.getAB=function(){
                return Math.sqrt((this.Xa-this.Xb)*(this.Xa-this.Xb)+(this.Ya-this.Yb)*(this.Ya-this.Yb))
            }
            this.triangle.getAC=function(){
                return Math.sqrt((this.Xa-this.Xc)*(this.Xa-this.Xc)+(this.Ya-this.Yc)*(this.Ya-this.Yc))
            }
            this.triangle.getBC=function(){
                return Math.sqrt((this.Xb-this.Xc)*(this.Xb-this.Xc)+(this.Yb-this.Yc)*(this.Yb-this.Yc))
            }
            this.triangle.area=function(){
                return 1/2*Math.abs(this.Xa*this.Yb-this.Xa*this.Yc+this.Xb*this.Yc-this.Xb*this.Ya+this.Xc*this.Ya-this.Xc*this.Yb)

            }
            this.triangle.centroid=function(){
                return {X:(this.Xa+this.Xb+this.Xc)/3,Y:(this.Ya+this.Yb+this.Yc)/3}
            }
            this.triangle.random()
        }
        Polygon.prototype.prove=function(prove){
            return prove(this);
        }
        var polygon=new Polygon()
        polygon.getTriangle()
        var prove1=function(obj){
            obj.triangle.random();
            if((obj.triangle.getAB()+obj.triangle.getAC()>obj.triangle.getBC())&&(
                obj.triangle.getBC()+obj.triangle.getAC()>obj.triangle.getAB())&&(
                    obj.triangle.getAB()+obj.triangle.getBC()>obj.triangle.getAC()))
                return true;
            return false;
        }
        var prove2=function(obj){
            var a=obj.triangle.getBC();
            var b=obj.triangle.getAC();
            var c=obj.triangle.getAB();
            return Math.abs(1/4*Math.sqrt((a+b+c)*(a+b-c)*(a-b+c)*(-a+b+c))-obj.triangle.area())<1e-12
        }
        var prove3=function(obj){
            var point=obj.triangle.centroid();
            var randomPoint={X:20*Math.random(),Y:20*Math.random()};
            return distancePower(obj.triangle.pointA,point)+distancePower(obj.triangle.pointB,point)+distancePower(obj.triangle.pointC,point)
                >distancePower(obj.triangle.pointA,randomPoint)+distancePower(obj.triangle.pointB,randomPoint)+distancePower(obj.triangle.pointC,randomPoint)
        }
        function distancePower(point1,point2){
            return (point1.X-point2.X)*(point1.X-point2.X)+(point1.Y-point2.Y)*(point1.Y-point2.Y);
        }
        
        
        var times=1;
        while(times--){
            if(!polygon.prove(prove2)){
                console.log('not right');
                break;
            }else{
                //console.log(true);
            }
        }
        
        