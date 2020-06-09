export function anyToNumber(arg : any) : number {
    try {
        const result = Number(arg);
        if (!Number.isNaN(result))
            return result;
        return -1;
    }
    catch (e) {
        console.log("Cannot convert to number");
    }

    return -1;
}