export function generateAuthHeader(){
    let auth = localStorage.getItem("auth")

    if(auth){
        auth = JSON.parse(auth)
        if(auth.token){
            return { Authorization: `Bearer ${auth.token}` };
        }else{
            return {};
        }
        
    }
}

export function isAuthenticated(){

    let auth = localStorage.getItem("auth")

    if(auth){
        auth = JSON.parse(auth)
        if(auth.token){
            return true;
        }
        return false
      }

}
export function getUserEmail(){

    let auth = localStorage.getItem("auth")

    if(auth){
        auth = JSON.parse(auth)
        if(auth.token){
            return auth.email;
        }
        return false
      }

}