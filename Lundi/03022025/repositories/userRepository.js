const { v1: uuidv1, v4: uuidv4 } = require("uuid");

class userRepository {
    constructor() {
        this.users = [];
        for (let i = 0; i < 100; i++) {
            this.users.push({
                id: uuidv4(),
                name: "User" + i,
                email: `user.email${i}@email.com`
            });
        }
    }
    createOne({ name = undefined, email = undefined }) {
        this.users.push({
            id: uuidv4(),
            name: name,
            email:email
        });
    }
    find(id = undefined, name = undefined, email = undefined) {
        return this.users.filter(user => {
            return (
                (id ? user.id === id : true) &&
                (name ? user.name === name : true) &&
                (email ? user.email === email : true)
            );
        });
    }
    delete(id = undefined) {
        if (id) {
            const index = this.users.findIndex(e => e.id === id);
            if (index === -1) return false;
            console.log(index)
            this.users.splice(index, 1);
            if (this.users.findIndex(e => e.id === id) === -1) return true;
        }
        return false;
    }
}


module.exports = userRepository;