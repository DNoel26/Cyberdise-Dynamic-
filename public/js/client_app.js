//import Test from "../js/newFile.js";
//import Rating_Widget from "../js/rating_widget.js"

console.log("Client side js working!");
//Test.trying();

const App =
{
    init()
    {
        const doc_html = document.querySelector("html header");
        const doc_body = document.querySelector("body");
        const home_page_html = document.querySelector("#home_page_html");
        const home_page_body = document.querySelector("#home_page_body");
        const home_page_hero = document.querySelector("#home_page_hero");
        const home_page_main = document.querySelector("#home_page_main");
        const page_top = document.querySelector("#go_to_top");
        const special_div = document.querySelector("#spec");

        const header_login_btn = document.querySelector("#header_login_btn");
        //const header_login_btn = document.getElementById("header_login_btn");
        const country_select = document.querySelector("#signup_login_form_section select#country");
        const top_country_option = document.querySelector("#signup_login_form_section select#country option#top_selection");
        const country_flag_img = document.querySelector("#country_flag");
        const country_flag_src = document.querySelector("#country_flag_src");
        const modal = document.querySelectorAll(".modal");
        const modal_btn = document.querySelectorAll(".modal_close_btn");

        const testtt = document.querySelector("#testtt"); //TO TEST SENDING JSON FROM CLIENT TO SERVER

        const rating_div = document.createElement("div");

        const created_option = [];
        class Country
        {
            name;
            flag;
            alpha2Code;
            alpha3Code;
            callingCodes = [];
            currencies = [];
        };

        let country_json = {};
        const country_arr = [];

        function go_to_top()
        {
            page_top.click();
        }

        function go_to_main()
        {
            home_page_main.scrollIntoView(true, {behavior: "smooth"});
        }
          
        document.addEventListener("DOMContentLoaded",()=>{

            console.log("Client side js working!");
            //home_page_main.innerHTML += `<div><br><br>HELLO YOU {{test}}</div>`;

            class API 
            {
                endpoint;

                constructor(ep)
                {
                    this.endpoint = ep;
                };

                fetch_API()
                {
                    return new Promise((resolve,reject)=>{

                        fetch("https://restcountries.eu/rest/v2/all")
                        .then((response)=>response.json())
                        .then((data)=>{

                            console.log("API data before resolve",data)
                            resolve(data);
                        }) 
                        .catch(()=>console.log("Failed to fetch API",reject()));   
                    });    
                };
            };

            const rest_country_api = new API("https://restcountries.eu/rest/v2/all");

            console.log(rest_country_api);
            console.log(rest_country_api.fetch_API());

            rest_country_api.fetch_API()
            .then((country_api_data)=>{

                //country_flag_img.setAttribute("src",`${country_arr[index].location_flag}`);
                console.log(country_api_data);

                country_api_data.forEach((country,index) => {
                    
                    //console.log(country,index);

                    created_option[index] = document.createElement("option");
                    created_option[index].setAttribute("value",`${country.name}`);
                    created_option[index].innerHTML = country.name;    
                    country_select.appendChild(created_option[index]); 

                    country_arr.push({

                        location_name: country.name, 
                        location_alpha2Code: country.alpha2Code,
                        location_alpha3Code: country.alpha3Code, 
                        location_callingCodes: country.callingCodes,
                        location_currencies: country.currencies, 
                        location_flag: country.flag,
                    });
                    
                    if(top_country_option.value === created_option[index].value)
                    {
                        created_option[index].style.display = "none";
                        //created_option[index].style.visibility = "hidden";
                        //created_option[index].setAttribute("disabled","disabled")
                    }

                    //if(index > 0)
                    //{
                        //const created_option = option.createElement("option");
                        //const option_text = option.createTextNode("try");
                        //let create_option = country_select.createElement("option");
                        
                        //created_option.setAttribute("value",`${country[index].name}`);
                        //created_option.innerHTML = country[index].name;
                        //country_select.appendChild(created_option);
                        //created_option.appendChild(option_text);
                    //}   
                });

                const country_options = document.querySelectorAll("#signup_login_form_section select#country option");
                const flag_store = country_flag_img.src;

                if(top_country_option.value === "")
                {
                    country_flag_img.setAttribute("class","hide_element");
                }

                console.log(created_option[0]);
                console.log(country_arr[0]);
                console.log(country_arr[0].location_currencies[0].symbol);
                console.log(country_arr);
              
                country_select.addEventListener("change",()=>{

                    country_flag_img.removeAttribute("class","hide_element");

                    if(top_country_option.selected && top_country_option.value === "")
                    {
                        country_flag_img.setAttribute("class","hide_element");
                    }

                    created_option.forEach((option,index) => {

                        if(option.selected && option.value !== top_country_option.value)
                        {
                            console.log(option,index);
                            country_flag_img.setAttribute("src",`${country_arr[index].location_flag}`);
                            country_flag_src.value = country_arr[index].location_flag;
                        }
                    });

                    if(top_country_option.selected)
                    {
                        country_flag_img.setAttribute("src",`${flag_store}`);
                        country_flag_src.value = flag_store;
                        console.log("FLAGGGG",country_flag_img.src);
                    }   
                })

                if(top_country_option.selected)
                {
                    country_flag_img.setAttribute("src",`${flag_store}`);
                    country_flag_src.value = flag_store;
                }

                if(country_flag_img.src === "")
                {
                    country_flag_img.style.display = "none";
                }
                
                //alert(country_arr[0].location_name);

                return country_arr;
            })
            .then((country_arr)=>{

                country_json.data = country_arr;
                
                console.log("COUNTRY JSON");
                console.log(country_json);
                //alert(country_arr[1].location_name);
                const country_arr_str = JSON.stringify(country_arr);
                const country_json_str = JSON.stringify(country_json);
                //console.log(country_arr_str);
                //document.querySelector("#signup_btn").addEventListener("click",()=>{});
                const test_obj = {test: 1,test_2: "two", test_3: "three"};
                const test_obj_str = JSON.stringify(test_obj);
                
                let signup_url = 'http://localhost:3000/signup';

                    fetch(signup_url,{

                        method: 'POST',
                        headers : {'Content-Type': 'application/json',
                                    'Accept': 'application/json'},
                        body: country_json_str//country_json_str
                    })
                    .then(function(response) {
                        
                        console.log(response);
                        console.log("FETCH THEN 1");
                        return response.json();
                    })
                    .then(function(data) {
                        
                        console.log("FETCH THEN 2");
                        return console.log(data);
                    })
                    .catch(err=>console.log(`ERROR IN SENDING JSON: ${err}`));
            })
            .catch((err)=>`Failed to fulfil promise: ${err}`);
            //testtt.value = encodeURIComponent(country_arr_str); //TO TEST SENDING JSON FROM CLIENT TO SERVER

            // SYNC CODE
            console.log(country_arr);
            console.log(header_login_btn)
            //doc_body.style.backgroundColor = "red";
            //header_login_btn.style.backgroundColor = "red";

            header_login_btn.addEventListener("click",()=>{

                alert("YOU CLICKED!");
                console.log("clicked");
                modal[0].classList.toggle("remove_element");
                //modal[0].setAttribute("class","modal");
            });

            modal_btn[0].addEventListener("click",()=>{

                alert("MODAL CLOSE BUTTON CLICKED")
                modal[0].classList.toggle("remove_element");
            });
        });
    },
};

App.init();

//export default App; 


        /*const best_seller_height_adjust = new IntersectionObserver((entries)=>{

            if(entries[0].isIntersecting === true)
            {
                console.log("I see you!");
                //home_page_html.scrollBehavior = "smooth";
                //window.scrollTo(0, 0);
                //go_to_top();
                //home_page_body.style.height = "100vh";    
                
                //height_adjust.unobserve(entries[0].target);

                let test = new Promise((resolve)=>{

                    go_to_top()

                    setTimeout(resolve,200)
                }) 
                .then(()=>{

                      home_page_body.style.height = "100vh";   
                })

                    //home_page_body.style.scrollSnapType = "y mandatory";
                    //home_page_body.style.overflow = "auto";   

                go_to_main()
            }
        },{threshold: [0.9]});*/