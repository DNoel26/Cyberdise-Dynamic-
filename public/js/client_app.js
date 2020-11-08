//import Test from "../js/newFile.js";
//import Rating_Widget from "../js/rating_widget.js"

//const { response } = require("express");

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
        const signup_page_html = document.querySelector("#signup_page_html");
        const products_page_html = document.querySelector("#products_page_html");
        const special_div = document.querySelector("#spec");

        const header_login_btn = document.querySelector("#header_login_btn");
        const header_login_submit_btn = document.querySelector("#header_login_submit_btn");
        const login_submit_btn = document.querySelector("#login_submit_btn");
        //const header_login_btn = document.getElementById("header_login_btn");
        const country_select = document.querySelector("#signup_login_form_section select#country");
        const top_country_option = document.querySelector("#signup_login_form_section select#country option#top_selection");
        const country_flag_img = document.querySelector("#country_flag");
        const country_flag_src = document.querySelector("#country_flag_src");
        const modal = document.querySelectorAll(".modal");
        const modal_close_btns = document.querySelectorAll(".modal_close_btn");
        const username_email_login = document.querySelector(".modal #username_email");
        const password_login = document.querySelector(".modal #password");
        const form_error_msg = document.querySelectorAll(".form_error_msg");
        const login_animation = document.querySelector(".lds-ellipsis");
        const success_modal = document.querySelector("#success_modal");

        const pagination = document.querySelectorAll(".pagination");
        const products_display = document.querySelectorAll("#products_page_html .products_display");
        const products_section = document.querySelector("#products_page_html #products_section");
        const products_next_btn = document.querySelectorAll("#products_page_html .products_next_btn");
        const products_prev_btn = document.querySelectorAll("#products_page_html .products_prev_btn");
        const products_page_btn = document.querySelectorAll("#products_page_html .products_page_btn");
        const page_num = document.querySelectorAll(".page_num");
        const page_spacer = document.querySelectorAll(".page_spacer");

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
        };

        function go_to_main()
        {
            home_page_main.scrollIntoView(true, {behavior: "smooth"});
        };

        function is_obj_keys_null(obj) 
        {
            return Object.values(obj).some(key => key !== null);
        };

        document.addEventListener("DOMContentLoaded",()=>{

            console.log("Client side js working!");
            //home_page_main.innerHTML += `<div><br><br>HELLO YOU {{test}}</div>`;
            //username_email_login.value = "test";
            
            const username_email_login_info = JSON.parse(localStorage.getItem("username_email_login"));
            //alert(username_email_login_info);
            if(signup_page_html === null)
            {
                username_email_login.value = username_email_login_info;
            }
            
            class API 
            {
                endpoint;
                method;
                head = {};
                body = {};

                constructor(ep,mtd,head,bod)
                {
                    this.endpoint = ep;
                    this.method = mtd;
                    this.head = head;
                    this.body = bod;
                }

                fetch_API()
                {
                    return new Promise((resolve,reject)=>{

                        fetch(this.endpoint,{

                            method: this.method,
                            headers: this.head,
                            body: this.body
                        })
                        .then((response)=>response.json())
                        .then((data)=>{

                            console.log("API data before resolve",data);
                            resolve(data);
                        }) 
                        .catch(()=>console.log(`Failed to fetch API @ ${this.endpoint}`,reject()));   
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
                
                let signup_url = '/signup';

                    fetch(signup_url,{

                        method: 'POST',
                        headers : {'Content-Type': 'application/json',
                                    'Accept': 'application/json'},
                        body: country_json_str, //country_json_str
                        credentials: "same-origin"
                    })
                    .then(function(response) {
                        
                        console.log("RESPONSE ON SIGNUP PAGE LOAD",response);
                        return response.json();
                    })
                    .then(function(data) {
                        
                        console.log("DATA ON SIGNUP PAGE LOAD");
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

            if(signup_page_html !== null)
            {
                login_submit_btn.addEventListener("click",()=>{
                    
                    //alert("PRESSED");
                    login_animation.classList.toggle("hide_element");
                });  
            }

            else
            {
                if(header_login_btn)
                {
                    header_login_btn.addEventListener("click",()=>{

                        //alert("YOU CLICKED!");
                        console.log("header login btn clicked");
                        modal[0].classList.toggle("remove_element");
                        //login_animation.classList.toggle("hide_element");
                        //modal[0].setAttribute("class","modal");
                    });
                }
                
                modal_close_btns[0].addEventListener("click",()=>{
    
                    //alert("MODAL CLOSE BUTTON CLICKED");
                    modal[0].classList.toggle("remove_element");
                });

                function remove_modal(event) 
                {    
                    let e = event.target;
                    if(e.className === "modal")
                    {
                        e.classList.toggle("remove_element");
                    };
                };
                
                modal.forEach((element) => {
                    
                    element.addEventListener("click", remove_modal);  
                });

                //document.querySelector("body").addEventListener("click",()=>{alert("YES")})

                header_login_submit_btn.addEventListener("click",(event)=>{

                    //alert("HEADER LOGIN SUBMITTED");
                    event.preventDefault();

                    modal.forEach((element) => {

                        element.removeEventListener("click",remove_modal);
                    }); 

                    const load_time = setTimeout(() => {
                        
                        login_animation.classList.toggle("hide_element"); 
                    }, 200);
    
                    localStorage.setItem("username_email_login", JSON.stringify(username_email_login.value));
    
                    let is_header_login = 
                    {
                        data: true,
                        username_email: username_email_login.value,
                        password: password_login.value
                    };
    
                    const url = '/auth/login';
                    fetch(url,{
                        method: 'POST',
                        headers : {'Content-Type': 'application/json',
                                        'Accept': 'application/json'},
                        body: JSON.stringify(is_header_login),
                        credentials: "include" 
                    })
                    .then(function(response){
    
                        console.log("HEADER LOGIN BUTTON - RESPONSE - ON SUBMIT");
                        
                        return response.json();
                    })
                    .then(function(data){
                        
                        //alert("LOGIN API DATA");
                        console.log("HEADER LOGIN BUTTON - LOGIN API DATA - ON SUBMIT");
                        //prevents modal from closing during reload
                        modal.forEach((element) => {
                    
                            element.addEventListener("click", remove_modal);  
                        });
    
                            console.log(data.errors.username_email_login);
                            console.log(data);
                            clearInterval(load_time);
    
                            let error_msg = is_obj_keys_null(data.errors);
                            console.log(is_obj_keys_null(data.errors));
    
                        if(error_msg === false)
                        {
                            form_error_msg[0].innerHTML = "";
                            form_error_msg[1].innerHTML = "";
                            form_error_msg[2].innerHTML = "";
                            console.log("LOGIN USING HEADER SUCCESSFUL");
                            localStorage.removeItem("username_email_login");
                            password_login.value = "";
                            let load_dots = "";
    
                            const redirect_timer = setInterval(() => {
                                
                                modal[0].innerHTML = 
                                `
                                <div id="login_form_section_right" class="modal_content">
                                    
                                    <div id="login_success">
                                        <h2>${data.message}<br><br>Refreshing Page${load_dots}</h2>
                                    </div>
                                </div>
                                `
                                load_dots += ".";
    
                                if(load_dots === "....")
                                {
                                    clearInterval(redirect_timer);
                                }
                            }, 200);
                            
                            setTimeout(() => {
                                
                                location.reload();
                            }, 1500);
                            //modal[0].classList.toggle("remove_element");
                            //location.reload();
                        }
    
                        else
                        {
                            form_error_msg[0].innerHTML = data.errors.result;
                            form_error_msg[1].innerHTML = data.errors.username_email_login;
                            form_error_msg[2].innerHTML = data.errors.password_login;
                            if(!login_animation.classList.contains("hide_element"))
                            {
                                login_animation.classList.add("hide_element");
                            }
                        };
                    })
                    .catch((err)=>`Failed to fulfil promise: ${err}`); 
                });
            }

            if(success_modal)
            {
                setTimeout(() => {
            
                    success_modal.classList.add("remove_element");
                }, 1500);
            }  
            
            if(products_page_html)
            {
                const observers = [];

                pagination.forEach(element => {
                 
                    const observer = new IntersectionObserver(([entries])=>{

                        //console.log(entries);
                           
                        if(entries.isIntersecting)
                        {
                            element.classList.add("pagination_in_view");
                        }

                        else
                        {
                            element.classList.remove("pagination_in_view");
                        }

                    },{threshold: [0]})

                    observers.push(observer);
                });
                
                console.log(observers)
                observers.forEach((element,index) => {
                    
                    element.observe(pagination[index]);
                });

                //alert("SIGNUP!");
                console.log("NUM OF PRODUCTS ON DISPLAY",products_display.length);
                let curr_page = 1;
                let items_per_page = 3; //12
                let num_of_items = products_display.length;
                let num_of_pages = 12//parseInt(num_of_items / items_per_page);
                console.log(num_of_pages);
                let direction = "";
                page_num[0].innerHTML = 1;
                page_num[6].innerHTML = 1;
                page_num[5].innerHTML = num_of_pages;
                page_num[11].innerHTML = num_of_pages;

                function highlight_page()
                {
                    //const mid_pg_nums = []
                    
                    page_num.forEach(element => {
                        
                        if(parseInt(element.innerHTML) === curr_page)
                        {
                            element.setAttribute("class","button_class page_num active_page");
                        }
    
                        else
                        {
                            element.setAttribute("class","button_class page_num");
                        };
                    }); 

                    if(curr_page > 0 && curr_page < 5)
                    {
                        page_spacer[0].style.display = "none";
                        page_spacer[2].style.display = "none";
                    }

                    else
                    {
                        page_spacer[0].style.display = "initial";
                        page_spacer[2].style.display = "initial";
                    };

                    if(curr_page > (num_of_pages - 5) && curr_page <= num_of_pages)
                    {
                        page_spacer[1].style.display = "none";
                        page_spacer[3].style.display = "none";
                    }

                    else
                    {
                        page_spacer[1].style.display = "initial";
                        page_spacer[3].style.display = "initial";
                    };
                };

                function change_middle_nums(dir)
                {
                    page_num.forEach(element => {
                        
                        if(element.dataset.pgNumType == "middle" && (curr_page > 5 || curr_page < (num_of_pages - 5)))
                        {
                            console.log(element);
                            if(dir == "next")
                            {
                                element.innerHTML ++;
                            }

                            else if(dir == "prev")
                            {
                                element.innerHTML --;
                            }
                        }
                    });
                }
                
                highlight_page();
                change_middle_nums(direction);

                function next_page()
                {
                    if(curr_page < num_of_pages)
                    {
                        curr_page++;
                        console.log("PAGE NUM ON CLICK NEXT",curr_page);
                    }

                    return direction = "next";
                };

                function prev_page()
                {
                    if(curr_page > 1)
                    {
                        curr_page--;
                        console.log("PAGE NUM ON CLICK PREV",curr_page);
                    }

                    return direction = "prev";
                };

                function change_page(direction)
                {
                    if(curr_page < 1)
                    {
                        curr_page = 1;
                    };

                    if(curr_page > num_of_pages)
                    {
                        curr_page = num_of_pages;
                    };

                    highlight_page();
                    change_middle_nums(direction);
                };

                products_display.forEach(product => {
                    
                    console.log(product);
                });

                //console.log(products_next_btn)
                products_next_btn.forEach(element => {
                    
                    element.addEventListener("click",()=>{

                        next_page();
                        //alert(`NEXT ${curr_page}`);
                        console.log(direction);
                        change_page(direction);
                    });
                });

                products_prev_btn.forEach(element => {
                    
                    element.addEventListener("click",()=>{

                        prev_page();
                        //alert(`PREV ${curr_page}`);
                        console.log(direction);
                        change_page(direction);
                    });
                });
            }
        }); //end of DOMContentLoaded
    }, //end of init()
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