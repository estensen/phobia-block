document.addEventListener('DOMContentLoaded', checkImages(), false);
const birdFeatures=['beak', 'finch', 'wing', 'bird', 'lark', 'seabird','waterbird', 'water bird'];
const url = 'https://vision.googleapis.com/v1/images:annotate?key=';

function checkImages() {
  var images = document.getElementsByTagName('img'), i = 0, img;
  while (image = images[i++]) {
    let imgSrc = String(image.src).toLowerCase();
    let altText = String(image.alt).toLowerCase();

    if (stringContainsBird(imgSrc) || stringContainsBird(altText)) {
      replaceBirdWithFiltered(image)
    } else {
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

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
  .catch(error => console.error('Error. Something messed up here:', error))
  .then(response => {
    console.log('Success:', response);
    labels = response.responses[0].labelAnnotations;
    var isBird = false
    for (var x = 0; x < labels.length; x++) {
      currentLabel=labels[x];

      if (birdFeatures.indexOf(currentLabel.description) > -1 && currentLabel.score > .60) {
        // handle image replacement
        // img.src = 'http://via.placeholder.com/350x150';
        img.src = 'http://i0.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg';
        isBird = true;
        break;
      }
    }
    if (!isBird){
      console.log(labels);
    }
  });
}
