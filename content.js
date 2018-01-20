var images = this.document.getElementsByTagName('img');

for (var x=0; x<images.length;x++) {
  currentImage=images[x]
  if (nameContainsBird(currentImage) || isBird(currentImage))
    currentImage.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg';
}

function isBird(image){
  //some code to figure out if image is a bird, using google cloud
  //if it isnt a bird
  return false;
  //otherwise return true
  return true;
}

//returns true if the image name has bird
function nameContainsBird(image){
 console.log(image.src);
 return image.src.indexOf("bird")>-1;
}
