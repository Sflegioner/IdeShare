export interface ApplicationInterface {
    post_id: string;
    applier_id: string;
    role: string;
    motivation: string;
}

export class ApplicationClient {
    private base_api_url = "http://localhost:4444/API";
    //Getting post  
    async GetApplication(): Promise<ApplicationInterface[]> {
        const response = await fetch(`${this.base_api_url}/application`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const data = await response.json();
        //MAPPING THIS SHIT 
        const objectInterface: ApplicationInterface[] = data.map((item: any) => ({
            post_id: item.post_id,
            applier_id: item.applier_id,
            role: item.role,
            motivation: item.motivation,
        }));
        console.log(objectInterface);
        return objectInterface;
    }
    //Posting post 
    async PostApplication(body: ApplicationInterface): Promise<any> {
        const response = await fetch(`${this.base_api_url}/application`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Data posted in post function ");
        }

        const data = await response.json();
        console.log("Application created:", data);
        return data;
    }
    //Updating Post
    async PutApplication(id: string, body: Partial<ApplicationInterface>): Promise<any> {
        const response = await fetch(`${this.base_api_url}/application/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Failed to update the application");
        }

        const data = await response.json();
        console.log("Application updated:", data);
        return data;
    }
    //Deleting Post
    async DeleteApplication(id: string): Promise<void> {
        const response = await fetch(`${this.base_api_url}/application/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Failed to delete the application");
        }

        console.log("Application deleted successfully");
    }

}