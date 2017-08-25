///<reference path="index.d.ts"/>

/**
 * 将sources合并到target，该合并全部是深拷贝
 * @param target
 * @param sources
 * @returns {Object}
 */
Object.merge = function(target:any, ...sources: any[]){
    for(let i=0; i<sources.length; ++i){
        let source = sources[i];

        if(typeof source != 'object'){
            continue;
        }

        for(let skey in source){
            if(!source.hasOwnProperty(skey)){
                continue;
            }

            if(source[skey] instanceof Date){
                target[skey] = new Date(source[skey]);
                continue;
            }
            else if(typeof(target[skey])=='object' && typeof(source[skey])=='object'){
                Object.merge(target[skey], source[skey])
            }
            else{
                if(Array.isArray(source[skey])){
                    target[skey] = Object.merge([], source[skey]);
                }
                else if(typeof(source[skey])=='object' && source[skey]!==null){
                    target[skey] = Object.merge({}, source[skey]);
                }
                else{
                    target[skey] = source[skey];
                }
            }
        }
    }

    return target;
}

if(!Object.values){
    Object.values = function(obj:any){
        let output:any[] = [];
        for(let k in obj as any){
            obj.hasOwnProperty(k) && output.push(obj[k]);
        }
        return output;
    }
}

Object.forEach = function(obj:any, handler: (v:any, k:any, obj:object)=>void): void{
    for(let key in obj as any){
        if(!obj.hasOwnProperty(key)){
            return;
        }
        handler(obj[key], key, obj);
    }
}