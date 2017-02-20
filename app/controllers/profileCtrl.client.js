(function(){
    let trashcans = document.getElementsByClassName('delete');
    for (let i=0; i<trashcans.length; i++){
        trashcans[i].addEventListener('click',function(e){
            let id = e.target.getAttribute('id');
            let deleteReq = new XMLHttpRequest();
            deleteReq.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    window.location = '/profile';
                }
            };
            deleteReq.open('DELETE', `/api/polls/${id}`, true);
            deleteReq.send();
        });
    }
})();