/* Global Variables */

    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.toDateString();
    
    // Get the base Url   
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

    // Personal API Key of OpenWeatherMap API
    const apiKey = '&appid=5ce62b2a9ee05c073f6d34d45b50163a&units=metric';


    // icon of weather description url
    const iconURL = 'http://openweathermap.org/img/w/'


/* Event listener to add function to existing HTML DOM element*/

    // event listener to add generateData function to generate button
    document.getElementById('generate').addEventListener('click', generateData);

    // event listener to add okInvalidMes function to ok button
    document.getElementById('ok').addEventListener('click', okInvalidMes);



/* Function called by event listener */

    // Create function to get input values and post the generated data in the server
      function generateData()
       {
         // Get zipcode and feeling onclick the generate button
         const zipCode = document.getElementById('zip').value;
         const feelings = document.getElementById('feelings').value;

         // GET Web API Data
         getWeatherData(baseURL,zipCode,apiKey).then((data) =>{
           // create info object to post it in the server
                const dataObj = {
                    date: newDate,
                    city: data.name,
                    temp: data.main.temp,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                    cloud: data.clouds.all,
                    icon: data.weather[0].icon,
                    cont: feelings
                };
   
                // POST data
                postData('/add',dataObj);
                // update data in html 
                updateUi();
             
         });
        }
   /*****************************************************************/ 
   
   // create function to close invalid message 
     function okInvalidMes()
     {
        const invalidMes = document.getElementById('invalidMes');
        const invalidMesStr = document.getElementById('invalidMesStr');
           // close invalid message 
            invalidMes.style.display = 'none';
            invalidMesStr.innerHTML = '';
      }
    /***************************************************************/




/* Function to GET Web API Data*/
    const getWeatherData = async (baseURL,zipCode,key) =>{
        try
        {
            const response = await fetch(baseURL+zipCode+key);
            const data = await response.json();

            console.log(data);

            if (data.cod != 200) // if failed to get data print invalid message to user
            {
                const invalidMes = document.getElementById('invalidMes');
                const invalidMesStr = document.getElementById('invalidMesStr');

                invalidMesStr.innerHTML=data.message+', please enter a valid zip code';
                invalidMes.style.display = 'flex';
                invalidMes.style.flexDirection = 'column';
            }
            else
            {
                return data;
            }

        }
        catch(error)
        {
            console.log("error",error);
        }
    };


/* Function to POST data */
    const postData = async (url = '' , data = {}) => {
        const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

        try
        {
            const newData = await response.json();
            console.log(newData);
            return newData
        }
        catch(error)
        {
            console.log("error",error);
        }
    }


/* Function to GET Project Data */
    const updateUi = async () => {
        try{
            // fetch data from the server 
            const response = await fetch('/all');
            const saveData = await response.json();
            
            // update data in html
               // update main data in the left side 
                document.getElementById("icon").src = `${iconURL}${saveData.icon}.png` ;
                document.getElementById("date").innerHTML = saveData.date;
                document.getElementById("city").innerHTML = saveData.city;
                document.getElementById("temp").innerHTML = Math.round(saveData.temp)+' &degC';
                document.getElementById("descr").innerHTML = saveData.description;
                document.getElementById("content").innerHTML = saveData.cont;

               // update weather details data in the right side 
                document.getElementById("dcity").innerHTML = saveData.city;
                document.getElementById("dtem").innerHTML = Math.round(saveData.temp)+' &degC';
                document.getElementById("hum").innerHTML = saveData.humidity+' %';
                document.getElementById("cloud").innerHTML = saveData.cloud+' %';
                document.getElementById("wind").innerHTML = saveData.wind+' km/h';
                
        }
        catch(error)
        {
            console.log("error",error);
        }
    };
