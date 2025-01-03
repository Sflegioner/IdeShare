import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";

export const Logout = ()=>{
    const [cookies,setCookies,deleteCookies] = useCookies();
    const redirect = useNavigate();
    deleteCookies('IsAuth');
    redirect('/');
    console.log('Logout!!!')
    return(<></>)
}