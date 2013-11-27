           
	function ffBoletoAkatus(){
		document.getElementById("akatus_check_formapagamento").value="boleto";
		
			
		var cc =  document.getElementById('cc');
		if(typeof(cc) != 'undefined' && cc != null)
		{
		  document.getElementById("cc").style.display="none";
		} 	

		var tef = document.getElementById('tef');
		if(typeof(tef) != 'undefined' && tef != null)
		{
		  document.getElementById("tef").style.display="none";
		}

		
	}
	
	
	function ffCartaodeCredito(){
		document.getElementById("akatus_check_formapagamento").value="cartaodecredito";

		var tef = document.getElementById('tef');
		if(typeof(tef) != 'undefined' && tef != null)
		{
		  document.getElementById("tef").style.display="none";
		} 

		document.getElementById("cc").style.display="block";
		
	}

	function ffTef(){
		document.getElementById("akatus_check_formapagamento").value="tef";

		var cc =  document.getElementById('cc');
		if(typeof(cc) != 'undefined' && cc != null)
		{
		  document.getElementById("cc").style.display="none";
		} 
		
		document.getElementById("tef").style.display="block";
	}

	var VALOR_COMPRA;
	function formatarNumero (rnum) {
		   return "R$ "+ formatamoeda(Math.round(rnum*Math.pow(10,2))/Math.pow(10,2));
	}
       
	function formatamoeda(num) {

		   x = 0;

		   if(num<0) {
		      num = Math.abs(num);
		      x = 1;
		   }

		   if(isNaN(num)) num = "0";
		      cents = Math.floor((num*100+0.5)%100);

		   num = Math.floor((num*100+0.5)/100).toString();

		   if(cents < 10) cents = "0" + cents;
		      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
		         num = num.substring(0,num.length-(4*i+3))+'.'
		               +num.substring(num.length-(4*i+3));

		   ret = num + ',' + cents;

		   if (x == 1) ret = ' - ' + ret;return ret;

		}
	
	function removeOpcoes(selectbox)
	{
		var i;
		for(i=selectbox.options.length-1;i>=0;i--)
		{
			selectbox.remove(i);
		}
	}	
	


    function selectBandeira29(bandeira){

           document.getElementById('akatus_check_cartaobandeira').value = bandeira;

           if(bandeira.length != 0){
               
                var newClass = "cc_inactive";
                var children = document.getElementById('cc_bandeiras').getElementsByTagName('img');

                for(var i = 0; i < children.length; i++){

                            var id = children[i].getAttribute("id");                            
                            var currDivElem = document.getElementById(id);
                            
                            if(id == bandeira){                                
                                currDivElem.setAttribute("class", "cc_active"); 
                                currDivElem.setAttribute("className", "cc_active");
                               jQuery(currDivElem).attr('src', jQuery(currDivElem).attr('src').replace('/cartoes/', '/cartoes-colorido/'));
                                
                            } else {
                                currDivElem.setAttribute("class", "cc_inactive");
                                currDivElem.setAttribute("className", "cc_inactive");
                                 jQuery(currDivElem).attr('src', jQuery(currDivElem).attr('src').replace('/cartoes-colorido/', '/cartoes/'));
                                
                            }

                    }	
                    
           } else {
               alert('Vazio');
          }



        }    

    function imagePreview(){	

			xOffset = 210;
			yOffset = 20;

		jQuery("a.preview").hover(function(e){
			this.t = this.title;
			this.title = "";	
			var c = (this.t != "") ? "<br/>" + this.t : "";
			jQuery("body").append("<p id='preview'><img src='"+ this.href +"' alt='Image preview' /><br /><b>Este é o código de segurança.</b><br /><br />Os cartôes <b>American Express</b>, possuem 4 dígitos e ficam na frente do cartão, acima do numero em alto-relevo. <br />Nos demais cartões, os números do código de segurança são impressos no verso. <br />Os cartões <b>Mastercard</b> e <b>Visa</b> possuem sempre 3 dígitos, sendo o código de segurança sempre os 3 últimos dígitos impressos no verso, conforme a imagem acima. </p>");					
			jQuery("#preview")
				.css("top",(e.pageY - xOffset) + "px")
				.css("left",(e.pageX + yOffset) + "px")
				.fadeIn("fast");						
	    },
		function(){
			this.title = this.t;	
			jQuery("#preview").remove();
	    });	
		jQuery("a.preview").mousemove(function(e){
			jQuery("#preview")
				.css("top",(e.pageY - xOffset) + "px")
				.css("left",(e.pageX + yOffset) + "px");
		});			
	}

	jQuery('input#akatus_check_cartaocredito').keyup(function(){

		var val = jQuery(this).val();
		var first = val.charAt(0);
		var second = val.charAt(1);
		var third = val.charAt(2);
		var fourth = val.charAt(3);

		
		if( first == "4" ){ // Visa
			jQuery('img#cc_cartao_visa').trigger('click');
		}
		else if( first == "5" ){ // Master
			jQuery('img#cc_cartao_master').trigger('click');
		}
		else if( first == "6" ){ // Elo
			jQuery('img#cc_cartao_elo').trigger('click');
		}
		else if( (first == "3") && ((second == "4") || (second == "7")) ){ // Amex
			jQuery('img#cc_cartao_amex').trigger('click');
		}
		else if( (first == "3") && ((second != "4") && (second != "7")) ){ // DinersClub
			jQuery('img#cc_cartao_diners').trigger('click');
		}
		else if( first == "" ){ // DinersClub
			var children = document.getElementById('cc_bandeiras').getElementsByTagName('img');

                for(var i = 0; i < children.length; i++){

                    var id = children[i].getAttribute("id");
                    var currDivElem = document.getElementById(id);
               
                    jQuery(currDivElem).attr('src', jQuery(currDivElem).attr('src').replace('/cartoes/', '/cartoes-colorido/'));

                }

		}

	});
       
	 function isCreditCard(CC){ 

	 	var isCCard;

	      if (CC.length > 19)
	           isCCard = false;

	      var sum = 0; 
	      var mul = 1; 
	      var l = CC.length;
	      for (i = 0; i < l; i++) 
	      {
	           digit = CC.substring(l-i-1,l-i);
	           tproduct = parseInt(digit ,10)*mul;
	           if (tproduct >= 10)
	                sum += (tproduct % 10) + 1;
	           else
	                sum += tproduct;
	           if (mul == 1)
	                mul++;
	           else
	                mul--;
	      }
	      if ((sum % 10) == 0)
	           isCard = true;
	      else
	           isCard =false;

	       if(!isCard){
	       	alert("O número do seu cartão de crédito foi digitado errado. Por favor verifique o número digitado antes de prosseguir com sua compra.");
	       	jQuery('input#akatus_check_cartaocredito').val('');
	       	document.getElementById("akatus_check_cartaocredito").focus();
	       }

	 }


