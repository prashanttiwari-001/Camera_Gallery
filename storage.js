let db;
// open dataBase
let openRequest = indexedDB.open("myDataBase");
// jb bhi open ho jaye to 3 listeners hote hai
openRequest.addEventListener("success",(e)=>{
    console.log("DB Success");
    // set value
    db = openRequest.result;
})
openRequest.addEventListener("error",(e)=>{
    console.log("DB error");
})
openRequest.addEventListener("upgradeneeded",(e)=>{
    console.log("DB upgraded and also for initial DB creation");
   
    db =openRequest.result;

    // object store created
    // objectStore created and modify only in upgradeneeded event
    db.createObjectStore("video",{keyPath:"id"});
    db.createObjectStore("image",{keyPath:"id"});


})

