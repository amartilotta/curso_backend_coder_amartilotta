export default class UserDTO {
    static getUserPublicDataFrom = (user) => {
        return {
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            email: user.email,
            age: user.age
        }
    }
}