
const UserCreateCheck = (body)=>{
    const inputData = Object.keys(body)
    const allowedData = ['name', 'email', 'password']
    const isValidOperation = inputData.every(data=> allowedData.includes(data))
    return isValidOperation
   
}

export {UserCreateCheck}