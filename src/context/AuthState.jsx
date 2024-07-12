import AuthContext from "./AuthContext";

const AuthState = (props) =>{
    const state = {
        username: 'kamesh',
        email: 'kamesh@gmail.com'
    };
    //localStorage.setItem('user, userData)
    //localStorage.getItem('user')
    //localStorage.removeItem('user')


    return(
        <AuthContext.Provider value= {state}>{props.childern}</AuthContext.Provider>
    );
};

export default AuthState;