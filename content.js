var images = this.document.getElementsByTagName('img');
const birdFeatures=["beak", "finch", "wing", "bird", "lark", "seabird","waterbird", "water bird"];
const url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAGP_QBmE-Brt-uItNnFj2T_9QRvDRKU40';
 for (var x=0; x<images.length;x++) {

   currentImage=images[x];

 if (currentImage.src.indexOf("bird")>-1)
currentImage.src="http://i0.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg"

 else
   processImage(currentImage);
 }
//
// function isBird(image){
//   //some code to figure out if image is a bird, using google cloud
//   //if it isnt a bird
//   return false;
//   //otherwise return true
//   return true;
// }
//
// //returns true if the image name has bird
// function nameContainsBird(image){
//  console.log(image.src);
//  return image.src.indexOf("bird")>-1;
// }

console.log("hey")
function processImage(img) {

  var data = {
    "requests": [{
      "image": {
        "source": {
          //"imageUri": "https://upload.wikimedia.org/wikipedia/commons/3/32/House_sparrow04.jpg"
          "imageUri": img.src
        }
      },
      "features": [{
          "type": "LABEL_DETECTION",
          "maxResults":40
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
    var isBird=false
    for (var x=0; x<labels.length; x++) {
      currentLabel=labels[x];

      if (birdFeatures.indexOf(currentLabel.description)>-1 && currentLabel.score>.60) {
        // handle image replacement
        // img.src = 'http://via.placeholder.com/350x150';
        img.src = 'http://via.placeholder.com/' + img.width + 'x' + img.height;
        isBird=true;
        break;
      }


    }
    if (!isBird){
      console.log(labels);
    }
  });
}
