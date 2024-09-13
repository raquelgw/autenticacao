export default function addAliasDots(obj: any) {
    let newObj: any = {}
    for (let key in obj) {
      newObj[`:${key}`] = obj[key]
    }
    return newObj
  }