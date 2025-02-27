
let title = document.getElementById('title');
let phone = document.getElementById('phone');

let email = document.getElementById('email');
let category = document.getElementById('category');


let submit = document.getElementById('submit');




let mood = "create";
let tmp;







// Create customer
let dataSup;
if(localStorage.customer != null){
    dataSup = JSON.parse(localStorage.customer);   
}else{
    dataSup = [];
}

 
submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        email:email.value.toLowerCase(),
        category:category.value.toLowerCase(),
        phone:phone.value
    };
    
    if(mood === "create"){

        if (newPro.email != '' && newPro.category != '' && newPro.title != '' && newPro.phone != '') {
            dataSup.push(newPro);
        } else {
            
        }
    }
    
    else{
        dataSup[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        email.style.display = 'block';
    }
    
    

    // save localstorage
    localStorage.setItem('customer', JSON.stringify(dataSup));
    console.log(title.value,phone.value,email.value,category.value);
    clearData();
    showData();
    
}
 
clearData() ;

// clear inputs
function clearData(){
    title.value = '';
    phone.value = '';
    
    email.value = '';
    category.value = '';
}

// read
function showData(){
    let table = '';
    for(let i = 0; i < dataSup.length; i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataSup[i].title}</td>
        <td>${dataSup[i].phone}</td>

        <td>${dataSup[i].email}</td>
        <td>${dataSup[i].category}</td>

        <td>
        <button onclick="updateData(${i})" id="update">update</button>
        </td>

        <td>
        <button onclick="deleteData(${i})" id="delete">delete</button>
        </td>

        </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if(dataSup.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All(${dataSup.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}

showData();


// delete
function deleteData(i){
    dataSup.splice(i,1);
    localStorage.customer = JSON.stringify(dataSup);
    showData();
    renderChart(); 
}

// Delete All
function deleteAll(){
    localStorage.clear();
    dataSup.splice(0);
    showData(); 
    renderChart();
}
 

// email



//update
function updateData(i){
    title.value = dataSup[i].title;
    phone.value = dataSup[i].phone;
    email.value = dataSup[i].email;
    category.value = dataSup[i].category;

    submit.innerHTML = `Update`;
    mood = "update";
    tmp = i;

    
    //Introduce a delay before calling scroll to ensure the DOM has updated and the scrollable area is ready.
    setTimeout(() => {
        scroll({
            top: 0,
            behavior: 'smooth',
        });
    }, 50);
    console.log('scroll');
}


//search
let searchMood = 'title';

function getSearchMood(id)
{
    
    let search = document.getElementById('search');
    if( id === 'searchTitle'){
        searchMood = 'title';
        
    }else{
        searchMood = 'category';
        
    }
    search.placeholder = 'Search By '+searchMood;

search.focus();
search.value='';
showData();
}

function searchData(value)
{
    let table = '';
    for(let i=0; i<dataSup.length; i++){
    if(searchMood === 'title')
    {


        
            if(dataSup[i].title.toLowerCase().includes(value.toLowerCase())){
                    table += `
                    <tr>
                    <td>${i}</td>
                    <td>${dataSup[i].title}</td>
                    <td>${dataSup[i].phone}</td>

                    <td>${dataSup[i].email}</td>
                    <td>${dataSup[i].category}</td>
            
                    <td>
                    <button onclick="updateData(${i})" id="update">update</button>
                    </td>
            
                    <td>
                    <button onclick="deleteData(${i})" id="delete">delete</button>
                    </td>
            
                    </tr>
                    `;
            }   
        
        
        
    }
    
     else{
        
            if(dataSup[i].category.toLowerCase().includes(value.toLowerCase())){
                    table += `
                    <tr>
                    <td>${i}</td>
                    <td>${dataSup[i].title}</td>
                    <td>${dataSup[i].phone}</td>

                    <td>${dataSup[i].email}</td>
                    <td>${dataSup[i].category}</td>
            
                    <td>
                    <button onclick="updateData(${i})" id="update">update</button>
                    </td>
            
                    <td>
                    <button onclick="deleteData(${i})" id="delete">delete</button>
                    </td>
            
                    </tr>
                    `;
            }   
        
    }

}
    document.getElementById('tbody').innerHTML = table;
    
}

function logout(){
    window.location.href = '/home/pc/Desktop/ProjectTachfineHoussame/index.html'; // Replace with the actual file name or URL
}



//clean the data


//https://www.youtube.com/feed/downloads 






