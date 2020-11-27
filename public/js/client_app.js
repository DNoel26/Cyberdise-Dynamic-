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
        const edit_employee_account_html = document.querySelector("#edit_employee_account_html");
        const edit_customer_account_html = document.querySelector("#edit_customer_account_html");
        const special_div = document.querySelector("#spec");

        const header_login_btn = document.querySelector("#header_login_btn");
        const header_login_submit_btn = document.querySelector("#header_login_submit_btn");
        const login_submit_btn = document.querySelector("#login_submit_btn");
        const product_header_login = document.querySelector("#product_header_login");

        //const header_login_btn = document.getElementById("header_login_btn");
        const country_select = document.querySelector("select#country");
        const top_country_option = document.querySelector("select#country option#top_selection");
        const country_flag_img = document.querySelector("#country_flag");
        const country_flag_src = document.querySelector("#country_flag_src");
        const modal = document.querySelectorAll(".modal");
        const modal_close_btns = document.querySelectorAll(".modal_close_btn");
        const username_email_login = document.querySelector(".modal #username_email");
        const password_login = document.querySelector(".modal #password_login");
        const form_error_msg = document.querySelectorAll(".form_error_msg");
        const login_animation = document.querySelector(".lds-ellipsis");
        const success_modal = document.querySelector("#success_modal");

        const pagination = document.querySelectorAll(".pagination");
        const products_display = document.querySelectorAll("#products_page_html .products_display");
        const products_section = document.querySelector("#products_page_html #products_section");
        //const products_display = document.getElementsByClassName("products_display");
        //const products_section = document.getElementById("products_section");
        const products_next_btn = document.querySelectorAll("#products_page_html .products_next_btn");
        const products_prev_btn = document.querySelectorAll("#products_page_html .products_prev_btn");
        const products_page_btn = document.querySelectorAll("#products_page_html .products_page_btn");
        const page_num = document.querySelectorAll(".page_num");
        const page_spacer = document.querySelectorAll(".page_spacer");
        const go_to_pg_btn = document.querySelectorAll(".go_to_pg_btn");
        const product_page_no_top = document.querySelector("#product_page_no_top");
        const product_page_no_bot = document.querySelector("#product_page_no_bot");
        const current_num = document.querySelectorAll(".current_num");
        const end_num = document.querySelectorAll(".end_num");
        const products_load_modal = document.querySelector("#products_load_modal");
        const all_products_container = document.querySelector("#all_products_container");
        const product_pos_num = document.querySelectorAll(".product_pos_num h3");

        const add_category_btn = document.querySelector("#add_category_btn");
        const remove_category_btn = document.querySelector("#remove_category_btn");
        const add_product_btn = document.querySelector("#add_product_btn");
        const remove_product_btn = document.querySelector("#remove_product_btn");
        const add_order_btn = document.querySelector("#add_order_btn");
        const remove_order_btn = document.querySelector("#remove_order_btn");
        const new_category_list = document.querySelector("#new_category_list");
        const new_category = document.querySelectorAll(".new_category");
        const new_product_list = document.querySelector("#new_product_list");
        const new_product = document.querySelectorAll(".new_product");
        const new_order_list = document.querySelector("#new_order_list");
        const new_order = document.querySelectorAll(".new_order");
        const hidden_counter_products = document.getElementById("hidden_counter_products");

        //const product_code_dropdown = document.querySelectorAll("#new_order_list .product_codes");
        //const product_name_sel = document.querySelectorAll("#new_order_list .product_names");
        const product_code_options = document.querySelectorAll("#new_order_list .product_codes option:checked");
        const product_code_dropdown = document.getElementsByClassName("product_codes");
        const product_name_sel = document.getElementsByClassName("product_names");
        const product_quantity_sel = document.getElementsByClassName("product_quantities");
        const product_cost_price_sel = document.getElementsByClassName("product_cost_prices");
        const product_subtotal_price_sel = document.getElementsByClassName("product_subtotal_prices");
        const product_total_price_sel = document.getElementsByClassName("product_total_price");
        const category_name_dropdown = document.getElementsByClassName("product_categories");

        const incr_product_qty = document.querySelector("#incr_product_qty");
        const decr_product_qty = document.querySelector("#decr_product_qty");
        const product_qty = document.querySelector("#product_qty");
        const product_cart_quantity_add = document.querySelector("#product_cart_quantity_add");
        const product_cart_quantity_ret = document.querySelector("#product_cart_quantity_ret");
        
        //const new_category_list_inputs = document.querySelectorAll("#new_category_list input");
        //const text_areas = document.querySelectorAll("textarea");

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
            //username_email_login.value = "test"; localStorage.setItem("username_email_login", JSON.stringify(username_email_login.value));
            
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

            //console.log(rest_country_api);
            //console.log(rest_country_api.fetch_API());
            console.log("API COUNTRY FETCH START");
            rest_country_api.fetch_API()
            .then((country_api_data)=>{

                //country_flag_img.setAttribute("src",`${country_arr[index].location_flag}`);
                console.log(country_api_data);
                country_api_data.forEach(country => {
                    
                    country_arr.push({

                        location_name: country.name, 
                        location_alpha2Code: country.alpha2Code,
                        location_alpha3Code: country.alpha3Code, 
                        location_callingCodes: country.callingCodes,
                        location_currencies: country.currencies, 
                        location_flag: country.flag,
                    });
                });

                if(signup_page_html || edit_employee_account_html || edit_customer_account_html)
                {
                    country_api_data.forEach((country,index) => {
                    
                        //console.log(country,index);
                        created_option[index] = document.createElement("option");
                        created_option[index].setAttribute("value",`${country.name}`);
                        created_option[index].innerHTML = country.name;    
                        country_select.appendChild(created_option[index]);   

                        if(top_country_option.value === created_option[index].value)
                        {
                            created_option[index].style.display = "none";
                            //created_option[index].style.visibility = "hidden";
                            //created_option[index].setAttribute("disabled","disabled")
                        };

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

                    //const country_options = document.querySelectorAll("#signup_login_form_section select#country option");
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
                }
                
                console.log("API COUNTRY FETCH END");
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
                
                const signup_url = '/signup';
                const edit_employee_account = '/employee/my-account';
                const edit_customer_account = '/customer/my-account';
                const url_arr = [signup_url, edit_employee_account, edit_customer_account];
                const multi_fetch = [];
                
                /*if(window.location.pathname == edit_customer_account ||
                    window.location.pathname == signup_url ||
                    window.location.pathname == edit_employee_account
                    )
                {
                    alert("!!!");
                };*/

                for(let i=0; i<url_arr.length; i++)
                {
                    if(window.location.pathname == url_arr[i])
                    {
                        console.log(multi_fetch);
                        
                        multi_fetch.push(fetch(url_arr[i],{

                            method: 'POST',
                            headers : {'Content-Type': 'application/json',
                                        'Accept': 'application/json'},
                            body: country_json_str, //country_json_str
                            credentials: "same-origin"
                        })) 
                    }
                };

                Promise.all(multi_fetch)
                .then(function(response) {
                    
                    console.log("RESPONSE ON SIGNUP PAGE LOAD",response);
                    return response;
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

            if(signup_page_html != null)
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

                    if(window.location.pathname.includes("/products/product-overview"))
                    {
                        product_header_login.addEventListener("click",(e)=>{

                            e.preventDefault();
                            
                            header_login_btn.dispatchEvent(new Event('click'));
                        });
                    }
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
                        credentials: "same-origin" //"include" 
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
            
            // --- ALL PRODUCTS PAGE ---
            
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
                console.log(products_display[0])

                let curr_page = 1;
                const session_curr_page = parseInt(sessionStorage.getItem("session_curr_page"));

                console.log("SESSION CURRENT PAGE", session_curr_page);

                if(session_curr_page)
                {
                    curr_page = session_curr_page;
                }

                let items_per_page = 12; //12
                let num_of_items = products_display.length;
                console.log("Number of products in all",products_display.length);

                let num_of_pages = Math.ceil((num_of_items / items_per_page));
                console.log("Number of pages in all products",num_of_pages)
                products_section.innerHTML = "";
                
                product_pos_num.forEach(element => {
                    
                    element.innerHTML = parseInt(element.innerHTML) + 1;
                });
                

                let direction = "";
                const page_arr = [];
                const dir_arr = [];

                product_page_no_top.max = num_of_pages;
                product_page_no_bot.max = num_of_pages;

                current_num.forEach(element => {
                    
                    element.innerHTML = curr_page;
                });
                
                end_num.forEach(element => {
                    
                    element.innerHTML = num_of_pages;
                });

                for(let i=0; i<num_of_pages; i++)
                {
                    page_arr.push(i+1);
                }
                console.log(page_arr);

                page_num[0].innerHTML = page_arr[0];
                page_num[5].innerHTML = page_arr[0];
                page_num[4].innerHTML = page_arr[num_of_pages-1];
                page_num[9].innerHTML = page_arr[num_of_pages-1];
                console.log(page_num);

                for(let i = ((curr_page - 1) * items_per_page); i < (curr_page * items_per_page); i++)
                {
                    if(i >= products_display.length && (products_display.length < items_per_page))
                    {
                        break;
                    }

                    console.log("product index", i);
                    products_section.appendChild(products_display[i]);
                }

                function highlight_page()
                {
                    //const mid_pg_nums = []
                    
                    page_num.forEach(element => {
                        
                        if(parseInt(element.innerHTML) === curr_page)
                        {
                            element.setAttribute("class","button_class page_num active_page");
                        }
    
                        else if(parseInt(element.innerHTML) !== curr_page)
                        {
                            //if(element.innerHTML != "")
                            //{
                                element.setAttribute("class","button_class page_num");
                                //element.parentElement.style.display = "initial"
                            //}

                            /*else if(element.innerHTML == "")
                            {
                                element.parentElement.style.display = "none";
                            }*/
                        }
                    }); 

                    page_spacer.forEach(element => {
                        
                        if(num_of_pages < 6)
                        {
                            //console.log("PARENT",element.parentElement)
                            element.style.display = "none";
                        }

                        else
                        {
                            //console.log("PARENT",element.parentElement)
                            element.style.display = "initial";  
                        }
                    });

                    if(curr_page >= 4 && num_of_pages > 5)   //(curr_page > 4 && curr_page <= 5) || num_of_pages <= 6)
                    {
                        page_spacer[0].style.visibility = "visible";
                        page_spacer[2].style.visibility = "visible";
                    }

                    else
                    {
                        page_spacer[0].style.visibility = "hidden";
                        page_spacer[2].style.visibility = "hidden";
                    };

                    if(curr_page < (num_of_pages - 3) && num_of_pages > 5)   //(curr_page > (num_of_pages - 5) && curr_page <= (num_of_pages - 1)) || curr_page == num_of_pages || num_of_pages <= 6)
                    {
                        page_spacer[1].style.visibility = "visible";
                        page_spacer[3].style.visibility = "visible";
                    }

                    else
                    {
                        page_spacer[1].style.visibility = "hidden";
                        page_spacer[3].style.visibility = "hidden";
                    };
                };

                function change_middle_nums(dir)
                { 
                    if(num_of_pages >= 5)
                    {
                        page_num[1].innerHTML = curr_page - 1;
                        page_num[2].innerHTML = curr_page;
                        page_num[3].innerHTML = curr_page + 1;

                        if(curr_page == 1)
                        {
                            page_num[1].innerHTML = curr_page + 1;
                            page_num[2].innerHTML = curr_page + 2;
                            page_num[3].innerHTML = curr_page + 3;
                        }

                        else if(curr_page == 2)
                        {
                            page_num[1].innerHTML = curr_page;
                            page_num[2].innerHTML = curr_page + 1;
                            page_num[3].innerHTML = curr_page + 2;
                        }

                        else if(curr_page == (num_of_pages - 2))
                        {
                            page_num[1].innerHTML = curr_page - 1;
                            page_num[2].innerHTML = curr_page;
                            page_num[3].innerHTML = num_of_pages - 1;
                        }

                        else if(curr_page == (num_of_pages - 1))
                        {
                            page_num[1].innerHTML = curr_page - 2;
                            page_num[2].innerHTML = curr_page - 1;
                            page_num[3].innerHTML = curr_page;
                        }

                        else if(curr_page == num_of_pages)
                        {
                            page_num[1].innerHTML = curr_page - 3;
                            page_num[2].innerHTML = curr_page - 2;
                            page_num[3].innerHTML = curr_page - 1;
                        };

                        page_num[6].innerHTML = page_num[1].innerHTML;
                        page_num[7].innerHTML = page_num[2].innerHTML;
                        page_num[8].innerHTML = page_num[3].innerHTML;
                    }

                    else
                    { 
                        page_num[1].innerHTML = 2;
                        page_num[2].innerHTML = 3;
                        page_num[3].innerHTML = 4;
                        page_num[6].innerHTML = page_num[1].innerHTML;
                        page_num[7].innerHTML = page_num[2].innerHTML;
                        page_num[8].innerHTML = page_num[3].innerHTML;

                        page_num.forEach((element,index) => {
                            
                            if((index > 0 && index < 4) || (index > 5 && index < 9))
                            {
                                console.log("LESS THAN 5 PAGES INDEXES",element.innerHTML,index)
                                if(element.innerHTML >= num_of_pages)
                                {
                                    element.parentElement.style.display = "none"
                                }

                                else
                                {
                                    element.parentElement.style.display = "initial"
                                };
                            };
                        });

                        if(num_of_pages <= 2)
                        {
                            page_num[0].style.border = "none";
                            page_num[4].style.border = "none";
                            page_num[5].style.border = "none";
                            page_num[9].style.border = "none";
                        };

                        if(num_of_pages == 1)
                        {
                            page_num[4].style.display = "none";
                            page_num[9].style.display = "none";
                        }

                        else
                        {
                            page_num[4].style.display = "initial";
                            page_num[9].style.display = "initial";
                        };
                    };
                }
                
                change_middle_nums(direction);
                highlight_page();

                function next_page()
                {
                    if(curr_page < num_of_pages)
                    {
                        curr_page++;
                        //console.log("PAGE NUM ON CLICK NEXT",curr_page);
                    }

                    return direction = "next";
                };

                function prev_page()
                {
                    if(curr_page > 1)
                    {
                        curr_page--;
                        //console.log("PAGE NUM ON CLICK PREV",curr_page);
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

                    change_middle_nums(direction);
                    highlight_page();

                    current_num.forEach(element => {
                    
                        element.innerHTML = curr_page;
                    });
                    
                    end_num.forEach(element => {
                        
                        element.innerHTML = num_of_pages;
                    });

                    products_section.innerHTML = "";

                    for(let i = ((curr_page - 1) * items_per_page); i < (curr_page * items_per_page); i++)
                    {
                        //console.log("product index", i);
                        products_section.appendChild(products_display[i]);
                    }

                    sessionStorage.setItem("session_curr_page",curr_page);
                };

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

                go_to_pg_btn.forEach((element,index) => {
                    
                    element.addEventListener("click",()=>{
                        
                        if(product_page_no_top.value < 1 || product_page_no_bot < 1)
                        {
                            product_page_no_top.value = 1;
                            product_page_no_bot.value = 1;
                        }

                        if(product_page_no_top.value > num_of_pages || product_page_no_bot > num_of_pages)
                        {
                            product_page_no_top.value = num_of_pages;
                            product_page_no_bot.value = num_of_pages;
                        }

                        if(index == 0 && product_page_no_top.value > 0 && product_page_no_top.value <= num_of_pages)
                        {
                            console.log(product_page_no_top.value);

                            if(product_page_no_top.value != curr_page && product_page_no_top.value > curr_page)
                            {
                                console.log("CYCLEEEEEEEEEEEEEE");
                                for(let i = curr_page; i < product_page_no_top.value; i++)
                                {
                                    next_page();
                                    change_page(direction);
                                }
                            }

                            else if(product_page_no_top.value != curr_page && product_page_no_top.value < curr_page)
                            {
                                console.log("OTHER CYCLEEEEEE");
                                for(let i = curr_page; i > product_page_no_top.value; i--)
                                {
                                    prev_page();
                                    change_page(direction);
                                }
                            }
                        }

                        if(index == 1 &&  product_page_no_bot.value > 0 && product_page_no_bot.value <= num_of_pages)
                        {
                            console.log(product_page_no_bot.value);

                            if(product_page_no_bot.value != curr_page && product_page_no_bot.value > curr_page)
                            {
                                console.log("CYCLEEEEEEEEEEEEEE");
                                for(let i = curr_page; i < product_page_no_bot.value; i++)
                                {
                                    next_page();
                                    change_page(direction);
                                }
                            }

                            else if(product_page_no_bot.value != curr_page && product_page_no_bot.value < curr_page)
                            {
                                console.log("OTHER CYCLEEEEEE");
                                for(let i = curr_page; i > product_page_no_bot.value; i--)
                                {
                                    prev_page();
                                    change_page(direction);
                                }
                            }
                        }
                    })
                });

                page_num.forEach(element => {
                    
                    element.addEventListener("click",()=>{

                        function change_on_click()
                        {
                            if (parseInt(element.innerHTML) != curr_page && parseInt(element.innerHTML) > curr_page)
                            {
                                curr_page = parseInt(element.innerHTML);
                                change_page(direction);
                            }

                            else if(parseInt(element.innerHTML) != curr_page && parseInt(element.innerHTML) < curr_page)
                            {
                                curr_page = parseInt(element.innerHTML);
                                change_page(direction);
                            }

                            //curr_page = parseInt(element.innerHTML);
                            //change_page(direction) 
                        }

                        change_on_click();
                        console.log("THIS BUTTON WAS CLICKED",element.innerHTML)
                    })
                });
            }; //end of products page html
        }); //end of DOMContentLoaded

        if(products_page_html)
        {
            document.addEventListener("DOMContentLoaded",()=>{

                //alert("LOADING DONE!");
                console.log("ALL PRODUCTS DOWNLOADED FROM SERVER");
                products_load_modal.setAttribute("class","remove_element");
            });

            /*setTimeout(() => {
                alert("!!!!!!!!!")     
                products_load_modal.setAttribute("class","remove_element");
            }, 200);*/
        };

        if(window.location.pathname == "/employee/edit-stock/add-categories")
        {
            //alert("asdasda"); const username_email_login_info = JSON.parse(localStorage.getItem("username_email_login"));
            //localStorage.removeItem("username_email_login"); const session_curr_page = parseInt(sessionStorage.getItem("session_curr_page"));
            //sessionStorage.setItem("session_curr_page",curr_page);
            let form_i;
            let add_categories;
            let input_val_storage = [];
            let text_area_storage = [];
            
            console.log("INPUT VAL STORAGE",JSON.parse(sessionStorage.getItem("input_val_storage")));

            document.addEventListener("submit",(event)=>{

                //event.preventDefault();
                sessionStorage.removeItem("category_form_index");
                sessionStorage.removeItem("add_categories");
                sessionStorage.removeItem("new_category_list");
                
                console.log("SUBMITTED!!!");
                input_val_storage = JSON.parse(sessionStorage.getItem("input_val_storage"));
                text_area_storage = JSON.parse(sessionStorage.getItem("text_area_storage"));
                console.log(input_val_storage.length,"LENGTH");

                for(let i = 0; i < input_val_storage.length; i++)
                {
                    sessionStorage.removeItem(`input_val_storage[${i}]`);
                };

                for(let i = 0; i < text_area_storage.length; i++)
                {
                    sessionStorage.removeItem(`text_area_storage[${i}]`);
                };

                sessionStorage.removeItem("input_val_storage");
                sessionStorage.removeItem("text_area_storage");
            });
            
            if(!sessionStorage.getItem("category_form_index"))
            {
                form_i = new_category.length + 1;
                add_categories = [];
            }

            else if(sessionStorage.getItem("category_form_index"))
            {
                form_i = sessionStorage.getItem("category_form_index");

                add_categories = JSON.parse(sessionStorage.getItem("add_categories"));
                
                new_category_list.innerHTML = JSON.parse(sessionStorage.getItem("new_category_list"));

                if(form_i > 2)
                {
                    remove_category_btn.classList.remove("remove_element");
                };
                
                if(form_i > 5)
                {
                    add_category_btn.classList.add("remove_element");
                }; 
            };
            
            function session_event()
            {
                const new_category_list_inputs = document.querySelectorAll("#new_category_list input");
                const new_category_list_textareas = document.querySelectorAll("#new_category_list textarea");

                new_category_list_inputs.forEach((element,index) => {
                    
                    console.log("INPUT ELEMENT",element.value,index);
                    element.value = element.value;
                    input_val_storage[index];
                    sessionStorage.setItem(`input_val_storage[${index}]`,JSON.stringify(element.value));
                    input_val_storage[index] = (sessionStorage.getItem(`input_val_storage[${index}]`));
                });

                new_category_list_textareas.forEach((element,index) => {
                    
                    console.log("TEXTAREA ELEMENT",element.value,index);
                    element.value = element.value;
                    text_area_storage[index];
                    sessionStorage.setItem(`text_area_storage[${index}]`,JSON.stringify(element.value));
                    text_area_storage[index] = (sessionStorage.getItem(`text_area_storage[${index}]`));
                });

                console.log(input_val_storage,"INPUT VAL STORAGE ARRAY")
                sessionStorage.setItem("input_val_storage",JSON.stringify(input_val_storage));
                sessionStorage.setItem("text_area_storage",JSON.stringify(text_area_storage));
            }
            
            new_category_list.addEventListener("input",session_event);
            new_category_list.addEventListener("DOMContentLoaded",session_event);

            const new_category_list_inputs = document.querySelectorAll("#new_category_list input");
            const new_category_list_textareas = document.querySelectorAll("#new_category_list textarea");

            new_category_list_inputs.forEach((element,index) => {
                
                if(sessionStorage.getItem(`input_val_storage[${index}]`))
                {
                    element.value = JSON.parse(sessionStorage.getItem(`input_val_storage[${index}]`));
                }
            });

            new_category_list_textareas.forEach((element,index) => {
                
                if(sessionStorage.getItem(`text_area_storage[${index}]`))
                {
                    element.value = JSON.parse(sessionStorage.getItem(`text_area_storage[${index}]`));
                }
            });

            remove_category_btn.addEventListener("click",()=>{

                console.log("REMOVE FORM INDEX",form_i);
                console.log(new_category_list.children.length,"children");
                let remove_category = new_category_list.children[new_category_list.children.length - 1];
                //let remove_category = new_category_list[new_category_list.children[0].length - 1];
                
                add_categories.pop();
                new_category_list.removeChild(remove_category);
                if(form_i == 3)
                {
                    add_categories.pop();
                }

                if(form_i > 2)
                {
                    form_i--;
                };
                
                if(form_i <= 2)
                {
                    remove_category_btn.classList.add("remove_element");
                    form_i = 2;
                };

                if(form_i <= 5)
                {
                    add_category_btn.classList.remove("remove_element");
                };

                sessionStorage.setItem("add_categories",JSON.stringify(add_categories));
                sessionStorage.setItem("new_category_list",JSON.stringify(new_category_list.innerHTML));

                sessionStorage.setItem("category_form_index",form_i);
                console.log("REMOVE FORM AFTER INDEX",form_i);
                console.log(new_category_list.children.length,"children");
            })

            add_category_btn.addEventListener("click",()=>{

                console.log("ADD FORM INDEX",form_i);
                console.log(new_category_list.children.length,"children");
                console.log(new_category[0]);

                if(remove_category_btn.classList.contains("remove_element"))
                {
                    remove_category_btn.classList.remove("remove_element");
                }      

                if(form_i == 2 && !sessionStorage.getItem("category_form_index"))
                {
                    add_categories.push(new_category[0]);
                    new_category_list.appendChild(new_category[0]);
                };

                if(form_i < 6)
                {
                    form_i++;
                }

                if(form_i >= 6)
                {
                    form_i = 6;

                    if(!add_category_btn.classList.contains("remove_element"))
                    {
                        add_category_btn.classList.add("remove_element");
                    } 
                }

                let add_category = document.createElement("div");
                add_category.setAttribute("class","new_category");
                add_category.innerHTML = 
                `
                    <h2>Category ${form_i-1}</h2>
    
                    <div class="form_input_container">
                        <label for="category_name[${form_i-1}]">Category Name</label>
                        <input type="text" name="category_name[${form_i-2}]" id="category_name[${form_i-2}]" value="">
                        <span class="form_error_msg"></span> 
                    </div>
        
                    <div class="form_input_container">
                        <label for="category_description[${form_i-2}]">Category Description</label>
                        <textarea name="category_description[${form_i-2}]" id="category_description[${form_i-2}]" cols="30" rows="10"></textarea>
                        <span class="form_error_msg"></span> 
                    </div>

                    <div class="form_input_container">
                        <label for="category_img_upload[${form_i-2}]">Category Image Upload</label>
                        <input type="file" name="category_img_upload[${form_i-2}]" id="category_img_upload[${form_i-2}]">
                        <span class="form_error_msg"></span> 
                    </div>
    
                    <div class="form_input_container">
                        <label for="category_photo[${form_i-2}]">Category Photo Image Path</label>
                        <input type="text" name="category_photo[${form_i-2}]" id="category_photo[${form_i-2}]" value="/img/Category/default_category.jpg">
                        <span class="form_error_msg"></span> 
                    </div>

                    <div class="form_input_container">
                        <h3>Category Image</h3>
                        <img src="/img/Category/default_category.jpg" alt="" width="256px" height="256px">
                        <span class="form_error_msg"></span> 
                    </div>
                `
                    
                console.log("ADD CATEGORY",add_category);
                add_categories.push(add_category);
                new_category_list.appendChild(add_category);
                
                console.log("CATEGORIES",add_categories);
                console.log("CATEGORIES");

                sessionStorage.setItem("add_categories",JSON.stringify(add_categories));
                sessionStorage.setItem("new_category_list",JSON.stringify(new_category_list.innerHTML));

                console.log(new_category_list.children.length);
                sessionStorage.setItem("category_form_index",form_i);
                console.log("ADD FORM INDEX AFTER",form_i);
                console.log(new_category_list.children.length,"children");
            });
        }; //edit-stock/add-categories

        if(window.location.pathname == "/employee/edit-stock/add-products")
        {
            let form_i;
            let add_products;
            let product_input_val_storage = [];
            let product_text_area_storage = [];
            let product_select_val_storage = [];

            document.addEventListener("submit",(event)=>{

                sessionStorage.removeItem("product_form_index");
                sessionStorage.removeItem("add_products");
                sessionStorage.removeItem("new_product_list");
                
                console.log("SUBMITTED!!!");
                product_input_val_storage = JSON.parse(sessionStorage.getItem("product_input_val_storage"));
                product_text_area_storage = JSON.parse(sessionStorage.getItem("product_text_area_storage"));
                product_select_val_storage = JSON.parse(sessionStorage.getItem("product_select_val_storage"));
                console.log(product_input_val_storage.length,"LENGTH");

                for(let i = 0; i < product_input_val_storage.length; i++)
                {
                    sessionStorage.removeItem(`product_input_val_storage[${i}]`);
                };

                for(let i = 0; i < product_text_area_storage.length; i++)
                {
                    sessionStorage.removeItem(`product_text_area_storage[${i}]`);
                };

                for(let i = 0; i < product_select_val_storage.length; i++)
                {
                    sessionStorage.removeItem(`product_select_val_storage[${i}]`);
                };

                sessionStorage.removeItem("product_input_val_storage");
                sessionStorage.removeItem("product_text_area_storage");
                sessionStorage.removeItem("product_select_val_storage");
            });
            
            if(!sessionStorage.getItem("product_form_index"))
            {
                form_i = 2;
                add_products = [];
            }

            else if(sessionStorage.getItem("product_form_index"))
            {
                form_i = sessionStorage.getItem("product_form_index");

                add_products = JSON.parse(sessionStorage.getItem("add_products"));
                
                new_product_list.innerHTML = JSON.parse(sessionStorage.getItem("new_product_list"));

                if(form_i > 2)
                {
                    remove_product_btn.classList.remove("remove_element");
                };
                
                if(form_i > 5)
                {
                    add_product_btn.classList.add("remove_element");
                }; 
            };
            
            /*new_product_list.addEventListener("change",()=>{

                const new_product_list_selects = document.querySelectorAll("#new_product_list select");

                new_product_list_selects.forEach((element,index) => {
                    
                    console.log("SELECT OPTION ELEMENT",element.value,index);
                    element.value = element.value;
                    product_select_val_storage[index];
                    sessionStorage.setItem(`product_select_val_storage[${index}]`,JSON.stringify(element.value));
                    product_select_val_storage[index] = (sessionStorage.getItem(`product_select_val_storage[${index}]`));
                });

                sessionStorage.setItem("product_select_val_storage",JSON.stringify(product_select_val_storage));
            });*/

            hidden_counter_products.value = form_i - 1;
            console.log(hidden_counter_products.value);

            new_product_list.addEventListener("input",()=>{

                const new_product_list_inputs = document.querySelectorAll("#new_product_list input");
                const new_product_list_textareas = document.querySelectorAll("#new_product_list textarea");
                const new_product_list_selects = document.querySelectorAll("#new_product_list select");

                new_product_list_inputs.forEach((element,index) => {
                    
                    console.log("INPUT ELEMENT",element.value,index);
                    element.value = element.value;
                    product_input_val_storage[index];
                    sessionStorage.setItem(`product_input_val_storage[${index}]`,JSON.stringify(element.value));
                    product_input_val_storage[index] = (sessionStorage.getItem(`product_input_val_storage[${index}]`));
                });

                new_product_list_textareas.forEach((element,index) => {
                    
                    console.log("TEXTAREA ELEMENT",element.value,index);
                    element.value = element.value;
                    product_text_area_storage[index];
                    sessionStorage.setItem(`product_text_area_storage[${index}]`,JSON.stringify(element.value));
                    product_text_area_storage[index] = (sessionStorage.getItem(`product_text_area_storage[${index}]`));
                });

                new_product_list_selects.forEach((element,index) => {
                    
                    console.log("SELECT OPTION ELEMENT",element.value,index);
                    element.value = element.value;
                    product_select_val_storage[index];
                    sessionStorage.setItem(`product_select_val_storage[${index}]`,JSON.stringify(element.value));
                    product_select_val_storage[index] = (sessionStorage.getItem(`product_select_val_storage[${index}]`));
                });

                console.log(product_input_val_storage,"PRODUCT INPUT VAL STORAGE ARRAY")
                sessionStorage.setItem("product_input_val_storage",JSON.stringify(product_input_val_storage));
                sessionStorage.setItem("product_text_area_storage",JSON.stringify(product_text_area_storage));
                sessionStorage.setItem("product_select_val_storage",JSON.stringify(product_select_val_storage));
            });

            const new_product_list_inputs = document.querySelectorAll("#new_product_list input");
            const new_product_list_textareas = document.querySelectorAll("#new_product_list textarea");
            const new_product_list_selects = document.querySelectorAll("#new_product_list select");

            new_product_list_inputs.forEach((element,index) => {
                
                if(sessionStorage.getItem(`product_input_val_storage[${index}]`))
                {
                    element.value = JSON.parse(sessionStorage.getItem(`product_input_val_storage[${index}]`));
                }
            });

            new_product_list_textareas.forEach((element,index) => {
                
                if(sessionStorage.getItem(`product_text_area_storage[${index}]`))
                {
                    element.value = JSON.parse(sessionStorage.getItem(`product_text_area_storage[${index}]`));
                }
            });

            new_product_list_selects.forEach((element,index) => {
                
                if(sessionStorage.getItem(`product_select_val_storage[${index}]`))
                {
                    element.value = JSON.parse(sessionStorage.getItem(`product_select_val_storage[${index}]`));
                }
            });

            fetch("/employee/edit-stock/add-products/data")
            .then((response)=>{
                
                return response.json();
            })
            .then((data)=>{

                console.log(data);

                let category_names = [];

                function update_product_names()
                {
                    /*for(let i=0; i<category_name_dropdown.length; i++)
                    {
                        data.forEach((element,index) => {
                        
                            for(let j=0; j<category_name_dropdown[i].length; j++)
                            {   
                                if(category_name_dropdown[i].children[j].selected && category_name_dropdown[i].children[j].value == data[index].category.title)
                                {
                                    product_name_sel[i].innerHTML = data[index].title;
                                    product_cost_price_sel[i].innerHTML = "$" + parseFloat(data[index].cost_price);
                                    product_subtotal_price_sel[i].innerHTML = "$" + parseFloat(data[index].cost_price * product_quantity_sel[i].value);
                                }

                                else if(product_code_dropdown[i].children[j].selected && product_code_dropdown[i].children[j].value == "")
                                {
                                    product_name_sel[i].innerHTML = "No Product Code Selected";
                                    product_cost_price_sel[i].innerHTML = "$---";
                                    product_subtotal_price_sel[i].innerHTML = "$---";
                                }
                            };
                        });  
                    }*/
                };

                document.addEventListener("readystatechange",()=>{
                    
                    update_product_names();
                });
                new_product_list.addEventListener("change",update_product_names);
                
                console.log(category_name_dropdown);   
                console.log(category_name_dropdown[0].children);
                console.log(category_name_dropdown[0].childNodes);   

                remove_product_btn.addEventListener("click",()=>{

                    console.log("REMOVE FORM INDEX",form_i);
                    console.log(new_product_list.children.length,"children");
                    let remove_product = new_product_list.children[new_product_list.children.length - 1];
                    //let remove_category = new_category_list[new_category_list.children[0].length - 1];
                    
                    add_products.pop();
                    new_product_list.removeChild(remove_product);
                    if(form_i == 3)
                    {
                        add_products.pop();
                    }
    
                    if(form_i > 2)
                    {
                        form_i--;
                    };
                    
                    if(form_i <= 2)
                    {
                        remove_product_btn.classList.add("remove_element");
                        form_i = 2;
                    };
    
                    if(form_i <= 5)
                    {
                        add_product_btn.classList.remove("remove_element");
                    };
    
                    sessionStorage.setItem("add_products",JSON.stringify(add_products));
                    sessionStorage.setItem("new_product_list",JSON.stringify(new_product_list.innerHTML));
    
                    sessionStorage.setItem("product_form_index",form_i);
                    console.log("REMOVE FORM AFTER INDEX",form_i);
                    console.log(new_product_list.children.length,"children");
    
                    hidden_counter_products.value = form_i - 1;
                    console.log(hidden_counter_products.value);

                    new_product_list.dispatchEvent(new Event('change'));
                })
    
                add_product_btn.addEventListener("click",()=>{
    
                    const category_name_dropdown = document.getElementsByClassName("product_categories");

                    console.log("ADD FORM INDEX",form_i);
                    console.log(new_product_list.children.length,"children");
                    console.log(new_product[0]);
    
                    if(remove_product_btn.classList.contains("remove_element"))
                    {
                        remove_product_btn.classList.remove("remove_element");
                    }      
    
                    if(form_i == 2 && !sessionStorage.getItem("product_form_index"))
                    {
                        add_products.push(new_product[0]);
                        new_product_list.appendChild(new_product[0]);
                    };
    
                    if(form_i < 6)
                    {
                        form_i++;
                    }
    
                    if(form_i >= 6)
                    {
                        form_i = 6;
    
                        if(!add_product_btn.classList.contains("remove_element"))
                        {
                            add_product_btn.classList.add("remove_element");
                        } 
                    }
    
                    let add_product = document.createElement("div");
                    add_product.setAttribute("class","new_product"); //_${form_i-2}
                    add_product.innerHTML = 
                    `  
                        <h2>Product ${form_i-1}</h2>
    
                        <div class="form_input_container">
                            <label for="product_name[${form_i-2}]">Product Name</label>
                            <input type="text" name="product_name[${form_i-2}]" id="product_name[${form_i-2}]" value="">
                            <span class="form_error_msg"></span>     
                        </div>
            
                        <div class="form_input_container">
                            <label for="product_category[${form_i-2}]">Product Category</label>
                            <select class="product_categories" name="product_category[${form_i-2}]" id="product_category[${form_i-2}]">
    
                                <option value="">Please Select a Category</option>    
    
                            </select>
                            <span class="form_error_msg"></span>     
                        </div>
                        
                        <div class="form_input_container">
                            <label for="product_quantity[${form_i-2}]">Product Quantity (Currently In Stock)</label>
                            <input type="number" min="1" name="product_quantity[${form_i-2}]" id="product_quantity[${form_i-2}]" value="">
                            <span class="form_error_msg"></span> 
                        </div>
    
                        <div class="form_input_container">
                            <label for="product_min_quantity[${form_i-2}]">Product Quantity (Min Threshold)</label>
                            <input type="number" min="1" name="product_min_quantity[${form_i-2}]" id="product_min_quantity[${form_i-2}]" value="">
                            <span class="form_error_msg"></span> 
                        </div>
    
                        <div class="form_input_container">
                            <label for="product_max_quantity[${form_i-2}]">Product Quantity (Max Threshold)</label>
                            <input type="number" min="1" name="product_max_quantity[${form_i-2}]" id="product_max_quantity[${form_i-2}]" value="">
                            <span class="form_error_msg"></span> 
                        </div>
    
                        <div class="form_input_container">
                            <label for="product_cost_price[${form_i-2}]">Product Cost Price (Estimated)</label>
                            <input type="number" step="0.01" min="1" name="product_cost_price[${form_i-2}]" id="product_cost_price[${form_i-2}]" value="">
                            <span class="form_error_msg"></span> 
                        </div>
    
                        <div class="form_input_container">
                            <label for="product_selling_price[${form_i-2}]">Product Selling Price</label>
                            <input type="number" step="0.01" min="1" name="product_selling_price[${form_i-2}]" id="product_selling_price[${form_i-2}]" value="">
                            <span class="form_error_msg"></span> 
                        </div>
    
                        <div class="form_input_container">
                            <label for="product_img[${form_i-2}]">Product Image URL</label>
                            <input type="text" name="product_img[${form_i-2}]" id="product_img[${form_i-2}]" value="/img/Products/default_product.png">
                            <span class="form_error_msg"></span> 
                        </div>
    
                        <div class="form_input_container">
                            <label for="product_img_upload[${form_i-2}]">Product Image Upload</label>
                            <input type="file" name="product_img_upload[${form_i-2}]" id="product_img_upload[${form_i-2}]">
                            <span class="form_error_msg"></span> 
                        </div>
    
                        <div class="form_input_container">
                            <h3>Product Image</h3>
                            <img src="/img/Products/default_product.png" alt="" width="256px" height="256px">
                            <span class="form_error_msg"></span> 
                        </div>
    
                        <div class="form_input_container">
                            <label for="product_bestseller[${form_i-2}]">Bestseller Status</label>
                            <select name="product_bestseller[${form_i-2}]" id="product_bestseller[${form_i-2}]">
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                            <span class="form_error_msg"></span> 
                        </div>
    
                        <div class="form_input_container">
                            <label for="product_description[${form_i-2}]">Product Description</label>
                            <textarea name="product_description[${form_i-2}]" id="product_description[${form_i-2}]" cols="100" rows="25"></textarea>
                            <span class="form_error_msg"></span> 
                        </div>
                    `
                        
                    console.log("ADD PRODUCT",add_product);
                    add_products.push(add_product);
                    new_product_list.appendChild(add_product);
                    
                    console.log("PRODUCTS",add_product);
                    console.log("PRODUCTS");

                    data.forEach((element,index) => {
                        
                        const category_name_option = document.createElement("option");
                        category_name_option.setAttribute("value",`${element.title}`);
                        category_name_option.innerHTML = category_name_option.value;
                        console.log(category_name_option);
                        category_name_dropdown[form_i-2].appendChild(category_name_option);
                        console.log("DATA OPTIONS",element,index);
                    });

                    sessionStorage.setItem("add_products",JSON.stringify(add_products));
                    sessionStorage.setItem("new_product_list",JSON.stringify(new_product_list.innerHTML));
    
                    console.log(new_product_list.children.length);
                    sessionStorage.setItem("product_form_index",form_i);
                    console.log("ADD FORM INDEX AFTER",form_i);
                    console.log(new_product_list.children.length,"children");
    
                    hidden_counter_products.value = form_i - 1;
                    console.log(hidden_counter_products.value);
                    //new_product_list.dispatchEvent(new Event('input'));
                    console.log(category_name_dropdown);
                });
             //edit-stock/add-products
            })
            .catch(err => console.log(`Cannot get data for product form: ${err}`));
        }

        if(window.location.pathname == "/employee/edit-stock/restock")
        {
            let form_i;
            let add_order;
            let order_input_val_storage = [];
            let order_select_val_storage = [];

            document.addEventListener("submit",(event)=>{

                sessionStorage.removeItem("order_form_index");
                sessionStorage.removeItem("add_orders");
                sessionStorage.removeItem("new_order_list");
                
                console.log("SUBMITTED!!!");
                order_input_val_storage = JSON.parse(sessionStorage.getItem("order_input_val_storage"));
                order_select_val_storage = JSON.parse(sessionStorage.getItem("order_select_val_storage"));
                console.log(order_input_val_storage.length,"LENGTH");

                for(let i = 0; i < order_input_val_storage.length; i++)
                {
                    sessionStorage.removeItem(`order_input_val_storage[${i}]`);
                };

                for(let i = 0; i < order_select_val_storage.length; i++)
                {
                    sessionStorage.removeItem(`order_select_val_storage[${i}]`);
                };

                sessionStorage.removeItem("order_input_val_storage");
                sessionStorage.removeItem("order_select_val_storage");
            });
            
            if(!sessionStorage.getItem("order_form_index"))
            {
                form_i = 2;
                add_orders = [];
            }

            else if(sessionStorage.getItem("order_form_index"))
            {
                form_i = sessionStorage.getItem("order_form_index");

                add_orders = JSON.parse(sessionStorage.getItem("add_orders"));
                
                new_order_list.innerHTML = JSON.parse(sessionStorage.getItem("new_order_list"));

                if(form_i > 2)
                {
                    remove_order_btn.classList.remove("remove_element");
                };   

                if(form_i > 10)
                {
                    add_order_btn.classList.add("remove_element");
                };   
            };

            new_order_list.addEventListener("input",()=>{

                const new_order_list_inputs = document.querySelectorAll("#new_order_list input");
                const new_order_list_selects = document.querySelectorAll("#new_order_list select");

                new_order_list_inputs.forEach((element,index) => {
                    
                    console.log("INPUT ELEMENT",element.value,index);
                    element.value = element.value;
                    order_input_val_storage[index];
                    sessionStorage.setItem(`order_input_val_storage[${index}]`,JSON.stringify(element.value));
                    order_input_val_storage[index] = (sessionStorage.getItem(`order_input_val_storage[${index}]`));
                });

                new_order_list_selects.forEach((element,index) => {
                    
                    console.log("SELECT OPTION ELEMENT",element.value,index);
                    element.value = element.value;
                    order_select_val_storage[index];
                    sessionStorage.setItem(`order_select_val_storage[${index}]`,JSON.stringify(element.value));
                    order_select_val_storage[index] = (sessionStorage.getItem(`order_select_val_storage[${index}]`));
                });

                console.log(order_input_val_storage,"ORDER INPUT VAL STORAGE ARRAY")
                sessionStorage.setItem("order_input_val_storage",JSON.stringify(order_input_val_storage));
                sessionStorage.setItem("order_select_val_storage",JSON.stringify(order_select_val_storage));
            });

            const new_order_list_inputs = document.querySelectorAll("#new_order_list input");
            const new_order_list_selects = document.querySelectorAll("#new_order_list select");

            new_order_list_inputs.forEach((element,index) => {
                
                if(sessionStorage.getItem(`order_input_val_storage[${index}]`))
                {
                    element.value = JSON.parse(sessionStorage.getItem(`order_input_val_storage[${index}]`));
                }
            });

            new_order_list_selects.forEach((element,index) => {
                
                if(sessionStorage.getItem(`order_select_val_storage[${index}]`))
                {
                    element.value = JSON.parse(sessionStorage.getItem(`order_select_val_storage[${index}]`));
                }
            });

            fetch("/employee/edit-stock/restock/data"//,{

                /*method: 'POST',
                headers : {'Content-Type': 'application/json',
                            'Accept': 'application/json'},
                credentials: "same-origin"}*/
            )
            .then((response)=>{
                
                return response.json();
            })
            .then((data)=>{

                console.log(data);

                //document.addEventListener()
                //const product_code_dropdown = document.querySelectorAll("#new_order_list .product_codes");
                //const product_code_options = document.querySelectorAll("#new_order_list .product_codes option:checked");

                let product_names = [];

                function update_product_names()
                {
                    let total = 0;
                    product_total_price_sel[0].innerHTML = "$---";

                    for(let i=0; i<product_code_dropdown.length; i++)
                    {
                        data.forEach((element,index) => {
                        
                            for(let j=0; j<product_code_dropdown[i].length; j++)
                            {   
                                if(product_code_dropdown[i].children[j].selected && product_code_dropdown[i].children[j].value == data[index].product_code)
                                {
                                    //alert("ABC");
                                    console.log(data[index].product_code);
                                    product_name_sel[i].innerHTML = data[index].title;
                                    product_cost_price_sel[i].innerHTML = "$" + parseFloat(data[index].cost_price);
                                    product_subtotal_price_sel[i].innerHTML = "$" + parseFloat(data[index].cost_price * product_quantity_sel[i].value);
                                }

                                else if(product_code_dropdown[i].children[j].selected && product_code_dropdown[i].children[j].value == "")
                                {
                                    product_name_sel[i].innerHTML = "No Product Code Selected";
                                    product_cost_price_sel[i].innerHTML = "$---";
                                    product_subtotal_price_sel[i].innerHTML = "$---";
                                }
                            };
                        });  

                        console.log("PRODUCT SUBTOTAL",product_subtotal_price_sel[i],product_subtotal_price_sel[i].innerHTML.replace('$', ''));
                        if((product_code_dropdown[0].children[0].selected && product_code_dropdown[0].children[0].value == "") &&
                        product_code_dropdown[1])
                        {
                            total = 0;
                        }

                        total += parseFloat(product_subtotal_price_sel[i].innerHTML.replace('$', ''));
                        console.log(total);
                    }

                    if(total > 0)
                    {
                        product_total_price_sel[0].innerHTML = "$" + total;
                    }
                };

                document.addEventListener("readystatechange",()=>{
                    
                    update_product_names();
                    //alert("YES")
                });
                new_order_list.addEventListener("change",update_product_names);
                
                console.log(product_code_dropdown);   
                console.log(product_code_dropdown[0].children);
                console.log(product_code_dropdown[0].childNodes);             
                
                remove_order_btn.addEventListener("click",()=>{

                    console.log("REMOVE FORM INDEX",form_i);
                    console.log(new_order_list.children.length,"children");
                    let remove_order = new_order_list.children[new_order_list.children.length - 1];
                    
                    add_orders.pop();
                    new_order_list.removeChild(remove_order);
                    if(form_i == 3)
                    {
                        add_orders.pop();
                    }
    
                    if(form_i > 2)
                    {
                        form_i--;
                    };
                    
                    if(form_i <= 2)
                    {
                        remove_order_btn.classList.add("remove_element");
                        form_i = 2;
                    };
    
                    if(form_i <= 10)
                    {
                        add_order_btn.classList.remove("remove_element");
                    };
    
                    sessionStorage.setItem("add_orders",JSON.stringify(add_orders));
                    sessionStorage.setItem("new_order_list",JSON.stringify(new_order_list.innerHTML));
    
                    sessionStorage.setItem("order_form_index",form_i);
                    console.log("REMOVE FORM AFTER INDEX",form_i);
                    console.log(new_order_list.children.length,"children");

                    new_order_list.dispatchEvent(new Event('change'));
                });

                add_order_btn.addEventListener("click",()=>{

                    const product_code_dropdown = document.getElementsByClassName("product_codes");

                    console.log("ADD FORM INDEX",form_i);
                    console.log(new_order_list.children.length,"children");
                    console.log(new_order[0]);
    
                    if(remove_order_btn.classList.contains("remove_element"))
                    {
                        remove_order_btn.classList.remove("remove_element");
                    }      
    
                    if(form_i == 2 && !sessionStorage.getItem("order_form_index"))
                    {
                        add_orders.push(new_order[0]);
                        new_order_list.appendChild(new_order[0]);
                    };
    
                    if(form_i < 11)
                    {
                        form_i++;
                    }
    
                    if(form_i >= 11)
                    {
                        form_i = 11;
    
                        if(!add_order_btn.classList.contains("remove_element"))
                        {
                            add_order_btn.classList.add("remove_element");
                        } 
                    }
    
                    let add_order = document.createElement("div");
                    add_order.setAttribute("class","new_order");
                    add_order.innerHTML = 
                    `
                        <h2>Order ${form_i-1}</h2>
    
                        <div class="form_input_container">
                            <label for="supplier[${form_i-2}]">Supplier</label>
                            <select name="supplier[]" id="supplier[${form_i-2}]">
                                <option value="">Select a Supplier</option>
                                <option value="Amazon">Amazon</option>
                                <option value="Courts">Courts</option>
                                <option value="Ebay">Ebay</option>
                                <option value="Massy">Massy</option>
                                <option value="Megastore">Megastore</option>
                                <option value="Walmart">Walmart</option>
                            </select>
                            <span class="form_error_msg"></span>     
                        </div>
            
                        <div class="form_input_container">
                            <label for="product_code[${form_i-2}]">Product Code</label>
                            <select class="product_codes" name="product_code[]" id="product_code[${form_i-2}]">
                            
                            <option value="">Select a Product Code</option> 
    
                            </select>
                            <span class="form_error_msg"></span>     
                        </div>
    
                        <div class="form_input_container">
                            <h3>Product Name:</h3>
                            <p class="product_names">No Product Code Selected</p>
                        </div>
    
                        <div class="form_input_container">
                            <label for="product_quantity[${form_i-2}]">Product Quantity</label>
                            <input class="product_quantities" type="number" value="" min="1" name="product_quantity[]" id="product_quantity[${form_i-2}]">
                            <span class="form_error_msg"></span>     
                        </div>
    
                        <div class="form_input_container">
                            <h3>Estimated cost per item:</h3>
                            <p class="product_cost_prices">$---</p>
                        </div>

                        <div class="form_input_container">
                            <h3>Estimated subtotal cost:</h3>
                            <p class="product_subtotal_prices">$---</p>
                        </div>
                    `
                        
                    console.log("ADD ORDER",add_order);
                    add_orders.push(add_order);
                    new_order_list.appendChild(add_order);
                    
                    console.log("ORDERS",add_order);
                    console.log("ORDERS");
                    
                    data.forEach((element,index) => {
                        
                        const product_code_option = document.createElement("option");
                        product_code_option.setAttribute("value",`${element.product_code}`);
                        product_code_option.innerHTML = product_code_option.value;
                        console.log(product_code_option);
                        product_code_dropdown[form_i-2].appendChild(product_code_option);
                        console.log("DATA OPTIONS",element,index);
                    });

                    sessionStorage.setItem("add_orders",JSON.stringify(add_orders));
                    sessionStorage.setItem("new_order_list",JSON.stringify(new_order_list.innerHTML));
    
                    console.log(new_order_list.children.length);
                    sessionStorage.setItem("order_form_index",form_i);
                    console.log("ADD FORM INDEX AFTER",form_i);
                    console.log(new_order_list.children.length,"children");

                    //const product_code_dropdown = document.querySelectorAll("#new_order_list .product_codes");  
                    console.log(product_code_dropdown);
                });
            })
            .catch(err => console.log(`Cannot get data for restock order form: ${err}`));    
        }; //edit-stock/restock

        if((window.location.pathname.includes("/products/product-overview") || window.location.pathname.includes("/customer/my-cart"))
            && product_qty && incr_product_qty && decr_product_qty)
        {
            let cart_quantity = product_qty.innerHTML;

            console.log(product_qty, cart_quantity);

            if(product_qty && window.location.pathname.includes("/products/product-overview"))
            {
                product_qty.innerHTML = cart_quantity;
            }
            
            if(product_cart_quantity_add && window.location.pathname.includes("/products/product-overview"))
            {
                product_cart_quantity_add.value = cart_quantity;
            };

            if(product_cart_quantity_ret && window.location.pathname.includes("/products/product-overview"))
            {
                product_cart_quantity_ret.value = cart_quantity;
            };

            incr_product_qty.addEventListener("click",()=>{
                
                //alert(`++ ${order_quantity}`);
                cart_quantity++;

                /*if(order_quantity > 10)
                {
                    order_quantity = 10;
                };*/

                product_qty.innerHTML = cart_quantity;
                
                if(product_cart_quantity_add && window.location.pathname.includes("/products/product-overview"))
                {
                    product_cart_quantity_add.value = cart_quantity;
                };

                if(product_cart_quantity_ret && window.location.pathname.includes("/products/product-overview"))
                {
                    product_cart_quantity_ret.value = cart_quantity;
                };
            });

            decr_product_qty.addEventListener("click",()=>{

                //alert(`-- ${order_quantity}`);
                cart_quantity--;

                if(cart_quantity < 1)
                {
                    cart_quantity = 1;
                };

                product_qty.innerHTML = cart_quantity;

                if(product_cart_quantity_add && window.location.pathname.includes("/products/product-overview"))
                {
                    product_cart_quantity_add.value = cart_quantity;
                };

                if(product_cart_quantity_ret && window.location.pathname.includes("/products/product-overview"))
                {
                    product_cart_quantity_ret.value = cart_quantity;
                };
            });

            console.log(cart_quantity)
        }
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