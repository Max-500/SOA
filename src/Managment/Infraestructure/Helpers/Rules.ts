export function isEmpty(props:any) {
    return props.some((prop: { trim: () => { (): any; new(): any; length: number; }; }) => prop.trim().length === 0);
}
