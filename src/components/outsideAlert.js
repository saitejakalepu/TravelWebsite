import React, { useRef, useEffect ,useState} from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideAlerter() {
    const ref = useRef(null);
    const [showOptions, setshowOptions] = useState(false);


    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            
            setshowOptions(false);
        }
    }



    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);


    return { showOptions, setshowOptions, ref}
}