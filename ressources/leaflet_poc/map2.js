window.onload = function() {
  var layer = new L.StamenTileLayer("terrain");
  var map = new L.Map("mapid", {
      center: new L.LatLng(48.8647807, 2.3898143999999775),
      zoom: 12
  });
  map.addLayer(layer);
};
