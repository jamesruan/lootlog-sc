function toTable(a){
    var t = $('<table>').append($('<tbody>'));
    for (var i in a){
        var tr = $('<tr>');
        for(var j in a[i]){
            var td = $('<td>');
            td.text(a[i][j]);
            tr.append(td);
        }
        t.append(tr);
    }
    return t;
}

function ArrayBox(array){
    if(array == undefined){
        this.array = [];
    }else if(array.constructor == Array){
        this.array = array;
    }else if(array.constructor == ArrayBox){
        this.array = array.array;
        return this;
    }else
    {
        this.array = [array];
    }
}

ArrayBox.prototype.push = function(i){
    return this.array.push(i);
};

ArrayBox.prototype.pop = function(){
    return this.array.pop();
};

ArrayBox.prototype.map = function(fun){
    var r = new ArrayBox(this.array.map(fun));
    return r;
};

ArrayBox.prototype.forEach = function(fun){
    this.array.forEach(fun);
    return undefined;
};

ArrayBox.prototype.transpose = function(){
    var r = new ArrayBox();
    var o = this.array;
    if(o[0].constructor == Array){
        //2D array:
        o[0].forEach(function(i, index){
            r.push(o.map(function(t){
                return t[index];
            }));
        });
        return r;
    }else{
        //1D array:
        return newArrayBox(this);
    }
};


ArrayBox.prototype.col = function(index){
    var r = new ArrayBox();
    var o = this.transpose();
    if(index.constructor == Array || index.constructor == ArrayBox){
        index.forEach(function(i){
            r.push(o.array[i]);
        });
        return r.transpose();
    }else{
        r = new ArrayBox(o.array[index]);
        return r;
    }
};

ArrayBox.prototype.replace_col = function(index, col){
    var o = this.transpose();
    if(col.constructor == ArrayBox){
        col = col.toArray();
    }else if(col.constructor !=Array){
        throw("col must be an Array or ArrayBox");
    }
    if(index.constructor == Array || index.constructor == ArrayBox){
        index.forEach(function(i){
            o.array[i] = col[i];
        });
        this.array = o.transpose().array
        return this;
    }else{
        o.array[index] = col;
        this.array = o.transpose().array
        return this;
    }
};

ArrayBox.prototype.row = function(index){
    var r = new ArrayBox();
    var o = this;
    if(index.constructor == Array || index.constructor == ArrayBox){
        index.forEach(function(i){
            r.push(o.array[i]);
        });
        return r;
    }else{
        return new ArrayBox(o.array[index]);
    }
};

ArrayBox.prototype.replace_row = function(index, row){
    var o = this;
    if(row.constructor == ArrayBox){
        row = row.toArray();
    }else if(row.constructor !=Array){
        throw("row must be an Array or ArrayBox");
    }
    if(index.constructor == Array || index.constructor == ArrayBox){
        index.forEach(function(i){
            o.array[i] = row[i];
        });
        return o;
    }else{
        o.array[i] = row;
        return o;
    }
};

ArrayBox.prototype.duplicated = function(bycols){
    var list={};
    var target;
    var o = this;
    if(bycols != undefined){
        if(o.array[0].constructor!= Array){
            throw("array must have dimension 2");
        }else{
            target = o.col(bycols).map(String);
        }
    }else{
        target = o.map(String);
    }
    return target.array.map(function(i){
        if(list[i]){
            return true;
        }else{
            list[i] = true;
            return false;
        }
    });
};

ArrayBox.prototype.unique = function(bycols){
    var r = new ArrayBox();
    var o = this;
    var dup = o.duplicated(bycols);
    o.forEach(function(i, index){
        if(!dup[index]){
            r.push(i);
        }
    });
    return r;
}

ArrayBox.prototype.toArray = function(){
    return this.array.slice();
}

var a = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];

function format(a){
    //名字 数量 组 种类 尺寸 槽位 体积 衍生等级 科技等级
    var AB = new ArrayBox(a);
    
    function deBracket(a){
        return a.replace(/[\[\]]/g, "");
    }
    function asFloat(a){
        return parseFloat(deBracket(a.replace(/,/g, "")));
    }

    var t;

    //name
    t = AB.col(0).map(function(i){
        return deBracket(i);
    });
    AB.replace_col(0, t);

    //quantity
    t = AB.col(1).map(function(i){
        if(i == "[]"){
            return asFloat("[1]");
        }else{
            return asFloat(i);
        }
    });
    AB.replace_col(1, t);

    //group
    t = AB.col(2).map(function(i){
        return deBracket(i);
    });
    AB.replace_col(2, t);

    //type
    t = AB.col(3).map(function(i){
        return deBracket(i);
    });
    AB.replace_col(3, t);

    //size
    t = AB.col(4).map(function(i){
        return deBracket(i);
    });
    AB.replace_col(4, t);

    //slot
    t = AB.col(5).map(function(i){
        return deBracket(i);
    });
    AB.replace_col(5, t);

    //volume
    t = AB.col(6).map(function(i){
            i = i.replace(/ m3/g, "")
        return asFloat(i);
    });
    AB.replace_col(6, t);

    //derivation
    t = AB.col(7).map(function(i){
        if(i == "[]"){
            return asFloat("[0]");
        }else{
            return asFloat(i);
        }
    });
    AB.replace_col(7, t);

    //technology
    t = AB.col(8).map(function(i){
        if(i == "[]"){
            return asFloat("[0]");
        }else{
            return asFloat(i);
        }
    });
    AB.replace_col(8, t);

    return AB.toArray();
}
