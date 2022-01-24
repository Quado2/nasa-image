import {useState, useEffect} from 'react'

export default function useOnVisible(options) {
    const [ref, setRef] = useState(false)
    const [visible, setVisible] = useState(false)
    useEffect(()=>{

        const observer = new IntersectionObserver(([entry])=>{
            if(entry.isIntersecting){
              setVisible(true)
            }
        }, options)

        if(ref){
            observer.observe(ref)
        }

        return() => {
            if(ref){
                observer.unobserve(ref)
            }
        }

    },[ref,options])

    return {setRef, visible}
}
