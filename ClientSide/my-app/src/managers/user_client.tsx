export interface UserInterface {
    username: string;
    useremail: string;
    userpass: string;
}

class UserClient {
    private baseAPIurl = "http://localhost:4444/API";
    async GetUser(useremail: string): Promise<UserInterface> {
        const response = await fetch(`${this.baseAPIurl}/user?useremail=${useremail}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', },
            credentials: 'include'
        });
        const user: UserInterface = await response.json();
        console.log('Successfully fetched user:', user);
        return user;
    }

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

        const response = await fetch(`${this.baseAPIurl}/user`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(body),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Error adding user: ${response.statusText}`);
        }
        const user: UserInterface = await response.json(); 
        console.log('Successfully added user to DB:', user);
        return user;

    }


    async VerefyPassword(password:number, email:string):Promise<any>{
        const reponse = await fetch(`${this.baseAPIurl}/user`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', },
            credentials: 'include'
        });
    }
}

export default UserClient;
