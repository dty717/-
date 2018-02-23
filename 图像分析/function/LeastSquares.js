
class LeastSquares {
    constructor(x,y,a) {
        this.x=x;
        this.y=y;
        this.a=a;
        this.ax = 0;
        this.ay = 0;
        this.xy = 0;
        this.xx = 0;
        this.yy = 0;
    }
    observe(x,y,a){

        this.ax+=(a-this.a)*(x-this.x);
        this.ay+=(a-this.a)*(y-this.y);
        this.xy+=(x-this.x)*(y-this.y);
        this.xx+=(x-this.x)*(x-this.x);
        this.yy+=(y-this.y)*(y-this.y);
        
    }
    
}













