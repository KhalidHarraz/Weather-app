window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(TheP => {
            long = TheP.coords.longitude;
            lat = TheP.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/2d4c1c0301517ed772e8c2066e3f0c2a/${lat},${long}/`;

            fetch(api)
                .then(Gdata => {
                    return Gdata.json();
                })
                .then(data => {
                    console.log(data);
                });

        });

    }
});
