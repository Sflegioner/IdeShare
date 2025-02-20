import React, { useState, useEffect } from "react";
import '../page_styles/main_page.css';
import '../page_styles/profile_page.css'
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
            } catch (error) {
                console.error('Error fetching user data:', error);
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

    return (<>

        <div className="Main-card">
            <div className="profile-header">
                <img
                    src={avatar || '/path/to/default-avatar.png'}
                    alt="User Avatar"
                    className="profile-avatar"
                    onError={(e) => {
                        e.currentTarget.src = '/path/to/default-avatar.png';
                    }}
                />
                <h1>{user?.username || 'Loading...'}</h1>
                <p className="profile-email">{user?.useremail || 'Loading...'}</p>
            </div>
            <div className="profile-content">
                <label className="file-upload-label">
                    Change Avatar
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-upload-input"
                    />
                </label>
                <div className="user-info">
                    <h2>User Info</h2>
                    <p><strong>Username:</strong> {user?.username || 'Loading...'}</p>
                    <p><strong>Email:</strong> {user?.useremail || 'Loading...'}</p>
                </div>
            </div>
        </div>
        <div className="PostCreated-card">
            <p>Post Created:</p>
        </div>
        <div className="Application-card">
            <p>Application joined:</p>
        </div>
    </>

    );
};
