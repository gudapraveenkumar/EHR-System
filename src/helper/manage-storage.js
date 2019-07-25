export function removeAppData(){
   localStorage.removeItem('token');
   localStorage.removeItem('userObj');
};

export function storeAppData(data){
   localStorage.setItem('token', data.token);
   localStorage.setItem('userObj', JSON.stringify(data.user))
}
