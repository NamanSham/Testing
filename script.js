
let map;
let marker;
let kpuLibraryLocation = { lat: 49.132134670502104, lng: -122.87127220563683 }; // KPU Surrey Library location

function initMap() {
  const apiKey = "AIzaSyAUoZ8FGNrKp80tsQLEvaNO7KuYj1VmfCk"; // Add your API key here
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=loadMap`;
  script.async = true;
  document.head.appendChild(script);
}

initMap();

function loadMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: kpuLibraryLocation,
    zoom: 15,
  });

  marker = new google.maps.Marker({
    position: kpuLibraryLocation,
    map: map,
    title: "KPU Surrey Library",
  });

  navigator.geolocation.watchPosition((position) => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    marker.setPosition(userLocation);

    const distance = calculateDistance(userLocation, kpuLibraryLocation);
    document.getElementById("distance").innerHTML = `Distance to KPU Surrey Library: ${distance.toFixed(2)} km`;
  });
}

function calculateDistance(userLocation, kpuLibraryLocation) {
  const R = 6371; // Radius of the earth in km
  const dLat = (kpuLibraryLocation.lat - userLocation.lat) * Math.PI / 180;
  const dLon = (kpuLibraryLocation.lng - userLocation.lng) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLocation.lat * Math.PI / 180) *
      Math.cos(kpuLibraryLocation.lat * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}