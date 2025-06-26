export function getRandom(min: number, max:number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandom2Range(range1: number[], range2: number[]){
    let t1 = getRandom(range1[0], range1[1]);
    let t2 = getRandom(range2[0], range2[1]);
    return getRandom(1,2) == 1 ? t1 : t2;
}