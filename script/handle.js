        var addButton=function(name,event){
            var val=editor.getValue();
            var Name=name[0].toUpperCase()+name.substring(1);
            val=val.replace(/(\s*)<!--script\((.+):(.+)\)-->/g,function(e,a,b,c){
                if(currentFile=="draw.html"&&b&&(b.trim()=="addButton")&&c&&(c.trim()=="div")){
                    return  a+"<button id=\""+name+"\">"+Name+"</button>"+e
                }else{
                    return e;
                }
            })
            val=val.replace(/(\s*)\/\/script\((.+):(.+)\)/g,function(e,a,b,c){
                if(currentFile=="draw.html"&&b&&(b.trim()=="addButton")&&c&&(c.trim()=="define")){
                    return a+"const button"+Name+" = document.querySelector('button#"+name+"');"+e;
                }else{
                    return e;
                }
            })
            val=val.replace(/(\s*)\/\/script\((.+):(.+)\)/g,function(e,a,b,c){
                if(currentFile=="draw.html"&&b&&(b.trim()=="addButton")&&c&&(c.trim()=="event")){
                    return a+"button"+Name+".onclick = function()"+
                        a+"{"+a+"\t"+event+a+"}"+e
                }else{
                    return e;
                }
            })
            return val;
        }
