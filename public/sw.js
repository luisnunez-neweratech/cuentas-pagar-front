self.addEventListener('fetch', function(event) {
     if (localStorage["auth-storage"]) {
        const auth = JSON.parse(localStorage["auth-storage"]);    
        const newRequest = new Request(event.request, {
            headers: {"Authorization": `Bearer ${auth.state.token}`},
            mode: "cors"
        });        
        return fetch(newRequest);
    }
})