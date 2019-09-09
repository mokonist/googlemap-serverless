async function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 42, lng: 141}
  });
  const result = await fetch("https://xxxxx.execute-api.ap-northeast-1.amazonaws.com/Prod/location");

  for (const data of await result.json()) {
    const marker = new google.maps.Marker({
      position: {lat: data.lat, lng: data.lng},
      map: map
    });
  }
  google.maps.event.addListener(map, 'click', event => clickListener(event, map));
}


function clickListener(event, map) {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  console.log({lat, lng})
  const marker = new google.maps.Marker({
    position: {lat, lng},
    map
  });
  const url = "https://xxxxx.execute-api.ap-northeast-1.amazonaws.com/Prod/location"

  const data = {
    lat,
    lng
  }
  fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data)
  }).then(response => {console.log(response)})
}
