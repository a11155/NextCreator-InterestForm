const Conditional = ({showIf, children} : {
    showIf: boolean,
    children: React.ReactNode
}) => {
    
    if (showIf) {
        return <>{children}</>;
    }
    return <></>;
}

export default Conditional;