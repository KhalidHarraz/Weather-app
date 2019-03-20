window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
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
                    const { temperature, summary, icon } = data.currently;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //FROMULLA From celsius 
                    let celsius = (temperature -32) * (5 / 9)
                    //Set Icons 
                    setIcons(icon, document.querySelector(`.icon`));

                    //Change the temperature celsius / Farnhiet 
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius) ;
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature ;
                        }
                    });
                });
        });
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, skycons[currentIcon]);

    }
});
