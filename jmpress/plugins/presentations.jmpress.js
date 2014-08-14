/*!
 * plugin for jmpress.js v0.4.5
 *
 * Copyright 2014 Peter Grund
 * Licensed MIT
 * http://www.opensource.org/licenses/mit-license.php
 */
/*
 * jmpress custom plugin
 * custom functionality of all presentations by Peter
 */
(function($, document, window, undefined) {
    'use strict';

    /* DEFAULTS */
	$.jmpress("defaults").presentations = {
		print: {
            button: "#printbutton"
        },
        break: {
            button: "#breakbutton",
            modal: "#break",
            counter: "#counter"
        },
        meta: {
            footerselect: ".slide footer",
            date: "meta[name=date]",
            authors: "meta[name=author]"
        }
	};

    function getElementID(elementID, defaultValue) {
       elementID = (elementID != null && elementID != "") ? elementID : defaultValue;
       elementID = (elementID.indexOf("#") == 0) ? elementID : "#" + elementID;
       if ($(elementID).length == 0) {
            console.error("no element found for " + elementID + " !!!");
            return false;
       }
       return elementID
    }

    $.jmpress("register", "print", function(config, eleID) {
        var jmpress = this;
        
        var elementID = getElementID(eleID, $(jmpress).jmpress("settings").presentations.print.button);
       
        if ($(elementID)) {
            $(elementID).click(function() {
                if ($(jmpress).jmpress("initialized")) {
                    $(jmpress).jmpress("deinit");
                    window.print();
                    $(jmpress).jmpress(config);
                } else {
                    window.print();
                }

            });
        }
    });
    
    $.jmpress("register", "break", function(config, eleID) {
        var jmpress = this;

        var elementID = getElementID(eleID, $(jmpress).jmpress("settings").presentations.break.button);        

        if ($(elementID)) {
            $(elementID).click(function() {                
                var c = $(
                    $(jmpress).jmpress("settings").presentations.break.counter
                    );
                var b = $(
                    $(jmpress).jmpress("settings").presentations.break.modal
                    ); 
                
                if(c){
                    c.html("");
                    c.countdown({
                        step: 5,
                        format: 'mm:ss',
                        startTime: '05:00',
                        timerEnd: function() {
                            b.modal("hide");
                        },
                        image: "../bisnode/img/digits.png"
                    });
                } else {
                    console.warn("counter not found: " + c);
                }
                if(b){
                    b.modal("show");            
                } else {
                    console.warn("modal not found: " + b);
                }
            });
        }else{
            console.error("no element found for " + elementID + " !!!");
        }
    });

    $.jmpress("register" , "footerHandling", function(){
        var jmpress = this;

        var f = $($(jmpress).jmpress("settings").presentations.meta.footerselect);

        var d = new Date();
        var m = $($(jmpress).jmpress("settings").presentations.meta.date);        
        
        var footerDate = d.getFullYear() + "-"
                + ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth()) + "-"
                + ((d.getDate() < 10) ? "0" + d.getDate() : d.getDate());

        if ( m && m.attr("content")) {
            footerDate = m.attr("content");
        }        
        $(f).prepend("       " + footerDate + "          ");      
        console.log("footer:date set to '" + footerDate + "'"); 

        var a = $($(jmpress).jmpress("settings").presentations.meta.authors); 
        var authors = $(a).map(function(idx, e){    
                    return e.content;
                }).get().join(",");
        if(authors != "") {
            $(f).attr("data-author", authors);
            console.log("footer:author set to '" + $(".slide footer").attr("data-author")+"'");
        }
        
    });

}(jQuery, document, window));