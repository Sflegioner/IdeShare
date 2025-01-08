export interface PostInterface {
    user_author: string;
    title: string;
    short_description:string;
    reaction: {
        likes: number;
        dislikes: number;
        wow_reactions: number;
    };
    views: number;
    id?: string;
}

export class PostClient {
    private base_api_url = "http://localhost:4444/API";
    //Getting post  
    async GetPost(): Promise<PostInterface[]> {
        const response = await fetch(`${this.base_api_url}/post`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const data = await response.json();
        //MAPPING THIS SHIT 
        const objectInterface: PostInterface[] = data.map((item: any) => ({
            user_author: item.user_author,
            title: item.title,
            short_description:item.short_description,
            reaction: {
                likes: item.reaction.likes,
                dislikes: item.reaction.dislikes,
                wow_reactions: item.reaction.wow_reactions
            },
            views: item.views,
            id: item._id
        }));
        console.log(objectInterface);
        return objectInterface;
    }
    //Posting post 
    async PostPost(body: PostInterface): Promise<any> {
        const response = await fetch(`${this.base_api_url}/post`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Data posted in post function ");
        }

        const data = await response.json();
        console.log("Post created:", data);
        return data;
    }
    //Updating Post
    async PutPost(id: string, body: Partial<PostInterface>): Promise<any> {
        const response = await fetch(`${this.base_api_url}/post/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Failed to update the post");
        }

        const data = await response.json();
        console.log("Post updated:", data);
        return data;
    }
    //Deleting Post
    async DeletePost(id: string): Promise<void> {
        const response = await fetch(`${this.base_api_url}/post/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Failed to delete the post");
        }

        console.log("Post deleted successfully");
    }

}