$(document).ready(function() {
	
	//Get the clicked button
	var submitButton = undefined;
	$('#profile-form').find(':submit').live('mouseup keyup',function(){
	    submitButton  = $(this);
	});
	
	// hide all but .collapse-nohide on load, change arrows
	$('.collapse-head').each(function(index) {
		var content_name = '#' + $(this).attr('id') + '-content';
		var content = $(content_name);

		if ($(this).is('.collapse-floating')) {
			$(this).hide();
			content.css('padding-top', '1em').css('margin-top', '1em');
			return;
		}

		if (!$(this).is('.collapse-nohide')) {
			content.hide();

			var arrow_name = '#' + $(this).attr('id') + '-arrow-expanded';
			var arrow = $(arrow_name);

			if (arrow.length) {
				arrow.hide();
			}
		} else {
			var arrow_name = '#' + $(this).attr('id') + '-arrow-collapsed';
			var arrow = $(arrow_name);

			if (arrow.length) {
				arrow.hide();
			}
		}
	});


	// toggle content
	$(document).on('click', '.collapse-head', function(event) {
		if ($(this).is('[click-on-click]')) {
			var clickelement = $('#' + $(this).attr('click-on-click'));
			if (clickelement.is(':checked')) {
				clickelement.attr('checked', false);
			} else {
				clickelement.attr('checked', true);
			}
		}

		if ($(this).is('.no-collapse')) {
			return;
		}
		
		// stops from toggling on radio button click
		if ($(this).children('input').length) {
			var target = event.target || event.srcElement || event.originalTarget; // cross-browser

			if ($(target).is("input")) {
				return; // is a button, don't toggle
			}
		}


		var content_name = '#' + $(this).attr('id') + '-content';
		var content = $(content_name);

		var arrow_expanded_name = '#' + $(this).attr('id') + '-arrow-expanded';
		var arrow_expanded = $(arrow_expanded_name);

		var arrow_collapsed_name = '#' + $(this).attr('id') + '-arrow-collapsed';
		var arrow_collapsed = $(arrow_collapsed_name);

		if (content.is(':hidden')) {
			arrow_expanded.show();
			arrow_collapsed.hide();
		} else {
			arrow_expanded.hide();
			arrow_collapsed.show();
		}

		content.slideToggle('fast');

	});
	
	
	$('#user_profile_rfid').focus(function() {
		 // alert('Handler for .focus() called.');
		  if ($("#user_profile_rfid").val() == "To Be Allocated") {
			  $("#user_profile_rfid").val("");
		  }
		});
	
	// Autocomplete for RFID
	$("#user_profile_rfid").autocomplete({
		source: document.getElementById("base_url").href + "/index.php/json_access/rfid_list",
		select: function( event, ui ) {
	       $("#user_profile_rfid").val(ui.item.label);
	       $("#user_profile_rfid_ID").val(ui.item.id);
	       return false;
	    },
	    focus: function(event, ui) {
	        $("#user_profile_rfid").val(ui.item.label);
		    $("#user_profile_rfid_ID").val(ui.item.id);
	        return false;
	    }
	});
	
	/* Handle User Profile Updates */
	
	  /* attach a submit handler to the form */
	  $("#profile-form").submit(function(event) {

	    /* stop form from submitting normally */
	    event.preventDefault(); 
	        
	    var submitButtonName=submitButton.attr('name');
	    console.log(submitButtonName);
	    /* get some values from elements on the page: */
	    var $form = $( this ), url = $form.attr( 'action' );

	    /* Send the data using post and put the results in a div */
	    if (submitButtonName == "interest_update") {
	    $.ajax({type:'POST',url:url, data:$("#profile-form").serialize(),
	      success:function(response) {
	    	    // log the response to the console
	    	    console.log("Response: "+response);
		        $( '#interest_list' ).html(response);
		        $('#new_interest').val(null);
		        $("select#new_interest_level option").each(function() { this.selected = (this.text == '1'); });
	    	}
	    }
	    );
	    }
	  });

});