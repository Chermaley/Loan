export default class ShowInfo{
    constructor(triggers){
        this.btns = document.querySelectorAll(triggers);
        this.content = document.querySelectorAll('.msg');
    }

    bindTriggers(){
        this.btns.forEach((btn, i) => {
            btn.addEventListener('click', ()=>{
                if(btn.closest('.module__info-show').nextElementSibling.style.display == "none"){
                   btn.closest('.module__info-show').nextElementSibling.style.display = "block";
                }else{
                   btn.closest('.module__info-show').nextElementSibling.style.display = "none";
                }
            });
        });
    }

    init(){
        this.content.forEach(item => {
            item.style.display = "none";
        });
        this.bindTriggers();
    }
}