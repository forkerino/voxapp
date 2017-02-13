'use strict';
(function (){
    let button = document.getElementById('addOption');
    let counter = 2;
    button.addEventListener('click', function(){
        let newText = `<input type="text" class="form-control" name="answers" id="a${counter}">`;
        button.insertAdjacentHTML('beforebegin', newText);
        let id = `a${counter}`;
        document.getElementById(id).focus();
        counter++;
    });
})();
