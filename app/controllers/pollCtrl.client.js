'use strict';
(function(){
    let options = document.getElementsByClassName('option');
    
    for (let i=0; i<options.length; i++){
        let currentLocation = window.location.pathname;
        options[i].addEventListener('click',function(e){
            let id = e.target.getAttribute('id');
            if (id== null) return;
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
    
    let copyBtn = document.getElementById('copy');
    copyBtn.addEventListener('click', function(){
        let link = document.getElementById('link').innerHTML;
        let textarea = document.createElement('textarea');
        textarea.value = link;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
    
    let addOptionBtn = document.getElementById('addoption');
    addOptionBtn.addEventListener('click', function(e){
        e.preventDefault();
        let currentLocation = window.location.pathname;
        let answer = document.getElementById('answer').value; 
        
        if (answer === "") return;
        let pollid = document.getElementById('pollid').value;
        
        
        let optionReq = new XMLHttpRequest();
        optionReq.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    window.location = currentLocation;
                }
            };
        
        optionReq.open('POST', `/api/addoption?answer=${answer}&pollid=${pollid}`, true);
        optionReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        optionReq.send();
    });
})();