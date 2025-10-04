import { useState } from "react";

export default function useAnimation(book) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    function nextPage() {
        const currentLastParagraph =book[currentPage].length - 1;
        console.log(currentIndex)
        console.log(currentLastParagraph)
        if (currentIndex > currentLastParagraph) {
            console.log("nextpageSwitch")
            stop()
            if (currentPage < book.length - 1) {
                setCurrentPage((c) => c + 1);
                setCurrentIndex(0);
                setIsAnimating(true);
                return;
            }
        }
        else{
            console.log("not the last paragraph")
            setIsAnimating(true)
        }
    }
    function start(){
        console.log("start")
        setIsAnimating(true)
    }

    function stop() {
        console.log("stop")
        setIsAnimating(false);
        setCurrentIndex((c) => c + 1);
    }

    return { isAnimating, currentIndex, currentPage, setIsAnimating, nextPage, start, stop };
}