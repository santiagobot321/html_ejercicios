export function validateLogin (email, passwd) {
    if (!email || !passwd) {
        return "All fields are required"
    }
    return null
}

