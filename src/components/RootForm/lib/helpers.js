export const getActiveTab = path => {
    switch(path) {
        case '/login': return 0;
        case '/registration': return 1;
        default: return 0;
    }
}