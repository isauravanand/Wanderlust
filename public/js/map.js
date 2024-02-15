maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element to render the map
  style: "basic-v2",
  center: [77.2090, 28.6139], // starting position [lng, lat]
  zoom: 14, // starting zoom
});

const gc = new maptilersdkMaptilerGeocoder.GeocodingControl();
map.addControl(gc, 'top-left');

const marker = new maptilersdk.Marker()
  .setLngLat([30.5, 50.5])
  .addTo(map);