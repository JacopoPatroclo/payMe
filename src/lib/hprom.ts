
interface HPromInterface<T> {
  success: boolean,
  data: T | Error
}

export default function HProm<T>(promise: any): Promise<HPromInterface<T>> {
  return new Promise((resolve) => {
      promise
      .then((data: T) => { 
        resolve({
        success: true,
        data})
      })
      .catch((data: Error) => resolve({
        success: false,
        data
      })) 
  })
}