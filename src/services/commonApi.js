import axios from "axios"

export const commonApi = async(httpRequest,url,reqBody,reqHeader)=>{
    const regConfig ={
        method: httpRequest,
        url,
        data:reqBody,
        headers:reqHeader
    }
    return await axios(regConfig).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}