/* promise 形式 getSetting */
export const getSetting=()=>{
    return new Promise((resolve,rejext)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                rejext(err)
            }
        });
          
    })
}
/* promise 形式 chooseAddress */
export const chooseAddress=()=>{
    return new Promise((resolve,rejext)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                rejext(err)
            }
        });
          
    })
}
/* promise 形式 openSetting */
export const openSetting=()=>{
    return new Promise((resolve,rejext)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                rejext(err)
            }
        });
          
    })
}
