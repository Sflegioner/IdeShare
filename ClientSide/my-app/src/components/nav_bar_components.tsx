import { useNavigate } from "react-router-dom";
import '../page_styles/main_page.css';
import { useCookies } from "react-cookie";

export const Nav_Bar = () => {
    ;
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies();

    function navigateToPage(url_page: string) {
        navigate(url_page);
    }
    const LogIn_Or_LogOut = () => {
        if (cookies.IsAuth == true) {
            return (
                <>
                    <button onClick={() => navigateToPage('/logout')} style={{ marginLeft: 5 }} id="create-button">
                        Logout
                    </button>
                </>
            )
        } else {
            return (
                <>
                    <button onClick={() => navigateToPage('/login_registration_page')} style={{ marginLeft: 5 }} id="create-button">
                        Login/Register
                    </button>
                </>
            )
        }
    }

    return (
        <>
            <nav className="navbar">
                <div className="left">
                    <ul>
                        <li onClick={() => navigateToPage('/')}>
                            <img id="logo" alt="logo" src="icon3.png" /> IdeShare
                        </li>
                        <li onClick={() => navigateToPage('/all_posts')} style={{ marginLeft: 5, fontSize: 16 }} id="create-button">All post</li>
                        <li>
                            <input className="nav-input" />
                        </li>
                    </ul>
                </div>
                <div className="right">
                    <ul>
                        <li>

                            <button onClick={() => navigateToPage('/create_post')} id="create-button">Create a post</button>
                            <LogIn_Or_LogOut></LogIn_Or_LogOut>
                        </li>
                        <li onClick={() => navigateToPage('/profile_page')} >Profile</li>
                    </ul>
                </div>
            </nav>
        </>
    );
};
