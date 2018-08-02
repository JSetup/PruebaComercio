/*Variables GLOBALES*/
var foco=false;
var numsEnter = new Array();

$(document).ready(function(){
	
	$("#numeros").click(function () {
		if (!foco) {

			//Se ejecuta Animacion cuando el Focus esta en el input
			animacionInputFocus();

			//el focus esta en el input
			foco=true;

			//Al hacer click en el fondo negro removemos los elementos y ponemos el foco en false
			Backdrop();

			/*VERIICA LO QUE SE PRESIONA EN EL TECLADO*/
			$("form").keypress(function (e) {
				//Si son numeros los que se pulsan
				if (e.keyCode >= 48 && e.keyCode <= 57 ) {

				}//Cuando se pulsa tecla ENTER
				else if(e.keyCode == 13){

					e.preventDefault();

					//retornamos false si el valor es vacio
					if ($("#numeros").val().length <= 0 || $("#numeros").val() == "") {
						return false;
					}else{
						//obtenemos el valor del input
						numero = $("#numeros").val();

						//convertimos a entero en valor del input
						numero = parseInt(numero);

						//verificamos si el numero esta dentro del array. Si el numero no se encuentra en el array lo acumula en un arreglo
						if (numsEnter.indexOf(numero) == -1) {
							numsEnter.push(numero);
							console.log(numsEnter);
						}

						//Limpiamos el input
						$("#numeros").val("");
					}

				}else{
					return false;
				}
			});
		}
		
	});

	//Al pulsar el boton Ordenar, ordenamos de forma ascendete
	$("#accion").click(function () {

		if (numsEnter.length > 0) {
			var NumsAsc = Reordernar(numsEnter);
			$(".mirror-nums").show('fadeIn');
			var showNumbers = document.getElementById('numsOrdenados');

			showNumbers.innerHTML = NumsAsc;
		}
		numsEnter = [];
	});

	//animacion que se ejecuta cuando se hace Focus en el input
	function animacionInputFocus(){
		$(".content").append('<div class="backdrop"></div>');
		$(".marco").addClass('marco-in');
		$(".img-background").css('filter', 'blur(9px)');
	}

	/*Hace la animación para mostrar el modal de ayuda*/
	$("#ayuda").click(function () {
		var id = $("#modal-help");
		if (id.css('top') == '-371px') {
			id.css('top', '0');
			id.css('background-color','#000');
		}else{
			id.css('top','-371px');
		}
	});

	/* - Reinicia y remueve elementos DOM
	*/
	function Backdrop(){
		$(".backdrop").click(function () {
			$(this).remove();
			$(".marco").removeClass('marco-in');
			$(".img-background").css('filter', '');
			foco=false;
		});
	}



	/*Ordena los numeros en forma ascendente y los devuelve*/
	function Reordernar(numeros) {
		for(var i = 0; i < numeros.length; i++){
			for(j=i+1; j < numeros.length; j++){
				if(numeros[i] > numeros[j]){
					auxiliar = numeros[i];
					numeros[i] = numeros[j];
					numeros[j] = auxiliar;
				}
			}
		}
		return numeros;
	}
	
	
});
