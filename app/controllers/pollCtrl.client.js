'use strict';

(function(){
    let options = document.getElementsByClassName('option');
    let currentLocation = window.location.pathname;
    for (let i=0; i<options.length; i++){
        options[i].addEventListener('click',function(e){
            let id = e.target.getAttribute('id');
            let voteReq = new XMLHttpRequest();
            voteReq.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    window.location = currentLocation;
                }
            };
            voteReq.open('PUT', `/api/polls/${id}`, true);
            voteReq.send();
        });
    }
})();