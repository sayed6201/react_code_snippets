

// accessing state outside react compponent

export const apiCall = async(url, method, body, authRequired = true, contentType = null) =>{

    const state = store.getState();
    const accessToken = await state.auth.accessToken
    const refreshToken = await state.auth.refreshToken


    return fetch(`${BASE_URL}${url}`, {
        method,
        body,
        headers: {
            'Content-Type': contentType? contentType : 'application/json',
            Authorization: authRequired ? 'Bearer ' + accessToken : null
          }
      }).then(async res => {
          const string = await res.text();
          const json = string === '' ? {} : JSON.parse(string);
          console.log(JSON.stringify(json))
          // console.log(json)
          if (res.ok) return json;
          throw json;
      });
}


// dispatching outside of cmonent

import { store } from "../stores/store";


export const profileDeleteHelper = async(data) => {
    try{
        store.dispatch(setProfileDeleteStart)
        await deleteProfile()
        store.dispatch(setProfileDeleteSuccess)
        store.dispatch(setLogout)
    }catch(e){
        store.dispatch(setProfileDeleteEnd)
        //TODO: process the error message into text
        throw e
    }
}