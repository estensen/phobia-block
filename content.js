var API_KEY = '';

const birdFeatures = [
  'bird',
  'beak',
  'finch',
  'wing',
  'lark',
  'parrot',
  'sparrow',
  'water bird'
];

var http = function (method, url, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) { return; }
    if (xhr.status >= 400) {
      notify('API request failed');
      console.log('XHR failed', xhr.responseText);
      return;
    }
    cb(JSON.parse(xhr.responseText));
  };
  xhr.send(body);
};

// Fetch the API key from config.json on extension startup.
http('GET', chrome.runtime.getURL('config.json'), '', function (obj) {
  API_KEY = obj.key;
  document.addEventListener('DOMContentLoaded', checkImages(), false);
});

function checkImages() {
  var images = document.getElementsByTagName('img'), i = 0, img;
  while (img = images[i++]) {
    let imgSrc = String(img.src).toLowerCase();
    let altText = String(img.alt).toLowerCase();

    if (imgSrc == "" || imgSrc.slice(0,4) === 'data') {
      continue;
    }

    if (stringContainsBird(imgSrc) || stringContainsBird(altText)) {
      replaceBirdWithFiltered(img)
    } else {
      // Hide image while processing
      img.style.visibility = 'hidden';
      processImage(img);
    }
    // knock out lazyloader data URLs so it doesn't overwrite filtered pics
		if (img.hasAttribute('data-src')){
			img.removeAttribute('data-src');
		};
		if (img.hasAttribute('data-hi-res-src')){
			img.removeAttribute('data-hi-res-src');
		};
		if (img.hasAttribute('data-low-res-src')){
			img.removeAttribute('data-low-res-src');
		};
  }
}

function stringContainsBird(string) {
  for (var i = 0, len = birdFeatures.length; i < len; i++) {
    if (string.toLowerCase().includes(birdFeatures[i])) {
      return true;
    }
  }
  return false
}

function replaceBirdWithFiltered(birdImage) {
  birdImage.src = chrome.extension.getURL('filtered.jpg');
}

function processImage(img) {
  var data = {
    'requests': [{
      'image': {
        'source': {
          //'imageUri': 'https://upload.wikimedia.org/wikipedia/commons/3/32/House_sparrow04.jpg'
          'imageUri': img.src
        }
      },
      'features': [{
          'type': 'LABEL_DETECTION',
          'maxResults':40
        }]
    }]
  }

  const url = 'https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY;
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json())
  .catch(error => console.error('Error. Something messed up here:', error))
  .then(response => {
    // console.log(img);
    console.log('Success:', response);
    labels = response.responses[0].labelAnnotations;
    var isBird = false;
    if (labels == undefined) {
      return 0;
    }
    for (var x = 0; x < labels.length; x++) {
      currentLabel=labels[x];

      if (birdFeatures.includes(currentLabel.description) && currentLabel.score > .30) {
        // handle image replacement
        // img.src = 'http://via.placeholder.com/350x150';
        img.src = 'http://i0.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg';
        isBird = true;
        break;
      }
    }
    img.style.visibility = 'visible';
    if (!isBird){
      console.log(labels);
    }
  });
}
