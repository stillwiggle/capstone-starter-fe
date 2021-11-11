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