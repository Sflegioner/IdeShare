import axios from 'axios';

export interface UserInterface {
    username: string;
    useremail: string;
    userpass: string;
}

class UserClient {
    private baseAPIurl = "http://localhost:4444/API";

    async GetUser(useremail: string): Promise<UserInterface> {
        const response = await axios.get<UserInterface>(`${this.baseAPIurl}/user`, {
            params: { useremail }
        });
        const user: UserInterface = response.data;
        console.log('Successfully fetched user:', user);
        return user;
    }

    // ** Function Overloading ________________________________________________________________________________________________________________ */    
    async PostUser(new_user: UserInterface): Promise<UserInterface>;
    async PostUser(username: string, useremail: string, userpass: string): Promise<UserInterface>;
    async PostUser(usernameOrUser: string | UserInterface, useremail?: string, userpass?: string): Promise<UserInterface> {
        let body: UserInterface;
        if (typeof usernameOrUser === 'object') {
            body = usernameOrUser;
        } else {
            body = {
                username: usernameOrUser,
                useremail: useremail as string,
                userpass: userpass as string
            };
        }

        const response = await axios.post<UserInterface>(`${this.baseAPIurl}/user`, body);
        const user: UserInterface = response.data;
        console.log('Successfully added user to DB:', user);
        return user;
    }
}

export default UserClient;
