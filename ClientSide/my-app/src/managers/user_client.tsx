import { json } from "stream/consumers";

export interface UserInterface {
    username: string;
    useremail: string;
    userpass: string;
}

class UserClient {
    private baseAPIurl = "http://localhost:4444/API";
    async GetUser(userid: string): Promise<UserInterface> {
        const response = await fetch(`${this.baseAPIurl}/user?userid=${encodeURIComponent(userid)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`Error fetching user: ${response.statusText}`);
        }
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

    async VerefyPassword(password: string, email: string): Promise<any> {
        const response = await fetch(`${this.baseAPIurl}/vereficate_password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ userpass: password, useremail: email })
        });
    
        const data = await response.json();
        return data;
    }
    async GetUserPhotoAvatar(id: string): Promise<string> {
        return `http://localhost:4444/API_USER/user_photo/${encodeURIComponent(id)}`;
    }
    async PostUserPhotoAvatar(id: string, image: File): Promise<string> {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image', image);

        const response = await fetch(`http://localhost:4444/API_USER/user_photo/`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error uploading user photo: ${response.statusText}`);
        }

        const { image_path } = await response.json();
        return image_path;
    }
    async PutUser(id: string, username: string, useremail: string): Promise<UserInterface> {
        const response = await fetch(`${this.baseAPIurl}/user`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id, username, useremail }),
        });
    
        if (!response.ok) {
            throw new Error(`Error updating user: ${response.statusText}`);
        }
    
        const user: UserInterface = await response.json();
        console.log('Successfully updated user:', user);
        return user;
    }
}

export default UserClient;
