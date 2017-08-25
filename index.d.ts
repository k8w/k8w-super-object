interface ObjectConstructor{
    merge(target: any, ...sources: any[]): any;
    values(obj:object): any[];
    forEach(obj:object, handler: (v:any, k:any, obj:object)=>void): void;
}