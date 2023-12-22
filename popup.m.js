import { getIpInfo } from "./statics.js";

document.getElementById("helloButton").addEventListener("click", function () {
  if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(
      function (position) {
        alert(position);
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      },
      function (error) {
        alert(error.message);
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  } else {
    /* geolocation IS NOT available */
    console.log("Geolocation is not supported by this browser.");
  }
});

// This function will run when the popup is loaded
function onPopupLoad() {}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
  const res = await getIpInfo();
  document.getElementById("ip_info").textContent = `public IPv4: ${res.ip}`;
});
