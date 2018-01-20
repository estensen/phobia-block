var images = document.getElementsByTagName('img');
for (var x = 0, x<images.length; x++) {
  currentImage=images[x]
  if (isBird(currentImage))
    images[x].src = 'some wholesome image url' + images[x].width + '/' + images[x].height;
}


function isBird(image){
  //some code to figure out if image is a bird, using google cloud
}
