export default class Mask{
    constructor(selector){
        this.input = document.querySelectorAll(selector);
        this.matrix = '+7 (___) ___ __ __';
    }


    setCursorPosition(pos, elem){
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
    }


    createMask(event){
        let matrix = '+7 (___) ___ __ __',
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
            this.setCursorPosition(this.value.length, this);
        }
    }



}