
const yargs = require('yargs');

const geocode = require('./geocode');
const weather = require('./weather');
const argv = yargs
.options({
   a:{
     demand: true,
     alias: 'address',
     describe: 'Address to fetch weather for',
     string: true
   }
})
.help()
.alias('help', 'h')
.argv;

geocode.geocodeAddress(argv.Address, (errorMessage, results) =>{
  if(errorMessage){
    console.log(errorMessage);
  }
  else{
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) =>{
      if(errorMessage){
        console.log(errorMessage);
      }
      else{
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });

  }
});
