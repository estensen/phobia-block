var API_KEY = '';

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
  console.log(API_KEY);
  document.addEventListener('DOMContentLoaded', checkImages(), false);
});

const birdFeatures=['beak', 'finch', 'wing', 'bird', 'lark', 'seabird','waterbird', 'water bird'];

function checkImages() {
  var images = document.getElementsByTagName('img'), i = 0, img;
  while (image = images[i++]) {
    let imgSrc = String(image.src).toLowerCase();
    let altText = String(image.alt).toLowerCase();

    if (stringContainsBird(imgSrc) || stringContainsBird(altText)) {
      replaceBirdWithFiltered(image)
    } else {
      // Hide image while processing
      image.style.visibility = 'hidden';
      processImage(image);
    }
  }
}

function stringContainsBird(string){
  return string.includes('bird')
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
    console.log('Success:', response);
    labels = response.responses[0].labelAnnotations;
    var isBird = false;
    for (var x = 0; x < labels.length; x++) {
      currentLabel=labels[x];

      if (birdFeatures.includes(currentLabel.description) && currentLabel.score > .60) {
        // handle image replacement
        // img.src = 'http://via.placeholder.com/350x150';
        img.src = 'http://i0.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg';
        isBird = true;
        break;
      }
    }
    if (!isBird){
      img.style.visibility = 'visible';
      console.log(labels);
    }
  });
}
