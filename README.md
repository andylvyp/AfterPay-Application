# AfterPay Application
This project contains two components.

* ```<SwiperSelect />```  
```initialIndex``` is the initial value in swiper select. The data is saved in ```src\data\swiper-select.json```  
```theme = "green" | "red" | "yellow"``` set the color scheme in component  
```fontSize = "sm" | "md" | "lg"``` can be changed to use different font size  
```updateValue``` can get values from the form inside component  

* ```<AddressComplete />```  
```fontSize = "sm" | "md" | "lg"``` can be changed to use different font size  
```updateValue``` can get values from the form inside component
## Install
Run ```yarn install``` to install dependencies and run ```yarn start```  
you can find the application at ```http://localhost:3000/```

## Storybook
Run ```yarn storybook``` to run Storybook
Check the components and change parameters at ```http://localhost:6006/```

## Dependency
* UI visualization library: [Storybook](https://storybook.js.org/)
* Swiper : [Swiper](https://swiperjs.com/)
* Google Map Loading : [Google Map JavaScript API Loader](https://googlemaps.github.io/js-api-loader/index.html)
* CSS management: [SASS](https://sass-lang.com/)
* Test library: [React Testing Library](https://testing-library.com/)

## References
* [How to Use Google Place Autocomplete With React Without a Third-Party Library](https://betterprogramming.pub/the-best-practice-with-google-place-autocomplete-api-on-react-939211e8b4ce)


## Caution
* Swiper has issues in test. If you want to run test, change the import files in ```SwipeSelect\index.tsx```
Then run ```yarn test```
* ```.env``` is not uploaded to the project due to safety reason. You can create ```.env``` file and add  
```REACT_APP_GOOGLE_API_KEY=YOUR_API_KEY``` 