export function fib_rek(arg : number) : number {
    if (arg < 0)
        return -1;
    
    if (arg == 1)
        return 1;
    if (arg == 0)
        return 0;
    return fib_rek(arg - 1) + fib_rek(arg - 2);
}