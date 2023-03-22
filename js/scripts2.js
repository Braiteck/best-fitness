$(() => {

    $(".menu-item-has-children > a").addClass("sub_link");
    $(".level-1 .sub_menu").addClass("level3");

    $(".level-1 .sub_link").append('<svg class="icon"><use xlink:href="https://demo2.sokomebel.ru/wp-content/themes/raten/images/sprite.svg#ic_arr_hor"></use></svg>');

    /*функция сравнения массивов*/
    compare = function (a1, a2) {
        return a1.length == a2.length && a1.every((v,i)=>v === a2[i])
    }

    /* для категории*/
    let check_cat = false;
    let default_cat = $('#cat').val();    
    let current_cat; 

    const cat = document.getElementById('cat')
    if(cat)
    {
        cat.addEventListener('close.mdb.select', (e) => {        
            if(check_cat)
            {
                $(".filter form").submit();
            }
        })

        $(document).on('change', '#cat', function() {        
            current_cat = $('#cat').val();
            check_cat = !compare(default_cat, current_cat)
        })
    }

    /* для serial*/
    let check_serial = false;
    let default_serial = $('#serial').val();    
    let current_serial; 

    const serial = document.getElementById('serial')
    if(serial)
    {
        serial.addEventListener('close.mdb.select', (e) => {        
            if(check_serial)
            {
                $(".filter form").submit();
            }
        })

        $(document).on('change', '#serial', function() {        
            current_serial = $('#serial').val();
            check_serial = !compare(default_serial, current_serial)
        })
    }

     /* для type_product*/
    let check_type_product = false;
    let default_type_product = $('#type_product').val();    
    let current_type_product; 

    const type_product = document.getElementById('type_product')
    if(type_product)
    {
        type_product.addEventListener('close.mdb.select', (e) => {        
            if(check_type_product)
            {
                $(".filter form").submit();
            }
        })

        $(document).on('change', '#type_product', function() {        
            current_type_product = $('#type_product').val();
            check_type_product = !compare(default_type_product, current_type_product)
        })
    }

     /* для категории*/
    let check_group = false;
    let default_group = $('#group').val();    
    let current_group; 

    const group = document.getElementById('group')
    if(group)
    {
        group.addEventListener('close.mdb.select', (e) => {        
            if(check_group)
            {
                $(".filter form").submit();
            }
        })

        $(document).on('change', '#group', function() {        
            current_group = $('#group').val();
            check_group = !compare(default_group, current_group)
        })
    }

    /*Поиск по клику на кнопку в выпадашке*/
    $(document).on('click', '.btn-save', function() {
        $(".filter form").submit();
    })    

     /*Поиск по клику в сортировке*/

    $(document).on('change', '#sort', function() {    
        $(".filter form").submit();
    }) 

    $(document).on('click', '.reset_btn', function() {    
        window.location.href = $(this).data("url");
    }) 

    


    $('body').on("click", '.js-add', function(e) {
        e.preventDefault();
        id = $(this).data("id");
        counts = 1;       
        var product = {
            'id': id,
            'counts': counts            
        };

        iterator = true;

        if ($.cookie('products')) {
            var products = JSON.parse($.cookie('products'));           
            products.forEach(function(item, i, products) {
                if (item.id == product.id) {
                    item.counts++;
                    iterator = false;
                }
            });
            if (iterator) {
                products.push(product);
            }
            var json_products = JSON.stringify(products);
            $.cookie('products', json_products, { expires: 360, path: '/' });
        } else {
            var products = [];
            products.push(product);
            var json_products = JSON.stringify(products);
            $.cookie('products', json_products, { expires: 360, path: '/' });
        }

        $(this).html("В спецификации");
    });


    $('.js-minus').click(function() {       
        var $input = $(this).next();
        var count = parseInt($input.val());     

        id = $(this).data("id");
        
        if(count!=1)
        {            
            if ($.cookie('products')) {
                var products = JSON.parse($.cookie('products'));
                products.forEach(function(item, i, products) {
                    if (item.id == id) {
                        item.counts--;
                        iterator = false;
                    }
                });
                var json_products = JSON.stringify(products);
                $.cookie('products', json_products, { expires: 360, path: '/' });
                count--;
            }
        } 
        else
        {
            if ($.cookie('products')) {
                var products = JSON.parse($.cookie('products'));
                products.forEach(function(item, i, products) {
                    if (item.id == id) {
                        item.counts=1;
                        iterator = false;
                    }
                });
                var json_products = JSON.stringify(products);
                $.cookie('products', json_products, { expires: 360, path: '/' });
            }
        }      
        
    });

    $('.js-plus').click(function() {
        var $input = $(this).prev();
        var count = parseInt($input.val()); 
        id = $(this).data("id");       
        if ($.cookie('products')) {
            var products = JSON.parse($.cookie('products'));
            products.forEach(function(item, i, products) {
                if (item.id == id) {
                    item.counts++;
                    iterator = false;
                }
            });
            count++;
            var json_products = JSON.stringify(products);
            $.cookie('products', json_products, { expires: 360, path: '/' });
        }              
    });

    $('body').on("click", '.delete_btn', function(e) {
        id = $(this).data("id");       
        if ($.cookie('products')) {
            var products = JSON.parse($.cookie('products'));
            products.forEach(function(item, i, products) {
                if (item.id == id ) {
                    products.splice(i, 1);
                }
            });
            var json_products = JSON.stringify(products);
            $.cookie('products', json_products, { expires: 360, path: '/' });
        }
        window.location.reload();
    });
    

    $(document).on('click', 'input[name="brand[]"]', function() {
        $(".filter form").submit();
    })    

    
	$(document).on('change', '.error', function() {
        $(this).removeClass('error');
    })


	$('.js-form button').on('click', function(event){
        event.preventDefault();

        var dataForAjax = "action=form&";
        var addressForAjax = myajax.url;
        var valid = true;
        
        $(this).closest('form').find('input:not([type=submit]),textarea, select').each(function(i, elem) {
            if (this.value.length < 3 && $(this).hasClass('required')) {
                valid = false;
                $(this).addClass('error');
            }
            if ($(this).attr('name') == 'email' && $(this).hasClass('required')) {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if (!pattern.test($(this).val())) {
                    valid = false;
                    $(this).addClass('error');
                }
            }
            if ($(this).attr('name') == 'agree' && !$(this).prop("checked")) {
                $(this).addClass('error');
                valid = false;
            }

            /*if($(this).attr('name') == 'phone' && $(this).hasClass('required')) {
                if (!$(this).inputmask("isComplete"))
                {
                    valid = false;
                    $(this).addClass('error');
                }
            } */ 

            if (i > 0) {
                dataForAjax += '&';
            }
            dataForAjax += this.name + '=' + encodeURIComponent(this.value);
        })

        if (!valid) {
            return false;
        }  



        $.ajax({
            type: 'POST',
            data: dataForAjax,
            url: addressForAjax,
            success: function(response) {
                $("form").trigger("reset");
                Fancybox.close()

                Fancybox.show([{
                    src: "#thanks",
                    type: 'inline'
                }])               
            }
        });      
    });

    $('.js-form-new button').on('click', function(event){
        event.preventDefault();

        var dataForAjax = "action=form&";
        var addressForAjax = myajax.url;
        var valid = true;
        
        $(this).closest('form').find('input:not([type=submit]),textarea, select').each(function(i, elem) {
            if (this.value.length < 3 && $(this).hasClass('required')) {
                valid = false;
                $(this).addClass('error');
            }
            if ($(this).attr('name') == 'email' && $(this).hasClass('required')) {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if (!pattern.test($(this).val())) {
                    valid = false;
                    $(this).addClass('error');
                }
            }
            if ($(this).attr('name') == 'agree' && !$(this).prop("checked")) {
                $(this).addClass('error');
                valid = false;
            }

            /*if($(this).attr('name') == 'phone' && $(this).hasClass('required')) {
                if (!$(this).inputmask("isComplete"))
                {
                    valid = false;
                    $(this).addClass('error');
                }
            } */

            if (i > 0) {
                dataForAjax += '&';
            }
            dataForAjax += this.name + '=' + encodeURIComponent(this.value);
        })

        dataForAjax += '&';

        var order = "";        
        $('.specification .list .product').each(function(i,elem) {  
            var order2 = ""; 
            
            order2 += $(elem).find(".name").text().trim() + " ";   
            order2 +=  " x " + $(elem).find(".amount input").val();         
            //order2  = order2.split(' ').join(' ');
            //order2.replace(/\r?\n/g, "");
            order2 = order2.replace(/\r|\n/g, ''); 
            order += order2 + "\n";          
        });               
        dataForAjax += 'order=' + encodeURIComponent(order);

        if (!valid) {
            return false;
        }  

        $.ajax({
            type: 'POST',
            data: dataForAjax,
            url: addressForAjax,
            success: function(response) {
                $("form").trigger("reset");
                Fancybox.close()

                Fancybox.show([{
                    src: "#thanks",
                    type: 'inline'
                }])               
            }
        });      
    });

	
})


