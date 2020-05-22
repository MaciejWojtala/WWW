export function anyToNumber(arg : any) : number {
    try {
        const result = Number(arg);
        return result;
    }
    catch (e) {
        console.log("Cannot convert to number");
    }

    return -1;
}