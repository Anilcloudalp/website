fetch('./data.json')
.then(res => res.json())
.then(data =>{
var Data = JSON.stringify(data);
localStorage.setItem("DATA",Data);
});
var localproducts = localStorage.getItem('DATA');
var mainData =JSON.parse(localproducts);

// function navbtn(value){
//   value.classList.toggle('opened');
//   value.setAttribute('aria-expanded', 
//   value.classList.contains('opened'))
// }


var itemcontainer = document.getElementsByClassName('slidecontainer');
var sliderbar     = document.getElementById('list');

$( "#slider-range" ).slider({
  range: true,
  min: 0,
  max: 2000,
  values: [ 0, 2000 ],
  slide: function( event, ui ) {
    $( "#min" ).val( ui.values[ 0 ]);         // + " - $" + ui.values[ 1 ] 
    $("#max").val( ui.values[1]);
    $('#list .wrapper').empty();

   availableproducts(ui.values[0],ui.values[1]);
   
  }
});

$( "#min" ).val( $( "#slider-range" ).slider( "values", 0 ));      //      $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
 $("#max").val( $( "#slider-range" ).slider( "values", 1 ));    //        " - $" + $( "#slider-range" ).slider( "values", 1 ) );

//          min and max displayed data
var minx = document.getElementById("min");
var maxy = document.getElementById("max");

//           min and max divs to hold data
minval = document.querySelector(".min").innerHTML ;
maxval = document.querySelector(".max").innerHTML;

// ==================================Display products per page function

productsperpage = (value) =>{
document.getElementById("productsvalue").innerHTML = value;
$('#list .wrapper').empty();
availableproducts(minval,maxval);                       
}

// ==================================Display function products Per Page END
// ===========Low - High n viceversa sorting

productsort = (lowhigh) =>{
  document.getElementById("productsortvalue").innerHTML = lowhigh;
$('#list .wrapper').empty();
availableproducts(minval,maxval);                      
// console.log('minval',minval,maxval)
 
 }
//======================== Low - High sorting End


searchfield = ()=>{
  $('#list .wrapper').empty();
  availableproducts(minval,maxval)

}

// ================================ Available function
var searchinput;
var products="";
var filteredUpperCaseData;

availableproducts =((min,max)=>{

      minval = minx.value;
      maxval = maxy.value;
  
  PAGE = document.getElementById("productsvalue").innerHTML;  //products/page value
  sort = document.getElementById("productsortvalue").innerHTML;

  searchinput = document.getElementById("searchInput").value.toUpperCase();
  
  if(sort == "high") mainData.items.sort((a,b)=> b.onlinecustomerprice > a.onlinecustomerprice ? 1 : -1 )
  else mainData.items.sort((a,b)=> a.onlinecustomerprice > b.onlinecustomerprice ? 1 : -1 )

  pageSize = 5;
  if(PAGE)pageSize = PAGE;

  if(min == null) min = minval;
    if(max == null) max = maxval;

var itemscount = 0;

products = mainData.items.filter(element => { 
  
  filteredUpperCaseData = element.itemid.toUpperCase();
  if(searchinput){
    if(filteredUpperCaseData.indexOf(searchinput) > -1){
        return element? element : -1;
  }
  }
  else if(element.onlinecustomerprice >min && element.onlinecustomerprice<max){
    itemscount += 1;       //to count noof products
  return element? element : -1;
  } 

 
})  

$('#list').pagination({ 
  dataSource:products, 
  pageSize:pageSize,
  callback: function(data, pagination) {
  $('#list .wrapper').empty();

  if(itemscount <= pageSize){
    $(".paginationjs").attr("style", "display:none")    //to hide pagination if products less than products/page
  }

  $.each(data, function (i, data) {
      $('#list .wrapper').append(    
         ` <div class="card mt-5">
         <img src="https://images-na.ssl-images-amazon.com/images/I/81fk%2BcshV-L._SL1500_.jpg" alt="Gaming Monitor" style="width:100%">
         <div class="card-body">
         <h6 class="card-title">${data.itemid}</h6>
         <h4 class="card-title">$${data.onlinecustomerprice}</h4>
         </div>
         </div>
         `  
         );
  });
  }
  });
})
availableproducts(0,2000);

// ===============================mobile nav icon




const navslider = () =>{
  const icon = document.querySelector('.menuicon');
  const navmenu = document.querySelector('.navlist');

  icon.addEventListener('click', ()=>{

      // itemcontainer.classList.toggle('hide');
      sliderbar.classList.add('hide');

      navmenu.classList.toggle('nav-active');
      navmenu.style.transition = "transform 0.4s ease-in";
      
  });

  document.addEventListener('click', (e)=>{      
                  //removes the navigation container and the icon animation on clicking anywhere    //here if the condition is true two events will occur which are passed in a () separated by , 
  !icon.contains(e.target)? (navmenu.classList.remove('nav-active') , icon.classList.remove('opened'),itemcontainer.classList.remove('hide'),sliderbar.classList.remove('hide')) : '' ; //ternary operator

})

}
navslider();