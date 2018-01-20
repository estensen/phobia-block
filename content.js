var images = document.getElementsByTagName('img');

for (var image in images) {

  if (nameContainsBird(image) || isBird(image))
    image.src = 'https://en.wiktionary.org/wiki/cat#/media/File:Cat03.jpg';
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
 return image.src.indexOf("bird").ignoreCase()>-1
}
