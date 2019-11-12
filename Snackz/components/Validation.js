const regex = {
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    mobile: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    }
    
    export const validEmail = (email) =>
    {
    if(regex.email.test(email)==false)
    alert('Please Enter Valid Email')
    else
    return regex.email.test(email)
    }
    
    export const validPassword = (password) =>
    {
    if(regex.password.test(password)==false)
    alert('Please Enter Valid Password')
    else
    return regex.password.test(password)
    }
    
    
    export const validPhone = (contact) =>
    {
    if(regex.mobile.test(contact)==false)
    alert('Please Enter Valid Contact Number')
    else
    return regex.mobile.test(contact)
    }