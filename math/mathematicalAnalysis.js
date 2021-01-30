        var MathematicalAnalysis=function(){
        }
        MathematicalAnalysis.prototype.getTriangle=function(){
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
        MathematicalAnalysis.prototype.prove=function(prove){
            return prove(this);
        }
        var MathematicalAnalysis=new MathematicalAnalysis()
        MathematicalAnalysis.getTriangle()
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
        
        /*
        var times=1;
        while(times--){
            if(!MathematicalAnalysis.prove(prove2)){
                console.log('not right');
                break;
            }else{
                //console.log(true);
            }
        }
        */
//example 1
function VL(){
    return _L*_di/_dt
}
function V_left(){
    return _V-VL();
}

function I(){
    return V_left()/_R
}
I=(V-L*di/dt)/R


function _read_000(){
    ma.readText();
}

//VL = Ldi/dt
//VL=V
//di=-(V/L)dt


function VL(){
    return _L*_di/_dt
}
function V_left(){
    return _V-VL();
}

function I(){
    return V_left()/_R
}
I=(V-L*di/dt)/R


function _read_000(){
    ma.readText();
}

//VL = Ldi/dt
//VL+V_left=V

        MathematicalAnalysis.prototype.readText=function(){
            if(this.text){
                var text=this.evalText(this.text);
                if(!text){
                    console.log(this.text);
                    window.eval(this.text);
                }
                this.text=text;
            }else{
                this.text=this.evalText(editor.getSelectedText());
                if(!this.text){
                    return 'code finished'
                }
            }
        }
        
        MathematicalAnalysis.prototype.evalText=function(text){
            if((window[text]==undefined)&&(window["_"+text]==undefined)){
                if(text[0]=="_"){
                    window[text]=1;
                }else{
                    window["_"+text]=1;
                }
                return;
            }else{
                var tem;
                if(text[0]=="_"){
                    tem=eval("_="+text.substring(1)+"()")
                }else{
                    tem=eval("_="+text+"()")
                }
                editor.remove();
                editor.session.insert({row:editor.getCursorPosition().row, column:editor.getCursorPosition().column}, tem+"");
            }
        }
        
        MathematicalAnalysis.prototype.changeVal=function(text){
            
        }
        var _I=0;
        var Is=[_I];
        var m=100;
        var n=0;
        for (var i = 0; i < 0.1; i+=0.001) {
            _di=i;
            var _i=I();
            if(Math.abs(_i-_I)<Math.abs(m-_I)){
                m=_i;
                n=_di;
            }
        }
        console.log(m,n);
        _I+=n;
        Is.push(_I);
        
        m=100;
        n=0;
        for (var i = 0; i < 10; i+=0.0001) {
            _di=i;
            var _i=I();
            if(Math.abs(_i-_I)<Math.abs(m-_I)){
                m=_i;
                n=_di;
            }
        }
        console.log(Math.abs(m-_I),n);
        _I+=n;
        Is.push(_I);
        console.log(_I)

        
        
        _di=0.05;
        _dt=0.01;
        
        
        
        
        function add_prototype(){
            var str="ma";
            var tem=editor.getSelectedText().trim();
            var match=tem.match(/.+\.prototype\.([\s\S]+)/);
            if(match){
                str+="."+match[1];
            }else if(tem[0]=='.'){
                str+=tem;
            }else{
                str+="."+tem;
            }
            eval(str)
        }


        