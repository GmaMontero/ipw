(($) => {
    const $MONTH_CONTAINER = $(".months-info-container");
    const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const REGEX_MAIL = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    const REGEX_PHONE = /^\d+$/;
    const VALID_CLASS = 'is-valid';
    const INVALID_CLASS = 'is-invalid';

    document.getElementById('slides').style.height = (window.screen.height/2) + "px";
    document.getElementById('gallery').style.display = "block";

    $("header nav li a").on("click", function () {
        let selector = $(this)[0].getAttribute("href");
        let position = $(selector).offset().top;
        $("html, body").animate({scrollTop: position-5}, 500, 'swing');

        $("header nav li").removeClass("active");
        $(this).parent().addClass("active");
    });

    $("#frmContact").on("submit", function(e){
        e.preventDefault();
        $(this).find(".required").removeClass(INVALID_CLASS);
        $(this).find(".required").each(function(index, input){
            let isValid = $(input).val().trim().length === 0;
            $(input).toggleClass(INVALID_CLASS, isValid).toggleClass(VALID_CLASS, !isValid);
        });

        $(this).find(".number").each(function(index, input){
            let value = $(input).val().trim();
            let isValid = value.length > 0 && REGEX_PHONE.test(value);
            $(input).toggleClass(INVALID_CLASS, !isValid).toggleClass(VALID_CLASS, isValid);
        });

        $(this).find(".email").each(function(index, input){
            let value = $(input).val().trim();
            let isValid = value.length > 0 && REGEX_MAIL.test(value);
            $(input).toggleClass(INVALID_CLASS, !isValid).toggleClass(VALID_CLASS, isValid);
        });
    });

    $("#frmLogin").on("submit", function(e){
        e.preventDefault();
        const user = document.getElementById('txtUser').value;
        if(user.trim().length < 3){
          alert("El usuario debe tener al menos 3 caracteres.");
        } else {
          typeof localStorage !== "undefined" && localStorage.setItem('user', user);
          window.location.reload();
        }
    });

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const getMOnthHtml = (data) => {
        return `<div class="month-info" style="width: ${data.width}px">
            <h1>${data.month}</h1>
            <h2>Precio promedio: $${data.amount}</h2>
            <h2>Temperatura promedio: ${data.temperature}°C</h2>
        </div>`
    }

    const loadMonthsInfo = () => {
        let html = '',
            width = $MONTH_CONTAINER.width(),
            current = 0,
            position = 0;

        MONTHS.forEach((month)=> {
            html += getMOnthHtml({
                month,
                width,
                amount: getRandomInt(30500, 45000),
                temperature: getRandomInt(25, 35)
            });
        });

        $MONTH_CONTAINER.find('.months').data('current', current).html(html);
        $MONTH_CONTAINER.find('.next, .prev').on('click', function(e){
            if($(this).hasClass('next')){
                current += 1;
                position += width;
            } else if ($(this).hasClass('prev')) {
                current -= 1;
                position -= width;
            }

            $MONTH_CONTAINER.find('.prev').toggle(current > 0);
            $MONTH_CONTAINER.find('.next').toggle(current < MONTHS.length-1);
            $MONTH_CONTAINER.find('.months').stop().animate({
                right: position
              }, 500);
        });

        $MONTH_CONTAINER.find('.next').show();
    }

    const loadUser = () => {
      const user = typeof localStorage !== "undefined" && localStorage.getItem('user');
      if(user && user !== null){
        document.getElementById('alertUser').innerText = `Bienvenido ${user}, tanto tiempo...`;
        document.getElementById('alertUser').style.display = 'block';
        document.getElementById('txtUser').value = user;
      }
    }

    loadMonthsInfo();
    loadUser();

})(jQuery);

function initMap() {
  const MAP = document.getElementById('map');
  MAP.style.height = Math.max(document.getElementById('map-container').clientHeight-30, 400) + "px";
  MAP.style.width = "100%";

  var uai = {lat: -34.6219177, lng: -58.3814389};
  var map = new google.maps.Map(MAP, {zoom: 15, center: uai});
  var marker = new google.maps.Marker({position: uai, map: map});
}
