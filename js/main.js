$(document).ready(function(){

    // Mobile menu
    const toggleMenu = document.querySelector('.mobile-nav');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const bodyE1 = document.body

    toggleMenu.addEventListener('click', function(){

        this.classList.toggle('mobile-nav--active');
        mobileMenu.classList.toggle('mobile-menu--active');
        overlay.classList.toggle('overlay--active');
        bodyE1.classList.toggle('noscroll');
    })

    mobileMenu.addEventListener('click', function(){

        this.classList.remove('mobile-menu--active');
        toggleMenu.classList.remove('mobile-nav--active');
        overlay.classList.remove('overlay--active');
        bodyE1.classList.remove('noscroll');
    })

    window.addEventListener('resize', function(){
        
        toggleMenu.classList.remove('mobile-nav--active');
        mobileMenu.classList.remove('mobile-menu--active');
        overlay.classList.remove('overlay--active');
        bodyE1.classList.remove('noscroll');
    })

    // Mixitup
    let containerE1 = document.querySelector('#mix-cards');

    let mixer = mixitup(containerE1, {
        classNames: {
            block: ""
        }
    });

    // PageNav
    $('#header-top-nav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 500,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
    });

    // Form Placeholder

    const formItems = document.querySelectorAll('.form-field');

    for(let item of formItems){
        const thisParent = item.closest('.form-item');
        const thisPlaceholder = thisParent.querySelector('.form-placeholder');
        // Если input в фокусе
        item.addEventListener('focus', function(){
            thisPlaceholder.classList.add('form-placeholder--active');
        });

        // Если input теряет фокус
        item.addEventListener('blur', function(){
            
            if(item.value.length > 0){
                thisPlaceholder.classList.add('form-placeholder--active');
            }
             else{
                thisPlaceholder.classList.remove('form-placeholder--active')
             }   
        })
    }

      //FORM VALIDATE
	$('.contact-form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите E-mail',
				email: 'Неверный формат email'
			},
			
			message: {
				required: 'Поле не должно быть пустым'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	});

	//*************************************************** */
	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".contact-form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".contact-form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}

})    


// document.querySelector('.mobile-nav').addEventListener('click', function(){
//     this.classList.toggle('mobile-nav--active')
//     document.querySelector('.mobile-menu').classList.toggle('mobile-menu--active')
//     document.querySelector('.overlay').classList.toggle('overlay--active')
// });


