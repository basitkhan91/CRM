

export function emailPattern() {
    return "[a-zA-Z0-9.-]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z0-9]{2,}";
}


export function urlPattern() {
    return /[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)?/gi;
    // return "^((ht|f)tp(s?))\://([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(/\S*)?$"
}



