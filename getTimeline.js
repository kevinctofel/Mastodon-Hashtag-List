const getTimeline = async() => {

  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)"
   }
   
   let response = await fetch("https://hachyderm.io/api/v1/timelines/public", { 
     method: "GET",
     headers: headersList
   });
   
   
   let data = await response.text();
   console.log(data);
  
   return data;
}

