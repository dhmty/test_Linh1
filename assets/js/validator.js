// Đối tượng
function Validator(options) {
    // hàm thực hiên validate
    function validate(inputElement,rule){
        var errorElement= inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage ;
       
        //Lấy ra các rules của selector        
        var rules=selectorRules[rule.selector];

        //lặp qua từng rủ kiểm tra
        //Nếu có lỗi thì dừng việc làm
        for (var i=0;i<rules.length;++i)
        {
            //console.log(rules[i]);
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }
        if (errorMessage){
                errorElement.innerText= errorMessage;
                inputElement.parentElement.classList.add('invalid');
        } else{
                errorElement.innerText='';
                inputElement.parentElement.classList.remove('invalid');
                }
        return !errorMessage;//convert boolean và !! trả về T/F
    }

    var selectorRules={};
    var formElement= document.querySelector(options.form);
    
    if (formElement) {

        //khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;
            //lặp qua từng rule và validate
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                if (!validate(inputElement,rule)) isFormValid=false;
            });
           
            if (isFormValid){
                // Trường hợp submit với javascript
                if (typeof options.onsubmit === 'function')  {
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues=Array.from(enableInputs).reduce(function(values,input){
                        return (values[input.name] = input.value) && values; 
                    },{})
                    options.onsubmit(formValues);
                }
                //TH submit với hành vi mặc định
                else {
                     formElement.submit();
                }
            } 
            else {
                console.log('Co Loi')
            }
            

        }


        
        //Lặp qua mỗi rule và xử lý(lắng nge sự kiên)
        options.rules.forEach(function (rule){
           // lưu lại tất cả các rule cho mỗi input
             if (Array.isArray(selectorRules[rule.selector])) {
               selectorRules[rule.selector].push(rule.test);
              }
              else {
               selectorRules[rule.selector]=[rule.test];
              }
           
           
            var inputElement = formElement.querySelector(rule.selector);
           
            if (inputElement) {
                // xuwr lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                  //value :inputElement.value
                    //   test func: rule.test
                    validate(inputElement,rule);
                }

                // xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function(){
                    var errorElement= inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText='';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }

}

// Định nghĩa Rules
// Nguyen tac cua cac rules:
// 1khi có lỗi=> trả ra mesage lỗi
//2. khi hợp lệ => không trả ra gì cả undefined
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value){
            return value.trim() ? undefined :  message ||'Vui lòng nhập trường này'
        }
    };
}


Validator.minLength = function (selector,min, message) {

    return {
        selector: selector,
        test: function (value){
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    };
}
// kiểm tra mẫu của mã SV
// Validator.isConfirmed = function (selector,getCofirmValue,message) {
//     return {
//         selector: selector,
//         test: function (value){
//             return value === getCofirmValue() ? undefined : message || 'Gía trị nhập vào không chính xác';
//         }
//     };
// }