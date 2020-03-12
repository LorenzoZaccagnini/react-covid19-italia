
# Covid Italia Project

This project is open source and free, live on [https://coviditalia.netlify.com/](https://coviditalia.netlify.com/). It allows you to consult national, regional and provincial **official** data relating to the COVID-19 emergency in Italy. It's automatically updated from the [official repository](https://github.com/pcm-dpc/COVID-19) made by [**La Presidenza del Consiglio dei Ministri**](http://www.governo.it/it/la-presidenza-del-consiglio-dei-ministri) every time new data is released. The development of the website follows a responsive perspective, to allow its use on any type of display.


### Using official data from 
https://github.com/pcm-dpc/COVID-19

### based on material-sense
https://github.com/alexanmtz/material-sense


# React Material UI template - Material Sense
[material ui](https://material-ui.com/)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Docker

This project works in a docker container as well

First run:
`docker build . -t material-sense`

Then:
`docker run -p 2222:2222 material-sense`

_the 2222 port intend to make work on Azure websites as container for default, cause is the port they use to expose the server_

### Publish at Github pages
`yarn deploy`

## Contributors ✨
Thanks goes to these wonderful people:

* [Lorenzo Zaccagnini](https://github.com/LorenzoZaccagnini) [LinkedIn](https://it.linkedin.com/in/lorenzo-zaccagnini)
* [Elisa Romondia](https://github.com/elisaromondia) [LinkedIn](https://fr.linkedin.com/in/elisa-romondia)

