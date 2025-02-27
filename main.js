
let chartInstance; // Declare a global variable to store the chart instance
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = "create";
let tmp;



console.log(price, taxes,ads, discount)
 

// Get Total
function getTotal() {

if(price.value != ''){
    if (parseFloat(price.value) > 30000) price.value = 30000;
    if (parseFloat(taxes.value) > 30000) taxes.value = 30000;
    if (parseFloat(ads.value) > 30000) ads.value = 30000;
    if (parseFloat(discount.value) > 30000) discount.value = 30000;

        // Convert input values to numbers, fallback to 0 if empty
        let priceValue = parseFloat(price.value) || 0;
        let taxesValue = parseFloat(taxes.value) || 0;
        let adsValue = parseFloat(ads.value) || 0;
        let discountValue = parseFloat(discount.value) || 0;

        // Calculate the total
        
            let result = (priceValue + taxesValue + adsValue) - discountValue;
        
        

        // Log converted values and result
        console.log("price:", priceValue, "taxes:", taxesValue, "ads:", adsValue, "discount:", discountValue);
        console.log("result:", result);

        // Display the total
        total.innerHTML = result.toFixed(2); // Show the total with 2 decimal places
        total.style.background = '#040';
    
    }else {
        total.innerHTML = '';
        total.style.background = '#ee1808';
    }
}


// Create product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);   
}else{
    dataPro = [];
}

 
submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    };
    
    if(mood === "create"){
        if(newPro.count > 1 && newPro.category != '' && newPro.title != '' && newPro.price != ''){
            for(let i = 0; i < newPro.count;i++){
                dataPro.push(newPro);
            }
        }if (newPro.count == 1 && newPro.category != '' && newPro.title != '' && newPro.price != '') {
            dataPro.push(newPro);
        } else {
            
        }
    }else{
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    
    

    // save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro));

    clearData();
    showData();
    renderChart(); // Refresh the chart
    
}
 
clearData();

// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read
function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>

        <td>
        <button onclick="updateData(${i})" id="update">update</button>
        </td>

        <td>
        <button onclick="deleteData(${i})" id="delete">delete</button>
        </td>

        </tr>
        `;
        console.log(table);
    }

    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All(${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}

showData();
renderChart();

// delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
    renderChart(); 
}

// Delete All
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData(); 
    renderChart();
}
 

// count



//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;

    
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = `Update`;
    mood = "update";
    tmp = i;

    renderChart();
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
    for(let i=0; i<dataPro.length; i++){
    if(searchMood === 'title')
    {


        
            if(dataPro[i].title.toLowerCase().includes(value)){
                    table += `
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
            
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
        
            if(dataPro[i].category.toLowerCase().includes(value)){
                    table += `
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
            
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






function renderChart() {
    console.log("Rendering Chart");

    // Extract data for the chart
    const titleCounts = {};
    dataPro.forEach(product => {
        const title = product.title;
        if (titleCounts[title]) {
            titleCounts[title]++;
        } else {
            titleCounts[title] = 1;
        }
    });

    const titles = Object.keys(titleCounts); // Unique titles
    const quantities = Object.values(titleCounts); // Counts of each title
    const totals = titles.map(title => {
        const totalForTitle = dataPro
            .filter(product => product.title === title)
            .reduce((sum, product) => sum + (parseFloat(product.total) || 0), 0);
        return totalForTitle;
    });

    // Get the canvas element
    const ctx = document.getElementById('productChart').getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }
    

    // Create a new chart
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: titles,
            datasets: [
                {
                    label: 'Quantity',
                    data: quantities,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue for quantities
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    barThickness: 20, // Set bar width to 20px
                },
                {
                    label: 'Total Price',
                    data: totals,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)', // Purple for total prices
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    barThickness: 20, // Set bar width to 20px
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'white', // Set legend text color to white
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white', // Set X-axis text color to white
                    },
                },
                y: {
                    ticks: {
                        color: 'white', // Set Y-axis text color to white
                    },
                },
            },
        },
    });
}
