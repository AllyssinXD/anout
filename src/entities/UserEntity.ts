interface FetchedUser{
    _id: string;
    username: string;
    email: string;
    permissions: string[];
}

class UserEntity {
    private id;
    private username;
    private email;
    private permissions;

    constructor(user: FetchedUser){
        this.id = user._id;
        this.email = user.email;
        this.username = user.username;
        this.permissions = user.permissions;
    }

    public getId(){
        return this.id;
    }

    public getUsername(){
        return this.username;
    }

    public getPermissions(){
        return this.permissions;
    }

    public getEmail(){
        return this.email;
    }
}

export default UserEntity;