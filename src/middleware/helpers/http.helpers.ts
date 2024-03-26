export function statusOK(code: number, data: any) {
    return {
        // meta: {
        //     code: code ? code : 200,
        //     msg: 'success'
        // },
        // data: data,
        success: true, 
        result: data, 
        message: "Successfully found all documents"
    }
}

export function statusError(code: number, msg: string, err: any) {
    return {
        meta: {
            code: code,
            msg: msg
        },
        data: null,
        error: err.errorMessage,
        error_data: err.errorData,
        success: false, 
        result: null, 
        message: msg
    }
}