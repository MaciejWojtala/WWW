export function anyToNumber(arg : any) : [number, boolean] {
    try {
        const result = Number(arg);
        if (!Number.isNaN(result))
            return [result, true];
        return [-1, false];
    }
    catch (e) {
        console.log("Cannot convert to number");
    }

    return [-1, false];
}