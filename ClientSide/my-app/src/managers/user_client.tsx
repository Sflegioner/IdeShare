import fetch from 'node-fetch';

interface UserInterface {
    username: string,
    useremail: string,
    userpass: number,
}

class UserClient {
    baseAPIurl = "http://localhost:4444/API";
    /** */
    async GetUser(useremail: String): Promise<UserInterface> {
        const response = await fetch(`${this.baseAPIurl}/user?useremail=${useremail}`, {method: 'GET',});
        const data = await response.json() as any;
        const user: UserInterface = {
            username: data.username,
            useremail: data.usermail,
            userpass: data.userpass,
        }
        console.log('sucssessfully get User' + user)
        return user;
    }
    async PostUser(username: String, useremail: String, userpass: number): Promise<UserInterface> {
        const response = await fetch(this.baseAPIurl + '/user', { method: 'POST', body: JSON.stringify({ username: username, useremail: useremail, userpass }) });
        const data = await response.json() as any;
        const user: UserInterface = {
            username: data.username,
            useremail: data.usermail,
            userpass: data.userpass,
        }
        console.log('sucssessfully add User to db' + user)
        return user;
    }

}