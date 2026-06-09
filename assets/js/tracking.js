window.dlTrack=function(name){console.log('conversion:',name); if(window.gtag){gtag('event',name);} if(window.fbq){fbq('trackCustom',name);} if(window.ttq){ttq.track(name);} };
