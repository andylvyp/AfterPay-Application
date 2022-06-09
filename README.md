# AfterPay Application

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
* Swiper has issues in test. If you want to run test, change the import files in ```SwipeSelect/index.tsx```
Then run ```yarn test```