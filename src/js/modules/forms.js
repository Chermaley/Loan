import Mask from './mask';
export default class Forms {
    constructor(form, url) {
        this.form = document.querySelectorAll(form);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: "Загрузка",
            success: "Спасибо! Скоро мы с вами свяжемся",
            failure: "Что-то пошло не так...!",
        };
        this.api = url;
    }

    checkTextInputs (selector){
        const emailInputs = document.querySelectorAll(selector);
        emailInputs.forEach(input => {
            input.addEventListener('keypress', function(e){
                if(!e.key.match(/[^а-яё]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
            
            if(elem.setSelectionRange){
                // elem.addEventListener('click', ()=>{
                //     elem.selectionStart  = elem.selectionEnd  = elem.value.length;
                // });
                // elem.setSelectionRange(pos, pos);
    
            } else if(elem.createTextRange){
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(event){
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length){
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a){
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        
            });
    
            if(event.type === 'blur'){
                if (this.value.length === 2){
                    this.value = '';
                }
            }else{
                setCursorPosition(this.value.length, this);
            }
        }
        let inputs = document.querySelectorAll('[name="phone"]');
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(url, data){
        let res = await fetch(url, { //Ставим await чтобы дождаться завершения отправки
            method: "POST",
            body: data
        });
        return await res.text(); //Ставим await чтобы дождаться ответа
    }

    init() {
        this.checkTextInputs('input[name="email"]');
        this.initMask()
        this.form.forEach(item => {
            item.addEventListener('submit', (e) => { //event нужен для того, чтобы страница не пперезагружалась
                e.preventDefault();
           
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                statusMessage.style.cssText = `
                margin-top: 15px;
                font-size: 18px;
                color: grey;
                `;
                item.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item);

                this.postData(this.api, formData)
                .then(res => {
                    statusMessage.textContent = this.message.success;
                    console.log(res);
                })
                .catch(() => {
                  statusMessage.textContent = this.message.failure;
                })
                .finally(() => { 
                    this.clearInputs();

                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);

                });
            });
        });

    }
}