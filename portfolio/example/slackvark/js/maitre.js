window.Maitre = {
    uuid: "MF3317cb28c4",
    require_leaderboard: true,
    callbacks: {
        onLoad: function() {
        },
        afterLoad: function() {
        },
        success: function(data, form) {
            var submit_button = $("[data-maitre-submit-button]");
            var text = data;

            if (data.response == "subcriber_not_found") {
                document.getElementById("demo").innerHTML =
                    "<h3>We're Sorry</h3>" +
                    "<p class='mdi-alert-error'> Error: " + Maitre.alerts.subcriber_not_found + "</p>" +
                    "<p>please fill out this field with correct email</p>" ;

                submit_button.prop("disabled", false).html(Maitre.labels.submit_button);
            }
            else if (data.response == "subscriber_created") {
                document.getElementById("demo").innerHTML =
                    "<h3>Thank you</h3>" +
                    "<p>We have sent you a confirmation email.</p>" +
                    "<p>You have 15 minutes to confirm your email.</p>" +
                    "<p class='maitre_counting'>" + data.people_ahead + "</p>" +
                    "<p>People in front of you</p>" +
                    "<p class='maitre_counting'>" + data.people_behind + "</p>" +
                    "<p>People behind you</p>" +
                    "<p>Improve your position by signing up your friends.</p>" +
                    "<a class='btn-floating transparent ' data-maitre-social-facebook href='"+ "http://www.facebook.com/sharer.php?u="+encodeURIComponent(data.facebook_short_link) +"'></a>" +
                    "<a class='btn-floating transparent twitter_icon-padding' data-maitre-social-twitter href='"+ "https://twitter.com/intent/tweet?text="+encodeURIComponent(Maitre.socials.twitter.replace(/%referral_code%/gi, data.twitter_short_link)) + "'></a>" +
                    "<a class='btn-floating transparent' data-maitre-social-email href='"+ "mailto:info@getaaron.com?body="+Maitre.socials.email.replace(/%referral_code%/gi, encodeURIComponent(data.email_short_link)) +"'></a>" +
                    "<p>Or share your unique code</p>" +
                    "<p>"+ data.referral_link +"</p>";
                submit_button.prop("disabled", false).html(Maitre.labels.submit_button);
            }
            else if (data.response == "subscriber_retrieved") {
                document.getElementById("demo").innerHTML =
                    "<h3>Thank you</h3>" +
                    "<p>This email already registered </p>" +
                    "<p class='maitre_counting'>" + data.people_ahead + "</p>" +
                    "<p>People in front of you</p>" +
                    "<p>Improve your position by signing up your friends.</p>" +
                    "<a class='btn-floating transparent' data-maitre-social-facebook href='"+ "http://www.facebook.com/sharer.php?u="+encodeURIComponent(data.facebook_short_link) +"'></a>" +
                    "<a class='btn-floating transparent twitter_icon-padding' data-maitre-social-twitter href='"+ "https://twitter.com/intent/tweet?text="+encodeURIComponent(Maitre.socials.twitter.replace(/%referral_code%/gi, data.twitter_short_link)) + "'></a>" +
                    "<a class='btn-floating transparent' data-maitre-social-email href='"+ "mailto:info@getaaron.com?body="+Maitre.socials.email.replace(/%referral_code%/gi, encodeURIComponent(data.email_short_link)) +"'></a>" +
                    "<p>Or share your unique code</p>" +
                    "<p>https://maitreapp.co/l/"+ data.code +"</p>";
                submit_button.prop("disabled", false).html(Maitre.labels.submit_button);
            }
            else if (data.response == "subscriber_accepted") {

                document.getElementById("demo").innerHTML = "<h3>Thank you</h3>" + Maitre.alerts.subscriber_accepted + "subscriber_accepted";
                submit_button.prop("disabled", false).html(Maitre.labels.submit_button);

            } else if (data.response == "subscriber_not_verified") {
                document.getElementById("demo").innerHTML =
                    "<h3>We're Sorry</h3>" +
                    "<p class='mdi-alert-error'> Error: " + Maitre.alerts.subscriber_not_verified + "</p>" +
                    "<p>please confirm your email address</p>" ;
                submit_button.prop("disabled", false).html(Maitre.labels.submit_button);

            } else if (data.response == "email_not_valid") {

                document.getElementById("demo").innerHTML =
                    "<h3>We're Sorry</h3>" +
                    "<p class='mdi-alert-error'> Error: " + data.reason + "</p>" +
                    "<p>please fill out this field with correct email</p>" ;

                submit_button.prop("disabled", false).html(Maitre.labels.submit_button);

            }
            else {
                document.getElementById("demo").innerHTML = "<h3>We're Sorry</h3>" + "<p class='mdi-alert-error'> Error: " + data.response + "</p>";
                submit_button.prop("disabled", false).html(Maitre.labels.submit_button);
            }
            $('#modal1').openModal();
            submit_button.prop("disabled", false).html(Maitre.labels.submit_button);
        },
        afterSuccess: function(data, form) {


        },
        error: function(errorThrown, form) {

            document.getElementById("error").innerHTML =
                "<p>We're Sorry</p>" +
                "<p> Error: " + errorThrown + "</p>" ;
        }
    }
};