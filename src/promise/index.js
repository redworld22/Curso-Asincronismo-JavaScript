const promise = new Promise(function(resolve, reject){
    resolve("Hey!");
});

const cow = 9;

const countCows = new Promise(function (resolve, reject){
    if(cow > 10){
        resolve(`We have ${cow} cows on the farm`)
    } else{
        reject('There are not enough cow for the milk that we needed')
    }
})

countCows.then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
}).finally(()=>console.log('Finally'))
