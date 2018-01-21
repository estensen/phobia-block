# phobia-blocker
Help people who have phobia block an image that they are fear of.

### Inspiration
One of our teammate's girlfriend is fear of birds. We realize that even though Google Vision API can block inappropriate contents, it is not specifically for adult, abused or sexual images. Therefore, we built a browser extension to block specific photos. 

### What it does
Once an user initiates the Phobia-Blocker extension, he/she can choose what kinds of animals/insects that they are afraid of from a list (so far, only birds and spiders). Once the extension operates, it will automatically block that image in any webpage that an user browses. 

### Getting Started
1. Set up Google Cloud Platform - Vision API
2. Development

###### Set up Google Cloud Platform - Vision API
We basically follow the steps from Google's documentation to get the API keys from Google Cloud Vision API. The document is [here](https://cloud.google.com/vision/docs/). We use the [Interactive label detection tutorial](https://cloud.google.com/vision/docs/label-detection-tutorial) and [Google Cloud Shell](https://cloud.google.com/shell/docs)to enable Vision API and set up credentials. 

Once we set up, we are able to get the API keys from [Navigate to the APIs & Services→Credentials](https://cloud.google.com/docs/authentication/api-keys). Afterward, we create credentials, select an API key and a dialogue will pop up and show the API keys.

The other API settings can be learned from [here](https://cloud.google.com/docs/authentication/api-keys).


### What's next for Phobia Blocker
We have several sketch goals like:
1. Support blocking of any object/animal, which will need a proper UI for text input
2. Blur out scary object (sometimes birds)
3. Click on the image to actually see it
4. Don’t run on this domain but makes it as a browser extension 
5. Display amount of birds blocked in web page. Display total birds blocked.
6. Implement [exposure therapy](http://www.anxietycare.org.uk/docs/animal.asp)

