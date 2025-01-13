import React, { useState, useEffect } from "react";
import '../page_styles/main_page.css';
import UserClient from "../managers/user_client";
import { Cookies } from "react-cookie";

export const ProfilePage = () => {
    const [avatar, setAvatar] = useState<string>('');
    const [user, setUser] = useState<{ username: string; useremail: string } | null>(null);
    const cookies = new Cookies();
    const userId = cookies.get("userId"); 
    const userClient = new UserClient();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUser = await userClient.GetUser(userId);
                setUser(fetchedUser);

                const avatarPath = await userClient.GetUserPhotoAvatar(userId);
                setAvatar(avatarPath);
                console.log(avatar);
            } catch (error) {
                console.error('No Avatar', error);
            }
        };
        fetchData();
    }, [userId]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            try {
                const newAvatarPath = await userClient.PostUserPhotoAvatar(userId, event.target.files[0]);
                setAvatar(newAvatarPath);
            } catch (error) {
                console.error('Error uploading avatar:', error);
            }
        }
    };

    return (
        <>
            <div className="section-right">
                <div className="picture">
                    <p className="picture-text">Profile page of {user?.username}</p>
                    <img 
                        src={avatar || '/path/to/default-avatar.png'} 
                        style={{ borderRadius: 20, width: 100, height: 100 }} 
                        alt="User Avatar" 
                        onError={(e) => {
                            e.currentTarget.src = '/path/to/default-avatar.png';
                        }}
                    />
                </div>
                <p>
                    <strong>Username:</strong> {user?.username || 'Loading...'}
                    <br />
                    <strong>Email:</strong> {user?.useremail || 'Loading...'}
                </p>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <p>Post created by user:</p>
                <p>Joined application</p>
            </div>
        </>
    );
};
