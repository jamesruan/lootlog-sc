{
    function clean(a){
        var r=[];
        var record;
        for(var i=0; i<a.length; i++){
            var line = a[i];
            if(line.length ==10){  //bug 1
                var name = line.shift();
                line.shift();
                line.unshift(name);
                record = line;
                r.push(record);
                record = undefined;
                continue;
            }
            if(line.length < 9){  //bug 2
                if(record){
                    line.shift();
                    record = record.concat(line);
                    r.push(record);
                    record = undefined;
                }else
                {
                    record = line;
                }
                continue;
            }

            if(line.length == 9) { //normal data
                record = line
                r.push(record);
                record = undefined;
            }
        }
        return r;
    }
}

start
 = a: records
 {return clean(a);}
 / isEOF

records                                                                                              
 = a:record b:(NL a:record{return a;})+ NL*
 {b.unshift(a); return b;}
 / record NL*

record
 = a:key b:(DELIM a:key{return a;})+
 {b.unshift(a); return b;}
 / key

key
 = a:(!NL !DELIM a:. {return a;})*
 {return "["+a.join("")+"]";}
 / &DELIM
 {return "[]";}

DELIM = "\t"                                                                                         

NL = "\r\n" / "\n"

isEOF = !. 
